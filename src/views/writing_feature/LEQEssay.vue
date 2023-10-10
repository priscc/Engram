<template>
  <div id="essay-writing" class="min-height">
    <b-container fluid class="background">
      <b-row class="pt-4 responsive-padding">
        <breadcrumb :items="items"></breadcrumb>
      </b-row>
      <b-row class="px-4 pb-3 pt-2 title">
        <a
          class="strip back-button-style mx-3 mx-sm-5 mx-smd-5 mx-lg-5 mt-3"
          @click="handleBack()"
          >Back</a
        >
        <h1 class="text-center prompt-title">
          Long Essay Question
        </h1>
      </b-row>
      <b-row
        class="px-1 px-sm-4 px-md-4 px-lg-4 white-container mx-0 mx-sm-4 mx-md-4 mx-lg-4"
      >
        <essayhead :prompt="exersize.prompt" :timer="timer"></essayhead>
        <progressvue
          v-if="moduleVersion !== 'Timed'"
          :section="currentSection"
          class="my-4"
        ></progressvue>
        <essayarea
          v-if="moduleVersion !== 'Timed'"
          :props="exersize"
          :moduleVersion="moduleVersion"
          :identification="id"
          @updateProgress="(section) => handleUpdate(section)"
        ></essayarea>
        <outlinevue
          v-if="moduleVersion === 'Timed'"
          class="my-4"
          :outlineText="
            exersize.template.templates.raw
              ? exersize.template.templates.raw.outline
              : null
          "
          :totalEmits="totalEmits"
          @TimedOutline="(outline) => handleOutline(outline)"
        ></outlinevue>
        <timedessayarea
          v-if="moduleVersion === 'Timed'"
          :text="
            exersize.template.templates.raw
              ? exersize.template.templates.raw.text
              : null
          "
          @TimedSubmit="(essay) => handleTimedSubmit(essay)"
        ></timedessayarea>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import breadcrumb from "../../components/writing_feature/BreadCrumb.vue";
import essayarea from "../../components/writing_feature/LEQEssay/EssayArea.vue";
import progressvue from "../../components/writing_feature/LEQEssay/Progress.vue";
import essayhead from "../../components/writing_feature/LEQEssay/EssayHead.vue";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import storeWriting from "../../store/writing";
import timedessayarea from "../../components/writing_feature/LEQEssay/TimedEssayArea.vue";
import outlinevue from "../../components/writing_feature/LEQEssay/Outline.vue";
export default {
  components: {
    breadcrumb,
    essayarea,
    progressvue,
    essayhead,
    timedessayarea,
    outlinevue,
  },
  setup() {
    const totalEmits = ref(0); // if both components for the timed module emit their user writing (i.e total emits === 2), the data will be packaged and a store action will trigger
    const router = useRouter();
    const route = useRoute();
    const moduleVersion = route.params.module;
    const timer = ref(null);
    if (!["Beginners", "Advanced", "Timed"].includes(route.params.module)) {
      router.push({ name: "001" });
    }
    const store = storeWriting;
    const id = route.params.id;
    const exersize = store.getters.findPrompt({
      id: id,
      version: moduleVersion,
    });
    console.log("initial fetch", id, exersize);
    const items = [
      {
        text: "Essay Writing: LEQ",
      },
      {
        text: `Essay Component Module: ${moduleVersion}`,
      },
      {
        text: "Choose a Prompt",
      },
      {
        text: "LEQ Essay",
        active: "yes!",
      },
    ];

    const buttonprops = ref({
      content: "Get Started",
      route: "SelectModule",
      disabled: false,
    });

    //BREAKDOWN SECTION UPDATES
    const currentSection = ref(null);
    const handleUpdate = (section) => {
      currentSection.value = section;
    };

    const handleBack = () => {
      router.push({ name: "002" });
    };

    //TIMED MODULE STORE ACTIONS
    // updating store for Timed module submissions handled here, Beginner and Advanced are handled in EssayArea component
    const timedEssay = ref(null);
    const handleTimedSubmit = (essay) => {
      totalEmits.value++;
      timedEssay.value = essay;
    };
    const handleOutline = (outline) => {
      store.dispatch("setUserInput", {
        prompt_id: id, //ID to identify prompt
        id: store.getters.getUniqueId, //Unique ID assigned to new feedback obj (to be replaced by firestore id's)
        moduleVersion: moduleVersion, //For segregating beginner and advanced modules
        raw: {
          outline: outline,
          text: timedEssay.value,
        },
      });

      console.log(
        "outline:",
        outline,
        "essay:",
        timedEssay.value,
        "store:",
        store.state.feedback,
      );
    };
    onMounted(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (route.params.module === "Timed") {
        timer.value = 45;
      }
    });
    return {
      items,
      buttonprops,
      exersize,
      handleUpdate,
      currentSection,
      id,
      handleBack,
      moduleVersion,
      timer,
      handleTimedSubmit,
      totalEmits,
      handleOutline,
    };
  },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Manrope:wght@700&display=swap");
.min-height {
  min-height: 1200px;
  height: 1200px;
}
</style>
<style lang="sass" scoped src="@/assets/css/essayWriting.sass"></style>
