# PHYA - Coming Soon Landing Page

A modern, responsive landing page built with Vite, Tailwind CSS, and Vanilla JavaScript featuring a waitlist sign-up form.

## Project Structure

```
phya.co.za/
├── public/             # Static assets (images, PDFs)
├── src/
│   ├── main.js        # Main JavaScript file with all functionality
│   └── style.css      # Tailwind CSS + custom component styles
├── index.html         # Main HTML file
├── package.json
├── tailwind.config.js # Tailwind configuration
├── postcss.config.js  # PostCSS configuration
└── vite.config.js
```

## Features

- **Modern Build Tool**: Powered by Vite for fast development and optimized production builds
- **Tailwind CSS**: Utility-first CSS framework with custom theme
- **Vanilla JavaScript**: No jQuery dependency - pure modern JavaScript
- **Responsive Design**: Mobile-first design with Tailwind utilities
- **Smooth Scrolling**: Anchor link navigation with smooth scroll behavior
- **Form Validation**: Client-side validation for waitlist sign-up
- **Local Storage**: Waitlist entries stored in browser localStorage
- **Animations**: CSS animations and scroll-triggered effects
- **Easter Egg**: Konami code secret (↑↑↓↓←→←→BA)

## Technology Stack

- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Vanilla JavaScript**: Modern ES6+ JavaScript
- **PostCSS**: CSS processing with autoprefixer
- **HTML5**: Semantic markup

## Development

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

The site will be available at `http://localhost:5173` (or next available port)

3. Build for production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## Key Code Sections

### Smooth Scrolling (main.js:15-36)
Handles navigation link clicks with smooth scroll animation.

### Form Validation (main.js:73-143)
Validates and processes waitlist sign-up form with email validation.

### Scroll Effects (main.js:38-71)
Header styling changes and feature card animations on scroll.

### Easter Egg (main.js:188-216)
Konami code implementation for fun user interaction.

## Styling

The project uses Tailwind CSS with:
- Custom theme colors (gold and black)
- Tailwind utility classes for responsive design
- Custom component styles in `@layer components`
- CSS custom properties for consistent theming
- Smooth animations and transitions

## Color Scheme

Custom colors configured in `tailwind.config.js`:
```javascript
colors: {
  gold: {
    DEFAULT: '#D4AF37',
    light: '#FFD700',
  },
  dark: {
    DEFAULT: '#1a1a1a',
    light: '#2a2a2a',
  }
}
```

CSS variables:
```css
--color-primary: #D4AF37 (Gold)
--color-secondary: #1a1a1a (Black)
--color-accent: #FFD700 (Bright Gold)
```

## Deployment

Build the project:
```bash
npm run build
```

The `dist/` folder will contain optimized production files ready to deploy to:
- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

All rights reserved © 2025 PHYA
