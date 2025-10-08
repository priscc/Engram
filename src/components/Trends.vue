<template>
  <div id="Trends">
    <b-container fluid>
      <b-row lg="6" md="6" sm="12" xs="12">
        <div class="title">Change and Continuity</div>
        <b-col :class="border">
          <div class="trend_header" style="color: #000000">Change</div>
          <!-- Social -->
          <b-row v-if="society_change.length > 0">
            <b-col>
              <div class="trend_header" style="color: #FF9800">Society</div>
              <p v-for="(trend, index) in society_change" :key="index" class="trend_text">
                {{index + 1}}) {{ trend.trend }}
              </p>
            </b-col>
          </b-row>
          <!-- Economic -->
          <b-row v-if="economic_change.length > 0">
            <b-col>
              <div class="trend_header" style="color: #16a175">Economic</div>
              <p v-for="(trend, index) in economic_change" :key="index" class="trend_text">
                {{index + 1}}) {{ trend.trend }}
              </p>
            </b-col>
          </b-row>
          <!-- Technology -->
          <b-row v-if="technology_change.length > 0">
            <b-col>
              <div class="trend_header" style="color: #009688">Technology</div>
              <p v-for="(trend, index) in technology_change" :key="index" class="trend_text">
                {{index + 1}}) {{ trend.trend }}
              </p>
            </b-col>
          </b-row>
          <!-- Government -->
          <b-row v-if="politics_change.length > 0">
            <b-col>
              <div class="trend_header" style="color: #673AB7">Political</div>
              <p v-for="(trend, index) in politics_change" :key="index" class="trend_text">
                {{index + 1}}) {{ trend.trend }}
              </p>
            </b-col>
          </b-row>
          <!-- Culture -->
          <b-row v-if="culture_change.length > 0">
            <b-col>
              <div class="trend_header" style="color: #3b4da6">Culture</div>
              <p v-for="(trend, index) in culture_change" :key="index" class="trend_text">
                {{index + 1}}) {{ trend.trend }}
              </p>
            </b-col>
          </b-row>
          <!-- Environment -->
          <b-row v-if="environment_change.length > 0">
            <b-col>
              <div class="trend_header" style="color: #b377ff">Environment</div>
              <p v-for="(trend, index) in environment_change" :key="index" class="trend_text">
                {{index + 1}}) {{ trend.trend }}
              </p>
            </b-col>
          </b-row>
        </b-col>
        <b-col lg="6" md="6" sm="12" xs="12">
          <div class="trend_header" style="color: #000000">Continuity</div>
          <!-- Social -->
          <b-row v-if="society_continuity.length > 0">
            <b-col>
              <div class="trend_header" style="color: #FF9800">Society</div>
              <p v-for="(trend, index) in society_continuity" :key="index" class="trend_text">
                {{index + 1}}) {{ trend.trend }}
              </p>
            </b-col>
          </b-row>
          <!-- Economic -->
          <b-row v-if="economic_continuity.length > 0">
            <b-col>
              <div class="trend_header" style="color: #16a175">Economic</div>
              <p v-for="(trend, index) in economic_continuity" :key="index" class="trend_text">
                {{index + 1}}) {{ trend.trend }}
              </p>
            </b-col>
          </b-row>
          <!-- Technology -->
          <b-row v-if="technology_continuity.length > 0">
            <b-col>
              <div class="trend_header" style="color: #009688">Technology</div>
              <p v-for="(trend, index) in technology_continuity" :key="index" class="trend_text">
                {{index + 1}}) {{ trend.trend }}
              </p>
            </b-col>
          </b-row>
          <!-- Government -->
          <b-row v-if="politics_continuity.length > 0">
            <b-col>
              <div class="trend_header" style="color: #673AB7">Political</div>
              <p v-for="(trend, index) in politics_continuity" :key="index" class="trend_text">
                {{index + 1}}) {{ trend.trend }}
              </p>
            </b-col>
          </b-row>
          <!-- Culture -->
          <b-row v-if="culture_continuity.length > 0">
            <b-col>
              <div class="trend_header" style="color: #3b4da6">Culture</div>
              <p v-for="(trend, index) in culture_continuity" :key="index" class="trend_text">
                {{index + 1}}) {{ trend.trend }}
              </p>
            </b-col>
          </b-row>
          <!-- Environment -->
          <b-row v-if="environment_continuity.length > 0">
            <b-col>
              <div class="trend_header" style="color: #b377ff">Environment</div>
              <p v-for="(trend, index) in environment_continuity" :key="index" class="trend_text">
                {{index + 1}}) {{ trend.trend }}
              </p>
            </b-col>
          </b-row>
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
    society_change() {
      return storeTopic.state.trends.filter((i) => i.type === "society" && i.trendName === "change");
    },
    economic_change() {
      return storeTopic.state.trends.filter((i) => i.type == "economic" && i.trendName === "change");
    },
    technology_change() {
      return storeTopic.state.trends.filter((i) => i.type == "technology" && i.trendName === "change");
    },
    politics_change() {
      return storeTopic.state.trends.filter((i) => i.type == "politics" && i.trendName === "change");
    },
    culture_change() {
      return storeTopic.state.trends.filter((i) => i.type == "culture" && i.trendName === "change");
    },
    environment_change() {
      return storeTopic.state.trends.filter((i) => i.type == "environment" && i.trendName === "change");
    },
    society_continuity() {
      return storeTopic.state.trends.filter((i) => i.type === "society" && i.trendName === "continuity");
    },
    economic_continuity() {
      return storeTopic.state.trends.filter((i) => i.type == "economic" && i.trendName === "continuity");
    },
    technology_continuity() {
      return storeTopic.state.trends.filter((i) => i.type == "technology" && i.trendName === "continuity");
    },
    politics_continuity() {
      return storeTopic.state.trends.filter((i) => i.type == "politics" && i.trendName === "continuity");
    },
    culture_continuity() {
      return storeTopic.state.trends.filter((i) => i.type == "culture" && i.trendName === "continuity");
    },
    environment_continuity() {
      return storeTopic.state.trends.filter((i) => i.type == "environment" && i.trendName === "continuity");
    },
    
  },
  mounted() {
    storeTopic.dispatch("setTopicTrends", this.$route.params.topic);
  },
};
</script>

<style lang="sass" scoped src="@/assets/css/topicContent.sass"></style>