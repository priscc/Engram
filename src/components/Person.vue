<template>
  <div class="Person" style="height: 100%">
    <v-container fluid class="pt-2">
      <v-row
        class="background background-filter white--text"
        style="height: 140px"
        :style="{
          'background-image': `url(${topic.topic_thumbURL})`,
        }"
      >
        <v-col cols="2" class="d-flex align-center u-non-blurred">
          <v-btn text @click="back()" color="white">
            <v-icon class="pr-1" small dark>
              mdi-arrow-left-drop-circle-outline
            </v-icon>
            Back
          </v-btn>
        </v-col>
        <v-col class="d-flex flex-column justify-center u-non-blurred">
          <p class="caption">{{ timePeriodHeaders.header }}</p>
          <p class="display-2 mb-0" style="line-height: 20px">
            {{ topic.title }} > {{ person.name }}
          </p>
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid class="mb-10 pt-10 px-14">
      <v-row>
        <v-col lg="7" md="7" sm="12">
          <v-row class="ml-10 mr-5">
            <v-col cols="3" class="pt-0">
              <v-img
                :lazy-src="person.thumbURL"
                height="120"
                width="120"
                :src="person.thumbURL"
                style="border-radius: 50%"
              >
              </v-img>
            </v-col>
            <v-col class="d-flex justify-end flex-column">
              <p class="people_header mb-0">{{ person.name }}</p>
              <p
                v-if="person.dateOfPassing.date.length == 0"
                class="people_subheader mb-0"
              >
                ({{ person.dateOfBirth.date }} - Present)
              </p>
              <p v-else class="people_subheader mb-0">
                ({{ person.dateOfBirth.date }} -
                {{ person.dateOfPassing.date }})
              </p>
            </v-col>
          </v-row>
          <v-row class="d-flex justify-space-between ml-10 mr-5">
            <v-col class="pt-5">
              <p class="intro_paragraph intro_content">
                {{ person.mainMD }}
              </p>
            </v-col>
          </v-row>
        </v-col>
        <v-col>
          <v-row>
            <v-col>
              <!-- <h3 class="intro_headers mb-6">Resources</h3> -->
              <v-row>
                <v-col v-for="(video, index) in videos" :key="index">
                  <iframe
                    width="365"
                    height="230"
                    :src="'https://www.youtube.com/embed/' + video.url"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row>
            <v-col v-if="articles.length > 0">
              <h3 class="intro_headers mb-6">Articles</h3>
              <!-- <articles></articles> -->
              <v-row>
                <v-col v-for="(article, index) in articles" :key="index">
                  <v-card
                    outlined
                    class="card"
                    :href="article.url"
                    target="_blank"
                  >
                    <div class="d-flex flex-no-wrap">
                      <v-avatar class="ma-3" size="120" tile>
                        <v-img
                          style="border-radius: 7px"
                          :src="article.thumbURL"
                        >
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
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import store from "@/store";
import storeTopic from "@/store/topic.js";

export default {
  name: "Person",
  computed: {
    timePeriodHeaders() {
      return store.state.timePeriodHeaders[store.state.currentTimePeriod];
    },
    topic() {
      return storeTopic.state.topic;
    },
    person() {
      return storeTopic.state.person;
    },
    videos() {
      var r = storeTopic.state.resources.filter(
        (video) =>
          video.parentID == this.person.id &&
          video.resourceType == "video" &&
          video.parentType == "people"
      );
      console.log("resources", r);
      return r;
    },
    articles() {
      var r = storeTopic.state.resources.filter(
        (article) =>
          article.parentID == this.person.id &&
          article.resourceType == "article" &&
          article.parentType == "people"
      );
      console.log("resources", r);
      return r;
    },
  },
  methods: {
    back() {
      storeTopic.dispatch("personContentRESET");
      this.$router.go(-1);
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
.people_header {
  font-family: "Montserrat", sans-serif;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 550;
}
.people_subheader {
  font-family: "Montserrat", sans-serif;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 500;
  color: grey;
}
.background-filter::after {
  -webkit-backdrop-filter: blur(
    5px
  ); /* Use for Safari 9+, Edge 17+ (not a mistake) and iOS Safari 9.2+ */
  backdrop-filter: brightness(50%); /* Supported in Chrome 76 */
  content: "";
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
}
.background-filter {
  position: relative;
}
.background {
  background-size: cover;
  background-position: right 15% bottom 55%;
}
/* Use for content that should not be blurred */
.u-non-blurred {
  position: relative;
  z-index: 1;
}
.page_header {
  font-family: "Montserrat", sans-serif;
  letter-spacing: -0.5px;
  font-size: 34px;
  line-height: 0px;
}

.card {
  opacity: 0.7;
}
.card:hover {
  opacity: 1;
  cursor: pointer;
}
</style>
