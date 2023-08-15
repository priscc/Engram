<template>
  <div id="Topic">
    <b-container fluid>
      <b-row
        class="background background_filter"
        :style="{ 'background-image': `url(${topic.topic_thumbURL})` }"
      >
        <b-col lg="2" md="2" sm="12" class="u-non-blurred">
          <div class="back_button" @click="back">
            <b-icon-caret-left aria-hidden="true" /> Back
          </div>
        </b-col>
        <b-col class="d-flex flex-column u-non-blurred">
          <p class="banner_timeperiod_header">
            Time Period: {{ timePeriodHeaders.header }}
          </p>
          <p class="banner_unit_header">{{ topic.unit }}</p>
          <p class="banner_header">
            {{ topic.title }}
          </p>
        </b-col>
      </b-row>
    </b-container>
    <b-container fluid class="mb-5 ml-3">
      <b-row class="pt-5">
        <b-col lg="2" md="2" sm="12" class="d-flex flex-column">
          <div class="sidebar">
            <div v-for="(button, index) in topicButtons" :key="index">
              <div
                class="category_button"
                :class="{ active: currentTopicCategory === button }"
                @click="loadCategory(button)"
              >
                {{ button }}
              </div>
            </div>
          </div>
        </b-col>
        <b-col class="pa-0">
          <div :style="{ display: display_loader }">
            <b-row>
              <b-col cols="7">
                <div class="large_image loading_topic"></div>
                <div class="small_content100p loading_topic"></div>
                <div class="small_content80p loading_topic"></div>
                <div class="small_content95p loading_topic"></div>
                <div class="small_content90p loading_topic"></div>
                <div class="small_content80p loading_topic"></div>
                <div class="small_content100p loading_topic"></div>
                <div class="small_content95p loading_topic"></div>
              </b-col>
              <b-col class="vidoes">
                <div
                  v-for="i in 5"
                  :key="i.id"
                  class="video loading_topic"
                ></div>
              </b-col>
            </b-row>
          </div>
          <div :style="{ display: display_comps }">
            <intro
              id="Introduction"
              class="findByScroll"
              :topic="topic"
            ></intro>
            <trends id="Trends" class="findByScroll"></trends>
            <developments id="Events" class="findByScroll"></developments>
            <people id="People" class="findByScroll"></people>
            <primarysources id="Sources" class="findByScroll"></primarysources>
            <terms id="Terms" class="findByScroll"></terms>
          </div>
        </b-col>
        <div class="top_button">
          <!-- <b-col> -->
          <b-button size="small" @click="top()">
            <b-icon-caret-up aria-hidden="true" /> Top
          </b-button>
          <!-- </b-col> -->
        </div>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import store from "@/store";
import storeTopic from "@/store/topic.js";
import intro from "@/components/Intro.vue";
import trends from "@/components/Trends.vue";
import developments from "@/components/Developments.vue";
import people from "@/components/People.vue";
import primarysources from "@/components/PrimarySources.vue";
import terms from "@/components/Terms.vue";
import { db } from "@/main";
import VueScrollTo from "vue-scrollto";

export default {
  name: "Topics",
  components: {
    intro,
    trends,
    developments,
    people,
    primarysources,
    terms,
  },
  data() {
    return {
      topicButtons: [
        "Introduction",
        "Trends",
        "Events",
        "People",
        "Sources",
        "Terms",
      ],
      router_comp: "",
      router_id: "",
      display_loader: "block",
      display_comps: "none",
    };
  },

  watch: {
    loaded(newValue) {
      if (newValue === 6) {
        this.$gtag.event("Topic-page-"+this.router_comp, {
          event_category: "engagement",
          event_label: this.topic.title + " - " + this.router_comp,
        });
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
          this.display_loader = "none";
        }, 500);
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
          this.display_comps = "block";
        }, 900);
        setTimeout(() => {
          store.dispatch("setTopicCategory", this.router_comp);
          if (this.router_comp == "Introduction") {
            window.scrollTo({ top: 0, behavior: "smooth" });
          } else {
            document
              .getElementById(this.router_id)
              .scrollIntoView({ top: -100, behavior: "smooth" });
          }
        }, 1100);
        setTimeout(() => {
          window.addEventListener("scroll", this.updateCurrentSection);
        }, 2000);
      }
    },
  },
  computed: {
    timePeriodHeaders() {
      return store.state.timePeriodHeaders[store.state.currentTimePeriod];
    },
    currentTopicCategory() {
      return store.state.currentTopicCategory;
    },
    topic() {
      return storeTopic.state.topic;
    },
    loaded() {
      console.log("storeTopic.state.loaded", storeTopic.state.loaded);
      return storeTopic.state.loaded;
    },
  },
  methods: {
    top() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    scrollToSection(index) {
      VueScrollTo.scrollTo(`#${this.topicButtons[index]}`, 975);
      setTimeout(() => {
        this.updateCurrentSection();
      }, 510);
    },
    updateCurrentSection() {
      for (let index = 0; index < this.topicButtons.length; index++) {
        const section = document.getElementById(this.topicButtons[index]);

        const rect = section.getBoundingClientRect();
        const isVisible = rect.top >= 0 && rect.top <= window.innerHeight / 2;

        if (isVisible) {
          this.$gtag.event("Topic-page-"+this.topicButtons[index], {
            event_category: "engagement",
            event_label: this.topic.title + " - " + this.topicButtons[index],
          });

          store.dispatch("setTopicCategory", this.topicButtons[index]);
          this.$router.replace({
            name: "Topic",
            params: { category: this.topicButtons[index]}
          });
          break;
        }
      }
    },
    async topicFinder() {
      store.dispatch("setTimePeriod", this.$route.params.period);
      var newTopic;
      await db
        .collection("topics")
        .doc(this.$route.params.topic)
        .get()
        .then(
          function(querySnapshot) {
            var entry = querySnapshot.data();
            entry.id = querySnapshot.id;
            newTopic = entry;
            storeTopic.dispatch("setTopicContent", newTopic);
          }.bind(this)
        );
    },
    back() {
      this.$gtag.event("topic-backButton", {
        event_category: "engagement",
      });
      store.dispatch("setTopicCategory", "");
      this.$router.push({
        name: "Period",
        params: { period: this.$route.params.period },
      });
    },
    loadCategory(category, id) {
      document
        .getElementById(category)
        .scrollIntoView({ top: -100, behavior: "smooth" });
      store.dispatch("setTopicCategory", category);
      this.$router.replace({ name: "Topic", params: { category: category, id: id } });
    },
  },
  beforeMount() {
    console.log("beforeMount");
    this.router_comp = this.$route.params.category;
    this.router_id = this.$route.params.id;
    window.scrollTo({ top: 0, behavior: "smooth" });
  },
  mounted() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (Object.keys(storeTopic.state.topic).length === 0) {
      this.topicFinder();
      storeTopic.dispatch("loader_add1");
    } else if (
      Object.keys(storeTopic.state.topic).length > 0 &&
      storeTopic.state.loaded >= 6
    ) {
      storeTopic.dispatch("restLoader");
      storeTopic.dispatch("loader_add1");
    } else {
      storeTopic.dispatch("loader_add1");
    }
    store.dispatch("setTopicCategory", this.$route.params.category);
  },
};
</script>
<style lang="sass" scoped src="@/assets/css/topicContent.sass"></style>
<style lang="sass" scoped src="@/assets/css/loading.sass"></style>
