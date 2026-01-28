<template>
  <div class="Person" style="height: 100%">
    <b-container fluid>
      <b-row
        class="background background_filter"
        :style="{ 'background-image': `url(${topic.topic_thumbURL})` }"
      >
        <b-col lg="2" md="2" sm="12" class="u-non-blurred">
          <div class="back_button" @click="back">
            <b-icon-caret-left aria-hidden="true" /> Back
          </div>
        </b-col>
        <b-col class="d-flex flex-column u-non-blurred">
          <p class="banner_timeperiod_header">
            Time Period: {{ timePeriodHeaders.header }}
          </p>
          <p class="banner_unit_header">{{ topic.unit }}</p>
          <p class="banner_header">
            {{ topic.title }}
          </p>
        </b-col>
      </b-row>
    </b-container>
    <b-container class="pt-5 pb-5">
      <b-row>
        <b-col lg="7" md="7" sm="12">
          <p class="header-2">{{ person.name }}</p>
          <p
            v-if="dateOfPassing == null || dateOfPassing.length == 0"
            class="text"
          >
            Date of Birth: {{ dateOfBirth }}
          </p>
          <p b-else class="text">({{ dateOfBirth }} - {{ dateOfPassing }})</p>

          <div class="image-wrapper">
            <div
              v-if="!imageLoaded && !imageLoadError"
              class="person_image person_image_placeholder loading"
            ></div>
            <b-img
              v-show="!imageLoadError"
              class="person_image"
              :src="person.thumbURL"
              @load="onImageLoad"
              @error="onImageError"
            ></b-img>
            <div
              v-if="imageLoadError"
              class="person_image person_image_placeholder"
            ></div>
            <b-button
              class="expand-icon"
              @click="openImageModal"
              aria-label="Expand image"
            >
              <b-icon-arrows-angle-expand aria-hidden="true" font-scale="1.3" />
            </b-button>
          </div>
          <b-modal
            id="person-image-modal"
            title="Image"
            hide-footer
            centered
            size="xl"
          >
            <img
              :src="expandedImageURL"
              class="full-image"
              alt="Person image"
            />
          </b-modal>

          <div class="text pt-2" v-html="content"></div>
        </b-col>
        <b-col class="pt-5 mt-5">
          <resourcecomp type="people" :resourcetype="resouces"></resourcecomp>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import store from "@/store";
import { pushRoute } from "@/router/navigation";
import storeTopic from "@/store/topic.js";
import resourcecomp from "./ResourceComponent.vue";
import { db } from "@/main";
import Quill from "quill";

export default {
  name: "Person",
  components: { resourcecomp },

  data() {
    return {
      dateOfBirth: null,
      dateOfPassing: null,
      imageLoadError: false,
      imageLoaded: false
    };
  },
  computed: {
    timePeriodHeaders() {
      return store.state.timePeriodHeaders[store.state.currentTimePeriod];
    },
    topic() {
      return storeTopic.state.topic;
    },
    person() {
      return storeTopic.state.person;
    },
    content() {
      var inputDelta = this.person.mainMD;
      var tempCont = document.createElement("div");
      if (typeof inputDelta === "string" || inputDelta instanceof String) {
        return (tempCont.innerHTML = inputDelta);
      } else {
        var quill = new Quill(tempCont);
        quill.setContents(inputDelta);
        return tempCont.getElementsByClassName("ql-editor")[0].innerHTML;
      }
    },
    resouces() {
      return storeTopic.state.personResources;
    },
    expandedImageURL() {
      // Prefer a full-size image field if available, fallback to thumbnail
      return (
        (this.person &&
          (this.person.imageURL ||
            this.person.fullURL ||
            this.person.thumbURL)) ||
        ""
      );
    }
  },
  methods: {
    onImageLoad() {
      this.imageLoaded = true;
    },
    onImageError() {
      this.imageLoadError = true;
      this.imageLoaded = true;
    },
    openImageModal() {
      this.$bvModal && this.$bvModal.show("person-image-modal");
    },
    back() {
      this.$gtag.event("person-backButton", { event_category: "engagement" });
      pushRoute("Topic", {
        period: this.$route.params.period,
        periodName: this.$route.params.periodName,
        topicName: this.$route.params.topicName,
        topic: this.$route.params.topic,
        category: this.$route.params.category
      });
    }
  },
  async mounted() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    try {
      // Ensure topic is present for page context
      if (Object.keys(storeTopic.state.topic).length === 0) {
        store.dispatch("setTimePeriod", this.$route.params.period);
        const topicSnap = await db
          .collection("topics")
          .doc(this.$route.params.topic)
          .get();
        if (topicSnap.exists) {
          const entry = topicSnap.data();
          entry.id = topicSnap.id;
          storeTopic.dispatch("setTopicContent", entry);
        }
      }

      // Always fetch the person document (don't assume store already has it)
      const personId = this.$route.params.person;
      if (personId) {
        const personSnap = await db
          .collection("people")
          .doc(personId)
          .get();
        if (personSnap.exists) {
          const p = personSnap.data();
          p.id = personSnap.id;
          storeTopic.dispatch("setPersonContent", p);
        } else {
          console.warn("Person not found:", personId);
        }
        storeTopic.dispatch("setPersonResources", personId);
      }

      // Safely assign date fields
      if (this.person && this.person.dateOfBirth)
        this.dateOfBirth = this.person.dateOfBirth.date;
      if (this.person && this.person.dateOfPassing)
        this.dateOfPassing = this.person.dateOfPassing.date;
    } catch (err) {
      console.error("Person mounted error:", err, {
        params: this.$route.params
      });
    }
  }
};
</script>

<style lang="sass" scoped src="@/assets/css/topicContent.sass"></style>
<style lang="sass" scoped src="@/assets/css/loading.sass"></style>
