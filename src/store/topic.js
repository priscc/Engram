import Vue from "vue";
import Vuex from "vuex";
import { db } from "@/main";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    topic: {},
    events: [],
    people: [],
    sources: [],
    terms: [],
    resources: [],
  },
  mutations: {
    updatedTopicContent(state, i) {
      console.log("i", i);
      state.topic = i;
      // CONTENT CLEAR
      state.events = [];
      state.people = [];
      state.sources = [];
      state.terms = [];
      state.resources = [];

      // EVENTS
      db.collection("events")
        .where("topicID", "array-contains-any", [state.topic.id])
        .get()
        .then(
          function (querySnapshot) {
            querySnapshot.forEach(
              function (doc) {
                var entry = doc.data();
                entry.id = doc.id;
                state.events.push(entry);
              }.bind(this)
            );
          }.bind(this)
        );

      // HISTORICAL FIGURES
      db.collection("people")
        .where("topicID", "array-contains-any", [state.topic.id])
        .get()
        .then(
          function (querySnapshot) {
            querySnapshot.forEach(
              function (doc) {
                var entry = doc.data();
                entry.id = doc.id;
                state.people.push(entry);
              }.bind(this)
            );
          }.bind(this)
        );

      // PRIMARY SOURCES
      db.collection("works")
        .where("topicID", "array-contains-any", [state.topic.id])
        .get()
        .then(
          function (querySnapshot) {
            querySnapshot.forEach(
              function (doc) {
                state.sources.push(doc.data());
              }.bind(this)
            );
          }.bind(this)
        );

      // TERMS
      db.collection("terminology")
        .where("topicID", "array-contains-any", [state.topic.id])
        .get()
        .then(
          function (querySnapshot) {
            querySnapshot.forEach(
              function (doc) {
                state.terms.push(doc.data());
              }.bind(this)
            );
          }.bind(this)
        );

      // RESOURCES
      db.collection("resources")
        .where("topicID", "array-contains-any", [state.topic.id])
        .get()
        .then(
          function (querySnapshot) {
            querySnapshot.forEach(
              function (doc) {
                state.resources.push(doc.data());
              }.bind(this)
            );
          }.bind(this)
        );
    },
    contentRESET(state) {
      state.events = [];
      state.events = [];
      state.events = [];
      state.events = [];
      state.events = [];
    },
  },
  actions: {
    topicContent({ commit }, i) {
      commit("updatedTopicContent", i);
    },
    topicContentRESET({ commit }) {
      commit("contentRESET");
    },
  },
  modules: {},
});

//people state format
// {
//   imgURL:
//     "https://blog.hutong-school.com/wp-content/uploads/2015/12/Confucius.jpg",
//   name: "Confucius",
//   birth: "551 BCE",
//   death: "479 BCE",
//   age: "72 YRS",
//   text:
//     "A muslim-born Eunuch, Zheng He fell into favor with the Ming emperor, and quickly rose to an influential position in the Ming court. By 1405, he had set out in command of the Ming Treasure fleets. He went on a total of seven naval expeditions, and, with the support of the emperor, he reached as far as East Africa, the Arabian Peninsula, and India, on ships rumored to be well over 400 feet in length, with hundreds of sailors manning each of the dozens of ships in the treasure fleet.",
//   resources: [
//     { url: "https://www.youtube.com/embed/tUhGRh4vdb8" },
//     { url: "https://www.youtube.com/embed/wFt_VGG0kJU" },
//   ],
// },
// worsk format
// {
//         img:
//           "https://bigobooking.com/userfiles/attraction/thumb/forbidden-city-beijing-china.jpg",
//         title: " The Forbidden City",
//         text:
//           "The Forbidden city is a palace complex constructed by the Ming dynasty in Beijing, China. It was the residence of every Ming and Qing emperor since its construction.",
//       },
//  terms format
// {
//         img:
//           "https://bigobooking.com/userfiles/attraction/thumb/forbidden-city-beijing-china.jpg",
//         term: " The Forbidden City",
//         caption:
//           "Originally grown in modern Vietnam, this special <b>drought-resistant rice</b> became widespread in Song China after officials realized just how effective it was. China’s population was soon dependent on the production and trade of  Champa rice, and at this point the versatility of the rice was the main factor that kept the massive Chinese population from starving.",
//       },
