# Design System Quick Reference

## 🎨 Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `$purple-400` | `#8b5cf6` | Primary brand, buttons, links |
| `$purple-500` | `#7c3aed` | Button gradients, accents |
| `$purple-600` | `#5B21B6` | Darker accents, borders |
| `$white` | `#ffffff` | Backgrounds, text on dark |
| `$black` | `#000000` | Text, navbar, footer |
| `$gray-100` | `#f3f4f6` | Light backgrounds |
| `$gray-200` | `#e5e7eb` | Borders, dividers |
| `$gray-400` | `#9ca3af` | Secondary text |

## 📏 Spacing

| Class | Value | Pixels |
|-------|-------|--------|
| `m-0` / `p-0` | `0rem` | 0px |
| `m-2` / `p-2` | `0.5rem` | 8px |
| `m-4` / `p-4` | `1rem` | 16px |
| `m-6` / `p-6` | `1.5rem` | 24px |
| `m-8` / `p-8` | `2rem` | 32px |
| `m-10` / `p-10` | `2.5rem` | 40px |

**Directional:** `mt-*` (top), `mb-*` (bottom), `ml-*` (left), `mr-*` (right), `mx-*` (horizontal), `my-*` (vertical)

## 🔤 Typography

| Class | Size | Usage |
|-------|------|-------|
| `.text-xs` | 12px | Captions, labels |
| `.text-sm` | 14px | Secondary text |
| `.text-base` | 16px | Body text |
| `.text-lg` | 18px | Large body |
| `.text-xl` | 20px | Subheadings |
| `.text-2xl` | 24px | Headings |
| `.text-3xl` | 30px | Large headings |

**Weights:** `.font-normal`, `.font-medium`, `.font-semibold`, `.font-bold`, `.font-extrabold`

## 🔘 Buttons

```html
<!-- Primary (gradient) -->
<button class="btn btn-primary">Primary</button>

<!-- Secondary (light purple) -->
<button class="btn btn-secondary">Secondary</button>

<!-- Tertiary (solid purple) -->
<button class="btn btn-tertiary">Tertiary</button>

<!-- Sizes -->
<button class="btn btn-primary btn-sm">Small</button>
<button class="btn btn-primary btn-lg">Large</button>

<!-- Legacy (still work) -->
<button class="back_button">Back</button>
<button class="category_button">Category</button>
```

## 📦 Layout

```html
<!-- Flex Container -->
<div class="d-flex">Flex</div>
<div class="d-flex flex-column">Column</div>

<!-- Justify -->
<div class="d-flex justify-content-center">Center</div>
<div class="d-flex justify-content-between">Space Between</div>
<div class="d-flex justify-content-end">End</div>

<!-- Align -->
<div class="d-flex align-items-center">Center Vertically</div>
<div class="d-flex align-items-end">Bottom</div>

<!-- Gap -->
<div class="d-flex gap-4">16px gap</div>
```

## 🎴 Components

```html
<!-- Card -->
<div class="card p-6">Card content</div>

<!-- Topic Card -->
<div class="topic-card">
  <img src="image.jpg" class="card-image">
</div>

<!-- Article Card -->
<div class="article">
  <img src="image.jpg" class="article-image">
  <div class="article-content">
    <h4 class="article-title">Title</h4>
  </div>
</div>

<!-- Video Box -->
<div class="video-box">
  <div class="ratio">
    <iframe src="video-url"></iframe>
  </div>
</div>
```

## 📝 Forms

```html
<!-- Text Input -->
<input type="text" class="form-input" placeholder="Text">

<!-- Textarea -->
<textarea class="essay-text-area"></textarea>

<!-- Quiz Option -->
<label class="quiz-option">
  <input type="radio" class="quiz-radio">
  <span>Option A</span>
</label>

<!-- Validation -->
<input class="form-input error">
<span class="error-message">Error text</span>
```

## ✨ Animations

```html
<!-- Loading -->
<div class="skeleton skeleton-text"></div>
<div class="loading-spinner"></div>

<!-- Fade -->
<div class="fade-in">Fade in</div>
<div class="fade-in-up">Fade up</div>

<!-- Scale -->
<div class="scale-in">Scale in</div>
<div class="scale-up">Scale on hover</div>

<!-- Slide -->
<div class="slide-in-left">From left</div>
<div class="slide-up">From bottom</div>

<!-- Pulse -->
<div class="pulse">Pulsing</div>
```

## 🎨 Utilities

```html
<!-- Text Align -->
<div class="text-left">Left</div>
<div class="text-center">Center</div>
<div class="text-right">Right</div>

<!-- Display -->
<div class="d-block">Block</div>
<div class="d-none">Hidden</div>

<!-- Position -->
<div class="position-relative">Relative</div>
<div class="position-absolute">Absolute</div>

<!-- Borders -->
<div class="border">With border</div>
<div class="rounded">Rounded (8px)</div>
<div class="rounded-lg">Large rounded (12px)</div>
<div class="rounded-circle">Circle</div>

<!-- Shadows -->
<div class="shadow-base">Default shadow</div>
<div class="shadow-lg">Large shadow</div>

<!-- Background -->
<div class="bg-white">White bg</div>
<div class="bg-purple">Purple bg</div>

<!-- Opacity -->
<div class="opacity-50">50% opacity</div>

<!-- Cursor -->
<div class="cursor-pointer">Pointer</div>
```

## 🔄 Common Replacements

| Old | New |
|-----|-----|
| `style="background: #8b5cf6"` | `class="bg-purple"` or use `$purple-400` |
| `style="padding: 24px"` | `class="p-6"` |
| `style="margin: 16px 0"` | `class="my-4"` |
| `style="display: flex"` | `class="d-flex"` |
| `style="font-size: 16px"` | `class="text-base"` |
| `style="border-radius: 8px"` | `class="rounded"` |
| Custom button CSS | `class="btn btn-primary"` |

## 💡 Pro Tips

1. **Import once per component:**
   ```sass
   @import '@/assets/css/design-system/index'
   ```

2. **Use tokens in custom styles:**
   ```sass
   .my-class
     color: $purple-600
     padding: $spacing-4
   ```

3. **Combine utilities:**
   ```html
   <div class="d-flex justify-content-center align-items-center gap-4 p-6">
   ```

4. **Check documentation first:**
   - Full docs: `/src/assets/css/design-system/DESIGN_SYSTEM.md`
   - Migration guide: `/src/assets/css/design-system/MIGRATION_CHECKLIST.md`

5. **Test responsively:**
   - Design system includes responsive utilities
   - Some classes change behavior at breakpoints

## 📚 File Structure

```
design-system/
├── index.sass              # Import all
├── _tokens.sass            # Variables
├── _typography.sass        # Text styles
├── _buttons.sass           # Buttons
├── _forms.sass             # Inputs
├── _components.sass        # Cards, images
├── _animations.sass        # Effects
├── _utilities.sass         # Helpers
├── DESIGN_SYSTEM.md        # Full docs
├── MIGRATION_CHECKLIST.md  # Migration guide
└── QUICK_REFERENCE.md      # This file
```

## 🎯 Most Used Classes

**Top 10:**
1. `d-flex` - Flex container
2. `btn btn-primary` - Primary button
3. `text-center` - Center text
4. `p-4` / `p-6` - Padding
5. `mb-4` / `mt-4` - Vertical margin
6. `justify-content-center` - Center horizontally
7. `align-items-center` - Center vertically
8. `gap-4` - Flex gap
9. `rounded` - Border radius
10. `shadow-base` - Box shadow

---

**Print this page and keep it handy while migrating components!**
