<template>
  <div class="Home" style="height: 100%">
    <v-container fluid style="background-color: black">
      <v-row>
        <v-col class="d-flex justify-start">
          <!-- <v-card dark tile> -->
          <p class="page_header white--text pl-8">AP World History Units</p>
          <!-- </v-card> -->
        </v-col>
      </v-row>
    </v-container>
    <v-container
      fluid
      style="height: 100%"
      class="d-flex align-strech flex-column"
    >
      <v-row>
        <v-col
          v-for="(timePeriod, index) in timePeriodHeaders"
          :key="index"
          class="d-flex flex-column justify-start pa-0 topic"
          style="border: none"
          :style="{
            'background-image':
              'url(' + require(`@/assets/${timePeriod.img}`) + ')',
          }"
          @click="expand(index)"
        >
          <div class="ma-3">
            <p class="topic_header">{{ timePeriod.header }}</p>
            <p class="topic_subheader">{{ timePeriod.subheader }}</p>
          </div>
        </v-col>
      </v-row>
      <!-- </v-layout> -->
    </v-container>
  </div>
</template>

<script>
import store from "@/store";
export default {
  name: "Home",
  data() {
    return {
      image:
        "http://1.bp.blogspot.com/-8PfnHfgrH4I/TylX2v8pTMI/AAAAAAAAJJ4/TICBoSEI57o/s1600/search_by_image_image.png",
    };
  },
  computed: {
    timePeriodHeaders() {
      return store.state.timePeriodHeaders;
    },
  },
  methods: {
    expand(i) {
      store.dispatch("setTimePeriod", i);
      this.$router.push({ name: "Period", params: { period: i } });
    },
  },
};
</script>

<style type="text/css" scoped>
.topic:hover {
  opacity: 0.5;
  cursor: pointer;
}
.page_header {
  font-family: "Montserrat", sans-serif;
  font-size: 34px;
  font-weight: 750;
}
.topic_header {
  font-family: "Montserrat", sans-serif;
  font-size: 30px;
  font-weight: 750;
  color: white;
}
.topic_subheader {
  font-family: "Montserrat", sans-serif;
  font-size: 25px;
  font-weight: 500;
  color: white;
}
</style>
