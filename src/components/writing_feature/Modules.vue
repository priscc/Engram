<template>
  <div id="module" class="py-4 border-0">
    <img
      :src="require('../../assets/writing_feature/' + modules.img + '')"
      alt="Image"
      top
      id="icons"
      style="max-height: 85px; max-width: 85px"
    />
    <div class="module-title py-2">
      {{ modules.title }}
    </div>
    <div class="module-description">
      <div class="point text-left mx-auto">
        <a v-for="point in modules.points" :key="point">
          <b>✓ </b>{{ point }}<br />
        </a>
      </div>
    </div>
    <div class="w-100 text-center module-button-parent mx-auto">
      <purplebutton :buttonprops="modules.button" class="button"></purplebutton>
    </div>
  </div>
</template>

<script>
import purplebutton from "./PurpleButton.vue";
export default {
  props: ["modules"],
  components: {
    purplebutton,
  },
};
</script>

<style scoped>
#module {
  max-width: 539px;
  border-radius: 8px;
  background: #f5f5f5;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
  padding: 0 10px 0 10px;
}

.module-title {
  color: #000;
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 25px; /* 90% */
  letter-spacing: 2px;
  text-transform: uppercase;
}

.module-description {
  color: var(--text-normal, #111);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
}

.point {
  width: fit-content;
}

.button {
  width: 100%;
}

.module-button-parent {
  max-width: 357px;
}
</style>
