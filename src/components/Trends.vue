<template>
  <div id="app" style="background-color: black; color: white; height: 100%">
    <v-container fluid class="pt-0" style="background-color: black">
      <v-row class="pt-0">
        <v-col class="pt-0 pb-10">
          <h3>Trends</h3>
          <p class="subtitle">
            The following ‘Trends’ are meant to aid in your understanding of
            threads that connect inside each topic.
          </p>
        </v-col>
      </v-row>

      <!-- Social -->
      <v-row v-if="social.length > 0">
        <v-col cols="5" class="pt-0">
          <h3 style="color: #faff01">Social</h3>
          <p
            v-for="(i, index) in social[0].trends"
            :key="index"
            class="intro_paragraph intro_content"
          >
            {{ i }}
          </p>
        </v-col>
      </v-row>
      <!-- Economic -->
      <v-row v-if="economic.length > 0">
        <v-col cols="5" class="pt-0">
          <h3 style="color: #16a175">Economic</h3>
          <p
            v-for="(i, index) in economic[0].trends"
            :key="index"
            class="intro_paragraph intro_content"
          >
            {{ i }}
          </p>
        </v-col>
      </v-row>
      <!-- Technology -->
      <v-row v-if="technology.length > 0">
        <v-col cols="5" class="pt-0">
          <h3 style="color: #8e826c">Technology</h3>
          <p
            v-for="(i, index) in technology[0].trends"
            :key="index"
            class="intro_paragraph intro_content"
          >
            {{ i }}
          </p>
        </v-col>
      </v-row>
      <!-- Government -->
      <v-row v-if="government.length > 0">
        <v-col cols="5" class="pt-0">
          <h3 style="color: #ff6263">Government</h3>
          <p
            v-for="(i, index) in government[0].trends"
            :key="index"
            class="intro_paragraph intro_content"
          >
            {{ i }}
          </p>
        </v-col>
      </v-row>
      <!-- Culture -->
      <v-row v-if="culture.length > 0">
        <v-col cols="5" class="pt-0">
          <h3 style="color: #3b4da6">Culture</h3>
          <p
            v-for="(i, index) in culture[0].trends"
            :key="index"
            class="intro_paragraph intro_content"
          >
            {{ i }}
          </p>
        </v-col>
      </v-row>
      <!-- Environment -->
      <v-row v-if="environment.length > 0">
        <v-col cols="5" class="pt-0">
          <h3 style="color: #b377ff">Environment</h3>
          <p
            v-for="(i, index) in environment[0].trends"
            :key="index"
            class="intro_paragraph intro_content"
          >
            {{ i }}
          </p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// import articles from "@/components/Articles.vue";
import storeTopic from "@/store/topic.js";

export default {
  name: "Trends",
  computed: {
    social() {
      return storeTopic.state.trends.filter((i) => i.type == "social");
    },
    economic() {
      return storeTopic.state.trends.filter((i) => i.type == "economic");
    },
    technology() {
      return storeTopic.state.trends.filter((i) => i.type == "technology");
    },
    government() {
      return storeTopic.state.trends.filter((i) => i.type == "government");
    },
    culture() {
      return storeTopic.state.trends.filter((i) => i.type == "culture");
    },
    environment() {
      return storeTopic.state.trends.filter((i) => i.type == "environment");
    },
  },
};
</script>

<style type="text/css" scoped>
h3 {
  font-family: "Montserrat", sans-serif;
  font-size: 30px;
  font-weight: 620;
}
h5 {
  line-height: 1;
  word-break: normal;
}
.intro_headers {
  font-weight: 500;
}
.article {
  overflow: hidden;
  line-height: 1rem;
  max-height: 3rem;
  -webkit-box-orient: vertical;
  display: block;
  display: -webkit-box;
  overflow: hidden !important;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
}
div.intro_top {
  position: relative;
  width: 100%;
  height: 100%;
  /*border: 1px solid blue;*/
  padding-left: 9%;
}
div.intro_image {
  position: absolute;
  right: 0px;
  width: 60%;
  height: 100%;
  /*border: 1px solid red;*/
}
.intro_content {
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  line-height: 14px;
  font-weight: 500;
  /*position: relative;*/
  /*max-width: 35%;*/
  /*border: 1px solid green;*/
}
.intro_paragraph {
  /*background-color: white;*/
}
.intro_bottom {
  padding-left: 9%;
}
</style>
