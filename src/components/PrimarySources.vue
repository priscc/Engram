<template>
  <div class="PrimarySources" style="height: 100%">
    <v-container fluid class="pt-0">
      <v-row class="pt-0">
        <v-col class="pt-0">
          <h3>Primary Sources</h3>
        </v-col>
      </v-row>
      <v-row class="d-flex flex-column pl-10 mb-10">
        <ul v-for="(source, i) in sourcesComponent" :key="i">
          <li>
            <a :href="'#' + i">{{ source.title }}</a>
          </li>
        </ul>
      </v-row>

      <v-row
        v-for="(source, i) in sourcesComponent"
        :key="i"
        class="d-flex flex-column"
        :id="i"
      >
        <v-col cols="10 py-7">
          <v-card flat>
            <div class="d-flex flex-no-wrap">
              <v-img
                v-if="source.thumbFile != 'placeHolderImg.png'"
                :lazy-src="source.thumbURL"
                :src="source.thumbURL"
                height="175"
                max-width="250"
                class="mr-7"
              >
              </v-img>
              <div>
                <v-card-title
                  class="text-h5 pt-0 pl-0"
                  v-text="source.title"
                ></v-card-title>

                <v-card-subtitle
                  class="pl-0"
                  v-text="source.caption"
                ></v-card-subtitle>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <div style="position: fixed; top: 85%; right: 0.3%">
        <v-col class="d-flext justify-end">
          <v-btn @click="scrollToTop()" fab icon x-large color="amber"
            ><v-icon x-large>mdi-arrow-up-drop-circle-outline</v-icon></v-btn
          ></v-col
        >
      </div>
    </v-container>
  </div>
</template>

<script>
import storeTopic from "@/store/topic.js";

export default {
  name: "PrimarySources",
  computed: {
    sourcesComponent() {
      return storeTopic.state.sources;
    },
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    },
  },
};
</script>

<style type="text/css" scoped>
template {
  scroll-behavior: smooth;
}
h3 {
  font-family: "Montserrat", sans-serif;
  font-size: 30px;
  font-weight: 620;
}
.source_header {
  font-family: "Montserrat", sans-serif;
  font-size: 24px;
  font-weight: 500;
}
p {
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  /*font-weight: 620;*/
}
</style>
