import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    timePeriodHeaders: [
      {
        header: "Regional Interactions",
        subheader: "1200-1450",
        unitTitles: [
          "Unit 1: The Global Tapestry",
          "Unit 2: Networks of Exchange",
        ],
        color: "green",
        timePeriod: 1,
        img: "RegionalInteractions.png",
      },
      {
        header: "First Global Age",
        subheader: "1450-1750",
        unitTitles: [
          "Unit 3: Land-Based Empires",
          "Unit 4: Transoceanic Interconnections",
        ],
        color: "yellow",
        timePeriod: 2,
        img: "FirstGlobalAge.png",
      },
      {
        header: "Revolutions & Industrialization",
        subheader: "1750-1900",
        unitTitles: [
          "Unit 5: Revolutions",
          "Unit 6: Consequences of Industrialization",
        ],
        color: "pink",
        timePeriod: 3,
        img: "Rev&Indus.png",
      },
      {
        header: "Modern Times",
        subheader: "1900-Present",
        unitTitles: [
          "Unit 7: Global Conflict",
          "Unit 8: Cold War and Decolonization",
          "Unit 9: Globalization",
        ],
        color: "blue",
        timePeriod: 4,
        img: "Modern.png",
      },
    ],
    currentTimePeriod: null,
    currentTopicComponent: 0,
    topicButtons: [
      { title: "Summary", color: "pink" },
      { title: "Trends", color: "grey lighten-3" },
      { title: "Developments", color: "grey lighten-3 purple" },
      { title: "People", color: "grey lighten-3" },
      { title: "Sources", color: "grey lighten-3" },
      { title: "Terms", color: "grey lighten-3" },
    ],
  },
  getters: {
    timePeriodHeaders: (state) =>
      state.timePeriodHeaders[state.currentTimePeriod],
  },
  mutations: {
    selectedTimePeriod(state, i) {
      state.currentTimePeriod = i;
    },
    topicButtonChange(state, i) {
      state.topicButtons[state.currentTopicComponent].color = "grey lighten-3";
      state.currentTopicComponent = i;
      if (i == 0) state.topicButtons[i].color = "pink";
      else if (i == 1) state.topicButtons[i].color = "indigo";
      else if (i == 2) state.topicButtons[i].color = "purple";
      else if (i == 3) state.topicButtons[i].color = "blue";
      else if (i == 4) state.topicButtons[i].color = "yellow";
      else if (i == 5) state.topicButtons[i].color = "green";
    },
    CHANGE_currentTopicComponent(state, i) {
      console.log("in here");
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
  modules: {},
});
