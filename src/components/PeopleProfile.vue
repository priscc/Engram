<template>
  <div id="PeopleProfile">
    <b-container fluid>
      <b-row>
        <b-col cols="2" class="person_info" :id = "person.name">
          <b-img
            :lazy-src="person.thumbURL"
            class="profile_image"
            :src="person.thumbURL"
          ></b-img>
          <div>
            <p class="person_header">
              {{ person.name }}
            </p>
            <p v-if="person.dateOfPassing.date.length == 0" class="person_time">
              Born: {{ person.dateOfBirth.date }}
            </p>
            <p v-else class="person_time">
              Born: {{ person.dateOfBirth.date }}
              <small v-if="person.dateOfBirth.era == false">BC</small><br />
              Passing: {{ person.dateOfPassing.date }}
              <small v-if="person.dateOfPassing.era == false">BC</small>
            </p>
            <p
              v-if="
                person.dateOfPassing.date.length > 0 &&
                  person.dateOfPassing.era &&
                  person.dateOfBirth.date.length <= 4
              "
              class="person_subheader"
            >
              {{ person.dateOfPassing.date - person.dateOfBirth.date }} yrs
            </p>
            <p
              v-else-if="
                person.dateOfPassing.date.length > 0 &&
                  person.dateOfPassing.era == false &&
                  person.dateOfBirth.date.length <= 4
              "
              class="person_subheader"
            >
              {{ person.dateOfBirth.date - person.dateOfPassing.date }} yrs
            </p>
            <p v-else></p>
          </div>
        </b-col>
        <b-col lg="6" md="12" sm="12" class="pb-2">
          <div class="text person_description" v-html="content"></div>
          <b-button class="person_link" size="sm" @click="goTo()"
            >Learn More</b-button
          >
        </b-col>
        <b-col>
          <b-row>
            <b-col
              v-for="(resource, i) in resources"
              :key="i"
              class="pb-1"
              lg="12"
              md="6"
              sm="12"
            >
              <div v-if="i < 2" class="loading">
                <iframe
                  class="person_iframe"
                  :src="'https://www.youtube.com/embed/' + resource.url"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import storeTopic from "@/store/topic.js";
import * as Quill from "quill";
export default {
  name: "PeopleProfile",
  props: {
    person: Object,
  },
  computed: {
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
    resources() {
      var r = storeTopic.state.peopleResources.filter((resource) => {
        return (
          resource.parentID === this.person.id &&
          resource.resourceType === "video"
        );
      });
      return r;
    },
  },
  methods: {
    goTo() {
      storeTopic.dispatch("setPersonContent", this.person);
      this.$router.push({ name: "Person", params: { person: this.person.id } });
      this.$gtag.event("clicked-people-learnMore", {
        event_category: "engagement",
        event_label: this.person,
      });
    },
  },
};
</script>

<style lang="sass" scoped src="@/assets/css/topicContent.sass"></style>
<style lang="sass" scoped src="@/assets/css/loading.sass"></style>
