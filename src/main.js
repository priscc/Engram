import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// Bootstrap 4
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// Lo-dash
import VueLodash from 'vue-lodash'
import lodash from 'lodash'


Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(VueLodash, { lodash: lodash })


// render: tells vue what to render, in this case App.vue 
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
