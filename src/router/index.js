import Vue from "vue";
// import { createRouter, createWebHistory } from "vue-router";

import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Topics from "../views/Topics.vue";
import Topic from "../views/Topic.vue";
import Event from "../components/Event.vue";
import Person from "../components/Person.vue";
import GEO from "../views/GEOTester.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  //Home > Topic
  {
    path: "/Period/:period",
    name: "Period",
    component: Topics,
  },
  {
    // Home > Topics > Topic
    path: "/Period/:period/Topic/:topic",
    name: "Topic",
    component: Topic,
  },
  {
    path: "/Event/:id",
    name: "Event",
    component: Event,
  },
  {
    path: "/Figure/:id",
    name: "Person",
    component: Person,
  },
  {
    path: "/GEO",
    name: "GEO",
    component: GEO,
  },
];

// const router = createRouter({
//   history: createWebHistory(),
//   mode: "history",
//   base: process.env.BASE_URL,
//   routes,
// });

const router = new VueRouter({
  mode: "history",
  // base: process.env.BASE_URL,
  routes,
});

export default router;
