<template>
  <div id="choose-prompt">
    <div class="site_header">
      <h1>LEQ Essays</h1>
      <h5>Welcome to the essay writing for the LEQ</h5>
    </div>
    <!-- <navbarvue style="position: absolute; top: 0; width: 100%;"></navbarvue> -->
    <b-container fluid class="background">
      <b-row class="px-4 pb-2 pt-4 title">
        <b-col>
          <a
            class="strip back-button-style mx-2 mx-sm-4 mx-smd-4 mx-lg-4 p-0"
            @click="handleBack()"
            >Back</a
          >
        </b-col>
      </b-row>
      <b-row class="responsive-padding">
        <breadcrumb :items="items"></breadcrumb>
      </b-row>

      <b-row
        class="px-4 white-container responsive-padding mx-0 mx-sm-4 mx-md-4 mx-lg-4"
      >
        <whitecontainer
          :refresh="true"
          :buttonprops="buttonprops"
          id="module-white-container"
        >
          <template>
            <prompt
              v-for="prompt in prompts"
              :key="prompt.prompt"
              :prompt="prompt"
              class="prompt"
              id="prompt"
              :hover="true"
              :class="{ active: currentPrompt === prompt.id }"
            ></prompt>
          </template>
        </whitecontainer>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import whitecontainer from "../../components/writing_feature/WhiteContainer.vue";
import breadcrumb from "../../components/writing_feature/BreadCrumb.vue";
import prompt from "../../components/writing_feature/Prompt.vue";
import storeWriting from "@/store/writing.js";
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
export default {
  components: {
    whitecontainer,
    breadcrumb,
    prompt,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const moduleVersion = route.params.module;
    if (!["Beginner", "Intermediate", "Expert"].includes(route.params.module)) {
      router.push({ name: "001" });
    }
    const store = storeWriting;
    onMounted(() => {
      store.dispatch("unSetSelectedPrompt");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    const canClick = computed(() => store.state.selectedPrompt === null);
    const currentPrompt = computed(() => store.state.selectedPrompt);
    const prompts = computed(() => store.state.prompts.slice(0, 3));
    const items = [
      {
        text: "Essay Writing: LEQ",
      },
      {
        text: `Essay Component Module: ${moduleVersion}`,
      },
      {
        text: "Choose a Prompt",
        active: "yes",
      },
    ];
    const title = "Choose a Prompt";
    const subtitle =
      "Choose one of three long essay question prompts to answer. The long essay requires students to demonstrate their ability to use historical evidence in writing a thoughtful historical argument. In the following questions, students will analyze an issue using the reasoning skill of continuity and change over time.";
    const buttonprops = ref({
      content: "Get Started",
      route: "003",
      disabled: canClick,
      params: { id: currentPrompt, module: route.params.module },
    });
    const handleBack = () => {
      router.push({ name: "001" });
    };
    return {
      items,
      title,
      subtitle,
      prompts,
      buttonprops,
      currentPrompt,
      handleBack,
    };
  },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Manrope:wght@700&display=swap");
.active {
  opacity: 1;
}
#module-white-container {
  padding-bottom: 0px;
}

.prompt {
  transition: 0.1s;
}
.prompt:nth-child(1) {
  background: var(--accent-blue-1, rgb(202, 226, 241, 0.5));
}
.prompt:nth-child(2) {
  background: var(--accent-green-1, rgba(204, 235, 165, 0.5));
  margin: 15px 0;
}
.prompt:nth-child(3) {
  background: var(--accent-yellow-1, rgba(245, 235, 187, 0.5));
}

.prompt:nth-child(1).active,
.prompt:nth-child(1):hover {
  background: var(--dark-accent-blue, #85cdf9);
}

.prompt:nth-child(2).active,
.prompt:nth-child(2):hover {
  background: var(--dark-accent-green, #9bd84f);
}

.prompt:nth-child(3).active,
.prompt:nth-child(3):hover {
  background: var(--dark-accent-yellow, #f5e07b);
}

.prompt.active,
.prompt:hover {
  color: white;
}
</style>
<style lang="sass" scoped src="@/assets/css/essayWriting.sass"></style>
