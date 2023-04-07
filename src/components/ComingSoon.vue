<template>
  <div id="ComingSoon">
    <v-row v-show="delayShow">
      <b-col>
        <div class="trend_comingSoon">
          <div class="header-3 trend_comingSoonText">
            <p>Coming Soon</p>
          </div>
          <b-img
            class="trend_comingSoonImg"
            :src="require('@/assets/globe2.jpg')"
          >
          </b-img>
        </div>
      </b-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "ComingSoon",
  data() {
    return {
      delayShow: false
    };
  },
  created() {
    setTimeout(() => {
      this.delayShow = true;
    }, 500);
  }
};
</script>

<style lang="sass" scoped src="@/assets/css/topicContent.sass"></style>
