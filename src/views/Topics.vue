<template>
  <div
    class="Topics"
    :class="timePeriodHeaders.color"
    style="height: 100%; color: black"
  >
    <v-container fluid class="mb-10">
      <v-row>
        <v-col>
          <v-btn text @click="$router.go(-1)">
            <v-icon class="d-flex align-center pr-1" small dark>
              mdi-arrow-left-drop-circle-outline
            </v-icon>
            Back
          </v-btn>
          <p class="page_header pl-5 mb-0">{{ timePeriodHeaders.header }}</p>
          <p class="page_header pl-5">{{ timePeriodHeaders.subheader }}</p>
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid style="padding-left: 7%; padding-right: 7%">
      <v-row>
        <v-col
          v-for="(topic, index) in topics"
          :key="index"
          class="d-flex flex-column align-center pb-10"
        >
          <v-hover v-slot="{ hover }">
            <div
              class="hey"
              :class="{ 'on-hover': hover }"
              @click="goTo(topic)"
            >
              <p class="topic_header">{{ topic.title }}</p>
              <v-avatar size="200">
                <v-img :src="topic.topic_thumbURL"></v-img>
              </v-avatar>
            </div>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import store from "@/store";
import storeTopic from "@/store/topic.js";
import { db } from "@/main";
export default {
  name: "Topics",
  data() {
    return {
      topics: [],
    };
  },
  computed: {
    timePeriodHeaders() {
      return store.state.timePeriodHeaders[store.state.currentTimePeriod];
    },
  },
  methods: {
    topic() {
      db.collection("topics")
        .where("timePeriod", "==", this.timePeriodHeaders.timePeriod)
        .get()
        .then(
          function (querySnapshot) {
            querySnapshot.forEach(
              function (doc) {
                var entry = doc.data();
                entry.id = doc.id;
                this.topics.push(entry);
              }.bind(this)
            );
          }.bind(this)
        );
    },
    goTo(topic) {
      storeTopic.dispatch("topicContent", topic);
      this.$router.push({ name: "Topic", params: { id: topic.title } });
    },
  },
  mounted() {
    this.topic();
  },
};
</script>

<style type="text/css" scoped>
img {
  border-radius: 50px;
}
.hey:not(.on-hover) {
  opacity: 0.7;
}
.page_header {
  font-family: "Montserrat", sans-serif;
  letter-spacing: -0.5px;
  font-size: 24px;
  line-height: 28px;
}
.topic_header {
  min-height: 50px;
  text-align: center;
  font-family: "Montserrat", sans-serif;
  letter-spacing: -0.5px;
  font-size: 30px;
  line-height: 28px;
  font-weight: 600;
}
</style>
