<template>
  <div class="Terms" style="height: 100%">
    <v-container fluid class="pt-0">
      <v-row class="pt-0">
        <v-col class="pt-0 pb-10">
          <h3>Terminology</h3>
        </v-col>
      </v-row>
      <v-row
        class="my-0"
        v-for="(comp, i) in termsComponent"
        :key="i"
        :people="comp"
      >
        <v-col cols="11">
          <term :term="comp" :id="i"></term>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import storeTopic from "@/store/topic.js";
import term from "@/components/Term.vue";

export default {
  name: "Terms",
  components: { term },
  computed: {
    termsComponent() {
      return storeTopic.state.terms;
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
