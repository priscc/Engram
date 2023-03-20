<template>
  <div id="Article">
    <div class="article">
      <b-img
        v-if="article.thumbURL && article.thumbFile != 'placeHolderImg.png'"
        :src="article.thumbURL"
        alt="Image"
        class="article_image"
      ></b-img>
      <div class="article_content">
        <div class="article_title">{{ article.title }}</div>
        <div class="article_subtitle">
          {{ article.newsSource }} | {{ article.published }}
        </div>
        <div class="article_summary">
          {{ article.summary }}
        </div>
        <a :href="article.url" target="_blank" class="article_link">Go To</a>
      </div>
    </div>
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
