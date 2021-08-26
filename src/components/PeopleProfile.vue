<template>
  <v-row class="pt-6 pb-8" style="border-bottom: 1px solid lightgrey">
    <v-col cols="2" class="ml-7 pt-0">
      <v-img
        :lazy-src="people.thumbURL"
        height="120"
        width="120"
        :src="people.thumbURL"
        style="border-radius: 50%"
      ></v-img>
      <div class="text-center" style="width: 120px">
        <p class="people_header mb-0">{{ people.name }}</p>
        <p
          v-if="people.dateOfPassing.date.length == 0"
          class="people_subheader mb-0"
        >
          ({{ people.dateOfBirth.date }} - Present)
        </p>
        <p v-else class="people_subheader mb-0">
          ({{ people.dateOfBirth.date }} - {{ people.dateOfPassing.date }})
        </p>
        <p class="people_subheader mb-0">{{ people.age }}</p>
      </div>
    </v-col>
    <v-col cols="6" class="people_content pt-5 pl-11 pr-15 mb-10">
      <p class="article mr-10">{{ people.mainMD }}</p>
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
    people: Object,
  },
  computed: {
    resources() {
      var r = storeTopic.state.resources.filter(
        (resource) => resource.parentID == this.people.id
      );
      console.log("resources", r);
      return r;
    },
  },
};
</script>

<style type="text/css" scoped>
.people_header {
  font-family: "Montserrat", sans-serif;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 550;
}
.people_subheader {
  font-family: "Montserrat", sans-serif;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 500;
  color: grey;
}
.people_content {
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
