<template>
  <div
    class="Topics"
    style="height: 100%; color: black; background-color: #f2f2f2"
  >
    <v-container fluid class="pl-10 mb-10">
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
    <v-container fluid class="px-12">
      <v-row>
        <v-col
          cols="4"
          v-for="(topic, index) in topics"
          :key="index"
          class="d-flex flex-column align-center px-3"
          style="padding-bottom: 90px"
        >
          <v-card
            flat
            class="card"
            width="100%"
            @click="goTo(topic)"
            style="background: none"
          >
            <v-card-title
              class="topic_header d-flex flex-column justify-start align-center"
              style="word-break: normal; height: 100px; font-size: 140%"
            >
              {{ topic.title }}
            </v-card-title>
            <v-container>
              <v-row>
                <v-spacer></v-spacer>
                <v-col class="d-flex align-center">
                  <v-avatar color="grey darken-3" size="250">
                    <v-img
                      class="elevation-6"
                      :src="topic.topic_thumbURL"
                    ></v-img>
                  </v-avatar>
                </v-col>
                <v-spacer></v-spacer>
              </v-row>
            </v-container>
          </v-card>
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
.card:hover {
  opacity: 0.6;
}
.page_header {
  font-family: "Montserrat", sans-serif;
  letter-spacing: -0.5px;
  font-size: 44px;
  line-height: 46px;
}
.topic_header {
  min-height: 50px;
  text-align: center;
  font-family: "Montserrat", sans-serif;
  letter-spacing: -0.5px;
  line-height: 28px;
  font-weight: 600;
}
</style>
