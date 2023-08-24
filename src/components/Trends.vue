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
              <div class="trend_header" style="color: #FF9800" id = "Society">Society</div>
              <p v-for="(trend, index) in society_change" :key="index" class="trend_text">
                {{index + 1}}) {{ trend.trend }}
              </p>
            </b-col>
          </b-row>
          <!-- Economic -->
          <b-row v-if="economic_change.length > 0">
            <b-col>
              <div class="trend_header" style="color: #16a175" id = "Economic">Economic</div>
              <p v-for="(trend, index) in economic_change" :key="index" class="trend_text">
                {{index + 1}}) {{ trend.trend }}
              </p>
            </b-col>
          </b-row>
          <!-- Technology -->
          <b-row v-if="technology_change.length > 0">
            <b-col>
              <div class="trend_header" style="color: #009688" id = "Technology">Technology</div>
              <p v-for="(trend, index) in technology_change" :key="index" class="trend_text">
                {{index + 1}}) {{ trend.trend }}
              </p>
            </b-col>
          </b-row>
          <!-- Government -->
          <b-row v-if="politics_change.length > 0">
            <b-col>
              <div class="trend_header" style="color: #673AB7" id = "Political">Political</div>
              <p v-for="(trend, index) in politics_change" :key="index" class="trend_text">
                {{index + 1}}) {{ trend.trend }}
              </p>
            </b-col>
          </b-row>
          <!-- Culture -->
          <b-row v-if="culture_change.length > 0">
            <b-col>
              <div class="trend_header" style="color: #3b4da6" id = "Culture">Culture</div>
              <p v-for="(trend, index) in culture_change" :key="index" class="trend_text">
                {{index + 1}}) {{ trend.trend }}
              </p>
            </b-col>
          </b-row>
          <!-- Environment -->
          <b-row v-if="environment_change.length > 0">
            <b-col>
              <div class="trend_header" style="color: #b377ff" id = "Environment">Environment</div>
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
              <div class="trend_header" style="color: #FF9800" id = "Society">Society</div>
              <p v-for="(trend, index) in society_continuity" :key="index" class="trend_text">
                {{index + 1}}) {{ trend.trend }}
              </p>
            </b-col>
          </b-row>
          <!-- Economic -->
          <b-row v-if="economic_continuity.length > 0">
            <b-col>
              <div class="trend_header" style="color: #16a175" id = "Economic">Economic</div>
              <p v-for="(trend, index) in economic_continuity" :key="index" class="trend_text">
                {{index + 1}}) {{ trend.trend }}
              </p>
            </b-col>
          </b-row>
          <!-- Technology -->
          <b-row v-if="technology_continuity.length > 0">
            <b-col>
              <div class="trend_header" style="color: #009688" id = "Technology">Technology</div>
              <p v-for="(trend, index) in technology_continuity" :key="index" class="trend_text">
                {{index + 1}}) {{ trend.trend }}
              </p>
            </b-col>
          </b-row>
          <!-- Government -->
          <b-row v-if="politics_continuity.length > 0">
            <b-col>
              <div class="trend_header" style="color: #673AB7" id = "Political">Political</div>
              <p v-for="(trend, index) in politics_continuity" :key="index" class="trend_text">
                {{index + 1}}) {{ trend.trend }}
              </p>
            </b-col>
          </b-row>
          <!-- Culture -->
          <b-row v-if="culture_continuity.length > 0">
            <b-col>
              <div class="trend_header" style="color: #3b4da6" id = "Culture">Culture</div>
              <p v-for="(trend, index) in culture_continuity" :key="index" class="trend_text">
                {{index + 1}}) {{ trend.trend }}
              </p>
            </b-col>
          </b-row>
          <!-- Environment -->
          <b-row v-if="environment_continuity.length > 0">
            <b-col>
              <div class="trend_header" style="color: #b377ff" id = "Environment">Environment</div>
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
      console.log("Hello", storeTopic.state.trends);
      return storeTopic.state.trends.filter(((i) => (i.type == "society") & (String(i.trend).startsWith("Change"))));
    },
    society_continuity() {
      console.log("Hello", storeTopic.state.trends);
      return storeTopic.state.trends.filter(((i) => (i.type == "society") & (String(i.trend).startsWith("Continuity"))));
    },
    economic_change() {
      return storeTopic.state.trends.filter(((i) => (i.type == "economic") & (String(i.trend).startsWith("Change"))));
    },
    economic_continuity() {
      return storeTopic.state.trends.filter(((i) => (i.type == "economic") & (String(i.trend).startsWith("Continuity"))));
    },
    technology_change() {
      return storeTopic.state.trends.filter(((i) => (i.type == "technology") & (String(i.trend).startsWith("Change"))));
    },
    technology_continuity() {
      return storeTopic.state.trends.filter(((i) => (i.type == "technology") & (String(i.trend).startsWith("Continuity"))));
    },
    politics_change() {
      return storeTopic.state.trends.filter(((i) => (i.type == "politics") & (String(i.trend).startsWith("Change"))));
    },
    politics_continuity() {
      return storeTopic.state.trends.filter(((i) => (i.type == "politics") & (String(i.trend).startsWith("Continuity"))));
    },
    culture_change() {
      return storeTopic.state.trends.filter(((i) => (i.type == "culture") & (String(i.trend).startsWith("Change"))));
    },
    culture_continuity() {
      return storeTopic.state.trends.filter(((i) => (i.type == "culture") & (String(i.trend).startsWith("Continuity"))));
    },
    environment_change() {
      return storeTopic.state.trends.filter(((i) => (i.type == "environment") & (String(i.trend).startsWith("Change"))));
    },
    environment_continuity() {
      return storeTopic.state.trends.filter(((i) => (i.type == "environment") & (String(i.trend).startsWith("Continuity"))));
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