<template>
  <v-app>
    <v-app-bar
      flat
      dark
      style="background-color: black; max-height: 130px !important;  min-height: 80px !important"
      class="pt-2 pr-2"
    >
      <v-toolbar-title>
        <v-btn @click="home" text style="text-transform: none;">
          <v-img
            class="mr-2"
            max-width="33"
            src="@/assets/EngramLogo.png"
          ></v-img>
          <h2 class="logo_btn">Engram</h2>
        </v-btn>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn @click="home" text style="text-transform: none;">
        <h2 class="navbar_btn">
          Home
        </h2>
      </v-btn>
      <v-btn @click="about" text style="text-transform: none;">
        <h2 class="navbar_btn">About</h2>
      </v-btn>

      <!-- <v-btn @click="packets" text style="text-transform: none;">
        <h2 class="navbar_btn">Packets</h2>
      </v-btn> -->
      <!-- <v-autocomplete
        :items="searchItems"
        item-text="title"
        item-value="id"
        return-object
        v-model="search"
        prepend-inner-icon="mdi-magnify"
        placeholder="Search Anything"
        flat
        dense
        clearable
        append-icon=""
        hide-details
        hide-no-data
        filled
        @focus="searchClosed = false"
        @blur="searchClosed = true"
        class="expanding-search"
        :class="{ closed: searchClosed && !search }"
      >
      </v-autocomplete> -->
      <!--  <v-btn
        text
        style="text-transform: none; font-size: 16px; font-weight: bold"
      >
        <p class="mb-0">Add Content</p>
      </v-btn> -->
      <template
        v-slot:extension
        v-if="stateTimePeriod != -1 && stateTimePeriod == null"
      >
        <!-- <v-container fluid class="px-4 pt-4"> -->
        <!-- <v-row> -->
        <!-- <v-col> -->
        <h1
          class="white--text mb-0"
          style="font-family: 'Montserrat', sans-serif; font-size: 34px; font-weight: 750"
        >
          AP World History Units
        </h1>
        <!-- </v-col> -->
        <!-- </v-row> -->
        <!-- </v-container> -->
      </template>
    </v-app-bar>
    <v-main :style="{ 'background-color': bgColor }">
      <!-- <transition name="slide-fade"> -->
      <router-view></router-view>
      <!-- </transition> -->
    </v-main>
    <v-footer app color="black" class="py-0 grey--text caption d-flex row-flex">
      <v-container>
        <!-- <v-row>
          <v-col class="d-flex row-flex justify-center pb-1">
            <v-icon small color="grey">mdi-facebook</v-icon>
            <div class="mx-2"></div>
            <v-icon small color="grey">mdi-twitter</v-icon>

            <v-btn
              href="https://instagram.com/engram_notes?igshid=YmMyMTA2M2Y="
              icon
              color="grey"
              target="_blank"
            >
              <v-icon small>
                mdi-instagram
              </v-icon>
            </v-btn>
          </v-col>
        </v-row> -->
        <!--  <v-row class="my-0 py-0">
          <v-col class="d-flex row-flex justify-center py-0">
            <div
              @click="privacypolicy()"
              class="text-decoration-underline py-0 my-0"
              style="font-size: 9px; color: grey;"
            >
              Privacy Policy
            </div>
          </v-col>
        </v-row> -->
        <v-row class="my-0 py-0">
          <v-col class="d-flex justify-center py-0">
            <p class="mb-0" style="font-size: 9px">
              &copy; 2022 by Engram
            </p>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
import store from "@/store";
import storeTopic from "@/store/topic.js";
// import { db } from "@/main";
export default {
  name: "App",
  data() {
    return {
      // searchClosed: true,
      // searchItems: [],
      // search: null,
    };
  },
  watch: {
    // search: function(val) {
    //   console.log("watching search", val);
    //   if (val.collection == "topics") {
    //     this.topicSearch();
    //   } else if (val.collection == "events") {
    //     this.eventSearch(val);
    //   } else if (val.collection == "people") {
    //     this.peopleSearch(val);
    //   } else if (val.collection == "works") {
    //     this.primarysourceSearch();
    //   } else if (val.collection == "terminology") {
    //     this.termSearch();
    //   }
    // },
  },

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
    privacypolicy() {
      store.dispatch("setTopicButton", 0);
      this.$router.push("/privacypolicy");
    },
    about() {
      store.dispatch("setTopicButton", 0);
      this.$router.push("/about");
    },
    packets() {
      store.dispatch("setTopicButton", 0);
      this.$router.push("/packets");
    },
  },
  computed: {
    stateTimePeriod: function() {
      return store.state.currentTimePeriod;
    },
    bgColor: function() {
      if (
        store.state.currentTopicComponent == 2 ||
        Object.keys(storeTopic.state.topic).length === 0
      ) {
        return "black";
      } else {
        return "white";
      }
    },
  },
  mounted() {
    // this.grabbingSearch();
  },
};
</script>
<style lang="sass">
@import "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"




.v-input.expanding-search
  border: 1px solid white
  border-radius: 50px
  .v-input__control
    width: 550px
  &.closed
    max-width: 45px
    border: none !important


  .v-input__slot
    cursor: pointer !important
    &:before, &:after
      border-color: transparent !important
      border-style: none !important
      border-width: none !important

.navbar_btn
  font-family: "Montserrat", sans-serif
  font-size: 16px
  font-weight: 750
  letter-spacing: 0px

.logo_btn
  font-family: "Montserrat", sans-serif
  font-size: 16px
  font-weight: 500
  letter-spacing: 0px


// *.slide-fade-enter-active {
//   transition: all 0.5s ease;
// }
// .slide-fade-leave-active {
//   transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
// }
// .slide-fade-enter,
// .slide-fade-leave-to {
//   transform: translateX(10px);
//   opacity: 0;
// }*
</style>
