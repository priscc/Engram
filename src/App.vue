<template>
  <v-app>
    <v-app-bar
      app
      flat
      dark
      style="border-bottom: 0.2px grey solid; background-color: black"
    >
      <v-container fluid>
        <v-row>
          <v-col class="d-flex justify-start">
            <v-btn @click="home" text style="opacity: 0.75">
              <v-img
                class="mr-1"
                max-width="25"
                src="@/assets/EngramLogo.png"
              ></v-img
              >Engram
            </v-btn>
          </v-col>

          <v-col cols="7" class="d-flex justify-end align-center mr-10">
            <v-btn
              @click="home"
              text
              style="text-transform: none; font-size: 16px; font-weight: bold"
            >
              <p class="mb-0">Home</p>
            </v-btn>
            <v-btn
              @click="about"
              text
              style="text-transform: none; font-size: 16px; font-weight: bold"
            >
              <p class="mb-0">About</p>
            </v-btn>
            <v-btn
              text
              style="text-transform: none; font-size: 16px; font-weight: bold"
            >
              <p class="mb-0">Packets</p>
            </v-btn>
            <v-btn
              text
              style="text-transform: none; font-size: 16px; font-weight: bold"
            >
              <p class="mb-0">Add Content</p>
            </v-btn>
            <v-autocomplete
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
            ></v-autocomplete>
          </v-col>
        </v-row>

        <!--  <v-row>
          <v-col cols="3">
            <v-text-field
              hide-details
              rounded
              outlined
              dense
              filled
              append-icon="mdi-magnify"
              single-line
            >
              <v-autocomplete
                clearable
                dense
                rounded
                solo-inverted
                label="Search Anything"
              ></v-autocomplete>
            </v-text-field>
          </v-col>
        </v-row> -->
      </v-container>
    </v-app-bar>
    <v-main :style="{ 'background-color': bgColor }">
      <!-- <transition name="slide-fade"> -->
      <router-view></router-view>
      <!-- </transition> -->
    </v-main>
    <v-footer
      app
      color="black"
      class="py-0 grey--text text--darken-3 caption d-flex justify-center"
    >
      Engram 2021
    </v-footer>
  </v-app>
</template>

<script>
import store from "@/store";
import storeTopic from "@/store/topic.js";
import { db } from "@/main";
export default {
  name: "App",
  data() {
    return {
      searchClosed: true,
      searchItems: [],
      search: null,
    };
  },
  watch: {
    search: function(val) {
      console.log("watching search", val);
      if (val.collection == "topics") {
        this.topicSearch();
      } else if (val.collection == "events") {
        this.eventSearch(val);
      } else if (val.collection == "people") {
        this.peopleSearch(val);
      } else if (val.collection == "works") {
        this.primarysourceSearch();
      } else if (val.collection == "terminology") {
        this.termSearch();
      }
    },
  },

  methods: {
    topicSearch() {
      store.dispatch("setTimePeriod", this.search.timePeriod);
      storeTopic.dispatch("topicContent", this.search.document);
      store.dispatch("setTopicButton", 0);
      this.$router.push({
        name: "Topic",
        params: {
          period: this.search.timePeriod,
          topic: this.search.document.id,
          category: 0,
        },
      });
    },
    async eventSearch(val) {
      var v = await this.grabbingTopic();
      val.topic = v;
      val.timePeriod = v.timePeriod - 1;

      store.dispatch("setTimePeriod", val.timePeriod);
      storeTopic.dispatch("topicContent", val.topic);
      store.dispatch("setTopicButton", 2);
      storeTopic.dispatch("eventContent", val.document);
      this.$router.push({
        name: "Event",
        params: {
          period: val.timePeriod,
          topic: val.topic,
          category: 2,
          event: val.document.id,
        },
      });
    },
    async peopleSearch(val) {
      console.log("people search", val);

      var v = await this.grabbingTopic();
      val.topic = v;
      val.timePeriod = v.timePeriod - 1;

      store.dispatch("setTimePeriod", val.timePeriod);
      storeTopic.dispatch("topicContent", val.topic);
      store.dispatch("setTopicButton", 3);
      storeTopic.dispatch("personContent", val.document);

      console.log("people search", val);
      this.$router.push({
        name: "Person",
        params: {
          period: val.timePeriod,
          topic: val.topicID,
          category: 3,
          person: val.document.id,
        },
      });
    },
    async primarysourceSearch() {
      var v = await this.grabbingTopic();
      this.search.topic = v;
      this.search.timePeriod = v.timePeriod - 1;

      store.dispatch("setTimePeriod", this.search.timePeriod);
      storeTopic.dispatch("topicContent", this.search.topic);
      store.dispatch("setTopicButton", 4);
      this.$router.push({
        name: "Topic",
        params: {
          period: this.search.timePeriod,
          topic: this.search.topic.id,
          category: 4,
        },
      });
    },
    async termSearch() {
      var v = await this.grabbingTopic();
      this.search.topic = v;
      this.search.timePeriod = v.timePeriod - 1;

      store.dispatch("setTimePeriod", this.search.timePeriod);
      storeTopic.dispatch("topicContent", this.search.topic);
      store.dispatch("setTopicButton", 5);
      this.$router.push({
        name: "Topic",
        params: {
          period: this.search.timePeriod,
          topic: this.search.topic.id,
          category: 5,
        },
      });
    },
    grabbingTopic() {
      return db
        .collection("topics")
        .doc(this.search.topicID)
        .get()
        .then(
          function(doc) {
            return doc.data();
          }.bind(this)
        );
    },
    async grabbingSearch() {
      console.log("grabbing autofill search items");
      db.collection("topics")
        .get()
        .then(
          function(querySnapshot) {
            querySnapshot.docs.map((doc) => {
              this.searchItems.push({
                document: doc.data(),
                collection: "topics",
                title: "Topic: " + doc.data().title,
                timePeriod: doc.data().timePeriod - 1,
              });
            });
          }.bind(this)
        );
      db.collection("events")
        .get()
        .then(
          function(querySnapshot) {
            querySnapshot.docs.map((doc) => {
              this.searchItems.push({
                document: doc.data(),
                collection: "events",
                title: "Event: " + doc.data().title,
                topicID: doc.data().topicID[0],
              });
            });
          }.bind(this)
        );
      db.collection("people")
        .get()
        .then(
          function(querySnapshot) {
            querySnapshot.docs.map((doc) => {
              this.searchItems.push({
                document: doc.data(),
                collection: "people",
                title: "People: " + doc.data().name,
                topicID: doc.data().topicID[0],
              });
            });
          }.bind(this)
        );
      db.collection("works")
        .get()
        .then(
          function(querySnapshot) {
            querySnapshot.docs.map((doc) => {
              this.searchItems.push({
                document: doc.data(),
                collection: "works",
                title: "Primary Source: " + doc.data().title,
                topicID: doc.data().topicID[0],
              });
            });
          }.bind(this)
        );
      db.collection("terminology")
        .get()
        .then(
          function(querySnapshot) {
            querySnapshot.docs.map((doc) => {
              this.searchItems.push({
                document: doc.data(),
                collection: "terminology",
                title: "Term: " + doc.data().term,
                topicID: doc.data().topicID[0],
              });
            });
          }.bind(this)
        );
    },
    home() {
      store.dispatch("setTopicButton", 0);
      storeTopic.dispatch("eventContentRESET");
      this.$router.push("/");
    },
    about() {
      store.dispatch("setTopicButton", 0);
      this.$router.push("/about");
    },
  },
  computed: {
    bgColor: function() {
      if (
        store.state.currentTopicComponent == 2 &&
        storeTopic.state.event.length == 0
      ) {
        return "black";
      } else {
        return "white";
      }
    },
  },
  mounted() {
    this.grabbingSearch();
  },
};
</script>

<style lang="sass">
@import "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"


.v-input.expanding-search
  border: 1px solid white
  border-radius: 50px
  .v-input__control
    width: 350px
  &.closed
    max-width: 45px
    border: none !important


  .v-input__slot
    cursor: pointer !important
    &:before, &:after
      border-color: transparent !important
      border-style: none !important
      border-width: none !important



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
