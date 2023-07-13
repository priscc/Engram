<template>
  <div id="Trends">
    <b-container fluid>
      <b-row>
        <div class="title">Trends</div>
      </b-row>
      <!-- Social -->
      <b-row v-if="society.length > 0">
        <b-col>
          <div class="header-1" style="color: #FF9800">Society</div>
          <p v-for="(trend, index) in society" :key="index" class="text">
            {{index + 1}}) {{ trend.trend }}
          </p>
        </b-col>
      </b-row>
      <!-- Economic -->
      <b-row v-if="economic.length > 0">
        <b-col>
          <div class="header-1" style="color: #16a175">Economic</div>
          <p v-for="(trend, index) in economic" :key="index" class="text">
            {{index + 1}}) {{ trend.trend }}
          </p>
        </b-col>
      </b-row>
      <!-- Technology -->
      <b-row v-if="technology.length > 0">
        <b-col>
          <div class="header-1" style="color: #009688">Technology</div>
          <p v-for="(trend, index) in technology" :key="index" class="text">
            {{index + 1}}) {{ trend.trend }}
          </p>
        </b-col>
      </b-row>
      <!-- Government -->
      <b-row v-if="politics.length > 0">
        <b-col>
          <div class="header-1" style="color: #673AB7">Political</div>
          <p v-for="(trend, index) in politics" :key="index" class="text">
            {{index + 1}}) {{ trend.trend }}
          </p>
        </b-col>
      </b-row>
      <!-- Culture -->
      <b-row v-if="culture.length > 0">
        <b-col>
          <div class="header-1" style="color: #3b4da6">Culture</div>
          <p v-for="(trend, index) in culture" :key="index" class="text">
            {{index + 1}}) {{ trend.trend }}
          </p>
        </b-col>
      </b-row>
      <!-- Environment -->
      <b-row v-if="environment.length > 0">
        <b-col>
          <div class="header-1" style="color: #b377ff">Environment</div>
          <p v-for="(trend, index) in environment" :key="index" class="text">
            {{index + 1}}) {{ trend.trend }}
          </p>
        </b-col>
      </b-row>
    </b-container>
    <comingsoon v-if="comingSoon == 0"></comingsoon>
  </div>
</template>

<script>
import storeTopic from "@/store/topic.js";
import comingsoon from "./ComingSoon.vue";

export default {
  name: "Trends",
  components: { comingsoon },
  computed: {
    society() {
      return storeTopic.state.trends.filter((i) => i.type == "society");
    },
    economic() {
      return storeTopic.state.trends.filter((i) => i.type == "economic");
    },
    technology() {
      return storeTopic.state.trends.filter((i) => i.type == "technology");
    },
    politics() {
      return storeTopic.state.trends.filter((i) => i.type == "politics");
    },
    culture() {
      return storeTopic.state.trends.filter((i) => i.type == "culture");
    },
    environment() {
      return storeTopic.state.trends.filter((i) => i.type == "environment");
    },
    comingSoon() {
      return storeTopic.state.trends.length;
    },
  },
  mounted() {
    storeTopic.dispatch("setTopicTrends", this.$route.params.topic);
  },
};
</script>

<style lang="sass" scoped src="@/assets/css/topicContent.sass"></style>
