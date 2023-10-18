import { createStore } from "vuex";
import { db } from "@/main";

export const store = createStore({
  state: {
    units: [],
    timePeriodHeaders: [
      {
        header: "Regional Interactions",
        subheader: "1200-1450",
        unitTitles: {
          "Unit 1: The Global Tapestry": {
            unitHeader: "Unit 1: The Global Tapestry",
            topics: [],
          },
          "Unit 2: Networks of Exchange": {
            unitHeader: "Unit 2: Networks of Exchange",
            topics: [],
          },
        },
        color: "green",
        timePeriod: 1,
        img: "RegionalInteractions.png",
      },
      {
        header: "First Global Age",
        subheader: "1450-1750",
        unitTitles: {
          "Unit 3: Land-Based Empires": {
            unitHeader: "Unit 3: Land-Based Empires",
            topics: [],
          },
          "Unit 4: Transoceanic Interconnections": {
            unitHeader: "Unit 4: Transoceanic Interconnections",
            topics: [],
          },
        },
        color: "yellow",
        timePeriod: 2,
        img: "FirstGlobalAge.png",
      },
      {
        header: "Revolutions & Industrialization",
        subheader: "1750-1900",
        unitTitles: {
          "Unit 5: Revolutions": {
            unitHeader: "Unit 5: Revolutions",
            topics: [],
          },
          "Unit 6: Consequences of Industrialization": {
            unitHeader: "Unit 6: Consequences of Industrialization",
            topics: [],
          },
        },
        color: "pink",
        timePeriod: 3,
        img: "Rev&Indus.png",
      },
      {
        header: "Modern Times",
        subheader: "1900-Present",
        unitTitles: {
          "Unit 7: Global Conflict": {
            unitHeader: "Unit 7: Global Conflict",
            topics: [],
          },
          "Unit 8: Cold War and Decolonization": {
            unitHeader: "Unit 8: Cold War and Decolonization",
            topics: [],
          },
          "Unit 9: Globalization": {
            unitHeader: "Unit 9: Globalization",
            topics: [],
          },
        },
        color: "blue",
        timePeriod: 4,
        img: "Modern.png",
      },
    ],
    currentTimePeriod: 0,
    currentTopicCategory: 0,
  },
  getters: {
    timePeriodHeaders: (state) =>
      state.timePeriodHeaders[state.currentTimePeriod],
  },
  mutations: {
    selectedTimePeriod(state, i) {
      state.currentTimePeriod = i - 1;
    },
    topicButtonCategory(state, i) {
      state.currentTopicCategory = i;
    },
    timePeriodTopics(state, timePeriod) {
      // Send event to Google Analytics
      if (window.gtag) {
        const eventCategory = "engagement";
        const eventAction = "topics-page";
        const eventLabel = state.timePeriodHeaders[timePeriod - 1].header;
        window.gtag("event", eventAction, {
          event_category: eventCategory,
          event_label: eventLabel,
        });
      }
      state.units = [];
      var dbtopics = [];
      db.collection("topics")
        .where("timePeriod", "==", timePeriod)
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            var entry = doc.data();
            entry.id = doc.id;
            dbtopics.push(entry);
          });
          dbtopics = dbtopics.sort(function(a, b) {
            if (a.timespan && b.timespan) {
              var a1 = new Date(a.timespan.substring(0, 4));
              var a2 = a1.getFullYear();
              var b1 = new Date(b.timespan.substring(0, 4));
              var b2 = b1.getFullYear();
              return a2 - b2;
            }
          });
          const currentUnits =
            state.timePeriodHeaders[timePeriod - 1].unitTitles;
          for (const unit in currentUnits) {
            if (currentUnits[unit].topics) {
              currentUnits[unit].topics = dbtopics.filter(
                (topic) => topic.unit === unit,
              );
            }
          }
          state.units = currentUnits;
        });
    },
  },
  actions: {
    setTimePeriod({ commit }, i) {
      commit("selectedTimePeriod", parseInt(i));
      commit("timePeriodTopics", parseInt(i));
    },
    setTopicCategory({ commit }, i) {
      commit("topicButtonCategory", i);
    },
  },
});

export default store;
