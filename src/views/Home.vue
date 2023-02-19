<template>
  <div>
    <b-container fluid class="home_page">
      <b-row class="periods">
        <b-col
          v-for="(timePeriod) in timePeriodHeaders"
          :key="timePeriod.id"
          class="period"
          :style="{
            'background-image':
              'url(' + require(`@/assets/${timePeriod.img}`) + ')',
          }"
          @click="expand(timePeriod)"
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
import "@/assets/css/main.sass";
export default {
  computed: {
    timePeriodHeaders() {
      return store.state.timePeriodHeaders;
    },
  },
  methods: {
    expand(i) {
      store.dispatch("setTimePeriod", i.timePeriod);
      this.$router.push({ name: "Period", params: { period: i.timePeriod } });
    },
  },
  mounted() {
    store.dispatch("setTimePeriod", 0);
  },
};
</script>
