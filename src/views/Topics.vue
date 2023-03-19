<template>
  <div id="Topics">
    <b-container class="topics_container" fluid>
      <div class="back_button" @click="back">
        <b-icon-caret-left aria-hidden="true" /> Back
      </div>
      <b-row class="period_header" align-h="between">
        <b-col sm="12" md="6" lg="6">{{ timePeriodHeaders.header }}</b-col>
        <b-col sm="12" md="6" lg="6" class="period_subheader">{{
          timePeriodHeaders.subheader
        }}</b-col>
      </b-row>

      <b-row v-for="unit in units" :key="unit.id" class="unit">
        <b-col>
          <p class="unit_header">
            {{ unit.unitHeader }}
          </p>
          <b-row>
            <b-col
              xl="3"
              lg="4"
              md="6"
              sm="12"
              v-for="topic in unit.topics"
              :key="topic.id"
            >
              <div class="card" @click="next(topic)">
                <b-img class="card_image" :src="topic.topic_thumbURL"></b-img>
                <div class="overlay overlay_2">
                  <p class="card_header">{{ topic.title }}</p>
                  <p class="card_subheader">({{ topic.timespan }})</p>
                </div>
              </div>
            </b-col>
          </b-row>
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
    };
  },
  computed: {
    timePeriodHeaders() {
      return store.state.timePeriodHeaders[store.state.currentTimePeriod];
    },
  },
  methods: {
    topic() {
      var topics = [];
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
            topics = topics.sort(function(a, b) {
              if (a.timespan && b.timespan) {
                var a1 = new Date(a.timespan.substring(0, 4));
                var a2 = a1.getFullYear();
                var b1 = new Date(b.timespan.substring(0, 4));
                var b2 = b1.getFullYear();
                return a2 - b2;
              }
            });
            topics.forEach(
              function(element) {
                const keys = Object.keys(this.units);
                if (keys.includes(element.unit)) {
                  this.units[element.unit].topics.push(element);
                }
              }.bind(this)
            );
          }.bind(this)
        );
    },
    back() {
      this.$router.push({ name: "Home" });
    },
    next(topic) {
      storeTopic.dispatch("setTopicContent", topic);
      this.$router.push({
        name: "Topic",
        params: { topic: topic.id, category: 0 },
      });
    },
  },
  created() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    store.dispatch("setTimePeriod", this.$route.params.period);
    this.units = this.timePeriodHeaders.unitTitles;
    var v = Object.keys(this.units).filter((unit) => this.units[unit].topics.length > 0);
    if (v.length == 0)
      this.topic();
  },
};
</script>

<style lang="sass" scoped src="@/assets/css/topics.sass"></style>
