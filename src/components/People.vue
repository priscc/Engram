<template>
  <div class="People" style="height: 100%">
    <v-container fluid class="pt-0">
      <v-row class="pt-0">
        <v-col class="pt-0 pb-10">
          <h3>Historical People</h3>
        </v-col>
      </v-row>
      <v-row class="pt-0 pl-0 ml-0">
        <v-col class="pt-0">
          <v-container
            class="pl-0 ml-0"
            v-for="(comp, i) in peopleComponent"
            :key="i"
          >
            <peopleprofile class="card" :person="comp"></peopleprofile>
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
/*.card {
  opacity: 1;
}
.card:hover {
  opacity: 0.7;
  background-color: #eceff1;
  cursor: pointer;
}*/
</style>
