<template>
  <div id="App">
    <div class="navbar_styling">
      <b-navbar toggleable="md" type="dark">
        <b-navbar-brand @click="home" class="logo">
          <img class="logo_img" src="@/assets/EngramLogo.png" />
          <span class="logo_btn">Engram</span>
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse" type="dark"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="navbar_tab_section">
            <b-nav-item>
                <div>
                  <b-form-input list="my-list-id"
                    :items="searchItems"
                    text="title"
                    value="id"
                    return-object
                    v-model="search"
                    prepend-inner-icon="mdi-magnify"
                    placeholder="Search Anything"
                    flat
                    dense
                    clearable
                    append-icon=""
                    hide-details
                    hide-no-data
                    filled
                    @focus="searchClosed = false"
                    @blur="searchClosed = true"
                    class="mr-10 expanding-search"
                    :class="{ closed: searchClosed && !search }"
                    @keyup.enter = "finalSearch">
                  </b-form-input>
                    <template slot="append">
                      <button  class="btn btn-primary" @click="finalSearch">
                        Search
                      </button>
                    </template>
                  <div class="list-group list-group-flush autocomplete-form-items" :class="{hide: !visible}">
                    <button v-for="item in searching" 
                      :key="item.id" 
                      class="list-group-item list-group-item-action"
                      :class="{active: item.id == item.title}"
                      :serializer="item => item.title"
                      @click="finalSearch(item)">
                      {{ item.title }}
                    </button>
                  </div>
                  <!-- <div v-for="item in searching" :key="item.id">
                    {{ item.title }}
                  </div> -->
                </div>
              </b-nav-item>
            <b-nav-item @click="home">
              <span class="navbar_tab">Home</span>
            </b-nav-item>
            <b-nav-item @click="about">
              <span class="navbar_tab">About</span>
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <div>
      <router-view></router-view>
    </div>
    <div class="footer">
      <b-container fluid>
        <b-row>
          <b-col>
            <b-icon-facebook class="footer-icon" />
            <b-icon-twitter class="footer-icon" />
            <b-icon-instagram
              href="https://instagram.com/engram_notes?igshid=YmMyMTA2M2Y="
              class="footer-icon"
            />
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <div @click="privacypolicy()" class="privacy_policy">
              Privacy Policy
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col>&copy; 2022 by Engram</b-col>
        </b-row>
        <b-alert
          class="p-2"
          style="position:fixed; z-index: 300;  right: 0px; bottom: 0px; min-width: 50%; margin-right: 10px "
          :show="alertDisplay"
        >
          <div style="display: inline; ">
            We use cookies to give you the best possible website experience. By
            using Engram, you agree to our
            <a
              style="padding-left: 3px"
              @click="privacypolicy"
              class="alert-link"
              >Privacy Policy</a
            >.
          </div>
          <div
            style="display: flex; justify-content: center; padding-top: 4px"
            @click="dismissAlert"
          >
            <div class="alert_dismiss">Close</div>
          </div>
        </b-alert>
      </b-container>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import storeTopic from "@/store/topic.js";
import { db } from "@/main";
export default {
  name: "App",
  data() {
    return {
      alertDisplay: true,
          searchClosed: true,
          searchItems: [],
          searching: [],
          search: null,
    };
  },
  watch: {
    '$route' (to, from) {
      console.log('Route changed from ' + from.path + ' to ' + to.path);
    },
    search: function(val) {
      console.log("watching search", val);
      this.searching = this.searchItems.filter((item) => {
        return item.title.toLowerCase().includes(this.search.toLowerCase());
      });
      if (val.collection == "topics") {
        this.topicSearch();
      } else if (val.collection == "events") {
        this.eventSearch(val);
      } else if (val.collection == "people") {
        this.peopleSearch(val);
      } else if (val.collection == "works") {
        this.primarysourceSearch();
      } else if (val.collection == "terminology") {
        this.termSearch();
      }
    },
  },
  methods: {
    async finalSearch(x) { // eslint-disable-line no-unused-vars
      if (x.collection == "topics") {
        let y = await this.grabbingTopic(x.document.id); // eslint-disable-line no-unused-vars
        console.log("period", y.timePeriod);
        store.dispatch("setTimePeriod", y.timePeriod);
        this.$router.push({
            name: "Topic",
            params: {
              periodName: store.getters.timePeriodHeaders.header,
              period: x.timePeriod,
              topicName: y.title,
              topic: x.document.id,
              category: "Introduction",
              id: "Introductory_Summary",
            },
          })
          .then(() => { this.$router.go() });
      }
      else {
        let y = await this.grabbingTopic(x.topicID); // eslint-disable-line no-unused-vars
        console.log("period", y.timePeriod);
        store.dispatch("setTimePeriod", y.timePeriod);
        console.log("periodName", store.getters.timePeriodHeaders.header);
        console.log("period", y.timePeriod);
        console.log("topicName", y.title);
        console.log("topic", x.topicID);
        console.log("topic", x.document.title);
        if (x.collection == "events") {
            this.$router.push({
              name: "Topic",
              params: {
                periodName: store.getters.timePeriodHeaders.header,
                period: y.timePeriod,
                topicName: y.title,
                topic: x.topicID,
                category: 2,
                id: "Events",
              },
            })
            .then(() => { this.$router.go() });
        } else if (x.collection == "people") {
            this.$router.push({
              name: "Topic",
              params: {
                periodName: store.getters.timePeriodHeaders.header,
                period: y.timePeriod,
                topicName: y.title,
                topic: x.topicID,
                category: 3,
                id: x.document.name,
              },
            })
            .then(() => { this.$router.go() });
        } else if (x.collection == "works") {
            this.$router.push({
              name: "Topic",
              params: {
                periodName: store.getters.timePeriodHeaders.header,
                period: y.timePeriod,
                topicName: y.title,
                topic: x.topicID,
                category: 4,
                id: x.document.title,
              },
            })
            .then(() => { this.$router.go() });
        } else if (x.collection == "terminology") {
            this.$router.push({
              name: "Topic",
              params: {
                periodName: store.getters.timePeriodHeaders.header,
                period: y.timePeriod,
                topicName: y.title,
                topic: x.topicID,
                category: 5,
                id: x.document.term,
              },
            })
            .then(() => { this.$router.go() });
        }
      }
    },
    topicSearch() {
      store.dispatch("setTimePeriod", this.search.timePeriod);
      storeTopic.dispatch("topicContent", this.search.document);
      store.dispatch("setTopicCategory", 0);
      this.$router.push({
        name: "Topic",
        params: {
          period: this.search.timePeriod,
          topic: this.search.document.id,
          category: 0,
        },
      });
    },
    async eventSearch(val) {
      var v = await this.grabbingTopic();
      val.topic = v;
      val.timePeriod = v.timePeriod - 1;

      store.dispatch("setTimePeriod", val.timePeriod);
      storeTopic.dispatch("topicContent", val.topic);
      store.dispatch("setTopicCategory", 2);
      storeTopic.dispatch("eventContent", val.document);
      this.$router.push({
        name: "Event",
        params: {
          period: val.timePeriod,
          topic: val.topic,
          category: 2,
          event: val.document.id,
        },
      });
    },
    async peopleSearch(val) {
      var v = await this.grabbingTopic();
      val.topic = v;
      val.timePeriod = v.timePeriod - 1;

      store.dispatch("setTimePeriod", val.timePeriod);
      storeTopic.dispatch("topicContent", val.topic);
      store.dispatch("setTopicCategory", 3);
      storeTopic.dispatch("personContent", val.document);

      this.$router.push({
        name: "Person",
        params: {
          period: val.timePeriod,
          topic: val.topicID,
          category: 3,
          person: val.document.id,
        },
      });
    },
    async primarysourceSearch() {
      var v = await this.grabbingTopic();
      this.search.topic = v;
      this.search.timePeriod = v.timePeriod - 1;

      store.dispatch("setTimePeriod", this.search.timePeriod);
      storeTopic.dispatch("topicContent", this.search.topic);
      store.dispatch("setTopicCategory", 4);
      this.$router.push({
        name: "Topic",
        params: {
          period: this.search.timePeriod,
          topic: this.search.topic.id,
          category: 4,
        },
      });
    },
    async termSearch() {
      var v = this.grabbingTopic();
      this.search.topic = v;
      this.search.timePeriod = v.timePeriod - 1;

      store.dispatch("setTimePeriod", this.search.timePeriod);
      storeTopic.dispatch("topicContent", this.search.topic);
      store.dispatch("setTopicCategory", 5);
      this.$router.push({
        name: "Topic",
        params: {
          period: this.search.timePeriod,
          topic: this.search.topic.id,
          category: 5,
        },
      });
    },
    grabbingTopic(x) {
      return db
        .collection("topics")
        .doc(x)
        .get()
        .then(
          function(doc) {
            return doc.data();
          }.bind(this)
        );
    },
    async grabbingSearch() {
      db.collection("searchBar")
        .doc("bESicXCl5B8APjFo5TAI")
        .get()
        .then(
          function(doc) {
            console.log("searchItems", doc.data().searchItems);
            this.searchItems = doc.data().searchItems;
          }.bind(this)
        );
      console.log("searchItems updated", this.searchItems);
    },
    home() {
      store.dispatch("setTopicCategory", 0);
      this.$router.push("/");
    },
    about() {
      store.dispatch("setTopicCategory", 0);

      this.$gtag.event("About-page", {
        event_category: "engagement",
      });

      this.$router.push("/about");
    },
    privacypolicy() {
      store.dispatch("setTopicCategory", 0);
      this.$router.push("/privacypolicy");
    },
    dismissAlert() {
      console.log("dismissAlert");
      this.alertDisplay = false;
    },
  },
  computed: {
    stateTimePeriod: function() {
      return store.state.currentTimePeriod;
    },
  },
  mounted() {
    this.grabbingSearch();
  },
};
</script>

<style lang="sass" scoped src="@/assets/css/main.sass"></style>
