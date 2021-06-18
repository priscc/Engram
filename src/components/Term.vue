<template>
  <v-row class="d-flex justify-center">
    <v-col lg="4" md="4" sm="6">
      <v-card
        v-if="id % 2 == 0"
        flat
        width="250"
        height="200"
        style="
          background-image: url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWr7HYxo7FpH1dYPxMLrfxpt6jkyEEWG959hI22Zdx7WgDIB6a4ZTPHmQAWkQvyHEWI7Q&usqp=CAU);
          background-size: cover;
          background-size: 100% 100%;
          opacity: 0.75;
        "
      >
        <v-img
          v-if="term.thumbURL"
          :lazy-src="term.thumbURL"
          width="250"
          height="200"
          :src="term.thumbURL"
        >
        </v-img>
      </v-card>
    </v-col>
    <v-col lg="4" md="4" sm="6">
      <p class="term_header">{{ term.term }}</p>
      <p class="term_text">{{ term.def }}</p>
    </v-col>
    <v-col lg="4" md="4" sm="6">
      <v-card
        v-if="id % 2 != 0"
        flat
        width="250"
        height="200"
        style="
          background-image: url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWr7HYxo7FpH1dYPxMLrfxpt6jkyEEWG959hI22Zdx7WgDIB6a4ZTPHmQAWkQvyHEWI7Q&usqp=CAU);
          background-size: cover;
          background-size: 100% 100%;
          opacity: 0.75;
        "
      >
        <v-img
          v-if="term.thumbURL"
          :lazy-src="term.thumbURL"
          width="250"
          height="200"
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
