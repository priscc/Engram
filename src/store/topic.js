import { createStore } from "vuex";
import {
  fetchEventsByTopic,
  fetchTrendsByTopic,
  fetchPeopleByTopic,
  fetchWorksByTopic,
  fetchTerminologyByTopic,
  fetchResourcesByTopicAndParentType,
  fetchResourcesByParentId
} from "@/services/firestore";

export const storeTopic = createStore({
  state: {
    topic: {},
    events: [],
    trends: [],
    people: [],
    sources: [],
    terms: [],
    topicResources: [],
    eventResources: [],
    peopleResources: [],
    personResources: [],
    event: [],
    eventIndex: 0,
    person: [],
    loaded: 0
  },
  mutations: {
    //TOPIC
    retrieveTopicContent(state, i) {
      state.topic = i;
    },
    //EVENTS
    retrieveEvents(state, i) {
      state.events = [];
      // Fetch events via service then perform the same processing
      fetchEventsByTopic(i).then(docs => {
        const ev = [];
        docs.forEach(entry => {
          // start year calculation
          var parsedDate = Date.parse(entry.startDate.date);
          if (parsedDate < -30610292638000) {
            parsedDate = new Date(parsedDate).getFullYear();
          } else {
            if (entry.startDate.date.length <= 4) {
              parsedDate = new Date(parsedDate).getFullYear() + 1;
            } else {
              parsedDate = new Date(parsedDate).getFullYear();
            }
          }
          entry.startDate.dateNum = parsedDate;
          // end year parsing
          var parsedDateEnd = Date.parse(entry.endDate.date);
          if (parsedDateEnd < -30610292638000) {
            parsedDateEnd = new Date(parsedDateEnd).getFullYear();
          } else {
            if (entry.endDate.date.length <= 4) {
              parsedDateEnd = new Date(parsedDateEnd).getFullYear() + 1;
            } else {
              parsedDateEnd = new Date(parsedDateEnd).getFullYear();
            }
          }
          if (entry.endDate.date == "Modern Day") {
            parsedDateEnd = new Date().getFullYear();
          } else if (isNaN(parsedDateEnd)) {
            parsedDateEnd = 0;
          }
          entry.endDate.dateNum = parsedDateEnd;
          ev.push(entry);
        });
        const events = ev.sort(function(a, b) {
          return a.startDate.dateNum - b.startDate.dateNum;
        });
        state.events = events;
        state.loaded++;
      });
    },
    //TRENDS
    retrieveTrends(state, i) {
      state.trends = [];
      fetchTrendsByTopic(i).then(docs => {
        state.trends = docs;
        state.loaded++;
      });
    },
    //PEOPLE
    retrievePeople(state, i) {
      state.people = [];
      fetchPeopleByTopic(i).then(docs => {
        const people = docs.sort(function(a, b) {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
        state.people = people;
        state.loaded++;
      });
    },
    //SOURCES
    retrieveSources(state, i) {
      state.sources = [];
      fetchWorksByTopic(i).then(docs => {
        const sources = docs.sort(function(a, b) {
          if (a.title < b.title) {
            return -1;
          }
          if (a.title > b.title) {
            return 1;
          }
          return 0;
        });
        state.sources = sources;
        state.loaded++;
      });
    },
    //TERMS
    retrieveTerms(state, i) {
      state.terms = [];
      fetchTerminologyByTopic(i).then(docs => {
        const terms = docs.sort(function(a, b) {
          if (a.term < b.term) {
            return -1;
          }
          if (a.term > b.term) {
            return 1;
          }
          return 0;
        });
        state.terms = terms;
        state.loaded++;
      });
    },
    //RESOURES
    retrieveToipcResources(state, i) {
      state.topicResources = [];
      fetchResourcesByTopicAndParentType(i, "topic").then(docs => {
        state.topicResources = docs;
      });
    },
    retrieveEventResources(state, i) {
      var i2 = String(i);
      state.eventResources = [];
      fetchResourcesByParentId(i2).then(docs => {
        state.eventResources = docs;
      });
    },
    retrievePeopleResources(state, i) {
      state.peopleResources = [];
      fetchResourcesByTopicAndParentType(i, "people").then(docs => {
        state.peopleResources = docs;
      });
    },
    retrievePersonResources(state, i) {
      var i2 = String(i);
      state.eventResources = [];
      fetchResourcesByParentId(i2).then(docs => {
        state.personResources = docs;
      });
    },
    //EVENT
    setEvent(state, i) {
      state.event = i;
    },
    eventIndex(state, i) {
      state.eventIndex = i;
    },
    //PERSON
    setPerson(state, i) {
      state.person = i;
    },
    //REST LOADER
    loader_add1(state) {
      state.loaded++;
    },
    restLoader(state) {
      state.loaded = 0;
    }
  },
  actions: {
    //TOPIC
    setTopicContent({ commit }, i) {
      commit("retrieveTopicContent", i);
    },
    //EVENTS
    setTopicEvents({ commit }, i) {
      commit("retrieveEvents", i);
    },
    //TRENDS
    setTopicTrends({ commit }, i) {
      commit("retrieveTrends", i);
    },
    //PEOPLE
    setTopicPeople({ commit }, i) {
      commit("retrievePeople", i);
    },
    //SOURCES
    setTopicSources({ commit }, i) {
      commit("retrieveSources", i);
    },
    //TERMS
    setToipcTerms({ commit }, i) {
      commit("retrieveTerms", i);
    },
    //RESOURCES
    setToipcResources({ commit }, i) {
      commit("retrieveToipcResources", i);
    },
    setEventResources({ commit }, i) {
      commit("retrieveEventResources", i);
    },
    setPeopleResources({ commit }, i) {
      commit("retrievePeopleResources", i);
    },
    setPersonResources({ commit }, i) {
      commit("retrievePersonResources", i);
    },
    //EVENT
    setEventContent({ commit }, i) {
      commit("setEvent", i);
    },
    setEventIndex({ commit }, i) {
      commit("eventIndex", i);
    },
    //PERSON
    setPersonContent({ commit }, i) {
      commit("setPerson", i);
    },
    //REST LOADER
    loader_add1({ commit }) {
      commit("loader_add1");
    },
    restLoader({ commit }) {
      commit("restLoader");
    }
  }
});

export default storeTopic;
