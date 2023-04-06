<template>
  <div id="PrimarySources">
    <b-container fluid>
      <b-row>
        <div class="title">Primary Sources</div>
      </b-row>
      <b-row v-for="(source, i) in sourcesComponent" :key="i">
        <b-col :id="source.id" cols="11">
          <b-card>
            <b-container fluid>
              <b-row>
                <b-col xl="2" lg="3" md="4" sm="4">
                  <b-img
                    v-if="source.thumbFile != 'placeHolderImg.png'"
                    :src="source.thumbURL"
                    class="source_image"
                  >
                  </b-img>
                </b-col>
                <b-col xl="7" lg="7" md="6" sm="12">
                  <div class="header-2">{{ source.title }}</div>
                  <div class="text">{{ source.caption }}</div>
                </b-col>
              </b-row>
            </b-container>
          </b-card>
        </b-col>
      </b-row>
      <comingsoon v-if="comingSoon == 0"></comingsoon>
      <div v-if="comingSoon != 0" class="top_button">
        <b-col>
          <b-button size="small" @click="top()">
            <b-icon-caret-up aria-hidden="true" /> Top
          </b-button>
        </b-col>
      </div>
    </b-container>
  </div>
</template>

<script>
import storeTopic from "@/store/topic.js";
import comingsoon from "./ComingSoon.vue";

export default {
  name: "PrimarySources",
  components: { comingsoon },
  computed: {
    sourcesComponent() {
      return storeTopic.state.sources;
    },
    comingSoon() {
      return storeTopic.state.sources.length;
    },
  },
  methods: {
    top() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
  mounted() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    storeTopic.dispatch("setTopicSources", this.$route.params.topic);
  },
};
</script>

<style lang="sass" scoped src="@/assets/css/topicContent.sass"></style>
