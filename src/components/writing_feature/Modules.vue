<template>
    <b-card
    id="module"
    class="py-4 border-0"
    >
    <b-card-img :src="require('../../assets/writing_feature/' + modules.img + '')" alt="Image" top id="icons" height="85" width="85"></b-card-img>
    <b-card-title class="module-title py-2">
        {{ modules.title }}
    </b-card-title>
        <b-card-text class="module-description">
            <div class="point text-left mx-auto">
                <a v-for="point in modules.points" :key="point">
                    <b>✓ </b>{{ point }}<br>
                </a>
            </div>
        </b-card-text>
        <div class="w-100 text-center">
            <purplebutton :buttonprops="modules.button" class="button"></purplebutton>
        </div>
    </b-card>
</template>

<script>
import purplebutton from './PurpleButton.vue'
export default {
    props: ['modules'], 
    components: {
        purplebutton
    }
}
</script>

<style>
#module {
    height: 330px;
    width: 539px;
    border-radius: 8px;
    background: #F5F5F5;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.10);
}

.module-title {
    color: #000;
    text-align: center;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 18px; /* 90% */
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

.point {
    width: fit-content;
}

.button {
    width:357px;
}
</style>