<template>
  <div id="essay-writing">
    <b-container fluid class="background">
      <b-row class="pt-4 px-4">
        <breadcrumb :items="items"></breadcrumb>
      </b-row>
      <b-row class="px-4 pb-4 pt-2 title">
        Select a Module
      </b-row>
      <b-row class="px-4 white-container">
        <whitecontainer
          :title="title"
          :subtitle="subtitle"
          id="module-white-container"
        >
          <b-container>
            <b-row
              class="justify-content-sm-center justify-content-md-between justify-content-lg-between"
            >
              <b-col
                v-for="modules in moduleses"
                :key="modules.name"
                sm="12"
                md="6"
                class="mx-auto module-column py-4 module-container"
              >
                <modules :modules="modules"></modules>
              </b-col>
            </b-row>
          </b-container>
        </whitecontainer>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import whitecontainer from "../../components/writing_feature/WhiteContainer.vue";
import breadcrumb from "../../components/writing_feature/BreadCrumb.vue";
// import purplebutton from '../../components/writing_feature/PurpleButton.vue'
import modules from "../../components/writing_feature/Modules.vue";
export default {
  components: {
    whitecontainer,
    breadcrumb,
    // purplebutton,
    modules,
  },
  setup() {
    const items = [
      {
        text: "Essay Writing",
      },
      {
        text: "Select a Module",
        active: "true",
      },
    ];

    const moduleses = [
      {
        img: "ModuleIcon0.svg",
        title: "Learning Module",
        points: [
          "Step by step guides on each section",
          "Essay break down and highlights",
        ],
        button: {
          content: "Learn Writing",
          route: "SelectModule",
          disabled: false,
        },
      },
      {
        img: "ModuleIcon.svg",
        title: "Practice Module",
        points: [
          "Practice writing at your own pace",
          "Interactive writing guides",
        ],
        button: {
          content: "Practice Writing",
          route: "SelectDifficulty",
          disabled: false,
        },
      },
    ];

    const title = "Learning & Practice Module for your writing skills";
    const subtitle = "Each module will improve your LEQ writing skills.";
    return { items, moduleses, title, subtitle };
  },
};
</script>
<style scoped>
#module-white-container {
  padding-bottom: 0px;
}
.module-container {
  max-width: 539px;
}
</style>
<style lang="sass" scoped src="@/assets/css/essayWriting.sass"></style>
