<template>
  <div id="Trends">
    <b-container fluid>
      <b-row>
        <div class="title">Trends</div>
      </b-row>
      <!-- Social -->
      <b-row v-if="social.length > 0">
        <b-col >
          <div class="header-1" style="color: #FF9800">Social</div>
          <p v-for="(i, index) in social[0].trends" :key="index" class="text">
            {{ i }}
          </p>
        </b-col>
      </b-row>
      <!-- Economic -->
      <b-row v-if="economic.length > 0">
        <b-col >
          <div class="header-1" style="color: #16a175">Economic</div>
          <p v-for="(i, index) in economic[0].trends" :key="index" class="text">
            {{ i }}
          </p>
        </b-col>
      </b-row>
      <!-- Technology -->
      <b-row v-if="technology.length > 0">
        <b-col >
          <div class="header-1" style="color: #009688">Technology</div>
          <p
            v-for="(i, index) in technology[0].trends"
            :key="index"
            class="text"
          >
            {{ i }}
          </p>
        </b-col>
      </b-row>
      <!-- Government -->
      <b-row v-if="government.length > 0">
        <b-col >
          <div class="header-1" style="color: #673AB7">Government</div>
          <p
            v-for="(i, index) in government[0].trends"
            :key="index"
            class="text"
          >
            {{ i }}
          </p>
        </b-col>
      </b-row>
      <!-- Culture -->
      <b-row v-if="culture.length > 0">
        <b-col >
          <div class="header-1" style="color: #3b4da6">Culture</div>
          <p v-for="(i, index) in culture[0].trends" :key="index" class="text">
            {{ i }}
          </p>
        </b-col>
      </b-row>
      <!-- Environment -->
      <b-row v-if="environment.length > 0">
        <b-col >
          <div class="header-1" style="color: #b377ff">Environment</div>
          <p
            v-for="(i, index) in environment[0].trends"
            :key="index"
            class="text"
          >
            {{ i }}
          </p>
        </b-col>
      </b-row>
      <comingsoon v-if="comingSoon == 0"></comingsoon>
    </b-container>
  </div>
</template>

<script>
import storeTopic from "@/store/topic.js";
import comingsoon from "./ComingSoon.vue";

export default {
  name: "Trends",
  components: { comingsoon },
  computed: {
    social() {
      return storeTopic.state.trends.filter(i => i.type == "society");
    },
    economic() {
      return storeTopic.state.trends.filter(i => i.type == "economic");
    },
    technology() {
      return storeTopic.state.trends.filter(i => i.type == "technology");
    },
    government() {
      return storeTopic.state.trends.filter(i => i.type == "politics");
    },
    culture() {
      return storeTopic.state.trends.filter(i => i.type == "culture");
    },
    environment() {
      return storeTopic.state.trends.filter(i => i.type == "environment");
    },
    comingSoon() {
      return storeTopic.state.trends.length;
    }
  },
  mounted() {
    storeTopic.dispatch("setTopicTrends", this.$route.params.topic);
  }
};
</script>

<style lang="sass" scoped src="@/assets/css/topicContent.sass"></style>
