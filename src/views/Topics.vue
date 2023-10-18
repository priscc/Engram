<template>
  <div id="Topics">
    <b-container class="topics_container">
      <div class="back_button" @click="back">
        <b-icon-caret-left aria-hidden="true" /> Back
      </div>
      <b-row>
        <b-col sm="12" md="6" lg="6" class="period_header">
          {{ timePeriodHeaders.header }}
        </b-col>
        <b-col sm="12" md="6" lg="6" class="period_subheader">
          {{ timePeriodHeaders.subheader }}
        </b-col>
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
              <div class="topic_card" @click="next(topic)">
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

export default {
  name: "Topics",
  computed: {
    timePeriodHeaders() {
      return store.state.timePeriodHeaders[store.state.currentTimePeriod];
    },
    units() {
      return store.state.units;
    },
  },
  methods: {
    back() {
      this.$router.push({ name: "Units" });
    },
    next(topic) {
      storeTopic.dispatch("setTopicContent", topic);
      this.$router.push({
        name: "Topic",
        params: {
          topicName: topic.title,
          topic: topic.id,
          category: "Introduction",
        },
      });
    },
  },
  mounted() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (this.units.length == 0) {
      store.dispatch("setTimePeriod", this.$route.params.period);
    }
  },
};
</script>

<style lang="sass" scoped src="@/assets/css/topics.sass"></style>
