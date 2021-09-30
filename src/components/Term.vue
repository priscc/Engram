<template>
  <div id="Term">
    <v-card flat>
      <div class="d-flex flex-no-wrap">
        <!-- <v-avatar size="225" tile> -->
        <v-img
          v-if="term.thumbURL"
          :lazy-src="term.thumbURL"
          :src="term.thumbURL"
          height="150"
          max-width="250"
        >
        </v-img>
        <!-- </v-avatar> -->
        <div>
          <v-card-title class="text-h5" v-text="term.term"></v-card-title>
          <v-card-subtitle v-text="term.def"></v-card-subtitle>
        </div>
      </div>
    </v-card>
  </div>
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
