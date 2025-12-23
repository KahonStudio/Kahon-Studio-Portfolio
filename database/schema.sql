-- Supabase Database Schema for Kahon Studio Portfolio
-- Run these SQL commands in Supabase Dashboard → SQL Editor

-- ============================================
-- CONTACTS TABLE
-- ============================================
-- Stores contact form submissions
CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  responded BOOLEAN DEFAULT FALSE
);

-- Enable Row Level Security
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist, then create new ones
DROP POLICY IF EXISTS "Allow public insert on contacts" ON contacts;
DROP POLICY IF EXISTS "Allow public read on contacts" ON contacts;

-- Policy: Allow anyone to insert (submit contact form)
CREATE POLICY "Allow public insert on contacts"
  ON contacts FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy: Only authenticated users can read (you can modify this later)
-- For now, we'll allow public read for testing
CREATE POLICY "Allow public read on contacts"
  ON contacts FOR SELECT
  TO anon, authenticated
  USING (true);

-- ============================================
-- PROJECTS TABLE
-- ============================================
-- Stores portfolio projects
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('games', 'web', 'mobile', 'all')),
  tags TEXT[] DEFAULT '{}',
  image_urls TEXT[] DEFAULT '{}',
  project_url TEXT,
  github_url TEXT,
  featured BOOLEAN DEFAULT FALSE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Add image_urls column if it doesn't exist (for existing tables)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'projects' AND column_name = 'image_urls'
  ) THEN
    ALTER TABLE projects ADD COLUMN image_urls TEXT[] DEFAULT '{}';
  END IF;
END $$;

-- Migrate existing image_url to image_urls array (if image_url exists)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'projects' AND column_name = 'image_url'
  ) THEN
    -- Update existing rows to convert single image_url to array
    UPDATE projects 
    SET image_urls = CASE 
      WHEN image_url IS NOT NULL AND image_url != '' THEN ARRAY[image_url]
      ELSE '{}'
    END
    WHERE image_urls IS NULL OR array_length(image_urls, 1) IS NULL;
    
    -- Drop the old column (commented out for safety - uncomment after verifying migration)
    -- ALTER TABLE projects DROP COLUMN image_url;
  END IF;
END $$;

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist, then create new ones
DROP POLICY IF EXISTS "Allow public read on projects" ON projects;
DROP POLICY IF EXISTS "Allow authenticated insert on projects" ON projects;
DROP POLICY IF EXISTS "Allow authenticated update on projects" ON projects;
DROP POLICY IF EXISTS "Allow authenticated delete on projects" ON projects;

-- Policy: Allow public read (everyone can see projects)
CREATE POLICY "Allow public read on projects"
  ON projects FOR SELECT
  TO anon, authenticated
  USING (true);

-- Policy: Only authenticated users can insert/update/delete
-- You can modify this later to restrict to specific users
CREATE POLICY "Allow authenticated insert on projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update on projects"
  ON projects FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated delete on projects"
  ON projects FOR DELETE
  TO authenticated
  USING (true);

-- ============================================
-- TEAM MEMBERS TABLE
-- ============================================
-- Stores team member information
CREATE TABLE IF NOT EXISTS team_members (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  description TEXT,
  avatar_url TEXT,
  skills TEXT[] DEFAULT '{}',
  email TEXT,
  linkedin_url TEXT,
  github_url TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist, then create new ones
DROP POLICY IF EXISTS "Allow public read on team_members" ON team_members;
DROP POLICY IF EXISTS "Allow authenticated modify on team_members" ON team_members;

-- Policy: Allow public read
CREATE POLICY "Allow public read on team_members"
  ON team_members FOR SELECT
  TO anon, authenticated
  USING (true);

-- Policy: Only authenticated users can modify
CREATE POLICY "Allow authenticated modify on team_members"
  ON team_members FOR ALL
  TO authenticated
  USING (true);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_display_order ON projects(display_order);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_team_members_display_order ON team_members(display_order);

-- ============================================
-- FUNCTION TO UPDATE updated_at TIMESTAMP
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop existing triggers if they exist, then create new ones
DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
DROP TRIGGER IF EXISTS update_team_members_updated_at ON team_members;

-- Trigger for projects table
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger for team_members table
CREATE TRIGGER update_team_members_updated_at BEFORE UPDATE ON team_members
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

