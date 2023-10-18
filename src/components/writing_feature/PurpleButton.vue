<template>
  <b-button
    v-if="!buttonprops.disabled"
    @click="next"
    class="border-0 p-auto m-auto fontist purple-button"
  >
    {{ buttonprops.content }}
  </b-button>
  <b-button
    v-else
    @click="next"
    class="border-0 p-auto m-auto fontist purple-button-disabled"
  >
    {{ buttonprops.content }}
  </b-button>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  props: ["buttonprops"],
  setup(props) {
    const router = useRouter();

    const next = () => {
      console.log("purple-button", props.buttonprops);
      if (props.buttonprops.params) {
        router.push({
          name: props.buttonprops.route,
          params: props.buttonprops.params,
        });
      } else {
        router.push({ name: props.buttonprops.route });
      }
    };

    return { next };
  },
};
</script>

<style lang="sass" scoped src="@/assets/css/essayWriting.sass"></style>
