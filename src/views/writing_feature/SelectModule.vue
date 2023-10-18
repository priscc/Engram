<template>
  <div id="essay-writing">
    <div class="site_header">
      <h1>LEQ Essays</h1>
      <h5>Welcome to the essay writing for the LEQ</h5>
    </div>
    <b-container fluid class="background">
      <b-row class="px-4 pb-2 pt-4 title">
        <a class="strip mx-3 mx-sm-5 mx-smd-5 mx-lg-5 p-0">
          <div style="min-height: 40px"></div>
        </a>
      </b-row>
      <b-row class="responsive-padding">
        <breadcrumb :items="items"></breadcrumb>
      </b-row>

      <b-row class="white-container responsive-padding">
        <whitecontainer
          :title="title"
          :subtitle="subtitle"
          id="module-white-container"
        >
          <template #try-it>
            <a class="module-labels strip label-position">Template Module</a>
            <b-container>
              <b-row align-h="center">
                <b-col
                  class="mother-container try-it py-4"
                  sm="3"
                  md="auto"
                  lg="auto"
                >
                  <!-- <div style="border: 1px solid red;"> -->
                  <!-- <div style="border: 2px dotted green; display: inline-flex; flex-wrap: wrap; background-color: aqua; align-items: flex-start; flex-direction: row; gap:10px"> -->
                  <modules
                    v-for="modules in moduleses"
                    :key="modules.name"
                    :modules="modules"
                    class="mx-2"
                  ></modules>
                  <!-- </div>                                    </div> -->
                </b-col>
              </b-row>
            </b-container>
          </template>

          <template #timed>
            <a class="module-labels strip label-position">Timed Module</a>
            <b-container class="p-0 m-0">
              <b-row class="p-0 m-0" no-gutters align-h="center">
                <b-col
                  class="mother-container timed justify-content-center py-4"
                >
                  <!-- <div style="border: 1px solid red;"> -->
                  <!-- <div style="border: 2px dotted green; display: inline-flex; flex-wrap: wrap; background-color: aqua; align-items: flex-start; flex-direction: row; gap:10px"> -->
                  <modules
                    v-for="modules in timeModule"
                    :key="modules.name"
                    :modules="modules"
                  ></modules>
                  <!-- </div>                                    </div> -->
                </b-col>
              </b-row>
            </b-container>
          </template>

          <template #templates>
            <!-- <a class="module-introduction strip label-position">Welcome to the Essay Writing for the LEQ</a> -->
            <b-container fluid>
              <b-row
                class="mod-children mother-container mx-auto py-4 py-sm-4 py-md-4 py-lg-0"
                no-gutters
                align-h="center"
                align-v="center"
              >
                <b-col class="template" cols="12">
                  <!-- <div style="border: 1px solid red;"> -->
                  <!-- <div style="border: 2px dotted green; display: inline-flex; flex-wrap: wrap; background-color: aqua; align-items: flex-start; flex-direction: row; gap:10px"> -->
                  <modules
                    v-for="modules in templateModule"
                    :key="modules.name"
                    :modules="modules"
                    class="mt-2"
                  ></modules>
                </b-col>
              </b-row>
            </b-container>
          </template>
        </whitecontainer>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import whitecontainer from "../../components/writing_feature/V2WhiteContainer.vue";
import breadcrumb from "../../components/writing_feature/BreadCrumb.vue";
import modules from "../../components/writing_feature/ModulesV2.vue";
import { onMounted } from "vue";
export default {
  components: {
    whitecontainer,
    breadcrumb,
    modules,
  },
  setup() {
    onMounted(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    const items = [
      {
        text: "Essay Writing: LEQ",
        active: "yes",
      },
    ];

    const timeModule = [
      {
        img: "ModuleIcon4.svg",
        title: "Expert",
        points: [
          "Real Exam Format",
          "Answer a College Board prompt",
          "45 Minute Time Restriction",
        ],
        button: {
          content: "Practice Writing",
          route: "002",
          params: { module: "Expert" },
          disabled: false,
        },
        orientation: 12,
        name: "timed",
      },
    ];
    const templateModule = [
      {
        img: "ModuleIcon.svg",
        // title: 'For Beginners',
        points: [
          "Step by step guides on each section",
          "See examples with explanations",
        ],
        title: "View Templates & Examples",
        button: {
          content: "Learn Writing",
          route: "SelectModule",
          disabled: true,
        },
        orientation: "auto",
        name: "template",
      },
    ];

    const moduleses = [
      {
        img: "ModuleIcon3.svg",
        title: "Beginner",
        points: [
          "Section step by step guides",
          "Sample prompts",
          "No time restriction",
        ],
        button: {
          content: "Start",
          route: "002",
          params: { module: "Beginner" },
          disabled: false,
        },
        orientation: 12,
        name: "try-it",
        time: "~15 min",
      },
      {
        img: "ModuleIcon2.svg",
        title: "Intermediate",
        points: [
          "Explore each section in-depth",
          "Sample prompts",
          "No time restriction",
        ],
        button: {
          content: "Start",
          route: "002",
          params: { module: "Intermediate" },
          disabled: false,
        },
        orientation: 12,
        name: "try-it",
        time: "~45 min-1hr",
      },
    ];

    const title = "Welcome to the Essay Writing for the LEQ";
    const subtitle = "Each module will improve your LEQ writing skills.";

    return {
      items,
      moduleses,
      title,
      subtitle,
      timeModule,
      templateModule,
    };
  },
};
</script>
<style lang="sass" scoped src="@/assets/css/leq.sass"></style>
<style lang="sass" scoped src="@/assets/css/essayWriting.sass"></style>
