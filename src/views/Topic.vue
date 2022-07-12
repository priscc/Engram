<template>
  <div class="Topic" style="height: 100%">
    <v-container fluid>
      <v-row
        class="background background-filter white--text"
        style="height: 140px"
        :style="{
          'background-image': `url(${topic.topic_thumbURL})`,
        }"
      >
        <v-col cols="2" class="d-flex align-center u-non-blurred">
          <v-btn text @click="back" color="white">
            <v-icon class="pr-1" small dark>
              mdi-arrow-left-drop-circle-outline
            </v-icon>
            Back
          </v-btn>
        </v-col>
        <v-col class="d-flex flex-column justify-center u-non-blurred">
          <p class="caption">Time Period: {{ timePeriodHeaders.header }}</p>
          <p class="page_header mb-0" style="line-height: 20px">
            {{ topic.title }}
          </p>
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid class="mb-10 ml-3">
      <v-row>
        <v-col cols="2" class="d-flex flex-column pt-5">
          <div v-for="(t, index) in topicButtons" :key="index">
            <v-btn
              rounded
              :color="t.color"
              class="my-1 text-none"
              small
              style="width: 120px"
              @click="select(index)"
              elevation="0"
            >
              <p class="buttons mb-0">{{ t.title }}</p>
            </v-btn>
            <!--   <v-btn
              v-else-if="t.title != 'Trends'"
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
            </v-btn> -->
          </div>
        </v-col>
        <v-col class="pa-0 pt-5">
          <!-- make the  currentTopicComponent stored in the router-->
          <intro v-if="currentTopicComponent == 0"></intro>
          <trends v-if="currentTopicComponent == 1"></trends>
          <developments v-else-if="currentTopicComponent == 2"></developments>
          <people v-else-if="currentTopicComponent == 3"></people>
          <primarysources
            v-else-if="currentTopicComponent == 4"
          ></primarysources>
          <terms v-else-if="currentTopicComponent == 5"></terms>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import store from "@/store";
import storeTopic from "@/store/topic.js";
import intro from "@/components/Intro.vue";
import trends from "@/components/Trends.vue";
import developments from "@/components/Developments.vue";
import people from "@/components/People.vue";
import primarysources from "@/components/PrimarySources.vue";
import terms from "@/components/Terms.vue";
import { db } from "@/main";

export default {
  name: "Topics",
  components: {
    intro,
    trends,
    developments,
    people,
    primarysources,
    terms,
  },
  computed: {
    // ...mapGetters("index", ["timePeriodHeaders"]),
    timePeriodHeaders() {
      return store.state.timePeriodHeaders[store.state.currentTimePeriod];
    },
    currentTopicComponent() {
      return store.state.currentTopicComponent;
    },
    topicButtons() {
      return store.state.topicButtons;
    },
    trends() {
      return storeTopic.state.trends;
    },
    topic() {
      return storeTopic.state.topic;
    },
    color() {
      if (store.state.currentTopicComponent == 0) {
        return "white";
      } else {
        return "black";
      }
    },
  },
  methods: {
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
  async mounted() {
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
      storeTopic.dispatch("topicContent", newTopic);
    }
    store.dispatch("setTopicButton", this.$route.params.category);
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
