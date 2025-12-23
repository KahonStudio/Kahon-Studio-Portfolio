# Project Images

Add your project images here!

## How to Add Images

1. Place your project images in this `public/images/` folder
2. Name them descriptively, for example:
   - `project1-main.jpg`
   - `project1-screenshot1.jpg`
   - `project2-gallery1.png`
   - etc.

3. Update the `projects` array in `src/components/Projects.jsx` to include image paths:

```javascript
{
  id: 1,
  title: 'Your Project',
  category: 'games',
  description: 'Your description',
  tags: ['Tag1', 'Tag2'],
  icon: FaGamepad,
  images: [
    '/images/project1-main.jpg',
    '/images/project1-screenshot1.jpg',
    '/images/project1-screenshot2.jpg'
  ],
  link: 'https://your-project-url.com'
}
```

## Image Recommendations

- **Format**: JPG or PNG
- **Size**: Optimize images for web (aim for under 500KB per image)
- **Dimensions**: 
  - Main images: 1200x800px or similar aspect ratio
  - Thumbnails: Will be auto-generated, but 400x300px works well
- **Naming**: Use descriptive names like `project-name-feature.jpg`

## Tools for Image Optimization

- [TinyPNG](https://tinypng.com/) - Compress PNG/JPG images
- [Squoosh](https://squoosh.app/) - Advanced image compression
- [ImageOptim](https://imageoptim.com/) - Batch optimization

## Example Structure

```
public/
  images/
    project1-main.jpg
    project1-screenshot1.jpg
    project1-screenshot2.jpg
    project2-hero.png
    project2-features.png
    ...
```


