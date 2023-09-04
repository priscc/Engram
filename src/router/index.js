import { createRouter, createWebHistory } from "vue-router";

import Units from "../views/Units.vue";
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
import Home from "../views/Home";
import ChoosePrompt from "../views/writing_feature/ChoosePrompt";
import LEQEssay from "../views/writing_feature/LEQEssay";
import Feedback from "../views/writing_feature/Feedback";
import Quiz from "../views/Quiz";
import QuizFeature from "../views/QuizFeature.vue";
import LabelSection from "../views/writing_feature/LabelSection";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/Units",
    name: "Units",
    component: Units
  },
  {
    path: "/unitquestions",
    name: "QuizFeature",
    component: QuizFeature
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
    path: "/Quiz",
    name: "Quiz",
    component: Quiz
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
    path: "/001",
    name: "001",
    component: SelectModule
  }, 
  {
    path: "/002/:module",
    name: "002",
    component: ChoosePrompt
  }, 
  {
    path: "/003/:id/:module",
    name: "003",
    component: LEQEssay
  }, 
  {
    path: "/004/:id",
    name: "004",
    component: Feedback
  },
  {
    path: "/test",
    name: "test",
    component: LabelSection
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
