<template>
  <div class="PrimarySources" style="height: 100%">
    <v-container fluid class="pt-0">
      <v-row class="pt-0">
        <v-col class="pt-0">
          <h3>Primary Sources</h3>
        </v-col>
      </v-row>
      <v-row class="d-flex flex-column">
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
        <p class="source_header pt-16 mt-10 mb-0">{{ source.title }}</p>
        <p><a @click="scrollToTop()">Top</a></p>
        <v-img
          v-if="source.thumbURL.length > 0"
          class="text-center pt-16"
          :lazy-src="source.thumbURL"
          style="
            /*height: auto;*/
            width: auto;
            max-width: 300px;
            max-height: 300px;
          "
          :src="source.thumbURL"
        ></v-img>
        <p class="pt-3">{{ source.caption }}</p>
      </v-row>
      <!-- <v-row>
        <v-col cols="10">
          <v-expansion-panels inset hover flat>
            <v-expansion-panel v-for="(source, i) in sourcesComponent" :key="i">
              <v-expansion-panel-header
                expand-icon=""
                style="background-color: #ffd600; border-radius: 25px"
              >
                {{ source.title }}
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-container style="background-color: #ffea00">
                  <v-img
                    class="text-center pt-6"
                    :lazy-src="source.thumbURL"
                    style="
                      /*height: auto;*/
                      width: auto;
                      max-width: 300px;
                      max-height: 300px;
                    "
                    :src="source.thumbURL"
                  ></v-img>
                  <p class="pt-3">{{ source.caption }}</p>
                </v-container>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row> -->
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
