import { createApp } from 'vue'
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import firebase from "firebase/app";
// import { getPerformance } from "firebase/performance";
// import "firebase/performance";
import "firebase/firestore";
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'



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

// Initialize Performance Monitoring and get a reference to the service
// const perf = firebase.performance();

const vuetify = createVuetify({
  components,
  directives,
})

// new Vue({
// 	router,
// 	store,
// 	vuetify,
// 	render: (h) => h(App),
// })

const app = createApp(App);
// app.config.productionTip = false;
app.use(store);
app.use(router);
app.use(vuetify);
app.mount('#app');


