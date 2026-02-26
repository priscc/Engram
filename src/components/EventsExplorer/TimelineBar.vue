<template>
  <div class="timeline-bar">
    <div class="timeline-axis">
      <svg class="timeline-svg" :viewBox="`0 0 ${svgWidth} 60`">
        <!-- Baseline -->
        <line x1="20" y1="30" :x2="svgWidth - 20" y2="30" class="baseline" />

        <!-- Tick marks and labels -->
        <g class="ticks">
          <g v-for="(tick, index) in tickMarks" :key="`tick-${index}`">
            <!-- Tick line -->
            <line :x1="tick.x" y1="25" :x2="tick.x" y2="35" class="tick-line" />
            <!-- Year label -->
            <text :x="tick.x" y="50" class="tick-label">{{ tick.year }}</text>
          </g>
        </g>

        <!-- Event markers -->
        <g class="markers">
          <g
            v-for="event in events"
            :key="event.id"
            class="marker-group"
            :class="{ active: event.id === activeEventId }"
            @click="selectEvent(event.id)"
            @keydown.enter="selectEvent(event.id)"
            @keydown.arrow-left="prevEvent"
            @keydown.arrow-right="nextEvent"
            tabindex="0"
            role="button"
            :aria-label="`Event: ${event.title}`"
          >
            <circle
              :cx="getMarkerX(event)"
              cy="30"
              class="marker-circle"
              :class="{ active: event.id === activeEventId }"
              :aria-pressed="event.id === activeEventId"
            />
            <title>{{ event.title }}</title>
          </g>
        </g>
      </svg>
    </div>
  </div>
</template>

<script setup>
/* global defineProps, defineEmits */
import { computed } from "vue";

const props = defineProps({
  minYear: {
    type: Number,
    required: true
  },
  maxYear: {
    type: Number,
    required: true
  },
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
  }
});

const emit = defineEmits(["event-selected", "prev-event", "next-event"]);

const svgWidth = 1200;
const padding = 40;

const yearRange = computed(() => props.maxYear - props.minYear || 1);

/**
 * Generate tick marks (at regular intervals)
 */
const tickMarks = computed(() => {
  const ticks = [];
  const minYear = props.minYear;
  const maxYear = props.maxYear;
  const range = maxYear - minYear;

  let interval = 100;
  if (range >= 2000) interval = 500;
  else if (range >= 1000) interval = 200;
  else if (range >= 500) interval = 100;
  else if (range >= 250) interval = 25;
  else if (range >= 100) interval = 10;
  else if (range >= 50) interval = 10;
  else if (range >= 20) interval = 5;
  else interval = 2;

  for (
    let year = Math.ceil(minYear / interval) * interval;
    year <= maxYear;
    year += interval
  ) {
    const normalized = (year - minYear) / range;
    const x = padding + normalized * (svgWidth - 2 * padding);
    ticks.push({ year, x });
  }

  return ticks;
});

/**
 * Calculate X position for marker
 */
const getMarkerX = event => {
  const normalized =
    (event.startDate?.dateNum - props.minYear) / yearRange.value;
  return padding + normalized * (svgWidth - 2 * padding);
};

const selectEvent = eventId => {
  emit("event-selected", eventId);
};

const prevEvent = () => {
  emit("prev-event");
};

const nextEvent = () => {
  emit("next-event");
};
</script>

<style scoped lang="sass">
.timeline-bar
  width: 100%
  padding: 16px 0
  background: var(--surface, #2a2a2a)
  border-radius: 8px
  overflow-x: auto

.timeline-axis
  position: relative
  width: 100%
  height: 60px
  display: flex
  align-items: center
  padding: 0 16px

.timeline-svg
  width: 100%
  height: 60px
  min-width: 1200px

.baseline
  stroke: var(--text-secondary, #999)
  stroke-width: 2

.tick-line
  stroke: var(--text-secondary, #999)
  stroke-width: 1

.tick-label
  font-size: 12px
  fill: var(--text-secondary, #999)
  text-anchor: middle
  user-select: none

.markers
  .marker-group
    cursor: pointer
    outline: none

    &:focus circle
      filter: drop-shadow(0 0 6px rgba(124, 58, 237, 0.6))

.marker-circle
  r: 6
  fill: var(--text-secondary, #999)
  stroke: var(--surface, #2a2a2a)
  stroke-width: 2
  transition: all 200ms ease

  &:hover
    r: 8
    filter: brightness(1.2)

  &.active
    r: 10
    fill: var(--accent-color, v-bind(accentColor))
    filter: drop-shadow(0 0 8px rgba(124, 58, 237, 0.8))
</style>
