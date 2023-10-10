<template>
  <b-button
    @click="next"
    id="purple"
    class="border-0 p-auto m-auto fontist"
    :disabled="buttonprops.disabled"
    :style="{ backgroundColor: buttonprops.disabled ? 'grey' : '#451a75' }"
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
      console.log("click");
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

<style>
#purple {
  min-height: 52px;
  border-radius: 30px;
  padding: 10px 10px 10px 10px;
  background: #451a75;
  text-transform: uppercase;
  color: var(--default-white, #fff);
  text-align: center;
  font-size: 18px;
  font-style: normal;
  font-weight: 800;
  line-height: 25px;
  letter-spacing: 2px;
}

#purple:hover {
  background: #f1e4ff;
  color: #451a75;
  font-weight: 800;
}
</style>
