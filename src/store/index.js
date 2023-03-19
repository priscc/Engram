import { createStore } from 'vuex'

export const store = createStore({
  state: {
    timePeriodHeaders: [
      {
        header: "Regional Interactions",
        subheader: "1200-1450",
        unitTitles: {
          "Unit 1: The Global Tapestry": {'unitHeader': 'Unit 1: The Global Tapestry', 'topics': []},
          "Unit 2: Networks of Exchange": {'unitHeader': 'Unit 2: Networks of Exchange', 'topics': []}
        },
        color: "green",
        timePeriod: 1,
        img: "RegionalInteractions.png",
      },
      {
        header: "First Global Age",
        subheader: "1450-1750",
        unitTitles: {
          "Unit 3: Land-Based Empires": {'unitHeader': 'Unit 3: Land-Based Empires', 'topics': []},
          "Unit 4: Transoceanic Interconnections": {'unitHeader': 'Unit 4: Transoceanic Interconnections', 'topics': []}
        },
        color: "yellow",
        timePeriod: 2,
        img: "FirstGlobalAge.png",
      },
      {
        header: "Revolutions & Industrialization",
        subheader: "1750-1900",
        unitTitles: {
          "Unit 5: Revolutions": {'unitHeader': 'Unit 5: Revolutions', 'topics': []},
          "Unit 6: Consequences of Industrialization": {'unitHeader': 'Unit 6: Consequences of Industrialization', 'topics': []}
        },
        color: "pink",
        timePeriod: 3,
        img: "Rev&Indus.png",
      },
      {
        header: "Modern Times",
        subheader: "1900-Present",
        unitTitles: {
          "Unit 7: Global Conflict": {'unitHeader': 'Unit 7: Global Conflict', 'topics': []},
          "Unit 8: Cold War and Decolonization": {'unitHeader': 'Unit 8: Cold War and Decolonization', 'topics': []},
          "Unit 9: Globalization": {'unitHeader': 'Unit 9: Globalization', 'topics': []}
        },
        color: "blue",
        timePeriod: 4,
        img: "Modern.png",
      },
    ],
    currentTimePeriod: 0,
    currentTopicComponent: 0,
  },
  getters: {
    timePeriodHeaders: (state) =>
      state.timePeriodHeaders[state.currentTimePeriod],
  },
  mutations: {
    selectedTimePeriod(state, i) {
       i = parseInt(i) - 1
      state.currentTimePeriod = i;
    },
    topicButtonChange(state, i) {
      state.currentTopicComponent = i;
    },
  },
  actions: {
    setTimePeriod({ commit }, i) {
      commit("selectedTimePeriod", i);
    },
    setTopicButton({ commit }, i) {
      commit("topicButtonChange", i);
    },
  },
});

export default store