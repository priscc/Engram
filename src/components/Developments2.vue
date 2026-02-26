<template>
  <div id="Events">
    <b-container fluid class="px-0 developments-container">
      <b-row class="mx-0">
        <b-col cols="12" class="px-0">
          <div class="title">Events</div>
        </b-col>
      </b-row>
      <b-row class="events_component mx-0">
        <b-col class="p-0" cols="12">
          <events-explorer
            :events="events"
            :initial-active-event-id="activeEventId"
            :theme="explorerTheme"
            layout="rail"
            @update:activeEventId="handleActiveEventChange"
            @cta-clicked="handleEventCTA"
          />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script type="text/javascript">
import EventsExplorer from "./EventsExplorer/EventsExplorer.vue";
import storeTopic from "@/store/topic.js";
import { pushRoute } from "@/router/navigation";

export default {
  name: "Developments",
  components: {
    EventsExplorer
  },
  data() {
    return {
      activeEventId: null,
      explorerTheme: {
        accentColor: "#7c3aed",
        highlightColor: "#BDFF00",
        mapStyle: "dark",
        bg: "transparent",
        surface: "#2a2a2a",
        textPrimary: "#ffffff",
        textSecondary: "#999999"
      }
    };
  },
  computed: {
    events() {
      if (!storeTopic.state.events || storeTopic.state.events.length === 0) {
        return [];
      }
      return storeTopic.state.events;
    }
  },
  methods: {
    handleActiveEventChange(eventId) {
      this.activeEventId = eventId;
      storeTopic.dispatch(
        "setEventIndex",
        this.events.findIndex(e => e.id === eventId)
      );
    },
    handleEventCTA(event) {
      storeTopic.dispatch("setEventContent", event);
      pushRoute("Event", { event: event.id });
      this.$gtag.event("clicked-event-learnMore", {
        event_category: "engagement",
        event_label: event.title
      });
    }
  },
  mounted() {
    storeTopic.dispatch("setTopicEvents", this.$route.params.topic);
  },
  watch: {
    events(newVal) {
      if (newVal.length > 0 && !this.activeEventId) {
        this.activeEventId = newVal[0].id;
      }
    }
  }
};
</script>

<style lang="sass" scoped src="@/assets/css/topicContent.sass"></style>
<style lang="sass" scoped>
#Events
  width: 100%
  max-width: 100%
  min-width: 0

.developments-container
  width: 100%
  max-width: 100%
  min-width: 0

.events_component
  width: 100%
  max-width: 100%
  min-width: 0

:deep(.events-explorer)
  width: 100%
  max-width: 100%
  min-width: 0
</style>
