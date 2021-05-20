<template>
  <div class="People" style="height: 100%">
    <v-container fluid class="pt-0">
      <v-row class="pt-0">
        <v-col class="pt-0">
          <h3>Historical People</h3>
          <v-container
            class="my-12"
            v-for="(comp, i) in peopleComponent"
            :key="i"
            :people="comp"
          >
            <peopleprofile :people="comp"></peopleprofile>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import storeTopic from "@/store/topic.js";
import peopleprofile from "@/components/PeopleProfile.vue";

export default {
  name: "People",
  components: { peopleprofile },
  computed: {
    peopleComponent() {
      return storeTopic.state.people;
    },
  },
};
</script>

<style type="text/css" scoped>
h3 {
  font-family: "Montserrat", sans-serif;
  font-size: 30px;
  font-weight: 620;
}
</style>
