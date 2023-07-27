<template>
  <b-container fluid class="head-container">
    <b-row class="g-3" align-h="center">
        <b-col class="head-section">
            <b-row no-gutters class="px-3">
                <b-col class="prompt-label pb-3">Prompt</b-col>
                <b-col class="text-label">{{ prompt.prompt }}</b-col>
            </b-row>
        </b-col>
        <b-col  class="head-section-2">
            <div>
               <span class="prompt-subtitle">Period:&nbsp;</span>
               <span class="subtitle-body">{{ prompt.period }}</span>
            </div>
            <div>
                <span class="prompt-subtitle">Type:&nbsp;</span>
                <span class="subtitle-body">{{ prompt.type }}</span>
            </div>
        </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
    props:['prompt']
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
    max-width: 320px;
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