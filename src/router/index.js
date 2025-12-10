import { createRouter, createWebHistory } from "vue-router";

//Routes for General Pages
import Home from "../views/Home";
import PrivacyPolicy from "../views/PrivacyPolicy.vue";
import About from "../views/About.vue";

//Routes for AP World History Pages
// URL Structure --> { /ap-world-history/period/<periodSlug>-<periodNumber>/topic/<topicSlug>-<topicId>/<category>/<itemSlug>-<itemId></itemId> }
import AllPeriods from "../views/Units.vue";
import Topics from "../views/Topics.vue";
import Topic from "../views/Topic.vue";
import Event from "../components/Event.vue";
import Person from "../components/Person.vue";

//Routes for Essay Writing Feature
//old
import EssayWriting from "../views/writing_feature/EssayWriting";
import SelectModuleV1 from "../views/writing_feature/SelectModuleV1";
import SelectDifficulty from "../views/writing_feature/SelectDifficulty";
//new
import SelectModule from "../views/writing_feature/SelectModule";
import ChoosePrompt from "../views/writing_feature/ChoosePrompt";
import LEQEssay from "../views/writing_feature/LEQEssay";
import LabelSection from "../views/writing_feature/LabelSection";
import Feedback from "../views/writing_feature/Feedback";

//ROUTES FOR QUIZZES
import Quiz from "../views/quiz_feature/QuizFeature";
import QuizUnit1 from "../views/quiz_feature/QuizUnit1";

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
    path: "/ap-world-history",
    name: "All_Periods",
    component: AllPeriods
  },
  {
    path: "/ap-world-history/period/:periodName-:period(\\d+)",
    name: "Period",
    component: Topics
  },
  {
    // Topic page: uses the new /ap-world-history/period/... base and includes an optional
    // item slug for SEO (`:itemSlug?`). Params preserved: periodName, period, topicName, topic, category
    path:
      "/ap-world-history/period/:periodName-:period(\\d+)/topic/:topicName-:topic([A-Za-z0-9]+)/:category([^/]+)/:itemSlug([^/]+)?",
    name: "Topic",
    component: Topic
  },
  {
    // Event page (under a topic)
    path:
      "/ap-world-history/period/:periodName-:period(\\d+)/topic/:topicName-:topic([A-Za-z0-9]+)/:category([^/]+)/event/:event([A-Za-z0-9]+)/:itemSlug([^/]+)?",
    name: "Event",
    component: Event
  },
  {
    // Person (figure) profile page
    path:
      "/ap-world-history/period/:periodName-:period(\\d+)/topic/:topicName-:topic([A-Za-z0-9]+)/:category([^/]+)/figure/:person([A-Za-z0-9]+)/:itemSlug([^/]+)?",
    name: "Person",
    component: Person
  },
  {
    path: "/Quiz",
    name: "Quiz",
    component: Quiz
  },
  {
    path: "/Quiz/Unit1",
    name: "QuizUnit1",
    component: QuizUnit1
  },
  //old essay pages
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
  //new essay pages
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
    path: "/005",
    name: "005",
    component: LabelSection
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
