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

    <section class="home-periods" aria-label="AP World History Time Periods">
      <div class="home-periods__heading">
        <h2 class="home-periods__title">AP World History Time Periods</h2>
        <p class="home-periods__subtitle">Explore APWH Time Periods</p>
      </div>

      <div class="home-periods__grid">
        <article
          v-for="period in timePeriods"
          :key="period.id"
          class="home-period"
          :style="{ backgroundImage: `url(${period.image})` }"
        >
          <div class="home-period__overlay"></div>

          <div class="home-period__content">
            <header>
              <h3 class="home-period__title">{{ period.title }}</h3>
              <p class="home-period__range">{{ period.range }}</p>
            </header>
            <div class="home-period__units" role="list">
              <button
                v-for="unit in period.units"
                :key="unit.id"
                type="button"
                role="listitem"
                class="home-period__unit"
                @click="openPeriod(period)"
              >
                <span class="home-period__unit-label">{{ unit.id }}</span>
                <span class="home-period__unit-title">{{ unit.title }}</span>
              </button>
            </div>
          </div>
        </article>
      </div>
    </section>

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
import featuresdisplay from "@/components/FeaturesDisplay.vue";
import { onMounted } from "vue";
import { event } from "vue-gtag";
import steps from "@/components/writing_feature/Steps.vue";
import { goToPeriod, goToSelectModule } from "@/router/navigation";
export default {
  components: {
    featuresdisplay,
    steps
  },
  setup() {
    onMounted(() => {
      event("home-page", { method: "Google" });
    });

    const timePeriods = [
      {
        id: "period-1",
        title: "Regional Interactions",
        range: "1200-1450",
        periodNumber: 1,
        image: require("@/assets/RegionalInteractions.png"),
        units: [
          { id: "Unit 1", title: "The Global Tapestry" },
          { id: "Unit 2", title: "Networks of Exchange" }
        ]
      },
      {
        id: "period-2",
        title: "First Global Age",
        range: "1450-1750",
        periodNumber: 2,
        image: require("@/assets/FirstGlobalAge.png"),
        units: [
          { id: "Unit 3", title: "Land-Based Empires" },
          { id: "Unit 4", title: "Transoceanic Interconnections" }
        ]
      },
      {
        id: "period-3",
        title: "Revolutions & Industrialization",
        range: "1750-1900",
        periodNumber: 3,
        image: require("@/assets/Rev&Indus.png"),
        units: [
          { id: "Unit 5", title: "Revolutions" },
          { id: "Unit 6", title: "Consequences of Industrialization" }
        ]
      },
      {
        id: "period-4",
        title: "Modern Times",
        range: "1900-Present",
        periodNumber: 4,
        image: require("@/assets/Modern.png"),
        units: [
          { id: "Unit 7", title: "Global Conflict" },
          { id: "Unit 8", title: "Cold War & Decolonization" }
        ]
      }
    ];

    const openPeriod = period => {
      goToPeriod(period.title, period.periodNumber);
    };

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

    return { features, steps, timePeriods, openPeriod, goToSelectModule };
  }
};
</script>
<style lang="sass" scoped src="@/assets/css/home.sass"></style>
<style lang="sass" scoped src="@/assets/css/essayWriting.sass"></style>
