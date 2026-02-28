<template>
  <div class="timeline-bar">
    <div
      ref="timelineAxisRef"
      class="timeline-axis"
      @scroll="updateScrollState"
    >
      <svg class="timeline-svg" :viewBox="`0 0 ${svgWidth} 60`">
        <!-- Baseline -->
        <line x1="20" y1="30" :x2="svgWidth - 20" y2="30" class="baseline" />

        <!-- Tick marks and labels -->
        <g class="ticks">
          <g v-for="(tick, index) in tickMarks" :key="`tick-${index}`">
            <!-- Tick line -->
            <line
              :x1="tick.x"
              :y1="getTickY1(tick.type)"
              :x2="tick.x"
              :y2="getTickY2(tick.type)"
              class="tick-line"
              :class="`tick-line--${tick.type}`"
            />
            <!-- Year label -->
            <text
              v-if="tick.type === 'major'"
              :x="tick.x"
              y="50"
              class="tick-label"
            >
              {{ tick.year }}
            </text>
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
    <div v-if="hasOverflow" class="timeline-scroll-controls">
      <button
        type="button"
        class="timeline-scroll-btn"
        aria-label="Scroll timeline left"
        :disabled="!canScrollLeft"
        @click="scrollTimelineLeft"
      >
        ←
      </button>
      <button
        type="button"
        class="timeline-scroll-btn"
        aria-label="Scroll timeline right"
        :disabled="!canScrollRight"
        @click="scrollTimelineRight"
      >
        →
      </button>
    </div>
  </div>
</template>

<script setup>
/* global defineProps, defineEmits */
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch
} from "vue";

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
const timelineAxisRef = ref(null);
const hasOverflow = ref(false);
const canScrollLeft = ref(false);
const canScrollRight = ref(false);
const overflowTolerance = 8;

let resizeObserver;

const yearRange = computed(() => props.maxYear - props.minYear || 1);

/**
 * Generate hierarchical tick marks:
 * - major: century
 * - minor: mid-century
 * - micro: quarter-century
 */
const tickMarks = computed(() => {
  const ticks = [];
  const minYear = props.minYear;
  const maxYear = props.maxYear;
  const range = maxYear - minYear || 1;

  for (
    let century = Math.ceil(minYear / 100) * 100;
    century <= maxYear;
    century += 100
  ) {
    const majorNormalized = (century - minYear) / range;
    const majorX = padding + majorNormalized * (svgWidth - 2 * padding);
    ticks.push({ year: century, x: majorX, type: "major" });

    const midCentury = century + 50;
    if (midCentury >= minYear && midCentury <= maxYear) {
      const minorNormalized = (midCentury - minYear) / range;
      const minorX = padding + minorNormalized * (svgWidth - 2 * padding);
      ticks.push({ year: midCentury, x: minorX, type: "minor" });
    }

    const quarterOne = century + 25;
    if (quarterOne >= minYear && quarterOne <= maxYear) {
      const microNormalizedOne = (quarterOne - minYear) / range;
      const microXOne = padding + microNormalizedOne * (svgWidth - 2 * padding);
      ticks.push({ year: quarterOne, x: microXOne, type: "micro" });
    }

    const quarterThree = century + 75;
    if (quarterThree >= minYear && quarterThree <= maxYear) {
      const microNormalizedThree = (quarterThree - minYear) / range;
      const microXThree =
        padding + microNormalizedThree * (svgWidth - 2 * padding);
      ticks.push({ year: quarterThree, x: microXThree, type: "micro" });
    }
  }

  return ticks.sort((a, b) => a.year - b.year);
});

const getTickY1 = tickType => {
  if (tickType === "major") return 22;
  if (tickType === "minor") return 25;
  return 27;
};

const getTickY2 = tickType => {
  if (tickType === "major") return 38;
  if (tickType === "minor") return 35;
  return 33;
};

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

const updateScrollState = () => {
  const element = timelineAxisRef.value;
  if (!element) {
    hasOverflow.value = false;
    canScrollLeft.value = false;
    canScrollRight.value = false;
    return;
  }

  const maxScrollLeft = Math.max(element.scrollWidth - element.clientWidth, 0);
  hasOverflow.value = maxScrollLeft > overflowTolerance;

  if (!hasOverflow.value) {
    canScrollLeft.value = false;
    canScrollRight.value = false;
    return;
  }

  canScrollLeft.value = element.scrollLeft > 2;
  canScrollRight.value = element.scrollLeft < maxScrollLeft - 2;
};

const onWindowResize = () => {
  updateScrollState();
};

const scrollTimelineLeft = () => {
  timelineAxisRef.value?.scrollBy({ left: -240, behavior: "smooth" });
  window.requestAnimationFrame(updateScrollState);
};

const scrollTimelineRight = () => {
  timelineAxisRef.value?.scrollBy({ left: 240, behavior: "smooth" });
  window.requestAnimationFrame(updateScrollState);
};

onMounted(async () => {
  await nextTick();
  updateScrollState();
  window.addEventListener("resize", onWindowResize);

  if (window.ResizeObserver && timelineAxisRef.value) {
    resizeObserver = new window.ResizeObserver(() => {
      updateScrollState();
    });
    resizeObserver.observe(timelineAxisRef.value);
  }
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", onWindowResize);
  if (resizeObserver) {
    resizeObserver.disconnect();
  }
});

watch(
  () => [props.minYear, props.maxYear, props.events.length],
  async () => {
    await nextTick();
    updateScrollState();
  }
);
</script>

<style scoped lang="sass" src="@/assets/css/eventsExplorer.sass"></style>
