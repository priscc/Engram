<template>
  <div>
    <b-container fluid>
      <!-- <div class="card">
        <b-img class="card_image" :src="topic.topic_thumbURL"></b-img>
        <div class="overlay overlay_2">
          <div class="back_button" @click="back">
            <b-icon-caret-left aria-hidden="true" /> Back
          </div>
          <div>
            <p class="card_header">Time Period: {{ timePeriodHeaders.header }}</p>
            <p class="card_subheader">({{ topic.title }})</p>
          </div>
        </div>
      </div> -->
      <b-row
        class="background background-filter"
        style="height: 140px; color: white"
        :style="{
          'background-image': `url(${topic.topic_thumbURL})`,
        }"
      >
        <b-col cols="2" class="d-flex align-center u-non-blurred">
          <div class="back_button" @click="back">
            <b-icon-caret-left aria-hidden="true" /> Back
          </div>
        </b-col>
        <b-col class="d-flex flex-column justify-center u-non-blurred">
          <p class="caption">Time Period: {{ timePeriodHeaders.header }}</p>
          <p class="page_header mb-0" style="line-height: 20px">
            {{ topic.title }}
          </p>
        </b-col>
      </b-row>
    </b-container>
    <b-container fluid class="mb-10 ml-3">
      <b-row>
        <!--  <b-col cols="2" class="d-flex flex-column pt-5">
          <div v-for="(t, index) in topicButtons" :key="index">
            <b-btn
              rounded
              :color="t.color"
              class="my-1 text-none"
              small
              style="width: 120px"
              @click="select(index)"
              elevation="0"
            >
              <p class="buttons mb-0">{{ t.title }}</p>
            </b-btn> -->
        <!--   <b-btn
              b-else-if="t.title != 'Trends'"
              rounded
              :color="t.color"
              class="my-1 text-none"
              small
              style="width: 120px"
              @click="select(index)"
              elevation="0"
            >
              <p class="buttons mb-0">
                {{ t.title }}
              </p>
            </b-btn> -->
        <!--  </div>
        </b-col> -->
        <b-col class="pa-0 pt-5">
          <intro :topic="topic"></intro>
          <!-- make the  currentTopicComponent stored in the router-->
          <!--    <intro v-if="currentTopicComponent == 0"></intro>
          <trends v-if="currentTopicComponent == 1"></trends>
          <developments v-else-if="currentTopicComponent == 2"></developments>
          <people v-else-if="currentTopicComponent == 3"></people>
          <primarysources
            v-else-if="currentTopicComponent == 4"
          ></primarysources>
          <terms v-else-if="currentTopicComponent == 5"></terms> -->
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import store from "@/store";
import storeTopic from "@/store/topic.js";
import intro from "@/components/Intro.vue";

// import trends from "@/components/Trends.vue";
// import developments from "@/components/Developments.vue";
// import people from "@/components/People.vue";
// import primarysources from "@/components/PrimarySources.vue";
// import terms from "@/components/Terms.vue";
import { db } from "@/main";

export default {
  name: "Topics",
  components: {
    intro,
    // trends,
    // developments,
    // people,
    // primarysources,
    // terms,
  },
  computed: {
    timePeriodHeaders() {
      return store.state.timePeriodHeaders[store.state.currentTimePeriod];
    },
    // currentTopicComponent() {
    //   return store.state.currentTopicComponent;
    // },
    // topicButtons() {
    //   return store.state.topicButtons;
    // },
    // trends() {
    //   return storeTopic.state.trends;
    // },
    topic() {
      return storeTopic.state.topic;
    },
    // color() {
    //   if (store.state.currentTopicComponent == 0) {
    //     return "white";
    //   } else {
    //     return "black";
    //   }
    // },
  },
  methods: {
    async topicFinder() {
      store.dispatch("setTimePeriod", this.$route.params.period);
      var newTopic
      await db.collection("topics")
        .doc(this.$route.params.topic)
        .get()
        .then(
          function(querySnapshot) {
            var entry = querySnapshot.data();
            entry.id = querySnapshot.id;
            newTopic = entry;
            storeTopic.dispatch("topicContent", newTopic);
          }.bind(this)
        );
    },
    select(i) {
      store.dispatch("setTopicButton", i);
      this.$router.replace({ name: "Topic", params: { category: i } });
    },
    back() {
      store.dispatch("setTopicButton", 0);
      this.$router.push({
        name: "Period",
        params: { period: this.$route.params.period },
      });
    },
  },
  mounted() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (Object.keys(storeTopic.state.topic).length === 0) {
      this.topicFinder();
    }
    // store.dispatch("setTopicButton", this.$route.params.category);
  },
};
</script>

<style type="text/css" scoped>
.background-filter::after {
  -webkit-backdrop-filter: blur(
    5px
  ); /* Use for Safari 9+, Edge 17+ (not a mistake) and iOS Safari 9.2+ */
  backdrop-filter: brightness(50%); /* Supported in Chrome 76 */
  content: "";
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
}
.background-filter {
  position: relative;
}
.background {
  background-size: cover;
  background-position: right 15% bottom 55%;
}
/* Use for content that should not be blurred */
.u-non-blurred {
  position: relative;
  z-index: 1;
}
.buttons {
  font-family: "Montserrat", sans-serif;
  letter-spacing: -0.5px;
  font-size: 14px;
  line-height: 18px;
  font-weight: 700;
}
.page_header {
  font-family: "Montserrat", sans-serif;
  letter-spacing: -0.5px;
  font-size: 34px;
  line-height: 0px;
}
</style>
