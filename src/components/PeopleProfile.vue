<template>
  <v-row class="pt-6 pb-8" style="border-bottom: 1px solid lightgrey">
    <v-col cols="2" class=" ml-7 pt-0 px-0">
      <v-img
        :lazy-src="person.thumbURL"
        height="160"
        width="160"
        :src="person.thumbURL"
        style="border-radius: 10%"
      ></v-img>
      <div>
        <p class="person_header mb-2" style="font-size: 13px;">
          {{ person.name }}
        </p>
        <p
          v-if="person.dateOfPassing.date.length == 0"
          class="person_time mb-0"
        >
          Born: {{ person.dateOfBirth.date }}
        </p>
        <p v-else class="person_time mb-0">
          Born: {{ person.dateOfBirth.date }}
          <small v-if="person.dateOfBirth.era == false">BC</small><br />
          Passing: {{ person.dateOfPassing.date }}
          <small v-if="person.dateOfPassing.era == false">BC</small>
        </p>
        <p
          v-if="
            person.dateOfPassing.date.length > 0 && person.dateOfPassing.era
          "
          class="person_subheader mb-0"
        >
          {{ person.dateOfPassing.date - person.dateOfBirth.date }} yrs
        </p>
        <p
          v-else-if="
            person.dateOfPassing.date.length > 0 &&
              person.dateOfPassing.era == false
          "
          class="person_subheader mb-0"
        >
          {{ person.dateOfBirth.date - person.dateOfPassing.date }} yrs
        </p>
      </div>
    </v-col>
    <v-col cols="6" class="person_content pt-5 pl-11 pr-15 mb-10">
      <p class="article mr-10">{{ person.mainMD }}</p>

      <v-btn
        @click="goTo()"
        small
        rounded
        text
        outlined
        class="float-right text-capitalize"
        >Learn More</v-btn
      >
    </v-col>
    <v-col cols="3" class="pa-0 pr-12 pb-7">
      <v-row v-for="(resource, i) in resources" :key="i">
        <v-col v-if="i < 2" class="py-1">
          <iframe
            width="200"
            height="112"
            :src="'https://www.youtube.com/embed/' + resource.url"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
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
      var r = storeTopic.state.resources.filter((resource) => {
        return (
          resource.parentID === this.person.id &&
          resource.resourceType === "video"
        );
      });
      console.log("resources", r);
      return r;
    },
  },
  methods: {
    goTo() {
      storeTopic.dispatch("personContent", this.person);
      console.log("person", this.person);
      this.$router.push({
        name: "Person",
        params: { person: this.person.id },
      });
    },
  },
};
</script>

<style type="text/css" scoped>
.person_header {
  font-family: "Montserrat", sans-serif;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 550;
}
.person_time {
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  font-weight: 550;
}
.person_subheader {
  font-family: "Montserrat", sans-serif;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 500;
  color: grey;
}
.person_content {
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  font-weight: 500;
}
.article {
  overflow: hidden;
  line-height: 1rem;
  max-height: 5rem;
  -webkit-box-orient: vertical;
  display: block;
  display: -webkit-box;
  overflow: hidden !important;
  text-overflow: ellipsis;
  -webkit-line-clamp: 5;
}
</style>
