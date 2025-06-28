# CSS Architecture Documentation

## Overview

The Serava Care Frontend CSS has been modularized for better maintainability, organization, and performance. The large `globals.css` file has been split into smaller, focused files.

## File Structure

```
src/
├── app/
│   └── globals.css          # Main entry point that imports all modules
└── styles/                  # Modular CSS files
    ├── variables.css        # CSS custom properties and theme configuration
    ├── base.css            # Base styles and layer configuration
    ├── keyframes.css       # All @keyframes animation definitions
    ├── animations.css      # Animation utility classes
    ├── scroll-animations.css # Scroll-triggered animation classes
    ├── interactive.css     # Hover and interactive element styles
    ├── components.css      # Component-specific styles
    └── responsive.css      # Media queries and responsive fixes
```

## File Purposes

### `globals.css`

- Main stylesheet entry point
- Imports Tailwind CSS and tw-animate-css
- Imports all modular CSS files in the correct order

### `variables.css`

- CSS custom properties (CSS variables)
- Theme configuration for light and dark modes
- Color palette definitions
- Spacing and sizing variables

### `base.css`

- Tailwind base layer configuration
- Global element styles
- CSS reset and normalization

### `keyframes.css`

- All @keyframes animation definitions
- Organized by animation type (slide, fade, float, etc.)
- No utility classes, just the keyframe definitions

### `animations.css`

- Animation utility classes (`.animate-*`)
- Classes that apply animations to elements
- Includes basic animation configurations

### `scroll-animations.css`

- Scroll-triggered animations (`.animate-on-scroll`)
- Advanced animation effects (bounce, rotate, flip, etc.)
- Entrance and exit animations

### `interactive.css`

- Hover effects (`.hover-*`)
- Focus states
- Interactive element animations
- Button and link interactions

### `components.css`

- Component-specific styles
- Card effects
- Loading states
- Text effects
- Complex UI component styles

### `responsive.css`

- Media queries
- Responsive-specific styles
- Tablet and mobile optimizations
- Performance optimizations for reduced motion

## Benefits

1. **Better Organization**: Related styles are grouped together
2. **Easier Maintenance**: Changes can be made to specific areas without affecting others
3. **Improved Performance**: Only necessary styles are loaded when needed
4. **Better Collaboration**: Team members can work on different files simultaneously
5. **Cleaner Imports**: Clear dependency tree and loading order

## Usage

The modular approach is transparent to the application. All existing classes and styles work exactly the same way. The main `globals.css` file imports all modules in the correct order to ensure proper CSS cascade and specificity.

## Adding New Styles

When adding new styles:

1. Determine which file is most appropriate
2. Add styles to the relevant modular file
3. Follow the existing naming conventions
4. Test that imports are working correctly

## Import Order

The import order in `globals.css` is important:

1. External dependencies (Tailwind, etc.)
2. Variables and configuration
3. Base styles
4. Keyframes
5. Animations
6. Scroll animations
7. Interactive styles
8. Components
9. Responsive styles

This order ensures proper CSS cascade and prevents conflicts.
