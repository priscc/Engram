<template>
  <div>
    <div class="navbar_styling">
      <b-navbar toggleable="md" type="dark">
        <b-navbar-brand @click="home" class="logo">
          <img class="logo_img" src="@/assets/EngramLogo.png" />
          <span class="logo_btn">Engram</span>
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse" type="dark"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="navbar_tab_section">
            <b-nav-item @click="home">
              <span class="navbar_tab">Home</span>
            </b-nav-item>
            <b-nav-item @click="about">
              <span class="navbar_tab">About</span>
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <div :style="{ 'min-height': windowHeight + 'px' }">
      <router-view></router-view>
    </div>
    <div class="footer">
      <b-container fluid>
        <b-row>
          <b-col>
            <b-icon-facebook class="footer-icon" />
            <b-icon-twitter class="footer-icon" />
            <b-icon-instagram
              href="https://instagram.com/engram_notes?igshid=YmMyMTA2M2Y="
              class="footer-icon"
            />
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <div @click="privacypolicy()" class="privacy_policy">
              Privacy Policy
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col>&copy; 2022 by Engram</b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import storeTopic from "@/store/topic.js";
// import { db } from "@/main";
export default {
  name: "App",
  data() {
    return {
      sheet: false,
      searchClosed: true,
      searchItems: [],
      search: null,
      windowHeight: window.innerHeight,
    };
  },
  // watch: {
  //   search: function(val) {
  //     console.log("watching search", val);
  //     if (val.collection == "topics") {
  //       this.topicSearch();
  //     } else if (val.collection == "events") {
  //       this.eventSearch(val);
  //     } else if (val.collection == "people") {
  //       this.peopleSearch(val);
  //     } else if (val.collection == "works") {
  //       this.primarysourceSearch();
  //     } else if (val.collection == "terminology") {
  //       this.termSearch();
  //     }
  //   },
  // },
  methods: {
    // topicSearch() {
    //   store.dispatch("setTimePeriod", this.search.timePeriod);
    //   storeTopic.dispatch("topicContent", this.search.document);
    //   store.dispatch("setTopicButton", 0);
    //   this.$router.push({
    //     name: "Topic",
    //     params: {
    //       period: this.search.timePeriod,
    //       topic: this.search.document.id,
    //       category: 0,
    //     },
    //   });
    // },
    // async eventSearch(val) {
    //   var v = await this.grabbingTopic();
    //   val.topic = v;
    //   val.timePeriod = v.timePeriod - 1;

    //   store.dispatch("setTimePeriod", val.timePeriod);
    //   storeTopic.dispatch("topicContent", val.topic);
    //   store.dispatch("setTopicButton", 2);
    //   storeTopic.dispatch("eventContent", val.document);
    //   this.$router.push({
    //     name: "Event",
    //     params: {
    //       period: val.timePeriod,
    //       topic: val.topic,
    //       category: 2,
    //       event: val.document.id,
    //     },
    //   });
    // },
    // async peopleSearch(val) {
    //   var v = await this.grabbingTopic();
    //   val.topic = v;
    //   val.timePeriod = v.timePeriod - 1;

    //   store.dispatch("setTimePeriod", val.timePeriod);
    //   storeTopic.dispatch("topicContent", val.topic);
    //   store.dispatch("setTopicButton", 3);
    //   storeTopic.dispatch("personContent", val.document);

    //   this.$router.push({
    //     name: "Person",
    //     params: {
    //       period: val.timePeriod,
    //       topic: val.topicID,
    //       category: 3,
    //       person: val.document.id,
    //     },
    //   });
    // },
    // async primarysourceSearch() {
    //   var v = await this.grabbingTopic();
    //   this.search.topic = v;
    //   this.search.timePeriod = v.timePeriod - 1;

    //   store.dispatch("setTimePeriod", this.search.timePeriod);
    //   storeTopic.dispatch("topicContent", this.search.topic);
    //   store.dispatch("setTopicButton", 4);
    //   this.$router.push({
    //     name: "Topic",
    //     params: {
    //       period: this.search.timePeriod,
    //       topic: this.search.topic.id,
    //       category: 4,
    //     },
    //   });
    // },
    // async termSearch() {
    //   var v = await this.grabbingTopic();
    //   this.search.topic = v;
    //   this.search.timePeriod = v.timePeriod - 1;

    //   store.dispatch("setTimePeriod", this.search.timePeriod);
    //   storeTopic.dispatch("topicContent", this.search.topic);
    //   store.dispatch("setTopicButton", 5);
    //   this.$router.push({
    //     name: "Topic",
    //     params: {
    //       period: this.search.timePeriod,
    //       topic: this.search.topic.id,
    //       category: 5,
    //     },
    //   });
    // },
    // grabbingTopic() {
    //   return db
    //     .collection("topics")
    //     .doc(this.search.topicID)
    //     .get()
    //     .then(
    //       function(doc) {
    //         return doc.data();
    //       }.bind(this)
    //     );
    // },
    // async grabbingSearch() {
    //   db.collection("searchBar")
    //     .doc("bESicXCl5B8APjFo5TAI")
    //     .get()
    //     .then(
    //       function(doc) {
    //         this.searchItems = doc.data().searchItems;
    //       }.bind(this)
    //     );
    // },
    home() {
      store.dispatch("setTopicButton", 0);
      storeTopic.dispatch("eventContentRESET");
      this.$router.push("/");
    },
    about() {
      store.dispatch("setTopicButton", 0);
      this.$router.push("/about");
    },
    privacypolicy() {
      store.dispatch("setTopicButton", 0);
      this.$router.push("/privacypolicy");
    },
  },
  computed: {
    // stateTimePeriod: function() {
    //   return store.state.currentTimePeriod;
    // },
  },
  mounted() {
    // this.grabbingSearch();
  },
};
</script>

<style lang="sass" scoped src="@/assets/css/main.sass">
</style>
