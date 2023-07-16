<template>
  <div id="Trends">
    <b-container fluid>
      <b-row lg="6" md="6" sm="12" xs="12">
        <div class="title">Change and Continuity</div>
        <b-col :class="border">
          <div class="trend_header" style="color: #000000">Change</div>
          <!-- Social -->
          <b-row v-if="society.length > 0">
            <b-col>
              <div class="trend_header" style="color: #FF9800">Society</div>
              <p v-for="(trend, index) in society" :key="index" class="trend_text">
                {{index + 1}}) {{ trend.trend }}
              </p>
            </b-col>
          </b-row>
          <!-- Economic -->
          <b-row v-if="economic.length > 0">
            <b-col>
              <div class="trend_header" style="color: #16a175">Economic</div>
              <p v-for="(trend, index) in economic" :key="index" class="trend_text">
                {{index + 1}}) {{ trend.trend }}
              </p>
            </b-col>
          </b-row>
          <!-- Technology -->
          <b-row v-if="technology.length > 0">
            <b-col>
              <div class="trend_header" style="color: #009688">Technology</div>
              <p v-for="(trend, index) in technology" :key="index" class="trend_text">
                {{index + 1}}) {{ trend.trend }}
              </p>
            </b-col>
          </b-row>
          <!-- Government -->
          <b-row v-if="politics.length > 0">
            <b-col>
              <div class="trend_header" style="color: #673AB7">Political</div>
              <p v-for="(trend, index) in politics" :key="index" class="trend_text">
                {{index + 1}}) {{ trend.trend }}
              </p>
            </b-col>
          </b-row>
          <!-- Culture -->
          <b-row v-if="culture.length > 0">
            <b-col>
              <div class="trend_header" style="color: #3b4da6">Culture</div>
              <p v-for="(trend, index) in culture" :key="index" class="trend_text">
                {{index + 1}}) {{ trend.trend }}
              </p>
            </b-col>
          </b-row>
          <!-- Environment -->
          <b-row v-if="environment.length > 0">
            <b-col>
              <div class="trend_header" style="color: #b377ff">Environment</div>
              <p v-for="(trend, index) in environment" :key="index" class="trend_text">
                {{index + 1}}) {{ trend.trend }}
              </p>
            </b-col>
          </b-row>
        </b-col>
        <b-col lg="6" md="6" sm="12" xs="12">
          <div class="trend_header" style="color: #000000">Continuity</div>
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
    border: function() {
      let width = window.screen.width
      console.log(width)
      if (width < 720) {
        return "border-0"
      }
      else {
        return "border-end"
      }
    },
    society() {
      console.log("test", storeTopic.state.trends);
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