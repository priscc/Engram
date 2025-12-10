<template>
  <div id="step" class="step-container">
    <div class="step-image-wrapper">
      <b-img
        :src="require('../../assets/writing_feature/' + step.img)"
        alt="Image"
        :height="step.height"
        :width="step.width"
        class="step-icon"
      />
    </div>

    <div class="step-title">
      {{ step.title }}
    </div>

    <div class="step-description">
      {{ step.description }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["step"]
};
</script>

<style scoped>
.step-container {
  max-width: 257px;
  text-align: left;
}

/* If you want to force sizes via CSS */
.step-icon {
  max-width: 257px !important;
  height: 72px !important;
  object-fit: cover;
}

/* Style your text sections */
.step-title {
  color: var(--text-gray-900, #18191f);
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 28px;
  margin-top: 10px;
}

.step-description {
  color: var(--text-normal, #111);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 26px;
}
</style>
