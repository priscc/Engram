<template>
  <div class="events-explorer" :style="cssVariables">
    <!-- Empty state -->
    <div v-if="!events || events.length === 0" class="empty-state">
      <p>No events to display</p>
    </div>

    <!-- Main layout -->
    <template v-else>
      <!-- Timeline bar -->
      <timeline-bar
        class="explorer-section timeline-section"
        :min-year="minYear"
        :max-year="maxYear"
        :events="events"
        :active-event-id="activeEventId"
        :accent-color="theme.accentColor"
        @event-selected="setActiveEvent"
        @prev-event="prevEventWrapped"
        @next-event="nextEventWrapped"
      />

      <!-- Map panel -->
      <map-panel
        class="explorer-section map-section"
        :active-regions="activeRegions"
        :active-coordinates="activeCoordinates"
        :secondary-regions="secondaryRegions"
        :highlight-color="theme.highlightColor"
        :base-map-style="theme.mapStyle"
      />

      <!-- Event card rail -->
      <event-card-rail
        class="explorer-section cards-section"
        :events="events"
        :active-event-id="activeEventId"
        :accent-color="theme.accentColor"
        :layout="layout"
        @event-selected="setActiveEvent"
        @cta-clicked="handleCTA"
      />
    </template>
  </div>
</template>

<script setup>
/* global defineProps, defineEmits */
import { ref, computed, watch } from "vue";
import MapPanel from "./MapPanel.vue";
import TimelineBar from "./TimelineBar.vue";
import EventCardRail from "./EventCardRail.vue";
import { useEventsExplorer } from "./useEventsExplorer.js";
import storeTopic from "@/store/topic.js";

const props = defineProps({
  events: {
    type: Array,
    default: () => []
  },
  initialActiveEventId: {
    type: String,
    default: null
  },
  theme: {
    type: Object,
    default: () => ({
      accentColor: "#7c3aed",
      highlightColor: "#BDFF00",
      mapStyle: "dark",
      bg: "#1a1a1a",
      surface: "#2a2a2a",
      textPrimary: "#ffffff",
      textSecondary: "#999999"
    })
  },
  layout: {
    type: String,
    default: "rail",
    validator: val => ["rail", "grid", "carousel"].includes(val)
  },
  secondaryRegions: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits([
  "update:activeEventId",
  "event-selected",
  "cta-clicked"
]);

// Convert props to refs for composable
const eventsRef = computed(() => props.events);
const activeEventIdLocal = ref(props.initialActiveEventId);

// Use composable
const {
  activeEventId,
  activeEvent,
  activeRegions,
  minYear,
  maxYear,
  prevEvent,
  nextEvent
} = useEventsExplorer(eventsRef, activeEventIdLocal.value);

const activeCoordinates = computed(() => activeEvent.value?.coordinates || {});

// Override setActiveEvent to emit changes
const setActiveEvent = eventId => {
  activeEventId.value = eventId;
  activeEventIdLocal.value = eventId;
  emit("update:activeEventId", eventId);
  emit("event-selected", eventId);
};

// Override navigation to emit changes
const prevEventWrapped = () => {
  prevEvent();
  emit("update:activeEventId", activeEventId.value);
};

const nextEventWrapped = () => {
  nextEvent();
  emit("update:activeEventId", activeEventId.value);
};

// Handle CTA clicks
const handleCTA = event => {
  // Dispatch to store if available
  if (storeTopic && storeTopic.dispatch) {
    storeTopic.dispatch("setEventContent", event);
  }
  emit("cta-clicked", event);
};

// Sync external activeEventId changes
watch(
  () => props.initialActiveEventId,
  newId => {
    if (newId && newId !== activeEventId.value) {
      setActiveEvent(newId);
    }
  }
);

// CSS Variables for theming
const cssVariables = computed(() => ({
  "--accent-color": props.theme.accentColor,
  "--highlight-color": props.theme.highlightColor,
  "--bg": props.theme.bg,
  "--surface": props.theme.surface,
  "--text-primary": props.theme.textPrimary,
  "--text-secondary": props.theme.textSecondary
}));

// Initialize active event
if (!activeEventId.value && props.events?.length > 0) {
  setActiveEvent(props.events[0].id);
}
</script>

<style lang="sass" scoped src="@/assets/css/eventsExplorer.sass"></style>
