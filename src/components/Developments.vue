<template>
  <div id="Events">
    <b-container fluid>
      <b-row>
        <div class="title">Events</div>
      </b-row>
      <b-row class="events_component">
        <b-col class="p-0" xl="4" lg="4" md="12" sm="12" xs="12"
          ><eventcard :events="events"></eventcard
        ></b-col>
        <b-col class="p-0" xl="8" lg="8" md="12" sm="12" xs="12"
          ><eventmap :events="events"></eventmap
        ></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script type="text/javascript">
import eventcard from "./EventCardComponent.vue";
import eventmap from "./EventMapComponent.vue";
import storeTopic from "@/store/topic.js";

export default {
  name: "Topics",
  components: {
    eventcard,
    eventmap
  },
  computed: {
    events() {
      if (storeTopic.state.events.length == 0) return [];
      else return storeTopic.state.events;
    }
  },
  mounted() {
    storeTopic.dispatch("setTopicEvents", this.$route.params.topic);
  }
};
</script>

<style lang="sass" scoped src="@/assets/css/topicContent.sass"></style>
