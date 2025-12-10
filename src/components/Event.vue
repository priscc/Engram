<template>
  <div id="Event">
    <b-container fluid>
      <b-row
        class="background background_filter"
        :style="{ 'background-image': `url(${topic.topic_thumbURL})` }"
      >
        <b-col lg="2" md="2" sm="12" class="u-non-blurred">
          <div class="back_button" @click="back">
            <b-icon-chevron-left aria-hidden="true" /> Back
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
import { pushRoute } from "@/router/navigation";
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
  // reload when route params change (e.g., navigating event -> event)
  beforeRouteUpdate(to, from, next) {
    console.log("Event.beforeRouteUpdate", {
      from: from.params.event,
      to: to.params.event
    });
    // If the event id changed, fetch the new event
    if (to.params.event && to.params.event !== from.params.event) {
      this.handleRouteChange(to.params)
        .then(() => {
          console.log("Event.beforeRouteUpdate: handleRouteChange completed");
          next();
        })
        .catch(err => {
          console.error("beforeRouteUpdate error:", err);
          next();
        });
    } else {
      next();
    }
  },
  methods: {
    back() {
      this.$gtag.event("event-backButton", { event_category: "engagement" });
      pushRoute("Topic", {
        period: this.$route.params.period,
        topic: this.$route.params.topic,
        category: this.$route.params.category
      });
    },
    async handleRouteChange(params) {
      console.log("Event.handleRouteChange start", params);
      // ensure topic is present
      if (Object.keys(storeTopic.state.topic).length === 0) {
        store.dispatch("setTimePeriod", params.period);
        const topicSnap = await db
          .collection("topics")
          .doc(params.topic)
          .get();
        if (topicSnap.exists) {
          const entry = topicSnap.data();
          entry.id = topicSnap.id;
          storeTopic.dispatch("setTopicContent", entry);
        }
      }

      // fetch new event
      const eventId = params.event;
      if (eventId) {
        const eventSnap = await db
          .collection("events")
          .doc(eventId)
          .get();
        if (eventSnap.exists) {
          const ev = eventSnap.data();
          ev.id = eventSnap.id;
          storeTopic.dispatch("setEventContent", ev);
        } else {
          console.warn("Event not found:", eventId);
        }
        storeTopic.dispatch("setEventResources", eventId);
      }

      // update local date fields from storeTopic
      if (storeTopic.state.event && storeTopic.state.event.startDate)
        this.startDate = storeTopic.state.event.startDate.date;
      if (storeTopic.state.event && storeTopic.state.event.endDate)
        this.endDate = storeTopic.state.event.endDate.date;
      console.log("Event.handleRouteChange end", {
        startDate: this.startDate,
        endDate: this.endDate
      });
    }
  },
  async mounted() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    // Always ensure the topic is loaded (used for banner and context)
    try {
      if (Object.keys(storeTopic.state.topic).length === 0) {
        store.dispatch("setTimePeriod", this.$route.params.period);
        const topicSnap = await db
          .collection("topics")
          .doc(this.$route.params.topic)
          .get();
        if (topicSnap.exists) {
          const entry = topicSnap.data();
          entry.id = topicSnap.id;
          storeTopic.dispatch("setTopicContent", entry);
        }
      }

      // Always fetch the event document (don't assume store already has it).
      const eventId = this.$route.params.event;
      if (eventId) {
        const eventSnap = await db
          .collection("events")
          .doc(eventId)
          .get();
        if (eventSnap.exists) {
          const ev = eventSnap.data();
          ev.id = eventSnap.id;
          storeTopic.dispatch("setEventContent", ev);
        } else {
          console.warn("Event not found:", eventId);
        }
        storeTopic.dispatch("setEventResources", eventId);
      }

      // Safely set date fields if available
      if (this.event && this.event.startDate)
        this.startDate = this.event.startDate.date;
      if (this.event && this.event.endDate)
        this.endDate = this.event.endDate.date;
    } catch (err) {
      console.error("Event mounted error:", err, {
        params: this.$route.params
      });
    }
  }
};
</script>

<style lang="sass" scoped src="@/assets/css/topicContent.sass"></style>
