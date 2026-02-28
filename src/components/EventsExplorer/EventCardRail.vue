<template>
  <div class="event-card-rail">
    <div class="rail-header">
      <h2 class="rail-title">Events</h2>
      <div class="rail-nav">
        <button
          class="nav-btn nav-prev"
          @click="prevCard"
          :disabled="activeIndex === 0"
          aria-label="Previous event"
        >
          ‹
        </button>
        <span class="nav-counter"
          >{{ activeIndex + 1 }} / {{ events.length }}</span
        >
        <button
          class="nav-btn nav-next"
          @click="nextCard"
          :disabled="activeIndex === events.length - 1"
          aria-label="Next event"
        >
          ›
        </button>
      </div>
    </div>

    <div class="rail-content">
      <div class="cards-scroll">
        <event-card
          v-for="event in events"
          :key="event.id"
          :event="event"
          :is-active="event.id === activeEventId"
          :accent-color="accentColor"
          @card-selected="selectEvent"
          @cta-clicked="handleCTA"
          :ref="el => setCardRef(event.id, el)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
/* global defineProps, defineEmits */
import { computed, ref, watch } from "vue";
import EventCard from "./EventCard.vue";

const props = defineProps({
  events: {
    type: Array,
    default: () => []
  },
  activeEventId: {
    type: String,
    default: null
  },
  accentColor: {
    type: String,
    default: "#7c3aed"
  },
  layout: {
    type: String,
    default: "rail",
    validator: val => ["rail", "grid", "carousel"].includes(val)
  }
});

const emit = defineEmits(["event-selected", "cta-clicked"]);

const cardRefs = ref({});
const activeIndex = computed(() => {
  return props.events.findIndex(e => e.id === props.activeEventId);
});

const setCardRef = (eventId, el) => {
  cardRefs.value[eventId] = el;
};

const selectEvent = eventId => {
  emit("event-selected", eventId);
};

const handleCTA = event => {
  emit("cta-clicked", event);
};

const nextCard = () => {
  if (activeIndex.value < props.events.length - 1) {
    emit("event-selected", props.events[activeIndex.value + 1].id);
  }
};

const prevCard = () => {
  if (activeIndex.value > 0) {
    emit("event-selected", props.events[activeIndex.value - 1].id);
  }
};

/**
 * Auto-scroll active card into view
 */
watch(
  () => props.activeEventId,
  newId => {
    setTimeout(() => {
      const cardElement = cardRefs.value[newId];
      if (cardElement && cardElement.$el) {
        cardElement.$el.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center"
        });
      }
    }, 50);
  }
);
</script>

<style scoped lang="sass" src="@/assets/css/eventsExplorer.sass"></style>
