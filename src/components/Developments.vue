<template>
  <div>
    <b-container style="background-color: black;" fluid>
      <b-row>
        <div class="title">Events</div>
      </b-row>
      <b-row >
        <b-col class="p-0" cols="4"><eventcard :events="events"></eventcard></b-col>
        <b-col class="p-0"><eventmap :events="events"></eventmap></b-col>
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
    eventmap,
  },
  computed: {
    events() {
      console.log(
        "storeTopic.state.events.length ",
        storeTopic.state.events.length
      );
      if (storeTopic.state.events.length == 0) return [];
      else return storeTopic.state.events;
    },
  },
  mounted() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    console.log(this.$route.params.topic);
    storeTopic.dispatch("setTopicEvents", this.$route.params.topic);
    console.log("mounted events");
  },
};
</script>

<style lang="sass" scoped src="@/assets/css/topicContent.sass"></style>
