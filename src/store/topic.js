import { db } from "@/main";
import { createStore } from "vuex";

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
    person: []
  },
  mutations: {
    //TOPIC
    retrieveTopicContent(state, i) {
      state.topic = i;
    },
    //EVENTS
    retrieveEvents(state, i) {
      state.events = [];
      var ev = [];
      db.collection("events")
        .where("topicID", "array-contains-any", [i])
        .get()
        .then(
          function(querySnapshot) {
            querySnapshot.forEach(
              function(doc) {
                var entry = doc.data();
                entry.id = doc.id;
                //start year calculation
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
                //end year parsing
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
              }.bind(this)
            );
            console.log(ev);
            const events = ev.sort(function(a, b) {
              return a.startDate.dateNum - b.startDate.dateNum;
            });
            console.log("topic.js Evenent:", events);
            state.events = events;
          }.bind(this)
        );
    },
    //TRENDS
    retrieveTrends(state, i) {
      state.trends = [];
      db.collection("trends")
        .where("topicID", "array-contains-any", [i])
        .get()
        .then(
          function(querySnapshot) {
            querySnapshot.forEach(
              function(doc) {
                state.trends.push(doc.data());
              }.bind(this)
            );
          }.bind(this)
        );
    },
    //PEOPLE
    retrievePeople(state, i) {
      state.people = [];
      var p = [];
      db.collection("people")
        .where("topicID", "array-contains-any", [i])
        .get()
        .then(
          function(querySnapshot) {
            querySnapshot.forEach(
              function(doc) {
                var entry = doc.data();
                entry.id = doc.id;
                p.push(entry);
              }.bind(this)
            );
            const people = p.sort(function(a, b) {
              if (a.name < b.name) {
                return -1;
              }
              if (a.name > b.name) {
                return 1;
              }
              return 0;
            });
            state.people = people;
          }.bind(this)
        );
    },
    //SOURCES
    retrieveSources(state, i) {
      state.sources = [];
      var s = [];
      db.collection("works")
        .where("topicID", "array-contains-any", [i])
        .get()
        .then(
          function(querySnapshot) {
            querySnapshot.forEach(
              function(doc) {
                var entry = doc.data();
                entry.id = doc.id;
                s.push(entry);
              }.bind(this)
            );
            const sources = s.sort(function(a, b) {
              if (a.title < b.title) {
                return -1;
              }
              if (a.title > b.title) {
                return 1;
              }
              return 0;
            });
            state.sources = sources;
          }.bind(this)
        );
    },
    //TERMS
    retrieveTerms(state, i) {
      state.terms = [];
      var t = [];
      db.collection("terminology")
        .where("topicID", "array-contains-any", [i])
        .get()
        .then(
          function(querySnapshot) {
            querySnapshot.forEach(
              function(doc) {
                t.push(doc.data());
              }.bind(this)
            );
            const terms = t.sort(function(a, b) {
              if (a.term < b.term) {
                return -1;
              }
              if (a.term > b.term) {
                return 1;
              }
              return 0;
            });
            state.terms = terms;
          }.bind(this)
        );
    },
    //RESOURES
    retrieveToipcResources(state, i) {
      state.topicResources = [];
      db.collection("resources")
        .where("topicID", "array-contains-any", [i])
        .where("parentType", "==", "topic")
        .get()
        .then(
          function(querySnapshot) {
            querySnapshot.forEach(
              function(doc) {
                state.topicResources.push(doc.data());
              }.bind(this)
            );
          }.bind(this)
        );
    },
    retrieveEventResources(state, i) {
      console.log("event store id ", i);
      var i2 = String(i);
      state.eventResources = [];
      db.collection("resources")
        .where("parentID", "==", i2)
        .get()
        .then(
          function(querySnapshot) {
            querySnapshot.forEach(
              function(doc) {
                state.eventResources.push(doc.data());
              }.bind(this)
            );
          }.bind(this)
        );
      console.log("state.eventResources ", state.eventResources);
    },
    retrievePeopleResources(state, i) {
      state.peopleResources = [];
      db.collection("resources")
        .where("topicID", "array-contains-any", [i])
        .where("parentType", "==", "people")
        .get()
        .then(
          function(querySnapshot) {
            querySnapshot.forEach(
              function(doc) {
                state.peopleResources.push(doc.data());
              }.bind(this)
            );
          }.bind(this)
        );
    },
    retrievePersonResources(state, i) {
      console.log("event store id ", i);
      var i2 = String(i);
      state.eventResources = [];
      db.collection("resources")
        .where("parentID", "==", i2)
        .get()
        .then(
          function(querySnapshot) {
            querySnapshot.forEach(
              function(doc) {
                state.personResources.push(doc.data());
              }.bind(this)
            );
          }.bind(this)
        );
      console.log("state.personResources ", state.personResources);
    },
    //EVENT
    setEvent(state, i) {
      state.event = i;
    },
    eventIndex(state, i) {
      console.log("state eventIndex", i);
      state.eventIndex = i;
    },
    //PERSON
    setPerson(state, i) {
      state.person = i;
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
    }
  }
});

export default storeTopic;
