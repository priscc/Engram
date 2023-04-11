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
                    @click="showModal[source.id] = true"
                  >
                  </b-img>
                  <!-- Modal -->
                  <b-modal v-model="showModal[source.id]" hide-footer :title="source.title ">
                    <b-img :src="source.thumbURL" class="modal_image"></b-img>
                  </b-modal>
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
    </b-container>
  </div>
</template>

<script>
import storeTopic from "@/store/topic.js";
import comingsoon from "./ComingSoon.vue";

export default {
  name: "PrimarySources",
  components: { comingsoon },
  data() {
    return {
      showModal: {},
    };
  },
  computed: {
    sourcesComponent() {
      return storeTopic.state.sources;
    },
    comingSoon() {
      return storeTopic.state.sources.length;
    },
  },
  mounted() {
    storeTopic.dispatch("setTopicSources", this.$route.params.topic);
  },
};
</script>

<style lang="sass" scoped src="@/assets/css/topicContent.sass"></style>
