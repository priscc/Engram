<template>
  <div id="Topic" :style="styleObject">
    <b-container fluid>
      <b-row
        class="background background_filter"
        :style="{
          'background-image': `url(${topic.topic_thumbURL})`,
        }"
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
    <b-container fluid class="mb-5 ml-3">
      <b-row class="pt-5">
        <b-col lg="2" md="2" sm="12" class="d-flex flex-column">
          <div v-for="(button, index) in topicButtons" :key="index">
            <div class="category_button" @click="loadCategory(index)">
              {{ button }}
            </div>
          </div>
        </b-col>
        <b-col class="pa-0">
          <!-- make the  currentTopicComponent stored in the router-->
          <intro v-if="currentTopicComponent == 0" :topic="topic"></intro>
          <trends v-else-if="currentTopicComponent == 1"></trends>
          <developments v-else-if="currentTopicComponent == 2"></developments>
          <people v-else-if="currentTopicComponent == 3"></people>
          <primarysources
            v-else-if="currentTopicComponent == 4"
          ></primarysources>
          <terms v-else-if="currentTopicComponent == 5"></terms>
        </b-col>
      </b-row>
    </b-container>
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
  data() {
    return {
      topicButtons: [
        "Introduction",
        "Trends",
        "Events",
        "People",
        "Sources",
        "Terms",
      ],
      styleObject: {
        "background-color": "white",
        color: "black",
      },
    };
  },
  computed: {
    timePeriodHeaders() {
      return store.state.timePeriodHeaders[store.state.currentTimePeriod];
    },
    currentTopicComponent() {
      return store.state.currentTopicComponent;
    },
    topic() {
      return storeTopic.state.topic;
    },
  },
  methods: {
    async topicFinder() {
      store.dispatch("setTimePeriod", this.$route.params.period);
      var newTopic;
      await db
        .collection("topics")
        .doc(this.$route.params.topic)
        .get()
        .then(
          function(querySnapshot) {
            var entry = querySnapshot.data();
            entry.id = querySnapshot.id;
            newTopic = entry;
            storeTopic.dispatch("setTopicContent", newTopic);
          }.bind(this)
        );
    },
    back() {
      store.dispatch("setTopicButton", 0);
      this.$router.push({
        name: "Period",
        params: { period: this.$route.params.period },
      });
    },
    loadCategory(i) {
      store.dispatch("setTopicButton", i);
      this.$router.replace({ name: "Topic", params: { category: i } });
      this.changeBackgroundColor(i)
    },
    changeBackgroundColor(i){
      if (i == 2) {
        this.styleObject["background-color"] = "black";
        this.styleObject['color'] = "white";
      }
      else{
        this.styleObject["background-color"] = "white";
        this.styleObject['color'] = "black";
      }
    }
  },
  mounted() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    console.log("mounted topic");
    if (Object.keys(storeTopic.state.topic).length === 0) {
      console.log("reloading topic");
      this.topicFinder();
    }
    store.dispatch("setTopicButton", this.$route.params.category);
    this.changeBackgroundColor(this.$route.params.category)
  },
};
</script>

<style lang="sass" scoped src="@/assets/css/topicContent.sass"></style>
