<template>
  <div class="Home" style="height: 100%; color: black">
    <v-container fluid fill-height>
      <v-layout>
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
      </v-layout>
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
      this.$router.push("/Topics");
    },
  },
};
</script>

<style type="text/css" scoped>
.topic:hover {
  opacity: 0.5;
  cursor: pointer;
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
