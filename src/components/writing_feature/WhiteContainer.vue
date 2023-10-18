<template>
  <b-container fluid class="true-white-container">
    <b-row
      v-if="refresh"
      align-h="end"
      class="text-end refresh pt-4 pb-4 my-2 px-0 pt-sm-4 pt-md-4 pt-lg-4 px-sm-4 px-md-4 px-lg-4"
    >
      <span @click="click()" style="width: fit-content;">
        <a class="clickable strip">
          <span>
            Refresh
          </span>
          <span>
            <!-- <b-icon-arrow-clockwise style="vertical-align: middle; font-size: 22px; font-weight: 900;"></b-icon-arrow-clockwise> -->
            <img
              :src="require('../../assets/writing_feature/refresh.svg')"
              alt="Icon"
              class="image"
              :class="{ spin: clicked }"
            />
          </span>
        </a>
      </span>
    </b-row>
    <b-row v-if="title || subtitle">
      <p
        v-if="title"
        class="pt-4 px-4 px-sm-4 px-lg-5 px-md-5 title-white-container"
      >
        {{ title }}
      </p>
      <p
        v-if="subtitle"
        class="mb-3 px-4 px-sm-3 px-lg-5 px-md-5 pb-3 pb-lg-5 pb-md-5 pb-sm-0 subtitle-white-container"
      >
        {{ subtitle }}
      </p>
    </b-row>
    <b-row class="mt-0 pb-3 px-sm-3 px-md-5 px-lg-5 auto-padding">
      <slot></slot>
    </b-row>
    <b-row v-if="buttonprops" class="button-parent mx-auto">
      <purpleButton
        :buttonprops="buttonprops"
        class="main-button mb-5 mt-4"
      ></purpleButton>
    </b-row>
  </b-container>
</template>

<script>
import purpleButton from "./PurpleButton.vue";
import { ref } from "vue";
export default {
  props: ["title", "subtitle", "refresh", "buttonprops"],
  components: {
    purpleButton,
  },
  emits: ["refresh"],
  setup(props, { emit }) {
    const clicked = ref(false);
    const click = () => {
      if (!clicked.value) {
        console.log("click event!");
        emit("refresh");
        clicked.value = !clicked.value;
        setTimeout(() => {
          clicked.value = !clicked.value;
        }, 1000);
      }
    };
    return { click, clicked };
  },
};
</script>

<style scoped>
.true-white-container {
  background: white;
  min-height: 600px;
  border-radius: 10px;
}
.title-white-container {
  color: #111;
  font-size: 24px;
  font-style: normal;
  font-weight: 800;
  /* border: 1px solid red; */
}
.subtitle-white-container {
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 26px;
}

.refresh {
  color: var(--text-normal-2, #474a57);
  font-feature-settings: "clig" off, "liga" off;

  /* Label / Medium Label */
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 142.857% */
  /* padding: 43px 76px 0 0; */
}

span > a > span:nth-child(1) {
  padding: 0 8px;
}

.auto-padding {
  padding-left: 5px;
  padding-right: 5px;
}

.spin {
  transition: transform 0.5s ease-in-out;
  transform: rotate(360deg);
}
.clickable {
  padding: 15px;
  color: black;
  cursor: pointer;
}
</style>
<style lang="sass" scoped src="@/assets/css/essayWriting.sass"></style>
