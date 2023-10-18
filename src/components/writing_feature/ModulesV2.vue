<template>
  <div>
    <div id="modulev2" class="border-0 p-0" no-body>
      <b-row
        class="g-3"
        :class="{
          'modulev2-try-it pb-4 pb-sm-4 pb-md-0 pb-lg-0':
            modules.name === 'try-it',
          'modulev2-timed px-3': modules.name === 'timed',
          'modulev2-template px-3': modules.name === 'template',
        }"
        align-h="center"
        align-v="center"
      >
        <b-col :cols="modules.orientation" class="module-gutter text-center">
          <b-img
            :src="require('../../assets/writing_feature/' + modules.img + '')"
            alt="Image"
            id="icons"
            class="p-0 m-0"
            style="max-height: 90px; max-width: 90px;"
          ></b-img>
        </b-col>
        <b-col :cols="modules.orientation" class="module-gutter">
          <div v-if="modules.title" class="module-title py-2">
            {{ modules.title }} <br />
            <!-- <a v-if="modules.time" class="module-time">
              {{ modules.time }}
            </a> -->
          </div>

          <div class="module-description">
            <div class="point text-left mx-auto">
              <a v-for="point in modules.points" :key="point">
                <b>✓ </b>{{ point }}<br />
              </a>
            </div>
          </div>
        </b-col>
        <b-col
          :cols="modules.orientation"
          class="module-gutter"
          :class="{
            'button-template ms-lg-5': modules.name === 'template',
            'button-try-it': modules.name === 'try-it',
          }"
        >
          <div class="w-100 text-center module-button-parent mx-auto py-3">
            <purplebutton
              :buttonprops="modules.button"
              class="button"
            ></purplebutton>
          </div>
        </b-col>
      </b-row>
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
#modulev2 {
  /* max-width: 539px; */
  /*background: #f5f5f5;*/
  text-align: left;
  padding-top: 19px;
}
.modulev2-try-it {
  width: 300px;
  min-height: 313px;
  /* border: 1px solid red; */
}

.modulev2-timed {
  width: auto;
  min-height: 247px;
}
.modulev2-template {
  max-width: 1184px;
  min-height: 161px;
  /* padding-left: 64px;
    padding-right:64px; */
}

.module-title {
  color: #000;
  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 900;
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

.module-time {
  color: var(--text-normal, #18191f);
  font-feature-settings: "liga" off;
  font-family: Manrope;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 200% */
  text-decoration: none;
}

.point {
  width: fit-content;
}

.button {
  width: 100%;
}

.button-template {
  min-width: 357px;
}

.button-try-it {
  max-width: 212px;
}

.module-button-parent {
  max-width: 357px;
  margin: 0 30px 0 30px;
}

.col {
  border: 1px solid green;
}

.module-gutter {
  /* padding-bottom:19px; */
}
@media screen and (max-width: 380px) {
  .modulev2-try-it {
    width: auto;
    min-height: 313px;
  }

  .modulev2-timed {
    width: auto;
    min-height: 247px;
  }
  .button-template {
    min-width: auto;
  }
}
</style>
<style lang="sass" scoped src="@/assets/css/essayWriting.sass"></style>
