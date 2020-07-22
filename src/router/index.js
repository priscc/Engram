import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
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
      path: '/Topic/:id/:subpage',
      name: 'Topic',
      component: () => import('../views/Topic.vue')
    },
    {
      path: '/EventPage/:id',
      name: 'EventPage',
      component: () => import('../views/EventPage.vue')
    },
    {
      path: '/PeoplePage',
      name: 'PeoplePage',
      component: () => import('../views/PeoplePage.vue')
    },

  // Adding Content
    {
      path: '/FormPage',
      name: 'FormPage',
      component: () => import('../views/Adding_Content/FormPage.vue')
    },
    {
      path: '/AddTopic',
      name: 'AddTopic',
      component: () => import('../views/Adding_Content/AddTopic.vue')
    },
    {
      path: '/AddContent',
      name: 'AddEvent',
      component: () => import('../views/Adding_Content/AddContent.vue')
    },
    {
      path: '/blogShow',
      name: 'blogShow',
      component: () => import('../components/othercomponents/blogShow.vue')
    },

  // Other tester Code
    {
      path: '/Filter',
      name: 'Filter',
      component: () => import('../views/Filter.vue')
    },
    {
      path: '/GEOTester',
      name: 'GEOTester',
      component: () => import('../views/other_pages/GEOTester.vue')
    },
    {
      path: '/addBlog',
      name: 'addBlog',
      component: () => import('../components/othercomponents/addBlog.vue')
    },
    {
      path: '/singleBlog',
      name: 'singleBlog',
      component: () => import('../components/othercomponents/singleBlog.vue')
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
