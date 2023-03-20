<template>
  <div id="Term">
    <b-card flat>
      <div class="d-flex flex-no-wrap">
        <!-- <b-avatar size="225" tile> -->
        <b-img
          v-if="term.thumbURL"
          :lazy-src="term.thumbURL"
          :src="term.thumbURL"
          height="150"
          max-width="250"
        >
        </b-img>
        <b-card v-else color="grey" height="150" max-width="250"> </b-card>
        <!-- </b-avatar> -->
        <div>
          <div>{{term.term}}</div>
          <div>{{term.def}}</div>
        </div>
      </div>
    </b-card>
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
