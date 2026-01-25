# Engram Design System

A comprehensive, modular, and token-based design system for the Engram application.

---

## 📖 What is This?

The Engram Design System centralizes all styling from across the codebase into a single, maintainable source of truth. It provides:

- **Design Tokens**: Variables for colors, spacing, typography, shadows
- **Component Styles**: Pre-built styles for buttons, cards, forms, images
- **Utility Classes**: Helpers for spacing, layout, display, positioning
- **Animations**: Loading states, transitions, and effects
- **Documentation**: Complete guides for usage and migration

---

## 🚀 Getting Started

### Import the Entire System

```vue
<style lang="sass" scoped>
@import '@/assets/css/design-system/index'
</style>
```

### Import Only What You Need

```vue
<style lang="sass" scoped>
@import '@/assets/css/design-system/tokens'
@import '@/assets/css/design-system/buttons'
</style>
```

---

## 📂 Files Overview

| File | Purpose | Import When... |
|------|---------|----------------|
| `index.sass` | Imports all modules | You want the complete system |
| `_tokens.sass` | Design variables (colors, spacing, etc.) | Building custom components |
| `_typography.sass` | Text styles, headings, font weights | Working with text |
| `_buttons.sass` | All button variants | Using or customizing buttons |
| `_forms.sass` | Inputs, textareas, form layouts | Building forms |
| `_components.sass` | Cards, images, videos, modals | Using complex components |
| `_animations.sass` | Loading states, transitions | Adding animations |
| `_utilities.sass` | Spacing, layout, display helpers | Need quick styling |

---

## 📚 Documentation

### 📘 [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)
**Complete documentation with:**
- All design tokens (colors, spacing, typography)
- Component usage examples
- Code samples for every class
- Best practices and conventions
- Migration guide

**When to read:** Before starting any styling work.

### 📋 [MIGRATION_CHECKLIST.md](./MIGRATION_CHECKLIST.md)
**Step-by-step migration guide with:**
- Component tracking checklist
- Common pattern replacements
- Breaking changes list
- Troubleshooting tips

**When to read:** When migrating existing components to the design system.

### 🔍 [QUICK_REFERENCE.md](./QUICK_REFERENCE.md)
**Cheat sheet with:**
- Most commonly used classes
- Token quick lookup
- Common replacement patterns
- Top 10 classes

**When to read:** Keep this open while coding for quick lookups.

---

## 🎨 Quick Examples

### Buttons
```html
<button class="btn btn-primary">Primary Action</button>
<button class="btn btn-secondary">Secondary Action</button>
```

### Cards
```html
<div class="card p-6 shadow-base">
  <h3 class="h3 mb-4">Card Title</h3>
  <p class="text-base">Card content</p>
</div>
```

### Layout
```html
<div class="d-flex justify-content-between align-items-center gap-4">
  <div>Left content</div>
  <div>Right content</div>
</div>
```

### Forms
```html
<input type="text" class="form-input mb-4" placeholder="Enter text">
<textarea class="essay-text-area"></textarea>
```

---

## 🎯 Key Benefits

✅ **Consistency**: Single source of truth for all styles  
✅ **Maintainability**: Update once, apply everywhere  
✅ **Performance**: Reduced CSS duplication  
✅ **Developer Experience**: Clear naming, easy to use  
✅ **Scalability**: Easy to extend and customize  
✅ **Accessibility**: Built-in focus states and reduced motion support  

---

## 🔄 Migration Status

**Current Status:** Design system created, ready for component migration

**Progress:**
- ✅ Design tokens defined
- ✅ Typography system complete
- ✅ Button system complete
- ✅ Form components complete
- ✅ Component styles complete
- ✅ Animation library complete
- ✅ Utility classes complete
- ✅ Documentation complete
- ⏳ Component migration in progress

---

## 📊 Design System Structure

```
Design Tokens (Variables)
    ↓
Typography (Text Styles)
    ↓
Buttons (Interactive Elements)
    ↓
Forms (Input Elements)
    ↓
Components (Complex UI)
    ↓
Animations (Motion)
    ↓
Utilities (Helpers)
```

Import order matters! Tokens must be imported first since other files depend on them.

---

## 💡 Best Practices

### ✅ DO
- Use design tokens for all colors and spacing
- Prefer utility classes for simple styling
- Use component classes for complex UI elements
- Import only needed modules to reduce bundle size
- Extend the design system when needed

### ❌ DON'T
- Don't use inline styles unless absolutely necessary
- Don't hardcode colors or spacing values
- Don't duplicate existing styles
- Don't override design tokens
- Don't use `!important` to fix specificity issues

---

## 🛠️ Extending the System

### Adding New Tokens

Edit `_tokens.sass`:

```sass
// Add new color
$purple-800: #3b0f7f

// Add new spacing
$spacing-24: 6rem
```

### Adding New Component Styles

Edit `_components.sass`:

```sass
.my-new-component
  background: $white
  padding: $spacing-6
  border-radius: $radius-md
  box-shadow: $shadow-base
```

### Adding New Utilities

Edit `_utilities.sass`:

```sass
.my-custom-utility
  display: grid
  grid-template-columns: repeat(3, 1fr)
  gap: $spacing-4
```

---

## 🆘 Need Help?

1. **Check the docs first**: [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)
2. **Use the quick reference**: [QUICK_REFERENCE.md](./QUICK_REFERENCE.md)
3. **Review migration guide**: [MIGRATION_CHECKLIST.md](./MIGRATION_CHECKLIST.md)
4. **Search existing components** for similar patterns
5. **Extend the system** if what you need doesn't exist

---

## 🔮 Roadmap

### Phase 1: Foundation ✅
- [x] Create design tokens
- [x] Build typography system
- [x] Build button system
- [x] Build form components
- [x] Build component library
- [x] Build animation library
- [x] Build utility classes
- [x] Write documentation

### Phase 2: Migration 🚧
- [ ] Migrate NavBar component
- [ ] Migrate Topic views
- [ ] Migrate Quiz feature
- [ ] Migrate Writing feature
- [ ] Migrate remaining components
- [ ] Remove legacy SASS files

### Phase 3: Enhancement 📅
- [ ] Add dark mode support
- [ ] Add theme variants
- [ ] Optimize bundle size
- [ ] Add more animations
- [ ] Improve accessibility
- [ ] Add Storybook documentation

---

## 📈 Impact Metrics

**Expected Improvements:**
- 📉 **30-50% reduction** in CSS code
- 🎨 **100% design token** usage
- ⚡ **Faster development** with utility classes
- 🔧 **Easier maintenance** with centralized styles
- 📦 **Smaller bundle size** from reduced duplication

---

## 📝 Version History

- **v1.0.0** (2024) - Initial design system creation
  - Complete token system
  - Full component library
  - Comprehensive documentation
  - Ready for component migration

---

## 👥 Contributors

Design system created through comprehensive analysis of:
- 8 SASS files
- 50+ Vue components
- 200+ style rules
- 30+ font sizes
- 50+ color values
- 23 spacing tokens

---

**Questions?** Check the [full documentation](./DESIGN_SYSTEM.md) or review [migration guide](./MIGRATION_CHECKLIST.md).
