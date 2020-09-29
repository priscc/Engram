import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import * as firebase from 'firebase/app'
// analytics
import 'firebase/analytics';
// vuefire
import { firestorePlugin } from 'vuefire'
// Vue Authentication
import "firebase/firestore";
import "firebase/auth";
// lo-dash
import VueLodash from 'vue-lodash'
import lodash from 'lodash'
// Firebase
import VueTextareaAutosize from 'vue-textarea-autosize'
import 'firebase/firestore'
import "firebase/auth";
// VueResource
import VueResource from 'vue-resource'
// Vue icons
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
import '@fortawesome/fontawesome-free/css/all.css' // for fa icons
import Vuetify from 'vuetify/lib'
// Markdown
import markdown from '@/directives/markdown'


// Vue plugins & resources
Vue.config.productionTip = false
Vue.use(firestorePlugin)
Vue.use(VueLodash, { name: 'custom', lodash: lodash })
Vue.use(VueTextareaAutosize)
Vue.use(VueResource)
Vue.use(Vuetify) // for vuetify icons
Vue.directive('markdown', markdown) // v-markdown


// Firebase
firebase.initializeApp({
  apiKey: "AIzaSyAEztmZlas_ZkOv21pbW2rLOa9TBDPDX0k",
  authDomain: "ap-studybit.firebaseapp.com",
  databaseURL: "https://ap-studybit.firebaseio.com",
  projectId: "ap-studybit",
  storageBucket: "ap-studybit.appspot.com",
  messagingSenderId: "450002681745",
  appId: "1:450002681745:web:2645cd3c81c3eac836e430",
  measurementId: "G-7DCFPNFXDB"
})

const db = firebase.firestore()
const analytics = firebase.analytics();

export { firebase, db, analytics};


// icons
export default new Vuetify({
  icons: {
    iconfont: 'md',
    iconfont: 'fa',
    iconfont: 'mdiSvg',
    iconfont: 'mdi'
  }
})

// tools
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')


// Analytics
// 1) Home page (record time) -- shows how many people view the site
// 2) Intro page (record time) -- show how many people click on a topic
// 3) Event page -- this page in comparision to others show if people like the interactivety more
  // 3.1) Not expanded timeline -- how many people clicked on the event page
  // 3.2) Expanded timeline (record time) -- show how many people interacted with the site
// 4) People, Terms, Primary Sources (record time)
// 5) Next Steps (record time) - Show how many people are interested in the future
  // 5.1) Click on survey - early adopters; show % of people interested in future iteration vs want to help improve this resource
  // 5.2) Click to help add content - shows they feel this is something worth building
// 6) About (record) - num of users vs total users

// Funnel 
// 1) Home - Intro - Events - Event Expanded - Event Page


// Calculations
// Home vs Next Steps - % of people interested in learning whats next
// Next Steps vs Click on survey - % of people who feel the site is worth building but needs improvement
// Next Steps vs Click to help add content - % of people who feel the site is worth building 
// Time on event page time vs Time on other pages - % of people that value the UI engagement















