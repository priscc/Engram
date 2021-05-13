import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  //user Login
    {
      path: '/NextSteps',
      name: 'NextSteps',
      component: () => import('../views/NextSteps.vue')
    },
  //view pages
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/About',
      name: 'About',
      component: () => import('../views/About.vue')
    },
    {
      path: '/Topic/:id',
      // path: '/Topic',
      name: 'Topic',
      component: () => import('../views/Topic.vue')
    },
    {
      path: '/EventPage/:id',
      name: 'EventPage',
      component: () => import('../views/EventPage.vue')
    },
    {
      path: '/PeoplePage/:id',
      name: 'PeoplePage',
      component: () => import('../views/PeoplePage.vue')
    },

  // Adding Content
    {
      path: '/ManageContent',
      name: 'ManageContent',
      component: () => import('../views/Adding_Content/ManageContent.vue')
    },
    {
      path: '/AddTopic',
      name: 'AddTopic',
      component: () => import('../views/Adding_Content/AddTopic.vue')
    },
    {
      path: '/ModifyingTopic',
      name: 'ModifyingTopic',
      component: () => import('../views/Adding_Content/ModifyingTopic.vue')
    },
    {
      path: '/ModifyingContent',
      name: 'ModifyingContent',
      component: () => import('../views/Adding_Content/ModifyingContent.vue')
    },
  // Other tester Code
    {
      path: '/GEOTester',
      name: 'GEOTester',
      component: () => import('../views/GEOTester.vue')
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
