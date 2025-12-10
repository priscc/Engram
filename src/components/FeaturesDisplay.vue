<template>
  <b-card id="feature" class="border-0 fontist" body-class="p-0">
    <div class="features-icon-parent">
      <b-card-img
        :src="require('../assets/' + feature.img)"
        alt="Image"
        top
        id="icons"
        class="feature-icon"
      />
    </div>

    <b-card-title class="feature-title">
      {{ feature.title }}
    </b-card-title>

    <b-card-text class="feature-description">
      {{ feature.description }}
    </b-card-text>

    <a @click="handleClick" id="features-link">Explore</a>
  </b-card>
</template>

<script>
import { pushRoute } from "@/router/navigation";
export default {
  props: ["feature"],
  setup(props) {
    const handleClick = () => {
      pushRoute(props.feature.route);
    };
    return { handleClick };
  }
};
</script>

<style scoped>
/* Outer card spacing you control (since .card-body padding is removed) */
#feature {
  max-width: 400px;
  text-align: left;
  padding: 30px 32px 30px 32px;
}

/* Enforce 50x50 on the icon image (wins over any global .card img rules) */
.feature-icon {
  width: 50px !important;
  height: 50px !important;
  object-fit: cover !important;
}

/* Title + description styles */
.feature-title {
  color: var(--text-gray-900, #18191f);
  font-feature-settings: "liga" off;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 32px;
}

.feature-description {
  color: var(--text-gray-900, #18191f);
  font-feature-settings: "liga" off;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 26px;
}

/* Icon container */
.features-icon-parent {
  position: relative;
  width: 50px;
  padding-bottom: 56px;
}

/* Link + arrow */
#features-link {
  color: var(--brand-purple, #8c30f5);
  font-feature-settings: "clig" off, "liga" off;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 16px;
  text-decoration: none;
  cursor: pointer;
}

#features-link::after {
  content: url("../assets/writing_feature/right-arrow.svg") !important;
  padding-left: 8px;
  /* position: absolute; */
  /* bottom: 45px; */
}

/* If for any reason the build still injects .card-body padding, un-comment this as a scoped deep override:
  :deep(.card-body) {
    padding: 0 !important;
  }
  */
</style>

<style lang="sass" scoped src="@/assets/css/essayWriting.sass"></style>
