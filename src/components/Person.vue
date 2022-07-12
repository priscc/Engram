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
                v-if="dateOfPassing == null || dateOfPassing.length == 0"
                class="people_subheader mb-0"
              >
                Date of Birth: {{ dateOfBirth }}
              </p>
              <p v-else class="people_subheader mb-0">
                ({{ dateOfBirth }} - {{ dateOfPassing }})
              </p>
            </v-col>
          </v-row>
          <v-row class="d-flex justify-space-between ml-10 mr-5">
            <v-col class="pt-5">
              <!-- <p class="intro_paragraph intro_content">
                {{ person.mainMD }}
              </p> -->
              <div
                class="intro_paragraph intro_content"
                id="editor-container"
              ></div>
            </v-col>
          </v-row>
        </v-col>
        <v-col>
          <v-row v-if="videos.length > 0" class="mt-0">
            <v-col>
              <h4 class="intro_headers mb-6">Videos:</h4>
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
              <h4 class="intro_headers mb-6">Articles:</h4>
              <!-- <articles></articles> -->
              <v-row>
                <v-col v-for="(article, index) in articles" :key="index">
                  <articlecomp :article="article"></articlecomp>
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
import articlecomp from "./ArticleComponent.vue";
import { db } from "@/main";
import Quill from "quill";
import "quill/dist/quill.core.css";
import "quill/dist/quill.bubble.css";
import "quill/dist/quill.snow.css";

export default {
  name: "Person",
  components: { articlecomp },
  data() {
    return {
      dateOfBirth: null,
      dateOfPassing: null,
    };
  },
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

      return r;
    },
    articles() {
      var r = storeTopic.state.resources.filter(
        (article) =>
          article.parentID == this.person.id &&
          article.resourceType == "article" &&
          article.parentType == "people"
      );

      return r;
    },
  },
  methods: {
    back() {
      storeTopic.dispatch("personContentRESET");
      this.$router.go(-1);
    },
  },
  async mounted() {
    if (Object.keys(storeTopic.state.topic).length === 0) {
      store.dispatch("setTimePeriod", this.$route.params.period);

      var newTopic = await db
        .collection("topics")
        .doc(this.$route.params.topic)
        .get()
        .then(
          function(querySnapshot) {
            var entry = querySnapshot.data();
            entry.id = querySnapshot.id;
            return entry;
          }.bind(this)
        );
      storeTopic.dispatch("topicContent", newTopic);

      var newProfile = await db
        .collection("people")
        .doc(this.$route.params.person)
        .get()
        .then(
          function(querySnapshot) {
            var entry = querySnapshot.data();
            entry.id = querySnapshot.id;
            return entry;
          }.bind(this)
        );

      storeTopic.dispatch("personContent", newProfile);
    }

    var v = this.person;

    if (typeof v.mainMD != "string") {
      var quill = new Quill("#editor-container");
      quill.setContents(v.mainMD);
    } else {
      var e = document.getElementById("editor-container");
      e.innerText = v.mainMD;
    }
    this.dateOfBirth = this.person.dateOfBirth.date;
    this.dateOfPassing = this.person.dateOfPassing.date;
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
