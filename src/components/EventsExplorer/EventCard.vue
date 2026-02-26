<template>
  <div class="event-card" :class="{ active: isActive }">
    <!-- Thumbnail -->
    <div v-if="event.thumbURL" class="card-thumbnail">
      <img :src="event.thumbURL" :alt="event.title" />
    </div>

    <!-- Content -->
    <div class="card-content">
      <!-- Date range -->
      <div class="card-date">
        <span v-if="endDate">{{ startDate }} - {{ endDate }}</span>
        <span v-else>{{ startDate }}</span>
      </div>

      <!-- Title -->
      <h3 class="card-title">{{ event.title }}</h3>

      <!-- Summary/Description -->
      <p class="card-summary">{{ event.descriptionMD }}</p>

      <!-- Tags/Themes -->
      <div v-if="event.theme && event.theme.length > 0" class="card-tags">
        <span v-for="(tag, index) in visibleTags" :key="index" class="tag">
          {{ tag }}
        </span>
        <span v-if="event.theme.length > 2" class="tag-more">
          +{{ event.theme.length - 2 }} more
        </span>
      </div>

      <!-- CTA Button -->
      <div
        v-if="event.descriptionMD && event.descriptionMD.length > 0"
        class="card-cta"
      >
        <button class="btn-learn-more" @click="handleCTA">
          Learn More
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
/* global defineProps, defineEmits */
import { computed } from "vue";

const props = defineProps({
  event: {
    type: Object,
    required: true
  },
  isActive: {
    type: Boolean,
    default: false
  },
  accentColor: {
    type: String,
    default: "#7c3aed"
  }
});

const emit = defineEmits(["card-selected", "cta-clicked"]);

const startDate = computed(() => {
  return props.event.startDate?.date || "Unknown";
});

const endDate = computed(() => {
  const end = props.event.endDate?.dateNum;
  if (!end || end === 0) return null;
  return props.event.endDate?.date || null;
});

const visibleTags = computed(() => {
  return props.event.theme?.slice(0, 2) || [];
});

const handleCTA = () => {
  emit("cta-clicked", props.event);
};
</script>

<style scoped lang="sass">
.event-card
  flex: 0 0 auto
  width: 320px
  background: var(--surface, #2a2a2a)
  border: 2px solid transparent
  border-radius: 12px
  overflow: hidden
  cursor: pointer
  transition: all 300ms ease
  display: flex
  flex-direction: column

  &:hover
    border-color: var(--accent-color, v-bind(accentColor))
    transform: translateY(-2px)

  &.active
    border-color: var(--accent-color, v-bind(accentColor))
    box-shadow: 0 8px 24px rgba(124, 58, 237, 0.3)
    background: var(--surface-highlight, #333)

.card-thumbnail
  width: 100%
  height: 200px
  overflow: hidden
  background: #1a1a1a

  img
    width: 100%
    height: 100%
    object-fit: cover
    transition: transform 300ms ease

  .event-card:hover &
    img
      transform: scale(1.05)

.card-content
  padding: 16px
  display: flex
  flex-direction: column
  gap: 8px
  flex: 1

.card-date
  font-size: 12px
  color: var(--accent-color, v-bind(accentColor))
  font-weight: 600
  text-transform: uppercase
  letter-spacing: 0.5px

.card-title
  font-size: 18px
  font-weight: 700
  color: var(--text-primary, #fff)
  margin: 0
  line-clamp: 2
  display: -webkit-box
  -webkit-line-clamp: 2
  -webkit-box-orient: vertical
  overflow: hidden

.card-summary
  font-size: 14px
  color: var(--text-secondary, #ccc)
  margin: 0
  flex: 1
  line-clamp: 3
  display: -webkit-box
  -webkit-line-clamp: 3
  -webkit-box-orient: vertical
  overflow: hidden

.card-tags
  display: flex
  gap: 6px
  flex-wrap: wrap
  margin-top: 4px

.tag
  display: inline-block
  padding: 4px 8px
  background: var(--accent-color, v-bind(accentColor))
  color: #000
  border-radius: 4px
  font-size: 11px
  font-weight: 600
  text-transform: uppercase
  letter-spacing: 0.3px

.tag-more
  padding: 4px 8px
  color: var(--text-secondary, #ccc)
  font-size: 11px

.card-cta
  margin-top: 8px

.btn-learn-more
  width: 100%
  padding: 8px 12px
  background: var(--accent-color, v-bind(accentColor))
  color: #000
  border: none
  border-radius: 6px
  font-weight: 600
  font-size: 12px
  text-transform: uppercase
  cursor: pointer
  transition: all 200ms ease

  &:hover
    background: var(--accent-color-hover, #a78bfa)
    transform: scale(1.02)

  &:active
    transform: scale(0.98)
</style>
