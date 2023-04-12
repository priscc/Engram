<template>
  <div id="Event">
    <b-container fluid>
      <b-row
        class="background background_filter"
        :style="{ 'background-image': `url(${topic.topic_thumbURL})` }"
      >
        <b-col lg="2" md="2" sm="12" class="u-non-blurred">
          <div class="back_button" @click="back">
            <b-icon-caret-left aria-hidden="true" /> Back
          </div>
        </b-col>
        <b-col class="d-flex flex-column u-non-blurred">
          <p class="banner_timeperiod_header">
            Time Period: {{ timePeriodHeaders.header }}
          </p>
          <p class="banner_unit_header">{{ topic.unit }}</p>
          <p class="banner_header">
            {{ topic.title }}
          </p>
        </b-col>
      </b-row>
    </b-container>

    <b-container class="pt-5 pb-5">
      <b-row>
        <b-col lg="7" md="12" sm="12">
          <b-img class="event_image" :src="event.thumbURL"></b-img>
          <!-- <div style="background-color: black;"><eventmap :events="event"></eventmap></div> -->
          <p class="header-2">{{ event.title }}</p>
          <p v-if="endDate == null || endDate.length == 0" class="text">
            ({{ startDate }})
          </p>
          <p b-else class="text">({{ startDate }} - {{ endDate }})</p>
          <div class="text pt-2" v-html="content"></div>
        </b-col>
        <b-col>
          <resourcecomp type="event" :resourcetype="resouces"></resourcecomp>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import store from "@/store";
import storeTopic from "@/store/topic.js";
// import eventmap from "./EventMapComponent.vue";
import resourcecomp from "./ResourceComponent.vue";
import { db } from "@/main";
import Quill from "quill";

export default {
  name: "Event",
  components: { resourcecomp },
  data() {
    return {
      data: [],
      width: null,
      mapRatio: null,
      height: null,
      projection: null,
      path: null,
      svg: null,
      startDate: null,
      endDate: null
    };
  },
  computed: {
    timePeriodHeaders() {
      return store.state.timePeriodHeaders[store.state.currentTimePeriod];
    },
    topic() {
      return storeTopic.state.topic;
    },
    event() {
      return storeTopic.state.event;
    },
    content() {
      var inputDelta = this.event.mainMD;
      var tempCont = document.createElement("div");
      if (typeof inputDelta === "string" || inputDelta instanceof String) {
        return (tempCont.innerHTML = inputDelta);
      } else {
        var quill = new Quill(tempCont);
        quill.setContents(inputDelta);
        return tempCont.getElementsByClassName("ql-editor")[0].innerHTML;
      }
    },
    resouces() {
      return storeTopic.state.eventResources;
    }
  },
  methods: {
    back() {
      // storeTopic.dispatch("restLoader", 1);
      this.$router.push({
        name: "Topic",
        params: {
          period: this.$route.params.period,
          topic: this.$route.params.topic,
          category: this.$route.params.category
        }
      });
    }
  },
  async mounted() {
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (Object.keys(storeTopic.state.topic).length === 0) {
      store.dispatch("setTimePeriod", this.$route.params.period);

      var newTopic = await db
        .collection("topics")
        .doc(this.$route.params.topic)
        .get()
        .then(
          function(querySnapshot) {
            var entry = querySnapshot.data();
            entry.id = querySnapshot.id;
            return entry;
          }.bind(this)
        );

      storeTopic.dispatch("setTopicContent", newTopic);

      var newEvent = await db
        .collection("events")
        .doc(this.$route.params.event)
        .get()
        .then(
          function(querySnapshot) {
            var entry = querySnapshot.data();
            entry.id = querySnapshot.id;
            return entry;
          }.bind(this)
        );

      storeTopic.dispatch("setEventContent", newEvent);
    }

    this.startDate = this.event.startDate.date;
    this.endDate = this.event.endDate.date;
    storeTopic.dispatch("setEventResources", this.$route.params.event);
  }
};
</script>

<style lang="sass" scoped src="@/assets/css/topicContent.sass"></style>
