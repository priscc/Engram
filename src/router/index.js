import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Topics from "../views/Topics.vue";
import Topic from "../views/Topic.vue";
import GEO from "../views/GEOTester.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/Topics",
    name: "Topics",
    component: Topics,
  },
  {
    // individual topics
    path: "/Topic/:id",
    name: "Topic",
    component: Topic,
  },
  {
    path: "/GEO",
    name: "GEO",
    component: GEO,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
