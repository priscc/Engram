<template>
  <div>
    <b-row v-if="videos.length != 0" class="pt-4">
      <b-col> <div class="resource_header">Videos:</div> </b-col>
      <b-col>
        <div v-b-modal.modal-1 class="view_all">
          View all
        </div>
      </b-col>
    </b-row>
    <b-row>
      <div v-for="(video, index) in videos" :key="video.id">
        <b-col v-if="index < 3" class="pt-1">
          <div class="loading">
            <iframe
              class="intro_iframe"
              title="YouTube video player"
              :src="'https://www.youtube.com/embed/' + video.url"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </b-col>
      </div>
      <b-modal id="modal-1" size="lg" hide-footer title="Videos">
        <b-container>
          <b-row>
            <b-col
              v-for="(video, index) in videos"
              :key="index"
              lg="6"
              md="6"
              sm="12"
            >
              <iframe
                width="380"
                height="241"
                :src="'https://www.youtube.com/embed/' + video.url"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </b-col>
          </b-row>
        </b-container>
      </b-modal>
    </b-row>
    <b-row v-if="articles.length != 0" class="pt-4">
      <b-col> <div class="resource_header">Articles:</div> </b-col>
    </b-row>
    <b-row v-for="(article, index) in articles" :key="index">
      <b-col>
        <articlecomp :article="article"></articlecomp>
      </b-col>
    </b-row>
  </div>
</template>
<script>
// import storeTopic from "@/store/topic.js";
import articlecomp from "./ArticleComponent.vue";

export default {
  name: "Intro",
  props: {
    type: String,
    resourcetype: Object
  },
  components: { articlecomp },
  computed: {
    videos() {
      var r = this.resourcetype.filter(
        video => video.resourceType == "video" && video.parentType == this.type
      );
      return r;
    },
    articles() {
      var r = this.resourcetype.filter(
        article =>
          article.resourceType == "article" && article.parentType == this.type
      );
      return r;
    }
  }
};
</script>

<style lang="sass" scoped src="@/assets/css/resources.sass"></style>
<style lang="sass" scoped src="@/assets/css/loading.sass"></style>
