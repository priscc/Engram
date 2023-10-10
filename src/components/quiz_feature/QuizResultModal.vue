<template>
  <div class="border-0 text-center finish-modal fontist pb-5">
    <b-icon-x class="x" @click.native="$emit('close')"></b-icon-x>
    <div>
      <img
        :src="require('@/assets/writing_feature/books.gif')"
        alt="Image"
        height="163"
      />
    </div>
    <b-card-title class="finish-title pb-2"> {{ header }} </b-card-title>
    <b-card-text class="finish-subtitle">{{ subheader }}</b-card-text>
    <b-card-text v-if="socials">
      <span class="share-text">Share</span>
      <span>
        <img
          :src="require('@/assets/writing_feature/media1.svg')"
          alt="Image"
        />
        <img
          :src="require('@/assets/writing_feature/media2.svg')"
          alt="Image"
        />
      </span>
    </b-card-text>
    <hr class="line-break" />
    <b-card-text class="finish-subtitle button-header my-4 py-3 mx-auto">{{
      subtitle
    }}</b-card-text>
    <b-button
      id="finish-button"
      class="border-0 mb-1"
      @click="next(buttonprops[0])"
      :disabled="!ready"
      >{{ buttonprops[0].content }}</b-button
    >
  </div>
</template>

<script>
// import { onMounted } from 'vue';
import { useRouter } from "vue-router";
// import storeWriting from '../../../store/writing';
export default {
  props: {
    ready: {
      type: Boolean,
      default: false,
    },
    socials: {
      type: Boolean,
      default: true,
    },
    header: {
      type: String,
      default: "Great Job!",
    },
    subheader: {
      type: String,
      default: "You’ve successfully submitted your quiz.",
    },
    subtitle: {
      type: String,
      default: "Want to keep studying?",
    },
    buttonprops: {
      type: Array,
      default: () => [
        {
          content: "Choose Another Quiz",
          route: "Quiz",
          disabled: false,
        },
      ],
    },
  },
  emits: ["close"],
  setup(props) {
    // const store = storeWriting;
    const router = useRouter();
    console.log(props.ready);
    const next = (obj) => {
      const route = { name: obj.route };
      if (obj.params) {
        route.params = obj.params;
      }
      router.push(route);
    };
    return { router, next };
  },
};
</script>

<style>
.finish-modal {
  position: relative;
}
.finish-title {
  color: #8c30f5;
  text-align: center;
  font-size: 28px;
  font-style: normal;
  font-weight: 800;
  line-height: 32px; /* 114.286% */
}

.finish-subtitle {
  color: #040404;
  text-align: center;
  font-feature-settings: "liga" off;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 133.333% */
}

.x {
  position: absolute;
  right: 0;
  top: 0;
  font-size: 25px;
  margin: 10px 10px 0 0;
  z-index: 100;
  cursor: pointer;
}
.share-icon {
  margin: 0 8px 5px 8px;
}

.share-text {
  color: var(--text-normal, #18191f);
  font-size: 16px;
  font-style: normal;
  font-weight: 800;
  line-height: 24px; /* 150% */
  margin-right: 5px;
}

#finish-button {
  border-radius: 8px;
  background: var(--brand-purple, #8c30f5);
  color: var(--default-white, #fff);
  text-align: center;
  font-feature-settings: "clig" off, "liga" off;

  /* Label / Medium Label */
  font-family: Manrope;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 142.857% */
  padding: 10px 15px;
}
#finish-button:hover {
  background: #f1e4ff;
  color: #451a75;
  font-weight: 700;
}
.line-break {
  max-width: 400px;
  margin: auto;
}
.button-header {
  max-width: 418px;
}
</style>
