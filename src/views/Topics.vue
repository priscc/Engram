<template>
  <div>
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

      <b-row v-for="unit in units" :key="unit.id" style="padding-bottom: 100px">
        <b-col>
          <p class="unit_header">
            {{ unit.unitHeader }}
          </p>

          <b-row>
            <b-col
              lg="4"
              md="4"
              sm="12"
              v-for="topic in unit.topics"
              :key="topic.id"
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
      // store.dispatch("setTopicButton", 0);
      this.$router.push({ name: "Home" });
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
    store.dispatch("setTimePeriod", this.$route.params.period);
    var o = 0;
    Object.keys(this.timePeriodHeaders.unitTitles).forEach(function(unit) {
      if (this.timePeriodHeaders.unitTitles[unit].topics.length > 0) o++;
    }.bind(this));
    this.units = this.timePeriodHeaders.unitTitles;
    if (o == 0) this.topic();
  },
};
</script>

<style lang="sass" scoped src="@/assets/css/topics.sass"></style>
