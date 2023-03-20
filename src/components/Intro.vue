<template>
  <div id="Intro">
    <b-container fluid>
      <b-row>
        <div class="title">Introduction</div>
      </b-row>
      <b-row>
        <b-col lg="7" md="7" sm="12">
          <b-row>
            <b-col>
              <b-img class="intro_image" :src="topic.intro_thumbURL"></b-img>
              <div class="text pt-2" v-html="intro"></div>
            </b-col>
          </b-row>
        </b-col>
        <b-col lg="4" md="5" sm="12">
          <b-row>
            <b-col> <div class="header-3">Videos:</div> </b-col>
            <b-col>
              <div v-b-modal.modal-1 class="view_all" @click="showModal">
                View all
              </div>
            </b-col>
          </b-row>
          <b-row>
            <div v-for="(video, index) in videos" :key="index">
              <b-col v-if="index < 3" class="pt-1">
                <iframe
                  class="intro_iframe"
                  :src="'https://www.youtube.com/embed/' + video.url"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </b-col>
            </div>
            <b-modal id="modal-1" size="lg" hide-footer title="Videos">
              <b-container>
                <b-row>
                  <b-col
                    v-for="(video, index) in videos"
                    :key="index"
                    lg="6"
                    md="6"
                    sm="12"
                  >
                    <iframe
                      width="380"
                      height="241"
                      :src="'https://www.youtube.com/embed/' + video.url"
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                    ></iframe>
                  </b-col>
                </b-row>
              </b-container>
            </b-modal>
          </b-row>
          <b-row v-if="articles.length != 0" class="pt-4">
            <b-col> <div class="header-2">Articles:</div> </b-col>
          </b-row>
          <b-row v-for="(article, index) in articles" :key="index">
            <b-col>
              <articlecomp :article="article"></articlecomp>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import storeTopic from "@/store/topic.js";
import * as Quill from "quill";
import articlecomp from "./ArticleComponent.vue";

export default {
  name: "Intro",
  props: {
    topic: Object,
  },
  components: { articlecomp },
  computed: {
    intro() {
      var inputDelta = this.topic.introMD;
      var tempCont = document.createElement("div");
      if (typeof inputDelta === "string" || inputDelta instanceof String) {
        return (tempCont.innerHTML = inputDelta);
      } else {
        var quill = new Quill(tempCont);
        quill.setContents(inputDelta);
        return tempCont.getElementsByClassName("ql-editor")[0].innerHTML;
      }
    },
    videos() {
      var r = storeTopic.state.topicResources.filter(
        (video) => video.resourceType == "video" && video.parentType == "topic"
      );
      return r;
    },
    articles() {
      var r = storeTopic.state.topicResources.filter(
        (article) =>
          article.resourceType == "article" && article.parentType == "topic"
      );
      return r;
    },
  },
  methods: {
    showModal() {
      this.$refs["modal-1"].show();
    },
  },
  mounted() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    storeTopic.dispatch("setToipcResources", this.$route.params.topic);
  },
};
</script>

<style lang="sass" scoped src="@/assets/css/topicContent.sass"></style>
