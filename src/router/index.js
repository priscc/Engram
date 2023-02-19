import { createRouter, createWebHistory } from 'vue-router'

import Home from "../views/Home.vue";
import PrivacyPolicy from "../views/PrivacyPolicy.vue";
import About from "../views/About.vue";
import Topics from "../views/Topics.vue";
import Topic from "../views/Topic.vue";
import Event from "../components/Event.vue";
import Person from "../components/Person.vue";



const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/privacypolicy",
    name: "PrivacyPolicy",
    component: PrivacyPolicy,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/Period/:period",
    name: "Period",
    component: Topics,
  },
  {
    path: "/Period/:period/Topic/:topic/:category",
    name: "Topic",
    component: Topic,
  },
  {
    path: "/Period/:period/Topic/:topic/:category/Event/:event",
    name: "Event",
    component: Event,
  },
  {
    path: "/Period/:period/Topic/:topic/:category/Figure/:person",
    name: "Person",
    component: Person,
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
