import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store/index";
import firebase from "firebase/app";
// import { getPerformance } from "firebase/performance";
// import "firebase/performance";
import "firebase/firestore";
// vuefire
// Vuetify
// import 'vuetify/styles';
import { createVuetify } from 'vuetify';
// import * as components from 'vuetify/components';
// import * as directives from 'vuetify/directives';
import { BootstrapVue } from 'bootstrap-vue'
import { BootstrapIconsPlugin } from 'bootstrap-icons-vue';


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-icons/font/bootstrap-icons.css'


const vuetify = createVuetify({
//   components,
//   directives,
})

export const db = firebase
	.initializeApp({
		apiKey: "AIzaSyDMw3cG7JR-RrrC-aWNugk_TS1oLBV58qw",
		authDomain: "ap-studybites.firebaseapp.com",
		projectId: "ap-studybites",
		storageBucket: "ap-studybites.appspot.com",
		messagingSenderId: "386062840730",
		appId: "1:386062840730:web:5f3a0c6b23f0be15220023",
		measurementId: "G-8XJMW8N6QS"
	}).firestore();

// Initialize Performance Monitoring and get a reference to the service
// const perf = firebase.performance();

// createApp({store, router, vuetify,render: (h) => h(App),}).mount('#app');
const app = createApp(App)
app.use(store);
app.use(router);
app.use(vuetify);
app.use(BootstrapVue);
app.use(BootstrapIconsPlugin);
// app.config.productionTip = false;
app.mount('#app');
