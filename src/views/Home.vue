<template>
  <div class="Home" style="height: 100%; color: black">
    <v-container fluid fill-height>
      <v-layout>
        <v-row>
          <v-col
            v-for="(timePeriod, index) in timePeriodHeaders"
            :key="index"
            :class="timePeriod.color"
            class="d-flex flex-column justify-end pa-0"
          >
            <div
              class="d-flex align-strech topic"
              style="height: 100%"
              @click="expand(index)"
            ></div>
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
  background-color: #5c00d2;
  cursor: pointer;
}
.topic_header {
  font-family: "Montserrat", sans-serif;
  font-size: 30px;
  font-weight: 750;
}
.topic_subheader {
  font-family: "Montserrat", sans-serif;
  font-size: 25px;
  font-weight: 500;
}
</style>
