# Design System Migration Checklist

## 📋 Component Migration Tracker

Use this checklist to track which components have been migrated to the new design system.

### ✅ Views
- [ ] `About.vue`
- [ ] `Home.vue`
- [ ] `PrivacyPolicy.vue`
- [ ] `Topic.vue`
- [ ] `Topics.vue`
- [ ] `Units.vue`

### ✅ Quiz Feature
- [ ] `QuizFeature.vue`
- [ ] `QuizUnit1.vue`
- [ ] `AssessmentQuestion.vue`
- [ ] `QuizResultModal.vue`

### ✅ Writing Feature
- [ ] `ChoosePrompt.vue`
- [ ] `EssayWriting.vue`
- [ ] `Feedback.vue`
- [ ] `LabelSection.vue`
- [ ] `LEQEssay.vue`
- [ ] `SelectDifficulty.vue`
- [ ] `SelectModule.vue`
- [ ] `SelectModuleV1.vue`
- [ ] `BreadCrumb.vue`
- [ ] `Modules.vue`
- [ ] `ModulesV2.vue`
- [ ] `Prompt.vue`
- [ ] `PurpleButton.vue`
- [ ] `SectionFeedback.vue`
- [ ] `Steps.vue`
- [ ] `Toolbar.vue`
- [ ] `V2WhiteContainer.vue`
- [ ] `WhiteContainer.vue`

### ✅ LEQ Essay Components
- [ ] `BreakDown.vue`
- [ ] `EssayArea.vue`
- [ ] `EssayHead.vue`
- [ ] `FinishModal.vue`
- [ ] `GradeScore.vue`
- [ ] `Outline.vue`
- [ ] `Progress.vue`
- [ ] `PromptType.vue`
- [ ] `Section.vue`
- [ ] `TextArea.vue`
- [ ] `TimedEssayArea.vue`
- [ ] `Timer.vue`

### ✅ General Components
- [ ] `ArticleComponent.vue`
- [ ] `ComingSoon.vue`
- [ ] `Developments.vue`
- [ ] `Event.vue`
- [ ] `EventCardComponent.vue`
- [ ] `EventMapComponent.vue`
- [ ] `FeaturesDisplay.vue`
- [ ] `Intro.vue`
- [ ] `NavBar.vue`
- [ ] `People.vue`
- [ ] `PeopleProfile.vue`
- [ ] `Person.vue`
- [x] `PrimarySources.vue` *(v-html update)*
- [ ] `ResourceComponent.vue`
- [x] `Terms.vue` *(v-html update)*
- [ ] `Trends.vue`

---

## 🔄 Migration Steps for Each Component

### Step 1: Import Design System
```vue
<style lang="sass" scoped>
@import '@/assets/css/design-system/index'
</style>
```

### Step 2: Identify Styles to Migrate
- [ ] Inline styles in template
- [ ] Custom classes in `<style>` block
- [ ] Hardcoded colors
- [ ] Hardcoded spacing values
- [ ] Custom button styles
- [ ] Custom typography

### Step 3: Replace with Design System
- [ ] Replace inline styles with utility classes
- [ ] Replace custom button classes with `.btn-*`
- [ ] Replace custom text styles with typography classes
- [ ] Replace hardcoded colors with design tokens
- [ ] Replace hardcoded spacing with spacing tokens
- [ ] Replace custom animations with animation classes

### Step 4: Test
- [ ] Visual appearance matches original
- [ ] Hover states work correctly
- [ ] Responsive behavior maintained
- [ ] No console errors
- [ ] Accessibility maintained

### Step 5: Cleanup
- [ ] Remove unused custom styles
- [ ] Remove redundant classes
- [ ] Update component documentation
- [ ] Commit changes

---

## 🎯 Priority Components (High Impact)

Migrate these components first for maximum impact:

1. **NavBar.vue** - Used across entire app
2. **Topic.vue** - Main content page
3. **Topics.vue** - Landing page for topics
4. **ArticleComponent.vue** - Reusable resource component
5. **ResourceComponent.vue** - Reusable video/article display
6. All button components (PurpleButton.vue, etc.)

---

## 🔍 Common Patterns & Replacements

### Buttons

**Old:**
```html
<button class="back_button">Back</button>
<button class="category_button">Category</button>
<button class="purple_button">Submit</button>
```

**New:**
```html
<button class="btn btn-primary">Back</button>
<button class="btn btn-secondary">Category</button>
<button class="btn btn-primary">Submit</button>
```

### Typography

**Old:**
```html
<div style="font-size: 24px; font-weight: 700;">Title</div>
<p style="font-size: 16px; color: #333;">Description</p>
```

**New:**
```html
<div class="h3">Title</div>
<p class="text-base">Description</p>
```

### Spacing

**Old:**
```html
<div style="margin: 16px 0; padding: 24px;">Content</div>
```

**New:**
```html
<div class="my-4 p-6">Content</div>
```

### Cards

**Old:**
```html
<div class="custom-card" style="background: white; border-radius: 12px; padding: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
  <!-- content -->
</div>
```

**New:**
```html
<div class="card p-5">
  <!-- content -->
</div>
```

### Flex Layout

**Old:**
```html
<div style="display: flex; justify-content: space-between; align-items: center; gap: 16px;">
  <!-- content -->
</div>
```

**New:**
```html
<div class="d-flex justify-content-between align-items-center gap-4">
  <!-- content -->
</div>
```

---

## 📊 Migration Metrics

Track your progress:

- **Total Components:** 50+
- **Components Migrated:** 0
- **Components In Progress:** 0
- **Completion Percentage:** 0%

### Time Estimates
- Simple component (button, text): 5-10 minutes
- Medium component (card, form): 15-30 minutes
- Complex component (page, feature): 30-60 minutes

### Expected Benefits
- **Code Reduction:** 30-50% less custom CSS
- **Consistency:** 100% design token usage
- **Maintainability:** Single source of truth
- **Performance:** Smaller bundle size
- **Developer Experience:** Faster development

---

## 🚨 Breaking Changes

### Colors
- `#8b5cf6` → `$purple-400`
- `#7c3aed` → `$purple-500`
- `#5B21B6` → `$purple-600`
- `#ffffff` → `$white`
- `#000000` → `$black`

### Spacing
- `10px` → `$spacing-2` or `.p-2`
- `16px` → `$spacing-4` or `.p-4`
- `20px` → `$spacing-5` or `.p-5`
- `24px` → `$spacing-6` or `.p-6`
- `32px` → `$spacing-8` or `.p-8`

### Border Radius
- `8px` → `$radius-base` or `.rounded`
- `12px` → `$radius-lg` or `.rounded-lg`
- `16px` → `$radius-xl` or `.rounded-xl`
- `25%` → `.rounded-circle` (for topic cards)

### Font Sizes
- `12px` → `$font-size-xs` or `.text-xs`
- `14px` → `$font-size-sm` or `.text-sm`
- `16px` → `$font-size-base` or `.text-base`
- `18px` → `$font-size-lg` or `.text-lg`
- `24px` → `$font-size-2xl` or `.text-2xl`

---

## 💡 Tips & Tricks

### Tip 1: Use Browser DevTools
Open DevTools → Inspect element → See what design system classes apply

### Tip 2: Search Before Creating
Before writing custom CSS, search the design system for existing classes:
- `_utilities.sass` - For spacing, layout, display
- `_buttons.sass` - For button styles
- `_typography.sass` - For text styles
- `_components.sass` - For cards, images, etc.

### Tip 3: Extend, Don't Override
If you need custom styles, extend the design system:

```sass
.my-custom-component
  @extend .card
  // Add your custom styles
  border-left: 4px solid $purple-600
```

### Tip 4: Component-Specific Tokens
For component-specific values, create local variables:

```sass
// Component-specific variable
$card-special-height: 350px

.my-special-card
  height: $card-special-height
  // Use design tokens for everything else
  padding: $spacing-6
  background: $white
```

### Tip 5: Test Responsive Behavior
Always test on multiple screen sizes after migration:
- Mobile (375px)
- Tablet (768px)
- Desktop (1440px)

---

## 🐛 Common Issues & Solutions

### Issue: Styles Not Applying
**Solution:** Make sure you imported the design system:
```sass
@import '@/assets/css/design-system/index'
```

### Issue: Wrong Specificity
**Solution:** Use `scoped` in `<style>` or increase specificity:
```vue
<style lang="sass" scoped>
// Styles are scoped to this component
</style>
```

### Issue: Conflicting Styles
**Solution:** Check for existing custom styles that override design system:
```sass
// Remove this if it conflicts
.my-button
  background: red !important  // ❌ Don't use !important
```

### Issue: Animation Not Working
**Solution:** Check if `prefers-reduced-motion` is enabled, or add animation class:
```html
<div class="fade-in animation-normal">Content</div>
```

---

## 📝 Notes

- Keep existing SASS files for reference during migration
- Don't delete old styles until migration is complete and tested
- Document any design system extensions in this file
- Update this checklist as you progress

---

**Migration Started:** [Date]
**Migration Completed:** [Date]
**Lead Developer:** [Name]
