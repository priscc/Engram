<template>
  <div id="PeopleProfile">
    <b-container fluid class="person_profile">
      <b-row>
        <b-col cols="2" class="person_info">
          <b-img
            :lazy-src="person.thumbURL"
            height="160"
            width="160"
            :src="person.thumbURL"
            style="border-radius: 10%"
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
                person.dateOfPassing.date.length > 0 && person.dateOfPassing.era
              "
              class="person_subheader"
            >
              {{ person.dateOfPassing.date - person.dateOfBirth.date }} yrs
            </p>
            <p
              v-else-if="
                person.dateOfPassing.date.length > 0 &&
                  person.dateOfPassing.era == false
              "
              class="person_subheader"
            >
              {{ person.dateOfBirth.date - person.dateOfPassing.date }} yrs
            </p>
          </div>
        </b-col>
        <b-col lg="6" md="12" sm="12" class="pb-2">
          <p class="text person_description">{{ person.mainMD }}</p>
          <b-button size="sm" @click="goTo()">Learn More</b-button>
        </b-col>
        <b-col >
          <b-row v-for="(resource, i) in resources" :key="i">
            <b-col v-if="i < 2">
              <iframe
                class="person_iframe"
                :src="'https://www.youtube.com/embed/' + resource.url"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import storeTopic from "@/store/topic.js";
export default {
  name: "PeopleProfile",
  props: {
    person: Object,
  },
  computed: {
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
      storeTopic.dispatch("personContent", this.person);
      console.log("learn more about person", this.person);
      this.$router.push({
        name: "Person",
        params: { person: this.person.id },
      });
    },
  },
};
</script>

<style lang="sass" scoped src="@/assets/css/topicContent.sass"></style>
