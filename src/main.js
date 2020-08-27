import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
// vuefire
import { firestorePlugin } from 'vuefire'
// lo-dash
import VueLodash from 'vue-lodash'
import lodash from 'lodash'
// Firebase
import VueTextareaAutosize from 'vue-textarea-autosize'
import firebase from 'firebase/app'
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

Vue.config.productionTip = false
Vue.use(firestorePlugin)
Vue.use(VueLodash, { name: 'custom', lodash: lodash })
Vue.use(VueTextareaAutosize)
Vue.use(VueResource)
Vue.use(Vuetify) // for vuetify icons

Vue.directive('markdown', markdown) // v-markdown

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

const login = Vue.observable({
  user: null
});

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    login.user = user;
    if (router.currentRoute.path !== "/dashboard") {
      router.push({ path: "dashboard", params: { user: user } }); // Only on auth
    }
  } else {
    login.user = null;
    if (router.currentRoute.path !== "/") {
      router.push({ path: "/", params: { user: null } }); // Optimistic
    }
  }
});

export { firebase, db, login };


export default new Vuetify({
  icons: {
    iconfont: 'md',
    iconfont: 'fa',
    iconfont: 'mdiSvg',
    iconfont: 'mdi'
  }
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
