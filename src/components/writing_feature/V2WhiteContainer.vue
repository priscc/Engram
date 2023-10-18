<template>
  <b-container fluid class="true-white-container">
    <b-row
      no-gutters
      align-h="around"
      class="top-module text-end refresh pt-4 pb-4 my-2 px-0 pt-sm-4 pt-md-4 pt-lg-4 px-sm-4 px-md-4 px-lg-4"
    >
      <b-col
        cols="auto"
        class="white-container-try-it-container text-center px-3 px-sm-3 px-md-1 px-lg-1"
      >
        <slot name="try-it"></slot>
      </b-col>
      <b-col
        cols="auto"
        class="white-container-timed-container text-center px-3 px-sm-3 px-md-1 px-lg-1"
      >
        <slot name="timed"></slot>
      </b-col>
    </b-row>
    <b-row>
      <slot name="templates"></slot>
    </b-row>
  </b-container>
</template>

<script>
export default {
  props: ["title"],
  setup(props) {
    console.log(props.title);
  },
};
</script>

<style scoped>
.true-white-container {
  background: white;
  min-height: 750px;
  border-radius: 10px;
}
.title-white-container {
  color: #111;
  font-size: 24px;
  font-style: normal;
  font-weight: 800;
}
.subtitle-white-container {
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 26px;
}

.white-container-timed-container {
  max-width: 475px;
}

.top-module {
  margin-bottom: 65px;
}

.gutter {
  max-width: 40px;
}
@media screen and (max-width: 425px) {
  .white-container-timed-container {
    max-width: 100%;
  }
}
</style>
