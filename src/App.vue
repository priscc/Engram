<template>
  <div id="App">
    <div class="essay-writing fontist">
      <navbarvue
        style="width: 100%; border-bottom: 1px solid #0000003D; z-index: 9999;"
      ></navbarvue>
    </div>
    <div>
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
        <!--  <b-alert
          class="p-2"
          style="position:fixed; z-index: 300;  right: 0px; bottom: 0px; min-width: 50%; margin-right: 10px "
          :show="alertDisplay"
        >
          <div style="display: inline; ">
            We use cookies to give you the best possible website experience. By
            using Engram, you agree to our
            <a
              style="padding-left: 3px"
              @click="privacypolicy"
              class="alert-link"
              >Privacy Policy</a
            >.
          </div>
          <div
            style="display: flex; justify-content: center; padding-top: 4px"
            @click="dismissAlert"
          >
            <div class="alert_dismiss">Close</div>
          </div>
        </b-alert> -->
      </b-container>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import navbarvue from "@/components/NavBar.vue";
// import storeTopic from "@/store/topic.js";
// import { db } from "@/main";
export default {
  name: "App",
  components: {
    navbarvue,
  },
  data() {
    return {
      alertDisplay: true,
      //     searchClosed: true,
      //     searchItems: [],
      //     search: null,
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
    //   store.dispatch("setTopicCategory", 0);
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
    //   store.dispatch("setTopicCategory", 2);
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
    //   store.dispatch("setTopicCategory", 3);
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
    //   store.dispatch("setTopicCategory", 4);
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
    //   store.dispatch("setTopicCategory", 5);
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
      store.dispatch("setTopicCategory", 0);
      this.$router.push("/");
    },
    about() {
      store.dispatch("setTopicCategory", 0);

      this.$gtag.event("About-page", {
        event_category: "engagement",
      });

      this.$router.push("/about");
    },
    privacypolicy() {
      store.dispatch("setTopicCategory", 0);
      this.$router.push("/privacypolicy");
    },
    dismissAlert() {
      console.log("dismissAlert");
      this.alertDisplay = false;
    },
  },
  // computed: {
  //   stateTimePeriod: function() {
  //     return store.state.currentTimePeriod;
  //   },
  // },
  // mounted() {
  //   this.grabbingSearch();
  // },
};
</script>

<style lang="sass" scoped src="@/assets/css/main.sass"></style>
<style lang="sass" scoped src="@/assets/css/essayWriting.sass"></style>
