# Engram Design System Documentation

## Overview

The Engram Design System is a comprehensive, modular styling framework that centralizes all design elements from the codebase into a maintainable, token-based architecture. This system ensures consistency across components and makes it easy for developers to implement UI elements.

---

## 📁 Folder Structure

```
src/assets/css/design-system/
├── index.sass              # Main entry point - imports all modules
├── _tokens.sass            # Design tokens (colors, spacing, shadows, etc.)
├── _typography.sass        # Text styles, headings, body text
├── _buttons.sass           # Button variants and states
├── _forms.sass             # Input fields, textareas, form layouts
├── _components.sass        # Cards, modals, images, overlays
├── _animations.sass        # Loading states, transitions, keyframes
└── _utilities.sass         # Spacing, layout, helper classes
```

---

## 🚀 Quick Start

### Import the Complete Design System

In your Vue component:

```vue
<style lang="sass" scoped>
@import '@/assets/css/design-system/index'
</style>
```

### Import Individual Modules

For better performance, import only what you need:

```vue
<style lang="sass" scoped>
@import '@/assets/css/design-system/tokens'
@import '@/assets/css/design-system/buttons'
@import '@/assets/css/design-system/typography'
</style>
```

---

## 🎨 Design Tokens

### Colors

```sass
// Purple Spectrum (Primary Brand Colors)
$purple-300: #d4b5ff
$purple-400: #8b5cf6
$purple-500: #7c3aed
$purple-600: #5B21B6
$purple-700: #451a75

// Grayscale
$white: #ffffff
$gray-50: #f9fafb
$gray-100: #f3f4f6
$gray-200: #e5e7eb
$gray-400: #9ca3af
$gray-500: #6b7280
$gray-700: #374151
$gray-900: #111827
$black: #000000

// Semantic Colors
$success-500: #22c55e
$error-500: #ef4444
$warning-500: #fbbf24
```

**Usage Example:**
```sass
.my-component
  background: $purple-400
  color: $white
  border: 1px solid $gray-200
```

### Spacing Scale

Uses 4px base unit (0.25rem):

```sass
$spacing-0: 0rem      // 0px
$spacing-1: 0.25rem   // 4px
$spacing-2: 0.5rem    // 8px
$spacing-3: 0.75rem   // 12px
$spacing-4: 1rem      // 16px
$spacing-5: 1.25rem   // 20px
$spacing-6: 1.5rem    // 24px
$spacing-8: 2rem      // 32px
$spacing-10: 2.5rem   // 40px
$spacing-12: 3rem     // 48px
// ... up to $spacing-23
```

**Usage Example:**
```sass
.card
  padding: $spacing-6  // 24px
  margin-bottom: $spacing-4  // 16px
  gap: $spacing-3  // 12px
```

### Typography Scale

```sass
$font-size-xs: 0.75rem    // 12px
$font-size-sm: 0.875rem   // 14px
$font-size-base: 1rem     // 16px
$font-size-lg: 1.125rem   // 18px
$font-size-xl: 1.25rem    // 20px
$font-size-2xl: 1.5rem    // 24px
$font-size-3xl: 1.875rem  // 30px
$font-size-4xl: 2.25rem   // 36px
```

### Shadows

```sass
$shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05)
$shadow-base: 0 1px 3px rgba(0, 0, 0, 0.1)
$shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07)
$shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1)
$shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1)
$shadow-2xl: 0 25px 50px rgba(0, 0, 0, 0.25)
```

---

## 🔤 Typography

### Headings

```html
<h1 class="h1">Main Heading</h1>
<h2 class="h2">Section Heading</h2>
<h3 class="h3">Subsection Heading</h3>
```

### Body Text

```html
<p class="text-lg">Large body text</p>
<p class="text-base">Default body text</p>
<p class="text-sm">Small body text</p>
```

### Specialized Text Styles

```html
<div class="person-header">John Doe</div>
<div class="article-title">Article Title</div>
<div class="card-title">Card Title</div>
<div class="trend-label">TREND</div>
```

### Font Weights

```html
<span class="font-light">Light Text (300)</span>
<span class="font-normal">Normal Text (400)</span>
<span class="font-medium">Medium Text (500)</span>
<span class="font-semibold">Semibold Text (600)</span>
<span class="font-bold">Bold Text (700)</span>
<span class="font-extrabold">Extrabold Text (800)</span>
<span class="font-black">Black Text (900)</span>
```

---

## 🔘 Buttons

### Primary Button (Purple Gradient)

```html
<button class="btn btn-primary">Click Me</button>
```

Renders with purple gradient, white text, hover lift effect.

### Secondary Button (Light Purple)

```html
<button class="btn btn-secondary">Secondary Action</button>
```

Light purple background, purple text.

### Tertiary Button (Solid Purple)

```html
<button class="btn btn-tertiary">Tertiary Action</button>
```

Solid purple background, white text.

### Button Sizes

```html
<button class="btn btn-primary btn-sm">Small</button>
<button class="btn btn-primary btn-md">Medium (default)</button>
<button class="btn btn-primary btn-lg">Large</button>
```

### Legacy Button Classes (Mapped to New System)

```html
<!-- These still work but map to the new system -->
<button class="back_button">Back</button>
<button class="top-pill">Top</button>
<button class="category_button">Category</button>
<button class="purple_button">Purple</button>
```

### Button States

```html
<button class="btn btn-primary" disabled>Disabled</button>
<button class="btn btn-primary btn-loading">Loading...</button>
```

---

## 📝 Forms

### Text Input

```html
<input type="text" class="form-input" placeholder="Enter text">
```

### Textarea

```html
<textarea class="essay-text-area" placeholder="Write your essay..."></textarea>
```

### Quiz Options

```html
<div class="quiz-options-container">
  <label class="quiz-option">
    <input type="radio" name="answer" class="quiz-radio">
    <span>Option A</span>
  </label>
  <label class="quiz-option selected">
    <input type="radio" name="answer" class="quiz-radio" checked>
    <span>Option B (Selected)</span>
  </label>
</div>
```

### Difficulty Selector

```html
<div class="difficulty-selector">
  <div class="difficulty-option">Easy</div>
  <div class="difficulty-option selected">Medium</div>
  <div class="difficulty-option">Hard</div>
</div>
```

### Module Selector

```html
<div class="module-selector">
  <div class="module-card">Module 1</div>
  <div class="module-card disabled">Module 2 (Locked)</div>
  <div class="module-card">Module 3</div>
</div>
```

### Form Validation

```html
<input type="email" class="form-input error" placeholder="Email">
<span class="error-message">Invalid email address</span>

<input type="text" class="form-input success" placeholder="Username">
<span class="success-message">Username available!</span>
```

---

## 🎴 Components

### Cards

```html
<!-- Topic Card -->
<div class="topic-card">
  <img src="topic.jpg" class="card-image" alt="Topic">
  <div class="overlay overlay-2">
    <h3 class="card-title">Topic Title</h3>
  </div>
</div>

<!-- Article Card -->
<div class="article">
  <img src="article.jpg" class="article-image" alt="Article">
  <div class="article-content">
    <h4 class="article-title">Article Title</h4>
    <p class="text-sm">Article description...</p>
  </div>
</div>

<!-- Quiz Card -->
<div class="quiz-card">
  <img src="quiz.jpg" alt="Quiz">
  <div class="quiz-overlay">
    <h3>Quiz Title</h3>
    <p>Take the quiz</p>
  </div>
</div>
```

### Images

```html
<!-- Profile Image -->
<img src="profile.jpg" class="profile-image" alt="Profile">

<!-- Event/Topic Image -->
<img src="event.jpg" class="event-image" alt="Event">

<!-- Article Image -->
<img src="article.jpg" class="article-image" alt="Article">

<!-- Source/Term Image (with hover) -->
<img src="source.jpg" class="source-image" alt="Source">
```

### Videos

```html
<div class="video-box">
  <div class="ratio">
    <iframe src="https://youtube.com/embed/..." class="yt-embedded"></iframe>
  </div>
</div>
```

### Modals

```html
<div class="modal">
  <div class="modal-content">
    <h3>Modal Title</h3>
    <img src="image.jpg" class="modal-image" alt="Modal Image">
  </div>
</div>
```

---

## ✨ Animations

### Loading States

```html
<!-- Skeleton Loading -->
<div class="skeleton skeleton-title"></div>
<div class="skeleton skeleton-text"></div>
<div class="skeleton skeleton-text"></div>

<!-- Loading Spinner -->
<div class="loading-spinner"></div>

<!-- Video Loading -->
<div class="video-box video-loading"></div>
```

### Fade Animations

```html
<div class="fade-in">Fades in on load</div>
<div class="fade-in-up">Slides up while fading in</div>
<div class="fade-in-down">Slides down while fading in</div>
```

### Scale Animations

```html
<div class="scale-in">Scales in on load</div>
<div class="scale-up">Scales up on hover</div>
<button class="pulse">Pulsing button</button>
```

### Slide Animations

```html
<div class="slide-in-left">Slides from left</div>
<div class="slide-in-right">Slides from right</div>
<div class="slide-up">Slides up</div>
```

### Animation Utilities

```html
<!-- Control animation speed -->
<div class="fade-in animation-fast">Fast animation</div>
<div class="fade-in animation-slow">Slow animation</div>

<!-- Add delays -->
<div class="fade-in animation-delay-1">Delayed 0.1s</div>
<div class="fade-in animation-delay-3">Delayed 0.3s</div>

<!-- Infinite animations -->
<div class="pulse animation-infinite">Pulses forever</div>
```

---

## 🛠️ Utilities

### Spacing

```html
<!-- Margin -->
<div class="m-0">No margin</div>
<div class="m-4">Margin 16px all sides</div>
<div class="mt-8">Margin top 32px</div>
<div class="mb-6">Margin bottom 24px</div>
<div class="mx-auto">Horizontal center</div>

<!-- Padding -->
<div class="p-4">Padding 16px all sides</div>
<div class="pt-6">Padding top 24px</div>
<div class="pb-8">Padding bottom 32px</div>
<div class="px-10">Padding left/right 40px</div>
```

### Flexbox Layout

```html
<!-- Flex Container -->
<div class="d-flex">Flex container</div>
<div class="d-flex flex-column">Vertical layout</div>
<div class="d-flex flex-row">Horizontal layout</div>

<!-- Justify Content -->
<div class="d-flex justify-content-start">Align start</div>
<div class="d-flex justify-content-center">Align center</div>
<div class="d-flex justify-content-end">Align end</div>
<div class="d-flex justify-content-between">Space between</div>

<!-- Align Items -->
<div class="d-flex align-items-start">Align top</div>
<div class="d-flex align-items-center">Align middle</div>
<div class="d-flex align-items-end">Align bottom</div>

<!-- Gap -->
<div class="d-flex gap-4">16px gap between items</div>
```

### Text Alignment

```html
<div class="text-left">Left aligned text</div>
<div class="text-center">Centered text</div>
<div class="text-right">Right aligned text</div>
```

### Display

```html
<div class="d-block">Block</div>
<div class="d-inline">Inline</div>
<div class="d-none">Hidden</div>
```

### Position

```html
<div class="position-relative">Relative</div>
<div class="position-absolute">Absolute</div>
<div class="position-sticky">Sticky</div>
<div class="position-fixed">Fixed</div>
```

### Borders

```html
<div class="border">All borders</div>
<div class="border-top">Top border only</div>
<div class="border-0">No borders</div>

<div class="rounded">Rounded corners (8px)</div>
<div class="rounded-lg">Large rounded (12px)</div>
<div class="rounded-circle">Circle</div>
<div class="rounded-pill">Pill shape</div>
```

### Shadows

```html
<div class="shadow-sm">Small shadow</div>
<div class="shadow-base">Default shadow</div>
<div class="shadow-lg">Large shadow</div>
<div class="shadow-none">No shadow</div>
```

### Background Colors

```html
<div class="bg-white">White background</div>
<div class="bg-purple">Purple background</div>
<div class="bg-gray">Gray background</div>
<div class="bg-transparent">Transparent</div>
```

### Opacity

```html
<div class="opacity-0">Invisible</div>
<div class="opacity-50">50% opacity</div>
<div class="opacity-100">Fully visible</div>
```

### Cursor

```html
<div class="cursor-pointer">Pointer cursor</div>
<div class="cursor-not-allowed">Not allowed cursor</div>
```

---

## 🔄 Migration Guide

### Step 1: Import Design System

In your component's `<style>` block:

```vue
<style lang="sass" scoped>
@import '@/assets/css/design-system/index'

// Your custom styles here
</style>
```

### Step 2: Replace Inline Styles

**Before:**
```html
<button style="background: purple; color: white; padding: 10px 20px;">
  Click Me
</button>
```

**After:**
```html
<button class="btn btn-primary">
  Click Me
</button>
```

### Step 3: Replace Custom Classes with Design System

**Before:**
```sass
.my-custom-button
  background: linear-gradient(180deg, #8b5cf6, #7c3aed)
  color: white
  padding: 10px 20px
  border-radius: 8px
  
  &:hover
    transform: translateY(-2px)
```

**After:**
```html
<button class="btn btn-primary">Click Me</button>
```

### Step 4: Use Design Tokens for Custom Styles

**Before:**
```sass
.my-card
  background: #ffffff
  padding: 24px
  border-radius: 12px
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1)
```

**After:**
```sass
.my-card
  background: $white
  padding: $spacing-6
  border-radius: $radius-lg
  box-shadow: $shadow-base
```

---

## 📋 Best Practices

### ✅ DO

- **Use design tokens** for colors, spacing, and typography
- **Prefer utility classes** for simple layouts and spacing
- **Use component classes** for complex UI elements
- **Import only needed modules** to reduce bundle size
- **Follow naming conventions** (BEM-inspired)

### ❌ DON'T

- **Don't use inline styles** unless absolutely necessary
- **Don't hardcode colors** - use tokens instead
- **Don't create custom buttons** - use existing variants
- **Don't duplicate styles** - check if a utility class exists first
- **Don't override design tokens** - extend them instead

---

## 🎯 Naming Conventions

### Component Classes
- Use descriptive, lowercase names with hyphens
- Example: `.topic-card`, `.quiz-option`, `.article-title`

### Utility Classes
- Follow Bootstrap-like conventions
- Example: `.d-flex`, `.mt-4`, `.text-center`

### State Classes
- Use descriptive state names
- Example: `.selected`, `.disabled`, `.active`, `.loading`

### Modifier Classes
- Use double hyphens for modifiers (BEM-style)
- Example: `.btn--large`, `.card--featured`

---

## 🔍 Finding the Right Class

### For Buttons
- **Primary action:** `.btn-primary`
- **Secondary action:** `.btn-secondary`
- **Navigation:** `.btn-tertiary`
- **Legacy styles:** `.back_button`, `.top-pill`, `.category_button`

### For Text
- **Headings:** `.h1` through `.h6`
- **Body text:** `.text-sm`, `.text-base`, `.text-lg`
- **Specialized:** `.person-header`, `.article-title`, `.card-title`

### For Layout
- **Flex container:** `.d-flex`
- **Center content:** `.d-flex justify-content-center align-items-center`
- **Spacing:** `.m-*`, `.p-*`, `.gap-*`

### For Cards
- **Topic:** `.topic-card`
- **Article:** `.article`
- **Quiz:** `.quiz-card`
- **Generic:** `.card`

---

## 📞 Support

For questions or issues with the design system:

1. Check this documentation first
2. Review existing components for examples
3. Search for similar use cases in the codebase
4. Extend the design system if needed (add new tokens/utilities)

---

## 🔮 Future Enhancements

- Dark mode support
- Additional color themes
- More animation presets
- Component variants
- Accessibility improvements
- Performance optimizations

---

**Last Updated:** 2024
**Version:** 1.0.0
