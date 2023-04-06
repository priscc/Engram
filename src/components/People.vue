<template>
  <div id="People">
    <b-container fluid>
      <b-row>
        <b-col>
          <div class="title">Historical People</div>
        </b-col>
      </b-row>
      <b-row v-for="(comp, i) in peopleComponent" :key="i">
        <peopleprofile :person="comp"></peopleprofile>
      </b-row>
      <comingsoon v-if="comingSoon == 0"></comingsoon>
    </b-container>
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
  },
  mounted() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    storeTopic.dispatch("setTopicPeople", this.$route.params.topic);
    storeTopic.dispatch("setPeopleResources", this.$route.params.topic);
  },
};
</script>

<style lang="sass" scoped src="@/assets/css/topicContent.sass"></style>
