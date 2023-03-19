<template>
  <div id="Article">
    <b-card :img-src="article.thumbURL" img-alt="Image" img-top class="article">
      <b-card-title>{{ article.title }}</b-card-title>
      <b-card-sub-title>
        {{ article.newsSource }} | {{ article.published }}
      </b-card-sub-title>
      <b-card-text class="article_summary">
        {{ article.summary }}
      </b-card-text>
      <a :href="article.url" target="_blank" class="article_link"> Go To</a>
    </b-card>
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

<style lang="sass" scoped src="@/assets/css/topicContent.sass"></style>
