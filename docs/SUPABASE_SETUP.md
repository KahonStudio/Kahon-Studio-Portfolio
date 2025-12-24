# Supabase Setup Guide

This guide will help you connect your Kahon Studio portfolio to your Supabase database.

## Step 1: Get Your Supabase Credentials

1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Select your project: **KahonStudio Website**
3. Navigate to **Settings** → **API**
4. You'll find:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key** (a long string starting with `eyJ...`)

## Step 2: Configure Environment Variables

1. Copy the `.env.example` file to create a `.env` file:
   ```bash
   cp .env.example .env
   ```

2. Open the `.env` file and replace the placeholder values:
   ```
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

   **Important:** Replace `your-project-id` and `your-anon-key-here` with your actual values from Step 1.

## Step 3: Restart Your Development Server

After creating/updating your `.env` file, restart your dev server:

```bash
npm run dev
```

## Step 4: Using Supabase in Your Components

Import the Supabase client in any component:

```javascript
import { supabase } from '../lib/supabase'
```

### Example: Fetching Data

```javascript
// Fetch projects from Supabase
const fetchProjects = async () => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
  
  if (error) {
    console.error('Error fetching projects:', error)
    return
  }
  
  console.log('Projects:', data)
}
```

### Example: Inserting Data

```javascript
// Insert a new contact form submission
const submitContactForm = async (formData) => {
  const { data, error } = await supabase
    .from('contacts')
    .insert([
      {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        created_at: new Date().toISOString()
      }
    ])
  
  if (error) {
    console.error('Error submitting form:', error)
    return
  }
  
  console.log('Form submitted:', data)
}
```

### Example: Real-time Subscriptions

```javascript
// Listen for real-time updates
useEffect(() => {
  const subscription = supabase
    .channel('projects')
    .on('postgres_changes', 
      { event: 'INSERT', schema: 'public', table: 'projects' },
      (payload) => {
        console.log('New project added:', payload.new)
      }
    )
    .subscribe()

  return () => {
    subscription.unsubscribe()
  }
}, [])
```

## Step 5: Set Up Your Database Tables

In your Supabase dashboard, go to **Table Editor** and create tables as needed. For example:

### Projects Table
```sql
CREATE TABLE projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  tags TEXT[],
  image_url TEXT,
  project_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);
```

### Contacts Table
```sql
CREATE TABLE contacts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);
```

## Security Notes

- ✅ The `.env` file is already in `.gitignore` - your keys won't be committed
- ✅ Use Row Level Security (RLS) policies in Supabase for data protection
- ✅ The `anon` key is safe to use in frontend code (it's public)
- ⚠️ Never commit your `.env` file to version control

## Troubleshooting

### "Missing Supabase environment variables" error
- Make sure your `.env` file exists in the root directory
- Check that variable names start with `VITE_`
- Restart your dev server after creating/updating `.env`

### Connection issues
- Verify your Project URL is correct
- Check that your Supabase project is active
- Ensure your API keys are correct

## Next Steps

1. Set up your database tables in Supabase
2. Configure Row Level Security (RLS) policies
3. Update your components to fetch data from Supabase
4. Test your connection with sample queries

For more information, visit the [Supabase Documentation](https://supabase.com/docs).


