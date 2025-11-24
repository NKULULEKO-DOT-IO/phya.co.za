# Quick Start Guide

## First Time Setup

```bash
# Install dependencies (only needed once)
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` in your browser (or next available port).

## Daily Development

```bash
# Start dev server
npm run dev

# Make your changes - they'll appear instantly with hot reload!
```

## Building for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

The production files will be in the `dist/` folder, ready to deploy.

## Project Files

- **index.html** - Main HTML file
- **src/main.js** - All JavaScript functionality
- **src/style.css** - Tailwind CSS + custom component styles
- **tailwind.config.js** - Tailwind configuration (custom colors)
- **public/** - Static assets (images, PDFs)

## Common Tasks

### Adding a New Image
1. Place image in `public/` folder
2. Reference in HTML: `<img src="/image.jpg">`

### Modifying Styles
Edit `src/style.css` - changes appear instantly
Use Tailwind utilities in HTML or add custom components in `@layer components`

### Modifying JavaScript
Edit `src/main.js` - changes appear instantly

### Using Tailwind Classes
The project has Tailwind CSS configured with custom gold/black theme:
- Use standard Tailwind classes: `bg-white`, `text-center`, `px-6`, etc.
- Custom colors: `bg-gold`, `text-gold-light`, `bg-dark`, etc.

### Testing the Form
The form currently saves to localStorage. Check browser console to see entries.

## Need Help?

- Vite Docs: https://vitejs.dev
- Tailwind Docs: https://tailwindcss.com
- See README.md for detailed documentation
- See MIGRATION-SUMMARY.md for migration details
