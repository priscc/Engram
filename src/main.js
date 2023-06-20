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

// import { getPerformance } from "firebase/performance";
// import "firebase/performance";



// making comment

// making another comment change
export const db = firebase
  .initializeApp({
    apiKey: "AIzaSyDMw3cG7JR-RrrC-aWNugk_TS1oLBV58qw",
    authDomain: "ap-studybites.firebaseapp.com",
    projectId: "ap-studybites",
    storageBucket: "ap-studybites.appspot.com",
    messagingSenderId: "386062840730",
    appId: "1:386062840730:web:5f3a0c6b23f0be15220023",
    measurementId: "G-8XJMW8N6QS"
  })
  .firestore();

// Initialize Performance Monitoring and get a reference to the service
// const perf = firebase.performance();

const app = createApp(App);
app.use(store);
app.use(router);
app.use(BootstrapVue);
app.use(BootstrapIconsPlugin);
app.component("QuillEditor", QuillEditor);
// app.config.productionTip = false;
app.use(VueGtag, {
  config: { id: "G-8XJMW8N6QS" }
});
app.mount("#app");
