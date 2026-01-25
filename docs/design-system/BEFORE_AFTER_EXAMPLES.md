# Before & After Examples

Visual guide showing how to migrate from old styles to the new design system.

---

## 🔘 BUTTONS

### Example 1: Primary Action Button

**BEFORE:**
```vue
<template>
  <button class="my-button">Click Me</button>
</template>

<style lang="sass" scoped>
.my-button
  background: linear-gradient(180deg, #8b5cf6, #7c3aed)
  color: white
  padding: 10px 20px
  border: none
  border-radius: 8px
  font-family: 'Montserrat', sans-serif
  font-weight: 600
  cursor: pointer
  
  &:hover
    transform: translateY(-2px)
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1)
</style>
```

**AFTER:**
```vue
<template>
  <button class="btn btn-primary">Click Me</button>
</template>

<style lang="sass" scoped>
@import '@/assets/css/design-system/index'
// No custom styles needed!
</style>
```

**Result:** 15 lines → 1 line ✅

---

### Example 2: Category Button

**BEFORE:**
```vue
<template>
  <button class="category_button">Category</button>
</template>

<style lang="sass" scoped>
.category_button
  background: #f8f6ff
  border: 3px solid #ece7fa
  border-radius: 25px
  padding: 10px 20px
  color: #5B21B6
  font-family: 'Montserrat', sans-serif
  font-weight: 600
  
  &:hover
    opacity: 0.8
</style>
```

**AFTER:**
```vue
<template>
  <button class="btn btn-secondary">Category</button>
</template>

<style lang="sass" scoped>
@import '@/assets/css/design-system/index'
// Legacy class .category_button still works if needed
</style>
```

**Result:** 12 lines → 1 line ✅

---

## 🎴 CARDS

### Example 3: Article Card

**BEFORE:**
```vue
<template>
  <div class="my-article-card">
    <img :src="article.image" class="article-img" />
    <div class="article-body">
      <h4 class="article-heading">{{ article.title }}</h4>
      <p class="article-text">{{ article.description }}</p>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.my-article-card
  background: white
  border: 1px solid #e5e7eb
  border-radius: 8px
  margin-bottom: 16px

.article-img
  width: 100%
  max-height: 130px
  object-fit: cover
  border-radius: 8px 8px 0 0

.article-body
  padding: 16px

.article-heading
  font-family: 'Montserrat', sans-serif
  font-size: 18px
  font-weight: 700
  color: #111827
  margin-bottom: 8px

.article-text
  font-family: 'Montserrat', sans-serif
  font-size: 14px
  color: #6b7280
  line-height: 1.5
</style>
```

**AFTER:**
```vue
<template>
  <div class="article mb-4">
    <img :src="article.image" class="article-image" />
    <div class="article-content">
      <h4 class="article-title">{{ article.title }}</h4>
      <p class="text-sm text-gray">{{ article.description }}</p>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import '@/assets/css/design-system/index'
// All styles come from design system!
</style>
```

**Result:** 30 lines → 6 lines ✅

---

## 📐 LAYOUT

### Example 4: Flex Container with Spacing

**BEFORE:**
```vue
<template>
  <div class="my-container">
    <div class="left-content">Left</div>
    <div class="right-content">Right</div>
  </div>
</template>

<style lang="sass" scoped>
.my-container
  display: flex
  justify-content: space-between
  align-items: center
  gap: 16px
  padding: 24px
  margin-bottom: 32px
</style>
```

**AFTER:**
```vue
<template>
  <div class="d-flex justify-content-between align-items-center gap-4 p-6 mb-8">
    <div>Left</div>
    <div>Right</div>
  </div>
</template>

<style lang="sass" scoped>
@import '@/assets/css/design-system/index'
// No custom styles needed!
</style>
```

**Result:** 11 lines → 1 line (HTML only) ✅

---

## 🔤 TYPOGRAPHY

### Example 5: Headings and Text

**BEFORE:**
```vue
<template>
  <div>
    <h2 class="page-title">Page Title</h2>
    <p class="body-text">This is some body text.</p>
    <p class="small-text">This is smaller text.</p>
  </div>
</template>

<style lang="sass" scoped>
.page-title
  font-family: 'Montserrat', sans-serif
  font-size: 24px
  font-weight: 800
  color: #111827
  line-height: 1.3
  margin-bottom: 16px

.body-text
  font-family: 'Montserrat', sans-serif
  font-size: 16px
  font-weight: 400
  color: #374151
  line-height: 1.5
  margin-bottom: 12px

.small-text
  font-family: 'Montserrat', sans-serif
  font-size: 14px
  color: #6b7280
</style>
```

**AFTER:**
```vue
<template>
  <div>
    <h2 class="h2 mb-4">Page Title</h2>
    <p class="text-base mb-3">This is some body text.</p>
    <p class="text-sm text-gray">This is smaller text.</p>
  </div>
</template>

<style lang="sass" scoped>
@import '@/assets/css/design-system/index'
</style>
```

**Result:** 24 lines → 3 lines ✅

---

## 📝 FORMS

### Example 6: Text Input with Validation

**BEFORE:**
```vue
<template>
  <div>
    <input 
      type="email" 
      :class="['email-input', { 'has-error': error }]"
      placeholder="Enter email"
    />
    <span v-if="error" class="error-text">{{ error }}</span>
  </div>
</template>

<style lang="sass" scoped>
.email-input
  width: 100%
  padding: 12px 16px
  border: 1px solid #e5e7eb
  border-radius: 8px
  font-family: 'Montserrat', sans-serif
  font-size: 16px
  
  &:focus
    outline: none
    border-color: #8b5cf6
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1)
  
  &.has-error
    border-color: #ef4444
    background: #fef2f2

.error-text
  display: block
  margin-top: 8px
  font-family: 'Montserrat', sans-serif
  font-size: 12px
  color: #ef4444
</style>
```

**AFTER:**
```vue
<template>
  <div>
    <input 
      type="email" 
      :class="['form-input', { 'error': error }]"
      placeholder="Enter email"
    />
    <span v-if="error" class="error-message">{{ error }}</span>
  </div>
</template>

<style lang="sass" scoped>
@import '@/assets/css/design-system/index'
</style>
```

**Result:** 28 lines → 6 lines ✅

---

## 🎨 USING DESIGN TOKENS

### Example 7: Custom Component with Tokens

**BEFORE:**
```vue
<template>
  <div class="custom-banner">
    <h3>Special Banner</h3>
    <p>Some content here</p>
  </div>
</template>

<style lang="sass" scoped>
.custom-banner
  background: linear-gradient(180deg, #8b5cf6, #7c3aed)
  color: white
  padding: 40px 32px
  border-radius: 16px
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1)
  margin-bottom: 32px
  
  h3
    font-family: 'Montserrat', sans-serif
    font-size: 24px
    font-weight: 700
    margin-bottom: 12px
  
  p
    font-size: 16px
    line-height: 1.5
</style>
```

**AFTER:**
```vue
<template>
  <div class="custom-banner">
    <h3>Special Banner</h3>
    <p>Some content here</p>
  </div>
</template>

<style lang="sass" scoped>
@import '@/assets/css/design-system/tokens'

.custom-banner
  background: linear-gradient(180deg, $purple-400, $purple-500)
  color: $white
  padding: $spacing-10 $spacing-8
  border-radius: $radius-xl
  box-shadow: $shadow-lg
  margin-bottom: $spacing-8
  
  h3
    font-family: $font-primary
    font-size: $font-size-2xl
    font-weight: $font-weight-bold
    margin-bottom: $spacing-3
  
  p
    font-size: $font-size-base
    line-height: 1.5
</style>
```

**Result:** Uses design tokens for consistency ✅

---

## ✨ ANIMATIONS

### Example 8: Loading Skeleton

**BEFORE:**
```vue
<template>
  <div class="loading-card">
    <div class="skeleton-title"></div>
    <div class="skeleton-line"></div>
    <div class="skeleton-line"></div>
  </div>
</template>

<style lang="sass" scoped>
@keyframes shimmer
  0%
    background-position: -200% 0
  100%
    background-position: 200% 0

.loading-card
  padding: 24px
  background: white
  border-radius: 8px

.skeleton-title
  height: 24px
  width: 60%
  margin-bottom: 16px
  background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%)
  background-size: 200% 100%
  animation: shimmer 1.5s infinite
  border-radius: 4px

.skeleton-line
  height: 16px
  width: 100%
  margin-bottom: 12px
  background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%)
  background-size: 200% 100%
  animation: shimmer 1.5s infinite
  border-radius: 4px
</style>
```

**AFTER:**
```vue
<template>
  <div class="card p-6">
    <div class="skeleton skeleton-title"></div>
    <div class="skeleton skeleton-text"></div>
    <div class="skeleton skeleton-text"></div>
  </div>
</template>

<style lang="sass" scoped>
@import '@/assets/css/design-system/index'
</style>
```

**Result:** 35 lines → 5 lines ✅

---

## 🖼️ IMAGES

### Example 9: Profile Image

**BEFORE:**
```vue
<template>
  <img :src="user.avatar" class="profile-pic" />
</template>

<style lang="sass" scoped>
.profile-pic
  width: 160px
  height: 160px
  object-fit: cover
  object-position: center
  border-radius: 10%
  display: block
</style>
```

**AFTER:**
```vue
<template>
  <img :src="user.avatar" class="profile-image" />
</template>

<style lang="sass" scoped>
@import '@/assets/css/design-system/index'
</style>
```

**Result:** 9 lines → 1 line ✅

---

## 📊 SUMMARY

### Code Reduction Examples:

| Component | Before | After | Reduction |
|-----------|--------|-------|-----------|
| Button | 15 lines | 1 line | **93%** |
| Card | 30 lines | 6 lines | **80%** |
| Layout | 11 lines | 1 line | **91%** |
| Typography | 24 lines | 3 lines | **88%** |
| Form | 28 lines | 6 lines | **79%** |
| Animation | 35 lines | 5 lines | **86%** |
| Image | 9 lines | 1 line | **89%** |

**Average Reduction: 86%** 🎉

---

## 💡 Key Takeaways

1. **Use utility classes** for simple styling (spacing, layout, display)
2. **Use component classes** for complex elements (cards, buttons, forms)
3. **Use design tokens** when writing custom styles
4. **Don't reinvent the wheel** - check if a class already exists
5. **Maintain consistency** - always use the design system

---

## 🎯 When to Use What

### Use Utility Classes When:
- ✅ Adding spacing (margins, padding, gaps)
- ✅ Controlling layout (flex, grid, alignment)
- ✅ Simple styling (borders, shadows, backgrounds)
- ✅ Text alignment and display properties

### Use Component Classes When:
- ✅ Styling buttons, cards, forms
- ✅ Using images, videos, modals
- ✅ Complex UI patterns that repeat

### Use Design Tokens When:
- ✅ Writing custom component styles
- ✅ Need specific design values
- ✅ Extending existing components
- ✅ Creating new reusable patterns

### Write Custom CSS Only When:
- ✅ Unique one-off styling needed
- ✅ Component-specific behavior
- ✅ Complex interactions/animations
- ⚠️ **But always use design tokens for values!**

---

**Remember:** The design system is your friend. Use it! 🚀
