<template>
  <div class="Intro" style="height: 100%">
    <v-dialog v-model="dialog" width="90%">
      <template v-slot:activator="{ on, attrs }">
        <v-container fluid class="mb-10 pt-0">
          <v-row class="pt-0">
            <v-col class="pt-0 pb-8">
              <h3>Introduction</h3>
            </v-col>
          </v-row>

          <v-row>
            <v-col lg="6" md="6" sm="12" class="pt-0">
              <v-row>
                <v-col class="pb-10">
                  <v-img
                    class="mt-10"
                    :src="topic.intro_thumbURL"
                    aspect-ratio="1.7"
                  ></v-img>
                  <div
                    class="intro_paragraph intro_content"
                    id="editor-container"
                  ></div>
                </v-col>
              </v-row>
            </v-col>
            <v-col lg="5" md="5" sm="12" class="pt-0 pl-7">
              <!-- <v-row> -->
              <!-- <v-col> -->
              <!-- <v-img :src="topic.intro_thumbURL" aspect-ratio="1.7"></v-img> -->
              <!-- </v-col> -->
              <!-- </v-row> -->
              <v-row class="d-flex align-end pt-0">
                <v-col class="d-flex column-flex align-center">
                  <h4>Videos:</h4>
                  <p
                    class="mb-0 pl-2 blue--text caption "
                    dark
                    v-bind="attrs"
                    v-on="on"
                  >
                    View all
                  </p>
                </v-col>
              </v-row>
              <v-row class="mt-0">
                <v-col
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
                </v-col>
              </v-row>
              <v-row v-if="articles.length != 0">
                <v-col class="pt-0">
                  <h4>Articles: Influences Seen Today</h4>
                </v-col>
              </v-row>
              <v-row v-for="(article, index) in articles" :key="index">
                <v-col>
                  <articlecomp :article="article"></articlecomp>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Videos
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row class="mt-0">
              <v-col
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
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import storeTopic from "@/store/topic.js";
import articlecomp from "./ArticleComponent.vue";
import Quill from "quill";
import "quill/dist/quill.core.css";
import "quill/dist/quill.bubble.css";
import "quill/dist/quill.snow.css";

export default {
  name: "Intro",
  data() {
    return { dialog: false };
  },
  components: { articlecomp },
  computed: {
    topic() {
      return storeTopic.state.topic;
    },
    videos() {
      var r = storeTopic.state.resources.filter(
        (video) =>
          video.parentID == this.topic.id &&
          video.resourceType == "video" &&
          video.parentType == "topic"
      );
      return r;
    },
    articles() {
      var r = storeTopic.state.resources.filter(
        (article) =>
          article.parentID == this.topic.id &&
          article.resourceType == "article" &&
          article.parentType == "topic"
      );
      return r;
    },
  },
  mounted() {
    var v = this.topic;

    if (typeof v.introMD != "string") {
      var quill = new Quill("#editor-container");
      quill.setContents(v.introMD);
    } else {
      var e = document.getElementById("editor-container");
      e.innerText = v.introMD;
    }
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
