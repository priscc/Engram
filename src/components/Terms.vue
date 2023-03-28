<template>
  <div class="Terms">
    <b-container fluid>
      <b-row>
        <div class="title">Terms</div>
      </b-row>
      <b-row v-for="(term, i) in termsComponent" :key="i" class="mb-5">
        <b-col :id="term.topiID" cols="11">
          <!-- <b-card> -->
            <b-container fluid>
              <b-row>
                <b-col xl="2" lg="3" md="4" sm="3" xs="12">
                  <b-img
                    v-if="term.thumbURL"
                    :src="term.thumbURL"
                    class="term_image"
                  >
                  </b-img>
                </b-col>
                <b-col xl="6" lg="6" md="6" sm="6" xs="12">
                  <div class="header-2">{{ term.term }}</div>
                  <div class="text">{{ term.def }}</div>
                </b-col>
              </b-row>
            </b-container>
          <!-- </b-card> -->
        </b-col>
      </b-row>
      <div class="top_button">
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

export default {
  name: "Terms",
  computed: {
    termsComponent() {
      return storeTopic.state.terms;
    },
  },
  methods: {
    top() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
  mounted() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    storeTopic.dispatch("setToipcTerms", this.$route.params.topic);
  },
};
</script>

<style lang="sass" scoped src="@/assets/css/topicContent.sass"></style>
