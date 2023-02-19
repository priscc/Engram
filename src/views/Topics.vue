<template>
  <div>
    <b-container fluid class="pl-10 mb-10">
      <b-row>
        <b-col>
          <b-btn text @click="back">
            <b-icon class="pr-1" small dark>
              mdi-arrow-left-drop-circle-outline
            </b-icon>
            Back
          </b-btn>
          <b-row class="d-flex b-col justify-space-between px-12 pt-12">
            <p class="page_header">{{ timePeriodHeaders.header }}</p>
            <p class="page_header font-weight-light font-italic">
              {{ timePeriodHeaders.subheader }}
            </p>
          </b-row>
          <!-- <p class="page_header pl-5">{{ timePeriodHeaders.unitTitles }}</p> -->
        </b-col>
      </b-row>
    </b-container>
    
    <b-container fluid class="px-12">
      <b-row style="padding-bottom: 100px">
        <b-col
          lg="4"
          md="4"
          sm="12"
          v-for="(topic, index) in topics"
          :key="index"
          class="d-flex align-left px-3"
        >
          <b-card
            flat
            class="card"
            width="100%"
            @click="goTo(topic)"
            style="background: none"
          >
            <div style=" height: 100px; ">
              <b-card-title
                class="pb-0 topic_header d-flex flex-column justify-start align-center"
                style="word-break: normal;font-size: 140%"
              >
                {{ topic.title }}
              </b-card-title>
              <b-card-title
                class="pt-0 topic_header d-flex flex-column justify-start align-center"
              >
                ({{ topic.timespan }})
              </b-card-title>
            </div>
            <b-container>
              <b-row>
                <b-spacer></b-spacer>
                <b-col class="d-flex align-center">
                  <b-avatar color="grey darken-3" size="250">
                    <b-img
                      class="elevation-6"
                      :src="topic.topic_thumbURL"
                    ></b-img>
                  </b-avatar>
                </b-col>
                <b-spacer></b-spacer>
              </b-row>
            </b-container>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import store from "@/store";
import storeTopic from "@/store/topic.js";
import { db } from "@/main";
export default {
  name: "Topics",
  data() {
    return {
      units: {},
      test: [],
      topics: [],
    };
  },
  computed: {
    timePeriodHeaders() {
      return store.state.timePeriodHeaders[store.state.currentTimePeriod];
    },
  },
  methods: {
    myProducts() {
      const keys = Object.keys(this.units);

      keys.forEach(
        function(element) {
          var unitHeader = element;
          var topics = [];
          if (this.units[element].length != 0) topics = this.units[element];
          console.log("HI", unitHeader, topics);
          var obj = {};
          obj["unitHeader"] = unitHeader;
          obj["topics"] = topics;
          this.test.push(obj);
        }.bind(this)
      );
      console.log("UNITS", this.test);
    },
    back() {
      // store.dispatch("setTopicButton", 0);
      this.$router.push({
        name: "Home",
      });
    },
    topic() {
      var topics = [];
      this.timePeriodHeaders.unitTitles.forEach(
        function(element) {
          this.units[element] = [];
        }.bind(this)
      );
      db.collection("topics")
        .where("timePeriod", "==", this.timePeriodHeaders.timePeriod)
        .get()
        .then(
          function(querySnapshot) {
            querySnapshot.forEach(
              function(doc) {
                var entry = doc.data();
                entry.id = doc.id;
                topics.push(entry);
              }.bind(this)
            );
            this.topics = topics.sort(function(a, b) {
              if (a.timespan && b.timespan) {
                var a1 = new Date(a.timespan.substring(0, 4));
                var a2 = a1.getFullYear();
                var b1 = new Date(b.timespan.substring(0, 4));
                var b2 = b1.getFullYear();
                return a2 - b2;
              }
            });

          }.bind(this)
        );
    },
    goTo(topic) {
      storeTopic.dispatch("topicContent", topic);
      this.$router.push({
        name: "Topic",
        params: { topic: topic.id, category: 0 },
      });
    },
  },
  mounted() {
    console.log("mounted in topics", this.$route.params.period);
    store.dispatch("setTimePeriod", this.$route.params.period);
    this.topic();
  },
};
</script>

<style type="text/css" scoped>
.card:hover {
  opacity: 0.6;
}
/*}
.page_header {
  font-family: "Montserrat", sans-serif;
  letter-spacing: -0.3px;
  font-size: 40px;
  line-height: 46px;
}
.page_unitHeader {
  font-family: "Montserrat", sans-serif;
  letter-spacing: -0.5px;
  font-size: 20px;
  line-height: 46px;
  /*font-weight: 600;*/
/*text-decoration: underline;*/
/*}*/
/*.topic_header {
  min-height: 50px;
  text-align: center;
  font-family: "Montserrat", sans-serif;
  letter-spacing: -0.5px;
  line-height: 28px;
  /*font-weight: 600;*/
/*}*/
</style>
