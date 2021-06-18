<template>
  <div class="People" style="height: 100%">
    <v-container fluid class="pt-0">
      <v-row class="pt-0">
        <v-col class="pt-0">
          <h3>Historical People</h3>
          <v-container
            class="pt-12 card"
            v-for="(comp, i) in peopleComponent"
            :key="i"
            :people="comp"
            @click="goTo(comp)"
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
  methods: {
    goTo(person) {
      storeTopic.dispatch("personContent", person);
      this.$router.push({ name: "Person", params: { id: person.name } });
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
.card {
  opacity: 1;
}
.card:hover {
  opacity: 0.7;
  background-color: #eceff1;
  cursor: pointer;
}
</style>
