<template>
  <v-app>
    <v-app-bar app color="black" dark flat>
      <v-container fluid>
        <v-row>
          <v-col class="d-flex justify-center">
            <v-btn @click="home" text>
              <h3 class="white--text">STUDY BITES</h3>
            </v-btn>
            <!--  <v-btn to="GEO" text>
              <h3 class="white--text">GEO</h3>
            </v-btn> -->
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
    <v-main :style="{ 'background-color': bgColor, color: textColor }">
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
export default {
  name: "App",
  methods: {
    home() {
      store.dispatch("setTopicButton", 0);
      this.$router.push("/");
    },
  },
  computed: {
    bgColor: function () {
      if (store.state.currentTopicComponent == 1) {
        return "black";
      } else {
        return "white";
      }
    },
    textColor: function () {
      if (store.state.currentTopicComponent == 1) {
        return "white";
      } else {
        return "black";
      }
    },
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
