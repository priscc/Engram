<template>
  <div class="Topics" style="height: 100%">
    <v-container fluid class="pb-0 pt-2">
      <v-row>
        <v-col cols="2" class="d-flex align-center">
          <v-btn text @click="$router.go(-1)" :color="color">
            <v-icon class="pr-1" small dark>
              mdi-arrow-left-drop-circle-outline
            </v-icon>
            Back
          </v-btn>
        </v-col>
        <v-col class="d-flex align-center">
          <p class="page_header mb-0">{{ topic.title }}</p>
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid class="mb-10 ml-3">
      <v-row>
        <v-col cols="2" class="d-flex flex-column pt-5">
          <v-btn
            v-for="(t, index) in topicButtons"
            :key="index"
            rounded
            :color="t.color"
            class="my-1 text-none"
            small
            style="width: 120px"
            @click="select(index)"
            elevation="0"
          >
            <p class="buttons mb-0">{{ t.title }}</p>
          </v-btn>
        </v-col>
        <v-col lg="10" md="10" cols="12" class="pa-0 pt-5">
          <intro v-if="currentTopicComponent == 0"></intro>
          <developments v-else-if="currentTopicComponent == 1"></developments>
          <people v-else-if="currentTopicComponent == 2"></people>
          <primarysources
            v-else-if="currentTopicComponent == 3"
          ></primarysources>
          <terms v-else></terms>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import store from "@/store";
import storeTopic from "@/store/topic.js";
import intro from "@/components/Intro.vue";
import developments from "@/components/Developments.vue";
import people from "@/components/People.vue";
import primarysources from "@/components/PrimarySources.vue";
import terms from "@/components/Terms.vue";

export default {
  name: "Topics",
  components: {
    intro,
    developments,
    people,
    primarysources,
    terms,
  },
  computed: {
    currentTopicComponent() {
      return store.state.currentTopicComponent;
    },
    topicButtons() {
      return store.state.topicButtons;
    },
    topic() {
      return storeTopic.state.topic;
    },
    color() {
      if (store.state.currentTopicComponent == 1) {
        return "white";
      } else {
        return "black";
      }
    },
  },
  methods: {
    select(i) {
      store.dispatch("setTopicButton", i);
    },
  },
  mounted() {
    store.dispatch("setTopicButton", 0);
  },
};
</script>

<style type="text/css" scoped>
.buttons {
  font-family: "Montserrat", sans-serif;
  letter-spacing: -0.5px;
  font-size: 14px;
  line-height: 18px;
  font-weight: 700;
}
.page_header {
  font-family: "Montserrat", sans-serif;
  letter-spacing: -0.5px;
  font-size: 24px;
  line-height: 28px;
}
</style>
