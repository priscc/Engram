import { computed, ref } from "vue";

/**
 * Composable for Events Explorer logic
 * Handles normalization, navigation, and state management
 */
export function useEventsExplorer(events, initialActiveEventId = null) {
  const activeEventId = ref(
    initialActiveEventId ||
      (events.value?.length > 0 ? events.value[0].id : null)
  );

  // Compute min/max years from events
  const minYear = computed(() => {
    if (!events.value || events.value.length === 0)
      return new Date().getFullYear();
    return Math.min(...events.value.map(e => e.startDate?.dateNum || 0));
  });

  const maxYear = computed(() => {
    if (!events.value || events.value.length === 0)
      return new Date().getFullYear();
    return Math.max(
      ...events.value.map(e => e.endDate?.dateNum || e.startDate?.dateNum || 0)
    );
  });

  const diffYears = computed(() => maxYear.value - minYear.value || 1);

  /**
   * Normalize event position to 0..1 range
   */
  const normalizedPosition = event => {
    if (!event || !event.startDate) return 0;
    return (event.startDate.dateNum - minYear.value) / diffYears.value;
  };

  /**
   * Get active event object
   */
  const activeEvent = computed(() => {
    if (!events.value) return null;
    return events.value.find(e => e.id === activeEventId.value) || null;
  });

  /**
   * Get regions for active event
   */
  const activeRegions = computed(() => {
    if (!activeEvent.value?.coordinates) return [];
    return Object.keys(activeEvent.value.coordinates);
  });

  /**
   * Navigate to previous event
   */
  const prevEvent = () => {
    if (!events.value || events.value.length === 0) return;
    const currentIndex = events.value.findIndex(
      e => e.id === activeEventId.value
    );
    if (currentIndex > 0) {
      activeEventId.value = events.value[currentIndex - 1].id;
    }
  };

  /**
   * Navigate to next event
   */
  const nextEvent = () => {
    if (!events.value || events.value.length === 0) return;
    const currentIndex = events.value.findIndex(
      e => e.id === activeEventId.value
    );
    if (currentIndex < events.value.length - 1) {
      activeEventId.value = events.value[currentIndex + 1].id;
    }
  };

  /**
   * Set active event by ID
   */
  const setActiveEvent = eventId => {
    activeEventId.value = eventId;
  };

  /**
   * Scroll element into view (for card rail)
   */
  const scrollIntoView = (element, behavior = "smooth") => {
    if (element) {
      element.scrollIntoView({ behavior, block: "nearest", inline: "center" });
    }
  };

  return {
    activeEventId,
    activeEvent,
    activeRegions,
    minYear,
    maxYear,
    diffYears,
    normalizedPosition,
    prevEvent,
    nextEvent,
    setActiveEvent,
    scrollIntoView
  };
}
