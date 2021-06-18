<template>
  <div class="Intro" style="height: 100%">
    <v-container fluid class="mb-10 pt-0">
      <!-- OLD INTRO / IMG Layout -->
      <!-- <div class="intro_top">
        <v-img
          class="intro_image"
          src="https://freevector-images.s3.amazonaws.com/uploads/vector/preview/31829/32563_dotted-worldmap-1.jpg"
          aspect-ratio="1.7"
        ></v-img>
        <div class="intro_content">
          <h3 class="mb-12">Introduction</h3>
          <div class="intro_paragraph">
            {{ toipcComponent }}
            <p>
              {{ toipcComponent.introMD }}
            </p>
          </div>
        </div>
      </div> -->
      <v-row class="pt-0">
        <v-col class="pt-0 pb-10">
          <h3>Introduction</h3>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="5" class="pt-0">
          <p class="intro_paragraph intro_content">
            {{ topic.introMD }}
          </p>
        </v-col>
        <v-col cols="7" class="d-flex justify-center">
          <v-img
            src="https://freevector-images.s3.amazonaws.com/uploads/vector/preview/31829/32563_dotted-worldmap-1.jpg"
            width="100%"
          ></v-img>
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid class="mb-10 pt-0 pr-10">
      <v-row>
        <v-col lg="6" md="6" cols="12">
          <h3 class="intro_headers mb-6">Resources</h3>
          <v-row>
            <v-col v-for="(video, index) in videos" :key="index">
              <iframe
                width="440"
                height="276"
                :src="'https://www.youtube.com/embed/' + video.url"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </v-col>
          </v-row>
        </v-col>
        <v-col>
          <h3 class="intro_headers mb-6">Influence Today</h3>
          <!-- <articles></articles> -->
          <v-row>
            <v-col v-for="(article, index) in articles" :key="index">
              <v-card outlined class="card" :href="article.url" target="_blank">
                <div class="d-flex flex-no-wrap">
                  <v-avatar class="ma-3" size="120" tile>
                    <v-img style="border-radius: 7px" :src="article.thumbURL">
                    </v-img>
                  </v-avatar>
                  <div>
                    <v-card-title class="pl-2 mb-2">
                      <h5>{{ article.title }}</h5>
                    </v-card-title>
                    <v-card-subtitle class="pl-2 caption article">
                      {{ article.summary }}
                    </v-card-subtitle>
                  </div>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// import articles from "@/components/Articles.vue";
import storeTopic from "@/store/topic.js";

export default {
  name: "Intro",
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
      console.log("resources", r);
      return r;
    },
    articles() {
      var r = storeTopic.state.resources.filter(
        (article) =>
          article.parentID == this.topic.id &&
          article.resourceType == "article" &&
          article.parentType == "topic"
      );
      console.log("resources", r);
      return r;
    },
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
  opacity: 0.7;
}
.card:hover {
  opacity: 1;
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
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  line-height: 14px;
  font-weight: 500;
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
