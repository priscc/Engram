import Vue from "vue";
import Vuex from "vuex";
import { db } from "@/main";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    topic: {},
    events: [],
    event: [],
    trends: [],
    people: [],
    person: [],
    sources: [],
    terms: [],
    resources: [],
  },
  mutations: {
    updatedTopicContent(state, i) {
      console.log("i", i);
      console.log("topic", state.topic);
      state.topic = i;

      // CONTENT CLEAR
      state.events = [];
      state.trends = [];
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
            var ev = [];
            querySnapshot.forEach(
              function (doc) {
                var entry = doc.data();
                entry.id = doc.id;
                entry.startDate.dateNum = Date.parse(entry.startDate.date);
                ev.push(entry);
              }.bind(this)
            );
            state.events = ev.sort(function (a, b) {
              return a.startDate.dateNum - b.startDate.dateNum;
            });
          }.bind(this)
        );

      // console.log("events", state.events);

      // TRENDS
      db.collection("trends")
        .where("topicID", "array-contains-any", [state.topic.id])
        .get()
        .then(
          function (querySnapshot) {
            querySnapshot.forEach(
              function (doc) {
                console.log(doc.data());
                state.trends.push(doc.data());
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
    eventContent(state, i) {
      console.log("updating content", i);
      state.event = i;
    },
    eventRESET(state) {
      state.event = [];
    },
    personContent(state, i) {
      console.log("updating content", i);
      state.person = i;
    },
    personRESET(state) {
      state.person = [];
    },
  },
  actions: {
    topicContent({ commit }, i) {
      commit("updatedTopicContent", i);
    },
    eventContent({ commit }, i) {
      commit("eventContent", i);
    },
    eventContentRESET({ commit }) {
      commit("eventRESET");
    },
    personContent({ commit }, i) {
      commit("personContent", i);
    },
    personContentRESET({ commit }) {
      commit("personRESET");
    },
  },
  modules: {},
});
