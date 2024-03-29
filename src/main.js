import { createApp } from "vue";
import App from "./App.vue";
import store from "./store/index";
// ROUTER
import router from "./router";
// FIRESTORE
import firebase from "firebase/app";
import "firebase/firestore";
// QUILL
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
// BOOSTRAP
import { BootstrapVue } from "bootstrap-vue";
import { BootstrapIconsPlugin } from "bootstrap-icons-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
// GOOGLE ANALYTICS
import VueGtag from "vue-gtag";
//HOT JAR
import Hotjar from "@hotjar/browser";
// YOUTUBE
import VueYouTubeEmbed from "vue3-youtube";

export const db = firebase
  .initializeApp({
    apiKey: "AIzaSyDMw3cG7JR-RrrC-aWNugk_TS1oLBV58qw",
    authDomain: "ap-studybites.firebaseapp.com",
    projectId: "ap-studybites",
    storageBucket: "ap-studybites.appspot.com",
    messagingSenderId: "386062840730",
    appId: "1:386062840730:web:5f3a0c6b23f0be15220023",
    measurementId: "G-8XJMW8N6QS",
  })
  .firestore();

//HOTJAR
const siteId = 3665917;
const hotjarVersion = 6;
Hotjar.init(siteId, hotjarVersion);
// Initializing with `debug` option:
Hotjar.init(siteId, hotjarVersion, {
  debug: true,
});

const app = createApp(App);
app.use(store);
app.use(router);
app.use(BootstrapVue);
app.use(BootstrapIconsPlugin);
app.use(VueYouTubeEmbed);
app.component("QuillEditor", QuillEditor);
app.use(VueGtag, {
  config: { id: "G-8XJMW8N6QS" },
});

app.mount("#app");
