<template>
  <div id="Article">
    <v-card outlined class="card py-3 px-2" :href="article.url" target="_blank">
      <div class="d-flex flex-no-wrap">
        <v-img
          v-if="article.thumbURL && article.thumbFile != 'placeHolderImg.png'"
          width="150"
          height="105"
          style="border-radius: 7px"
          :src="article.thumbURL"
        >
        </v-img>

        <div class="pl-2">
          <v-card-subtitle class="caption pt-1 pb-0">{{
            article.newsSource
          }}</v-card-subtitle>
          <v-card-title class="pt-2 mb-2">
            <h5>{{ article.title }}</h5>
          </v-card-title>
          <v-card-subtitle class="article">
            <p>{{ article.summary }}</p>
          </v-card-subtitle>
          <v-card-subtitle class="pb-0 mb-0">
            <p class="caption mb-0">{{ article.published }}</p>
          </v-card-subtitle>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Article",
  props: {
    article: Object,
  },
};
</script>

<style type="text/css" scoped>
v-card {
  font-family: "Montserrat", sans-serif;
}
h5 {
  line-height: 1;
  word-break: normal;
}
.card {
  opacity: 1;
}
.card:hover {
  opacity: 0.7;
  background-color: #eceff1;
  cursor: pointer;
}
.article {
  overflow: hidden;
  line-height: 1rem;
  max-height: 3rem;
  -webkit-box-orient: vertical;
  display: block;
  display: -webkit-box;
  overflow: hidden !important;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
}
</style>
