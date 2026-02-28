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

<style scoped lang="sass" src="@/assets/css/eventsExplorer.sass"></style>
