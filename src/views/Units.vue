<template>
  <div id="Units">
    <div class="site_header">
      <h1>AP World History Time Periods</h1>
      <h5>Explore APWH Time Periods</h5>
    </div>
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
          <p class="period_header">{{ timePeriod.header }}</p>
          <p class="period_subheader">{{ timePeriod.subheader }}</p>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import store from "@/store";
import { goToPeriod } from "@/router/navigation";
export default {
  computed: {
    timePeriodHeaders() {
      return store.state.timePeriodHeaders;
    }
  },
  methods: {
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
