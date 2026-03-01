<template>
  <div id="Units">
    <b-container fluid>
      <topic-header
        :background-image="headerMapImage"
        :breadcrumbs="headerBreadcrumbs"
        title="Explore APWH Time Periods"
        back-route="Home"
      />
    </b-container>
    <b-container fluid class="home_page">
      <b-row class="periods">
        <b-col
          v-for="timePeriod in timePeriodHeaders"
          :key="timePeriod.id"
          class="period"
          :style="{
            'background-image':
              'url(' + require(`@/assets/${timePeriod.img}`) + ')'
          }"
          @click="next(timePeriod)"
        >
          <div class="period_overlay"></div>
          <div class="period_content">
            <div>
              <p class="period_header">{{ timePeriod.header }}</p>
              <p class="period_subheader">{{ timePeriod.subheader }}</p>
            </div>

            <div class="period_units" role="list">
              <button
                v-for="unit in unitsForPeriod(timePeriod)"
                :key="`${timePeriod.timePeriod}-${unit.id}`"
                type="button"
                class="period_unit_card"
                role="listitem"
                @click.stop="next(timePeriod)"
              >
                <span class="period_unit_label">{{ unit.id }}</span>
                <span class="period_unit_title">{{ unit.title }}</span>
              </button>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import store from "@/store";
import { goToPeriod } from "@/router/navigation";
import TopicHeader from "@/components/TopicHeader.vue";
export default {
  components: {
    TopicHeader
  },
  computed: {
    headerMapImage() {
      return "https://th.bing.com/th/id/R.be783c574e7c6a49e83b9eafd49e4b22?rik=hleDtASc6GRrqw&pid=ImgRaw&r=0";
    },
    headerBreadcrumbs() {
      return ["AP World History", "Time Periods"];
    },
    timePeriodHeaders() {
      return store.state.timePeriodHeaders;
    }
  },
  methods: {
    unitsForPeriod(period) {
      const preferredUnits = {
        "Regional Interactions": [
          { id: "Unit 1", title: "The Global Tapestry" },
          { id: "Unit 2", title: "Networks of Exchange" }
        ],
        "First Global Age": [
          { id: "Unit 3", title: "Land-Based Empires" },
          { id: "Unit 4", title: "Transoceanic Interconnections" }
        ],
        "Revolutions & Industrialization": [
          { id: "Unit 5", title: "Revolutions" },
          { id: "Unit 6", title: "Consequences of Industrialization" }
        ],
        "Modern Times": [
          { id: "Unit 7", title: "Global Conflict" },
          { id: "Unit 8", title: "Cold War & Decolonization" }
        ]
      };

      if (preferredUnits[period.header]) {
        return preferredUnits[period.header];
      }

      const titles = Object.keys(period.unitTitles || {}).slice(0, 2);
      return titles.map((title, index) => ({
        id: `Unit ${index + 1}`,
        title: title.replace(/^Unit\s*\d+:\s*/, "")
      }));
    },
    next(i) {
      store.dispatch("setTimePeriod", i.timePeriod);
      // Use goToPeriod which slugifies `periodName` so URLs are SEO-friendly
      goToPeriod(i.header, i.timePeriod);
    }
  },
  mounted() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    this.$gtag.event("timePeriod-page", {
      event_category: "engagement"
    });
  }
};
</script>

<style lang="sass" scoped src="@/assets/css/main.sass"></style>
<style lang="sass" scoped src="@/assets/css/units.sass"></style>
