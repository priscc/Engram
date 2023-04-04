<template>
  <div id="Intro">
    <b-container fluid>
      <b-row>
        <div class="title">Introduction</div>
      </b-row>
      <b-row>
        <b-col lg="7" md="7" sm="12">
          <b-row>
            <b-col>
              <b-img
                class="intro_image"
                id="hideImg"
                :src="topic.intro_thumbURL"
                @error="imageLoadError"
              ></b-img>
              <div class="text pt-2" v-html="intro"></div>
            </b-col>
          </b-row>
        </b-col>
        <b-col lg="4" md="5" sm="12">
          <resourcecomp type="topic" :resourcetype="resouces"></resourcecomp>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import storeTopic from "@/store/topic.js";
import * as Quill from "quill";
import resourcecomp from "./ResourceComponent.vue";

export default {
  name: "Intro",
  props: {
    topic: Object,
  },
  components: { resourcecomp  },
  computed: {
    intro() {
      var inputDelta = this.topic.introMD;
      var tempCont = document.createElement("div");
      if (typeof inputDelta === "string" || inputDelta instanceof String) {
        return (tempCont.innerHTML = inputDelta);
      } else {
        var quill = new Quill(tempCont);
        quill.setContents(inputDelta);
        return tempCont.getElementsByClassName("ql-editor")[0].innerHTML;
      }
    },
    resouces(){
      return storeTopic.state.topicResources
    }
  },
  methods: {
    imageLoadError() {
      console.log("Image failed to load");
      document.getElementById("hideImg").style.display = "none";
    },
    showModal() {
      this.$refs["modal-1"].show();
    },
  },
  mounted() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    storeTopic.dispatch("setToipcResources", this.$route.params.topic);
  },
};
</script>

<style lang="sass" scoped src="@/assets/css/topicContent.sass"></style>
