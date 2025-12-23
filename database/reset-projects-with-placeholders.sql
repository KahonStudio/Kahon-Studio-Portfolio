-- Reset Projects Table with Sample Data (Using Placeholder.com)
-- This will delete all existing projects and insert new ones with gallery images
-- Run this in Supabase SQL Editor

-- Delete all existing projects
DELETE FROM projects;

-- Insert new projects with multiple images (using placeholder.com for reliable placeholder images)
INSERT INTO projects (title, description, category, tags, image_urls, project_url, github_url, featured, display_order) VALUES

-- Game Projects
(
  'Action RPG Game',
  'Immersive action RPG with stunning visuals and engaging gameplay mechanics. Built with Unity and C#, featuring dynamic combat systems, beautiful environments, and an engaging storyline.',
  'games',
  ARRAY['Unity', 'C#', 'Game Design'],
  ARRAY[
    'https://placehold.co/800x600/64ffda/0a192f?text=Gameplay+Screenshot+1',
    'https://placehold.co/800x600/8892b0/0a192f?text=Gameplay+Screenshot+2',
    'https://placehold.co/800x600/ccd6f6/0a192f?text=Gameplay+Screenshot+3',
    'https://placehold.co/800x600/64ffda/112240?text=Character+Design'
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
    'https://placehold.co/800x600/64ffda/0a192f?text=Indie+Game+Art+1',
    'https://placehold.co/800x600/8892b0/0a192f?text=Indie+Game+Art+2',
    'https://placehold.co/800x600/ccd6f6/0a192f?text=Level+Design'
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
    'https://placehold.co/800x600/64ffda/0a192f?text=Homepage+Design',
    'https://placehold.co/800x600/8892b0/0a192f?text=Product+Page',
    'https://placehold.co/800x600/ccd6f6/0a192f?text=Checkout+Flow',
    'https://placehold.co/800x600/64ffda/112240?text=Admin+Dashboard'
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
    'https://placehold.co/800x600/64ffda/0a192f?text=Landing+Page',
    'https://placehold.co/800x600/8892b0/0a192f?text=About+Section',
    'https://placehold.co/800x600/ccd6f6/0a192f?text=Services+Page'
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
    'https://placehold.co/400x800/64ffda/0a192f?text=Mobile+Game+Screen+1',
    'https://placehold.co/400x800/8892b0/0a192f?text=Mobile+Game+Screen+2',
    'https://placehold.co/400x800/ccd6f6/0a192f?text=Mobile+Game+Screen+3'
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
    'https://placehold.co/400x800/64ffda/0a192f?text=Feed+Screen',
    'https://placehold.co/400x800/8892b0/0a192f?text=Profile+Screen',
    'https://placehold.co/400x800/ccd6f6/0a192f?text=Chat+Screen',
    'https://placehold.co/400x800/64ffda/112240?text=Discover+Screen'
  ],
  'https://example.com/social-app',
  'https://github.com/example/social-app',
  false,
  6
);

