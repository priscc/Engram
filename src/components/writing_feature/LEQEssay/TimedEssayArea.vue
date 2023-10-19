<template>
  <div id="TimeEssay">
    <b-container fluid class="essay-area">
      <b-row class="py-5 px-3 px-sm-0 px-md-0 px-lg-0">
        <b-textarea
          ref="textarea"
          class="no-scroll-bar textbox-border textbox mx-auto p-3 p-sm-5 p-md-5 p-lg-5"
          rows="15"
          max-rows="20"
          no-resize
          v-model="essay"
        ></b-textarea>
      </b-row>
      <b-row align-h="end" class="px-5 pt-5 pb-3">
        <b-button
          class="finish-button border-0 mb-2 fontist purple-button"
          @click="next(buttonprops[1])"
        >
          Next
        </b-button>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import store from "@/store/writing";
// import finishmodal from "./FinishModal.vue";
export default {
  props: ["text"],
  components: {
    // finishmodal,
  },
  emits: ["TimedSubmit"],
  setup(props, context) {
    const textarea = ref(null);
    const essay = ref(props.text);
    const buttonprops = [
      {
        content: "<   Go Back to Modules",
        route: "001",
        disabled: false,
      },
      { content: "Continue   >", route: "005", disabled: false },
    ];

    const router = useRouter();
    console.log(props.ready);
    const next = (obj) => {
      context.emit("TimedSubmit", essay.value);
      // store.dispatch("setUserInput", idea); // for when there are logins
      store.dispatch("setModuleVersion", props.moduleVersion);
      const route = { name: obj.route };
      if (obj.params) {
        route.params = obj.params;
      }
      router.push(route);
    };

    return {
      router,
      next,
      buttonprops,
      essay,
      textarea,
    };
  },
};
</script>

<style></style>
<style lang="sass" scoped src="@/assets/css/essayWriting.sass"></style>
