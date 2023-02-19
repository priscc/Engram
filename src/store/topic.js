import { db } from "@/main";
import { createStore } from 'vuex'


export const storeTopic = createStore({
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
      state.topic = i;
      console.log("topic.js update", state.topic);

      // CONTENT CLEAR
      state.events = [];
      state.trends = [];
      state.people = [];
      state.sources = [];
      state.terms = [];
      state.resources = [];

      // TRENDS
      db.collection("trends")
        .where("topicID", "array-contains-any", [state.topic.id])
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

      // HISTORICAL FIGURES
      var p = [];
      db.collection("people")
        .where("topicID", "array-contains-any", [state.topic.id])
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

      // PRIMARY SOURCES
      var s = [];
      db.collection("works")
        .where("topicID", "array-contains-any", [state.topic.id])
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

      // TERMS
      var t = [];
      db.collection("terminology")
        .where("topicID", "array-contains-any", [state.topic.id])
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

      // RESOURCES
      db.collection("resources")
        .where("topicID", "array-contains-any", [state.topic.id])
        .get()
        .then(
          function(querySnapshot) {
            querySnapshot.forEach(
              function(doc) {
                state.resources.push(doc.data());
              }.bind(this)
            );
          }.bind(this)
        );
    },
    updatedEvents(state, events) {
      state.events = events;
      console.log("topic.js events", state.events);
    },

    eventContent(state, i) {
      state.event = i;
    },
    eventRESET(state) {
      state.event = [];
    },
    personContent(state, i) {
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
    async eventsContent({ commit, state }) {
      // EVENTS
      var ev = [];
      await db
        .collection("events")
        .where("topicID", "array-contains-any", [state.topic.id])
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
            const events = ev.sort(function(a, b) {
              return a.startDate.dateNum - b.startDate.dateNum;
            });
            commit("updatedEvents", events);
          }.bind(this)
        );
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

export default storeTopic