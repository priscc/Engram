<template>
  <div id="essay-writing">
    <b-container fluid class="background">
      <b-row class="pt-4 responsive-padding">
        <breadcrumb :items="items"></breadcrumb>
      </b-row>
      <b-row class="px-4 pb-3 pt-2 title">
        <a
          class="strip back-button-style mx-3 mx-sm-5 mx-smd-5 mx-lg-5 mt-3"
          @click="handleBack()"
          >Edit Essay</a
        >
        <h1 class="text-center prompt-title top-control">
          Feedback on Your Essay
        </h1>
        <a
          class="strip back-button-style-right mx-3 mx-sm-5 mx-smd-5 mx-lg-5 mt-3"
          @click="router.push({ name: '001' })"
          >Back to Modules</a
        >
      </b-row>
      <b-row
        class="px-1 px-sm-4 px-md-4 px-lg-4 white-container responsive-padding mx-0 mx-sm-4 mx-md-4 mx-lg-4"
      >
        <essayhead :prompt="exersize.prompt" :score="65"></essayhead>
        <sectionfeedback
          class="mt-4"
          v-for="section in stream"
          :key="section.title"
          :title="section.title"
          :content="section.content"
          :title_2="section.title_2"
          :content_2="section.content_2"
        ></sectionfeedback>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { onMounted, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import breadcrumb from "../../components/writing_feature/BreadCrumb.vue";
import essayhead from "../../components/writing_feature/LEQEssay/EssayHead.vue";
import storeWriting from "../../store/writing";
import sectionfeedback from "../../components/writing_feature/SectionFeedback.vue";
export default {
  components: {
    breadcrumb,
    essayhead,
    sectionfeedback,
  },
  setup() {
    //ROUTE && FEEDBACK OBJECT ID
    const router = useRouter();
    const route = useRoute();
    const store = storeWriting;
    const version = store.state.moduleVersion;
    console.log(store.state.feedback);
    var id = ref(null);
    if (route.params.id === "sample") {
      id.value = route.params.id;
    } else {
      id = computed(() => store.state.uniqueId);
    }
    console.log("id", id.value);
    onMounted(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    //REFS && CONSTANTS
    const variable = ref(null);
    const prompt_id = ref(null);
    const stream = ref([]);
    const exersize = computed(() =>
      store.getters.findPrompt({ id: prompt_id.value, version: version }),
    );
    const items = [
      {
        text: "Essay Writing: LEQ",
      },
      {
        text: "Essay Component Module: Beginner",
      },
      {
        text: "Choose a Prompt",
      },
      {
        text: "LEQ Essay",
      },
      {
        text: "Feedback",
        active: "yes!",
      },
    ];
    const buttonprops = ref({
      content: "Get Started",
      route: "SelectModule",
      disabled: false,
    });
    //ACCESSING FEEDBACK OBJECT, for future database implementation
    const initialize = async () => {
      const feedback = await store.getters.findFeedback({
        id: id.value,
        version: version,
      });
      if (feedback === 202) {
        //push to a page not found
      } else {
        console.log("feedback found!", feedback);
        variable.value = feedback.great_statement;
        prompt_id.value = feedback.prompt_id;
        console.log("initialized", prompt_id.value, exersize.value);
        stream.value.push({
          title: "Contextualization",
          content: feedback.content.contextualization,
        });
        stream.value.push({
          title: "Thesis Statement",
          content: feedback.content.thesis,
        });
        for (var i in feedback.content.evidence) {
          stream.value.push({
            title: `Evidence #${parseInt(i) + 1}`,
            content: feedback.content.evidence[i].evidence,
            title_2: "Analysis",
            content_2: feedback.content.evidence[i].analysis,
          });
        }
        stream.value.push({
          title: "Conclusion",
          content: feedback.content.conclusion,
        });
        console.log(stream.value);
      }
    };

    initialize();
    //CALCULATING SCORE AND FEEDBACK

    //ROUTING
    const handleBack = () => {
      router.push({
        name: "003",
        params: { id: prompt_id.value, module: version },
      });
      // router.go(-1);
    };
    return {
      items,
      buttonprops,
      exersize,
      variable,
      router,
      handleBack,
      stream,
    };
  },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Manrope:wght@700&display=swap");
@media screen and (max-width: 790px) {
  .top-control {
    margin-top: 50px;
  }
}
</style>
<style lang="sass" scoped src="@/assets/css/essayWriting.sass"></style>
