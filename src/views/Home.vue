<template>
  <div>
    <div class="site_header">
      (APWH) World History Units
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
export default {
  computed: {
    timePeriodHeaders() {
      return store.state.timePeriodHeaders;
    }
  },
  methods: {
    next(i) {
      this.$router.push({
        name: "Period",
        params: { periodName: i.header, period: i.timePeriod }
      });
    }
  }
};
</script>

<style lang="sass" scoped src="@/assets/css/main.sass"></style>
