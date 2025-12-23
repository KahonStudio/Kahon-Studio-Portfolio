-- Reset Projects Table with Sample Data (Using Unsplash)
-- This will delete all existing projects and insert new ones with gallery images
-- Run this in Supabase SQL Editor

-- Delete all existing projects
DELETE FROM projects;

-- Insert new projects with multiple images (using Unsplash for beautiful placeholder images)
INSERT INTO projects (title, description, category, tags, image_urls, project_url, github_url, featured, display_order) VALUES

-- Game Projects
(
  'Action RPG Game',
  'Immersive action RPG with stunning visuals and engaging gameplay mechanics. Built with Unity and C#, featuring dynamic combat systems, beautiful environments, and an engaging storyline.',
  'games',
  ARRAY['Unity', 'C#', 'Game Design'],
  ARRAY[
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=600&fit=crop'
  ],
  'https://example.com/game1',
  'https://github.com/example/game1',
  true,
  1
),

(
  'Indie Game Project',
  'Creative indie game with unique art style and innovative mechanics. A passion project showcasing artistic vision and technical expertise.',
  'games',
  ARRAY['Unity', 'Game Design', '2D Art'],
  ARRAY[
    'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop'
  ],
  'https://example.com/game2',
  'https://github.com/example/game2',
  false,
  2
),

-- Web Projects
(
  'E-Commerce Website',
  'Modern e-commerce platform with seamless shopping experience. Features include real-time inventory, secure payments, and intuitive product browsing.',
  'web',
  ARRAY['React', 'Node.js', 'E-Commerce'],
  ARRAY[
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop'
  ],
  'https://example.com/ecommerce',
  'https://github.com/example/ecommerce',
  true,
  3
),

(
  'Corporate Website',
  'Premium corporate website with modern design and optimal performance. Built with Next.js and TypeScript for scalability and SEO optimization.',
  'web',
  ARRAY['Next.js', 'TypeScript', 'Web'],
  ARRAY[
    'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop'
  ],
  'https://example.com/corporate',
  'https://github.com/example/corporate',
  false,
  4
),

-- Mobile Projects
(
  'Mobile Game App',
  'Cross-platform mobile game with smooth performance and intuitive controls. Optimized for both iOS and Android with native feel and responsive design.',
  'mobile',
  ARRAY['React Native', 'Unity', 'Mobile'],
  ARRAY[
    'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=800&fit=crop',
    'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=400&h=800&fit=crop',
    'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=800&fit=crop'
  ],
  'https://example.com/mobile-game',
  'https://github.com/example/mobile-game',
  true,
  5
),

(
  'Mobile Social App',
  'Social networking app with real-time features and beautiful UI. Connect with friends, share moments, and discover new communities.',
  'mobile',
  ARRAY['React Native', 'Firebase', 'Mobile'],
  ARRAY[
    'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=800&fit=crop',
    'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=800&fit=crop',
    'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=400&h=800&fit=crop',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=800&fit=crop'
  ],
  'https://example.com/social-app',
  'https://github.com/example/social-app',
  false,
  6
);

