<template>
  <v-app>
    <v-app-bar app color="black" dark flat>
      <v-container fluid>
        <v-row>
          <v-col class="d-flex justify-start">
            <v-btn @click="home" text>
              <v-img max-width="150" src="@/assets/logo_white.png"></v-img>
            </v-btn>
          </v-col>
          <v-col class="d-flex justify-end mr-10">
            <v-btn
              @click="home"
              class="d-flex align-end"
              text
              style="text-transform: none; font-size: 20px; font-weight: 600"
            >
              <p class="white--text mb-0">Home</p>
            </v-btn>
            <v-btn
              @click="about"
              class="d-flex align-end"
              text
              style="text-transform: none; font-size: 20px; font-weight: 600"
            >
              <p class="white--text mb-0">About</p>
            </v-btn>
            <!--  <v-btn to="GEO" text>
              <h3 class="white--text">GEO</h3>
            </v-btn> -->
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
    <v-main :style="{ 'background-color': bgColor }">
      <!-- <transition name="slide-fade"> -->
      <router-view></router-view>
      <!-- </transition> -->
    </v-main>
    <v-footer app color="black">
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
import store from "@/store";
import storeTopic from "@/store/topic.js";
export default {
  name: "App",
  methods: {
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
    bgColor: function () {
      if (
        (store.state.currentTopicComponent == 2 &&
          storeTopic.state.event.length == 0) ||
        store.state.currentTopicComponent == 1
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
};
</script>

<style type="text/css">
@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

/*.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}*/
</style>
