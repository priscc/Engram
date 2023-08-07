import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import PrivacyPolicy from "../views/PrivacyPolicy.vue";
import About from "../views/About.vue";
import Topics from "../views/Topics.vue";
import Topic from "../views/Topic.vue";
import Event from "../components/Event.vue";
import Person from "../components/Person.vue";
import EssayWriting from "../views/writing_feature/EssayWriting";
import SelectModuleV1 from "../views/writing_feature/SelectModuleV1";
import SelectModule from "../views/writing_feature/SelectModule";
import SelectDifficulty from "../views/writing_feature/SelectDifficulty";
import EssayMain from "../views/writing_feature/EssayMain";
import ChoosePrompt from "../views/writing_feature/ChoosePrompt";
import LEQEssay from "../views/writing_feature/LEQEssay";
import Feedback from "../views/writing_feature/Feedback";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/privacypolicy",
    name: "PrivacyPolicy",
    component: PrivacyPolicy
  },
  {
    path: "/about",
    name: "About",
    component: About
  },
  {
    path: "/Period/:periodName/:period",
    name: "Period",
    component: Topics
  },
  {
    path: "/Period/:periodName/:period/Topic/:topicName/:topic/:category",
    name: "Topic",
    component: Topic
  },
  {
    path:
      "/Period/:periodName/:period/Topic/:topicName/:topic/:category/Event/:event",
    name: "Event",
    component: Event
  },
  {
    path:
      "/Period/:periodName/:period/Topic/:topicName/:topic/:category/Figure/:person",
    name: "Person",
    component: Person
  }, 
  {
    path: "/EssayWriting",
    name: "EssayWriting",
    component: EssayWriting
  }, 
  {
    path: "/SelectModule",
    name: "SelectModule",
    component: SelectModuleV1
  }, 
  {
    path: "/SelectDifficulty",
    name: "SelectDifficulty",
    component: SelectDifficulty
  }, 
  {
    path: "/EssayMain",
    name: "EssayMain",
    component: EssayMain
  }, 
  {
    path: "/001",
    name: "001",
    component: SelectModule
  }, 
  {
    path: "/002",
    name: "002",
    component: ChoosePrompt
  }, 
  {
    path: "/003/:id",
    name: "003",
    component: LEQEssay
  }, 
  {
    path: "/004/:id",
    name: "004",
    component: Feedback
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
