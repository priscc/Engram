<template>

    <b-container fluid class="true-white-container">
        <b-row v-if="refresh" align-h="start" class="text-end refresh">
            <span>
                <span>  
                    Refresh  
                </span>
                <span>
                    <!-- <b-icon-arrow-clockwise style="vertical-align: middle; font-size: 22px; font-weight: 900;"></b-icon-arrow-clockwise> -->
                    <img :src="require('../../assets/writing_feature/refresh.svg')" alt="Icon">
                </span>
            </span>
        </b-row>
        <b-row>
                <p class="pt-4 px-sm-3 px-lg-5 px-md-5 title-white-container">{{ title }}</p>
                <p class="mb-3 px-sm-3 px-lg-5 px-md-5 pb-lg-5 pb-md-5 pb-sm-0 subtitle-white-container">{{ subtitle }}</p>
        </b-row>
        <b-row class="mt-0 pb-3 px-sm-3 px-md-5 px-lg-5 auto-padding">
            <slot></slot>
        </b-row>
        <b-row v-if="buttonprops" class="button-parent mx-auto">
            <purpleButton :buttonprops="buttonprops" class="main-button mb-5 mt-4"></purpleButton>
        </b-row>
    </b-container>

</template>

<script>
import purpleButton from './PurpleButton.vue'
export default {
    props: ['title', 'subtitle', 'refresh', 'buttonprops'],
    components: {
        purpleButton,
    }
}
</script>

<style scoped>
.true-white-container {
    background: white;
    min-height: 600px;
    border-radius: 10px;
}
.title-white-container { 
    color: #111;
    font-size: 24px;
    font-style: normal;
    font-weight: 800;
    /* border: 1px solid red; */
}
.subtitle-white-container {
    color: #000;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 26px;

}

.refresh {
    color: var(--text-normal-2, #474A57);
    font-feature-settings: 'clig' off, 'liga' off;

    /* Label / Medium Label */
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px; /* 142.857% */
    padding: 43px 76px 0 0;
}

span > span:nth-child(1) {
    padding: 0 8px;
}

.auto-padding {
    padding-left: 5px;
    padding-right: 5px;
}
</style>
<style lang="sass" scoped src="@/assets/css/essayWriting.sass"></style>
