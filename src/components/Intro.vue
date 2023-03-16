<template>
  <div class="Intro" style="height: 100%">
    <!-- <b-dialog b-model="dialog" width="90%"> -->
    <template b-slot:activator="{ on, attrs }">
      <b-container fluid class="mb-10 pt-0">
        <b-row class="pt-0">
          <b-col class="pt-0 pb-8">
            <h3>Introduction</h3>
          </b-col>
        </b-row>

        <b-row>
          <b-col lg="6" md="6" sm="12" class="pt-0">
            <b-row>
              <b-col class="pb-10">
                <b-img
                  class="mt-10"
                  :src="topic.intro_thumbURL"
                  aspect-ratio="1.7"
                  width="200px"
                ></b-img>
                <p>{{ topic }}</p>
                <div v-html="intro"></div>
              </b-col>
            </b-row>
          </b-col>
          <!-- <b-col lg="5" md="5" sm="12" class="pt-0 pl-7"> -->
          <!-- <b-row> -->
          <!-- <b-col> -->
          <!-- <b-img :src="topic.intro_thumbURL" aspect-ratio="1.7"></b-img> -->
          <!-- </b-col> -->
          <!-- </b-row> -->
          <!-- <b-row class="d-flex align-end pt-0">
              <b-col class="d-flex column-flex align-center">
                <h4>Videos:</h4>
                <p
                  b-bind="attrs"
                  class="mb-0 pl-2 blue--text caption "
                  dark
                  b-on="on"
                >
                  View all
                </p>
              </b-col>
            </b-row>
            <b-row class="mt-0">
              <b-col
                v-for="(video, index) in videos"
                :key="index"
                lg="12"
                md="12"
                sm="3"
                lass="pt-0"
              >
                <iframe
                  v-if="index < 3"
                  width="380"
                  height="241"
                  :src="'https://www.youtube.com/embed/' + video.url"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </b-col>
            </b-row> -->
          <!--            <b-row v-if="articles.length != 0">
                <b-col class="pt-0">
                  <h4>Articles: Influences Seen Today</h4>
                </b-col>
              </b-row>
              <b-row v-for="(article, index) in articles" :key="index">
                <b-col>
                  <articlecomp :article="article"></articlecomp>
                </b-col>
              </b-row> -->
          <!-- </b-col> -->
        </b-row>
      </b-container>
    </template>
    <!-- 
      <b-card>
        <b-card-title class="text-h5 grey lighten-2">
          Videos
        </b-card-title>

        <b-card-text>
          <b-container>
            <b-row class="mt-0">
              <b-col
                v-for="(video, index) in videos"
                :key="index"
                lg="4"
                md="4"
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
        </b-card-text>

        <b-divider></b-divider>

        <b-card-actions>
          <b-spacer></b-spacer>
          <b-btn color="primary" text @click="dialog = false">
            Close
          </b-btn>
        </b-card-actions>
      </b-card> -->
    <!-- </b-dialog> -->
  </div>
</template>

<script>
// import storeTopic from "@/store/topic.js";
// import articlecomp from "./ArticleComponent.vue";
import * as Quill from "quill";

export default {
  name: "Intro",
  props: {
    topic: Object,
  },
  // data() {
  //   return { dialog: false };
  // },
  // components: { articlecomp },
  computed: {
    intro() {
      var inputDelta = this.topic.introMD;
      var tempCont = document.createElement("div");
      var quill = new Quill(tempCont);
      quill.setContents(inputDelta);
      return tempCont.getElementsByClassName("ql-editor")[0].innerHTML;
    },
    // videos() {
    //   var r = storeTopic.state.resources.filter(
    //     (video) =>
    //       video.parentID == this.topic.id &&
    //       video.resourceType == "video" &&
    //       video.parentType == "topic"
    //   );
    //   return r;
    // },
    //   articles() {
    //     var r = storeTopic.state.resources.filter(
    //       (article) =>
    //         article.parentID == this.topic.id &&
    //         article.resourceType == "article" &&
    //         article.parentType == "topic"
    //     );
    //     return r;
    //   },
  },
};
</script>

<style type="text/css" scoped>
h3 {
  font-family: "Montserrat", sans-serif;
  font-size: 30px;
  font-weight: 620;
}
h5 {
  line-height: 1;
  word-break: normal;
}
.intro_headers {
  font-weight: 500;
}
.article {
  overflow: hidden;
  line-height: 1rem;
  max-height: 3rem;
  -webkit-box-orient: vertical;
  display: block;
  display: -webkit-box;
  overflow: hidden !important;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
}
.card {
  opacity: 1;
}
.card:hover {
  opacity: 0.7;
  cursor: pointer;
}
div.intro_top {
  position: relative;
  width: 100%;
  height: 100%;
  /*border: 1px solid blue;*/
  padding-left: 9%;
}
div.intro_image {
  position: absolute;
  right: 0px;
  width: 60%;
  height: 100%;
  /*border: 1px solid red;*/
}
.intro_content {
  /*font-family: "Montserrat", sans-serif;
  font-size: 12px;
  line-height: 16px;
  font-weight: 500;*/
  /*position: relative;*/
  /*max-width: 35%;*/
  /*border: 1px solid green;*/
}
.intro_paragraph {
  /*background-color: white;*/
}
.intro_bottom {
  padding-left: 9%;
}
</style>
