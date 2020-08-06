import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
// lo-dash
import VueLodash from 'vue-lodash'
import lodash from 'lodash'
// Firebase
import VueTextareaAutosize from 'vue-textarea-autosize'
import firebase from 'firebase/app'
import 'firebase/firestore'
// VueResource
import VueResource from 'vue-resource'
// Vue icons
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
import '@fortawesome/fontawesome-free/css/all.css' // for fa icons
import Vuetify from 'vuetify/lib'
// Markdown
import markdown from '@/directives/markdown'

Vue.config.productionTip = false
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

export const db = firebase.firestore()

export const tc = Vue.observable({
  topic: null
});


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
