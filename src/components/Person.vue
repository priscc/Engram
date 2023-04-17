<template>
  <div class="Person" style="height: 100%">
    <b-container fluid>
      <b-row
        class="background background_filter"
        :style="{ 'background-image': `url(${topic.topic_thumbURL})` }"
      >
        <b-col lg="2" md="2" sm="12" class="u-non-blurred">
          <div class="back_button" @click="back">
            <b-icon-caret-left aria-hidden="true" /> Back
          </div>
        </b-col>
        <b-col class="d-flex flex-column u-non-blurred">
          <p class="banner_timeperiod_header">
            Time Period: {{ timePeriodHeaders.header }}
          </p>
          <p class="banner_unit_header">{{ topic.unit }}</p>
          <p class="banner_header">
            {{ topic.title }}
          </p>
        </b-col>
      </b-row>
    </b-container>
    <b-container class="pt-5 pb-5">
      <b-row>
        <b-col lg="7" md="7" sm="12">
          <b-img class="person_image" :src="person.thumbURL"> </b-img>
          <p class="header-2">{{ person.name }}</p>
          <p
            v-if="dateOfPassing == null || dateOfPassing.length == 0"
            class="text"
          >
            Date of Birth: {{ dateOfBirth }}
          </p>
          <p b-else class="text">({{ dateOfBirth }} - {{ dateOfPassing }})</p>
          <div class="text pt-2" v-html="content"></div>
        </b-col>
        <b-col>
          <resourcecomp type="people" :resourcetype="resouces"></resourcecomp>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import store from "@/store";
import storeTopic from "@/store/topic.js";
import resourcecomp from "./ResourceComponent.vue";
import { db } from "@/main";
import Quill from "quill";

export default {
  name: "Person",
  components: { resourcecomp },

  data() {
    return {
      dateOfBirth: null,
      dateOfPassing: null
    };
  },
  computed: {
    timePeriodHeaders() {
      return store.state.timePeriodHeaders[store.state.currentTimePeriod];
    },
    topic() {
      return storeTopic.state.topic;
    },
    person() {
      return storeTopic.state.person;
    },
    content() {
      var inputDelta = this.person.mainMD;
      var tempCont = document.createElement("div");
      if (typeof inputDelta === "string" || inputDelta instanceof String) {
        return (tempCont.innerHTML = inputDelta);
      } else {
        var quill = new Quill(tempCont);
        quill.setContents(inputDelta);
        return tempCont.getElementsByClassName("ql-editor")[0].innerHTML;
      }
    },
    resouces() {
      return storeTopic.state.personResources;
    }
  },
  methods: {
    back() {
      this.$gtag.event("person-backButton", { event_category: "engagement", });
      this.$router.push({
        name: "Topic",
        params: {
          period: this.$route.params.period,
          periodName: this.$route.params.periodName,
          topicName: this.$route.params.topicName,
          topic: this.$route.params.topic,
          category: this.$route.params.category
        }
      });
    }
  },
  async mounted() {
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (Object.keys(storeTopic.state.topic).length === 0) {
      store.dispatch("setTimePeriod", this.$route.params.period);

      var newTopic = await db
        .collection("topics")
        .doc(this.$route.params.topic)
        .get()
        .then(
          function(querySnapshot) {
            var entry = querySnapshot.data();
            entry.id = querySnapshot.id;
            return entry;
          }.bind(this)
        );
      storeTopic.dispatch("setTopicContent", newTopic);

      var newProfile = await db
        .collection("people")
        .doc(this.$route.params.person)
        .get()
        .then(
          function(querySnapshot) {
            var entry = querySnapshot.data();
            entry.id = querySnapshot.id;
            return entry;
          }.bind(this)
        );

      storeTopic.dispatch("setPersonContent", newProfile);
    }

    this.dateOfBirth = this.person.dateOfBirth.date;
    this.dateOfPassing = this.person.dateOfPassing.date;

    storeTopic.dispatch("setPersonResources", this.$route.params.person);
  }
};
</script>

<style lang="sass" scoped src="@/assets/css/topicContent.sass"></style>
