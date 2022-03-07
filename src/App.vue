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
            <!--  <v-text-field
              @focus="searchClosed = false"
              @blur="searchClosed = true"
              dense
              filled
              rounded
              placeholder="Search Anything"
              prepend-inner-icon="mdi-magnify"
              class="expanding-search mt-1"
              :class="{ closed: searchClosed }"
            >
            </v-text-field> -->
            <v-autocomplete
              v-model="search"
              :items="items"
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
      loading: false,
      items: [],
      searchItems: [],
      searched: {},
      search: null,
      select: null,
    };
  },
  methods: {
    grabbingSearch() {
      db.collection("topics")
        .get()
        .then(
          function(querySnapshot) {
            querySnapshot.docs.map((doc) => {
              this.searchItems.push({
                id: doc.data().id,
                collection: "topics",
                title: doc.data().title,
              });
              this.items.push("Topic: " + doc.data().title);
            });
          }.bind(this)
        )
        .then();
      console.log(this.items);
      // this.searchItems.forEach((element) => {
      //   console.log(element);
      //   this.items.push(element.title);
      // });
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
    // textColor: function () {
    //   if (store.state.currentTopicComponent == 1) {
    //     return "white";
    //   } else {
    //     return "black";
    //   }
    // },
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
