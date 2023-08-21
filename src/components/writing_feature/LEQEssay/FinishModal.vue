<template>
  <b-card class="border-0 text-center finish-modal fontist pb-5">
    <b-icon-x class="x" @click.native="$emit('close')"></b-icon-x>
    <div>
        <img :src="require('../../../assets/writing_feature/books.gif')" alt="Image" height="163">
    </div>
    <b-card-title class="finish-title pb-2"> Great Job! </b-card-title>
    <b-card-text class="finish-subtitle">You’ve successfully written your first essay.</b-card-text>
    <b-card-text>
        <span class="share-text">Share</span>
        <span>
            <b-icon-facebook class="share-icon"></b-icon-facebook>
            <b-icon-facebook class="share-icon"></b-icon-facebook>
            <b-icon-facebook class="share-icon"></b-icon-facebook>
            <b-icon-facebook class="share-icon"></b-icon-facebook>
        </span>
    </b-card-text>
    <hr class="line-break">
    <b-card-text class="finish-subtitle button-header my-4 py-3">Want to keep studying?</b-card-text>
    <b-button id="finish-button" class="me-md-3 me-lg-3 me-sm-0 border-0 mb-1" @click="router.push({name:'001'})">Practice Another Essay</b-button>
    <b-button id="finish-button" class="border-0 mb-1" @click="router.push({name:'004', params: {id: 'user'}})" :disabled="!ready">Feedback</b-button>
  </b-card>
</template>

<script>
// import { onMounted } from 'vue';
import { useRouter } from 'vue-router'
// import storeWriting from '../../../store/writing';
export default {
    props: ['ready'],
    emits: ['close'],
    setup(props) {
        // const store = storeWriting;
        const router = useRouter();
        console.log(props.ready);
        return { router }
    }
}
</script>

<style>
.finish-modal {
    position: relative;
}
.finish-title {
    color: #8C30F5;
    text-align: center;
    font-size: 28px;
    font-style: normal;
    font-weight: 800;
    line-height: 32px; /* 114.286% */
}

.finish-subtitle {
    color: #040404;
    text-align: center;
    font-feature-settings: 'liga' off;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px; /* 133.333% */
}

.x {
    position:absolute;
    right:0;
    top:0;
    font-size: 25px;
    margin: 10px 10px 0 0;
    z-index: 100;
    cursor: pointer;
}
.share-icon {
    margin: 0 8px 5px 8px;
}

.share-text {
    color: var(--text-normal, #18191F);
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px; /* 150% */
    margin-right: 5px;
}

#finish-button {
    border-radius: 8px;
    background: var(--brand-purple, #8C30F5);
    color: var(--default-white, #FFF);
    text-align: center;
    font-feature-settings: 'clig' off, 'liga' off;

    /* Label / Medium Label */
    font-family: Manrope;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px; /* 142.857% */
    padding: 10px 15px;
}
#finish-button:hover {
    background: #F1E4FF;
    color: #451A75;
    font-weight: 700 ;
}
.line-break {
    max-width: 400px;
    margin: auto;
}
</style>
<style lang="sass" scoped src="@/assets/css/essayWriting.sass"></style>