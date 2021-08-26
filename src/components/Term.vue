<template>
  <v-row>
    <v-col cols="7" class="pr-16">
      <p class="term_header">{{ term.term }}</p>
      <p class="term_text">{{ term.def }}</p>
    </v-col>
    <v-col lg="4" md="4" sm="6">
      <v-card flat height="200">
        <v-img
          v-if="term.thumbURL"
          :lazy-src="term.thumbURL"
          height="100%"
          :src="term.thumbURL"
        >
        </v-img>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Term",
  props: {
    term: Object,
    id: Number,
  },
};
</script>

<style type="text/css" scoped>
.term_header {
  font-family: "Montserrat", sans-serif;
  font-size: 20px;
  font-weight: 600;
}

.term_text {
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  font-weight: 440;
}
</style>
