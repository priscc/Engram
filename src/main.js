import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import firebase from "firebase/app";
import "firebase/firestore";
// vuefire

Vue.config.productionTip = false;

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

new Vue({
	router,
	store,
	vuetify,
	render: (h) => h(App),
}).$mount("#app");
