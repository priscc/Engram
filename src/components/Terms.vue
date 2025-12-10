<template>
  <div class="Terms">
    <b-container fluid>
      <b-row>
        <div class="title">Terms</div>
      </b-row>
      <b-row v-for="(term, i) in termsComponent" :key="i" class="mb-5">
        <b-col :id="term.id" cols="11">
          <b-container fluid>
            <b-row>
              <b-col xl="2" lg="3" md="4" sm="4">
                <!-- <b-img
                  v-if="term.thumbURL"
                  :src="term.thumbURL"
                  class="term_image"
                  @click="showModal[term.id] = true"
                >
                </b-img>
                  <b-modal v-model="showModal[term.id]" hide-footer :title="term.term ">
                    <b-img :src="term.thumbURL" class="modal_image"></b-img>
                  </b-modal> -->
                <b-img
                  v-if="term.thumbURL"
                  :src="term.thumbURL"
                  class="term_image"
                  @click="openModal(term.id)"
                ></b-img>

                <b-modal
                  v-model="showModal[term.id]"
                  hide-footer
                  :title="term.term"
                >
                  <b-img :src="term.thumbURL" class="modal_image"></b-img>
                </b-modal>
              </b-col>
              <b-col xl="7" lg="7" md="6" sm="12">
                <div class="text">
                  <span class="header-2">{{ term.term }} - </span>{{ term.def }}
                </div>
              </b-col>
            </b-row>
          </b-container>
        </b-col>
      </b-row>
    </b-container>
    <comingsoon v-if="comingSoon == 0"></comingsoon>
  </div>
</template>

<script>
import storeTopic from "@/store/topic.js";
import comingsoon from "./ComingSoon.vue";

export default {
  name: "Terms",
  components: { comingsoon },
  data() {
    return {
      showModal: {} // map: { [id]: boolean }
    };
  },
  computed: {
    termsComponent() {
      return storeTopic.state.terms;
    }
  },
  watch: {
    // When the terms list is (re)loaded, ensure each key exists reactively
    termsComponent: {
      immediate: true,
      handler(terms) {
        if (!Array.isArray(terms)) return;
        terms.forEach(t => {
          if (!(t.id in this.showModal)) {
            this.$set(this.showModal, t.id, false);
          }
        });
      }
    }
  },
  methods: {
    openModal(id) {
      this.$set(this.showModal, id, true);
    },
    closeModal(id) {
      this.$set(this.showModal, id, false);
    }
  },
  mounted() {
    // (typo?) make sure this matches your store action name
    storeTopic.dispatch("setToipcTerms", this.$route.params.topic);
  }
};
</script>

<style lang="sass" scoped src="@/assets/css/topicContent.sass"></style>
