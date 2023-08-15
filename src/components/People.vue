<template>
  <div id="People">
    <b-container fluid>
      <b-row>
        <b-col>
          <div class="title">Historical People</div>
        </b-col>
      </b-row>
      <b-row
        class="person_profile"
        v-for="(comp, i) in peopleComponent"
        :key="i"
      >
        <peopleprofile :person="comp"></peopleprofile>
      </b-row>
    </b-container>
    <comingsoon v-if="comingSoon == 0"></comingsoon>
  </div>
</template>

<script>
import storeTopic from "@/store/topic.js";
import peopleprofile from "@/components/PeopleProfile.vue";
import comingsoon from "./ComingSoon.vue";

export default {
  name: "People",
  components: { comingsoon, peopleprofile },
  computed: {
    peopleComponent() {
      return storeTopic.state.people;
    },
    comingSoon() {
      return storeTopic.state.people.length;
    },
    person() {
      console.log("Person Function", storeTopic.state.person);
      return storeTopic.state.person;
    },
  },
  mounted() {
    storeTopic.dispatch("setTopicPeople", this.$route.params.topic);
    storeTopic.dispatch("setPeopleResources", this.$route.params.topic);
  },
};
</script>

<style lang="sass" scoped src="@/assets/css/topicContent.sass"></style>
