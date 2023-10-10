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
              'url(' + require(`@/assets/${timePeriod.img}`) + ')',
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
    },
  },
  methods: {
    next(i) {
      this.$router.push({
        name: "Period",
        params: { periodName: i.header, period: i.timePeriod },
      });
    },
  },
  mounted() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    this.$gtag.event("Home-page", {
      event_category: "engagement",
    });
  },
};
</script>

<style lang="sass" scoped src="@/assets/css/main.sass"></style>
<style type="text/css" scoped="">
.site_header {
  background-image: url("https://th.bing.com/th/id/R.be783c574e7c6a49e83b9eafd49e4b22?rik=hleDtASc6GRrqw&pid=ImgRaw&r=0");
  font-weight: 750;
  color: #fff;
  padding: 30px 25px;
  text-align: center;
}
</style>
