<template>
  <div id="Home">
    <div class="main">
      <b-container>
        <b-row align-v="center" class="px-4 py-5 main-row">
          <b-jumbotron id="main-jumbo">
            <template #header
              ><a id="main-title"
                >Learn & Enjoy<br />AP World History🌎</a
              ></template
            >

            <template #lead>
              <a id="main-subtitle"
                >Engram provides AP World History study guides, multiple choice
                questions, and essay practice session for students</a
              >
            </template>

            <b-button id="button" @click="goToSelectModule">
              Get Started
            </b-button>
          </b-jumbotron>
        </b-row>
      </b-container>
      <div class="icon-parent">
        <img
          :src="require('@/assets/writing_feature/PurpleCircle.svg')"
          alt="Image"
          class="icon-circle"
        />
      </div>
      <div class="icon-parent-demo align-middle">
        <img
          :src="require('@/assets/writing_feature/demov2.png')"
          alt="Image"
          class="icon-demo my-auto"
        />
      </div>
    </div>
    <b-container fluid>
      <b-row align-h="center" align-v="center" class="features">
        <b-col
          cols="auto"
          v-for="feature in features"
          :key="feature.title"
          class="py-4"
        >
          <featuresdisplay :feature="feature"></featuresdisplay>
        </b-col>
      </b-row>
      <b-row class="steps-banner" align-v="center">
        <h1 class="steps-title ps-4">
          Achieve your goals with Engram
        </h1>
        <span class="steps-subtitle ps-4"
          >Engram is your best supporter for your AP World History exam.</span
        >
        <b-col
          v-for="step in steps"
          :key="step.title"
          sm="6"
          md="auto"
          lg="auto"
        >
          <steps :step="step" class="px-auto mx-auto"></steps>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import featuresdisplay from "@/components/FeaturesDisplay.vue";
import { onMounted } from "vue";
import { event } from "vue-gtag";
import steps from "@/components/writing_feature/Steps.vue";
import { goToSelectModule } from "@/router/navigation";
export default {
  components: {
    featuresdisplay,
    steps
  },
  setup() {
    const router = useRouter();
    onMounted(() => {
      event("home-page", { method: "Google" });
    });

    const features = [
      {
        img: "book.svg",
        title: "APWH Topics",
        description:
          "Explore our AP World History resources. Feel free to enjoy our 100+ Interactive study materials.",
        route: "All_Periods"
      },
      {
        img: "eyes.png",
        title: "Multiple Choice Questions",
        description:
          "Improve your AP World History quiz score. Test yourself with out multiple choice questions.",
        route: "Quiz"
      },
      {
        img: "Essay.svg",
        title: "Essay Writing",
        description:
          "Learn and practice how to write your Long Essay Questions (LEQ) and Document Based Questions (DBQ).",
        route: "001"
      }
    ];
    const steps = [
      {
        img: "IconGroup.svg",
        title: "Learn AP World History",
        description: "Study our qualified AP World History materials",
        height: "72",
        width: "257"
      },
      {
        img: "IconGroup2.svg",
        title: "Write your own essay",
        description: "Follow our step-by-step essay writing guides",
        height: "72",
        width: "257"
      },
      {
        img: "IcongroupFinal.svg",
        title: "Get your dream score",
        description: "Master AP World History and get a full score",
        height: "72",
        width: "257"
      }
    ];

    return { features, steps, router, goToSelectModule };
  }
};
</script>
<style lang="sass" scoped src="@/assets/css/home.sass"></style>
<style lang="sass" scoped src="@/assets/css/essayWriting.sass"></style>
