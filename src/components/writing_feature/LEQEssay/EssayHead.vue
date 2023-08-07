<template>
  <b-container fluid class="head-container">
    <b-row class="g-3" align-h="center">
        <b-col class="head-section">
            <b-row no-gutters class="px-3">
                <b-col class="prompt-label pb-3">Prompt</b-col>
                <b-col class="text-label" v-if="prompt">{{ prompt.prompt }}</b-col>
                <b-col v-else class="text-label">
                    <b-card class="border-0">
                        <b-skeleton width="85%"></b-skeleton>
                        <b-skeleton width="55%"></b-skeleton>
                        <b-skeleton width="70%"></b-skeleton>
                    </b-card>
                </b-col>
            </b-row>
        </b-col>
        <b-col  class="head-section-2">
            <prompttype v-if="prompt && !score" :prompt="prompt"></prompttype>
            <gradescore v-if="score" :score="score"></gradescore>
        </b-col>
    </b-row>
  </b-container>
</template>

<script>
import gradescore from './GradeScore.vue';
import prompttype from './PromptType.vue';
export default {
    props:['prompt', 'score'],
    components: {
        prompttype,
        gradescore
    }
}
</script>

<style scoped>
.head-container {
}
.head-section {
    border-radius: 10px;
    background: #FFF;
    box-shadow: 0px 30px 40px 0px rgba(212, 217, 232, 0.20);
    min-height: 140px;
    margin-right: 28px;
    padding: 37px 0;
}

.head-section-2 {
    border-radius: 10px;
    background: #FFF;
    box-shadow: 0px 30px 40px 0px rgba(212, 217, 232, 0.20);
    min-height: 140px;
    max-width: 380px;
    padding: 37px 50px 0 50px;
}
.prompt-label {
    max-width: fit-content;
    color: #9B51E0;
    font-feature-settings: 'liga' off;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 30px; /* 166.667% */
    padding: 0 0 0 50px;
}

.text-label {
    color: var(--text-gray-900, #18191F);
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 157.143% */
    padding-left: 50px;
    padding-right: 40px;
    min-width: 250px;
    /* border: 1px solid red; */
}

.prompt-subtitle {
    color: var(--text-accent, #9B51E0);
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 22px; /* 137.5% */
}

.subtitle-body {
    color: var(--text-gray-900, #18191F);
    font-family: Manrope;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
}

.prompt-head-container {
    padding: 37px 0;
}

@media screen and (max-width: 515.0px) {
    .head-section {
        margin-right: 0;
    }
}
</style>
<style lang="sass" scoped src="@/assets/css/essayWriting.sass"></style>