<template>
    <div>
        <b-card
        id="modulev2"
        class="border-0"
        >
            <b-row class="" :class="{ 'modulev2-try-it': modules.name === 'try-it',  'modulev2-timed': modules.name === 'timed', 'modulev2-template': modules.name === 'template'}" align-h="center" align-v="center">
                <!-- <b-col v-if="modules.name === 'template'" style="border: 1px solid green; max-width: 55px; min-width: 0;" sm="0">
                </b-col> -->
                <b-col :cols="modules.orientation" class="module-gutter">
                    <b-card-img :src="require('../../assets/writing_feature/' + modules.img + '')" alt="Image" id="icons" height="90" width="90"></b-card-img>
                </b-col>
                <b-col :cols="modules.orientation" class="module-gutter">
                    <b-card-title v-if="modules.title" class="module-title py-2">
                        {{ modules.title }} <br>
                        <a v-if="modules.time" class="module-time">
                            {{modules.time}}
                        </a>
                    </b-card-title>

                    <b-card-text class="module-description">
                        <div class="point text-left mx-auto">
                            <a v-for="point in modules.points" :key="point">
                                <b>✓ </b>{{ point }}<br>
                            </a>
                        </div>
                    </b-card-text>
                </b-col>
                <!-- <b-col v-if="modules.name === 'template'" style="border: 1px solid green; max-width: 55px;">
                </b-col> -->
                <b-col :cols="modules.orientation" class="module-gutter" :class="{'button-template ms-lg-5' : modules.name === 'template', 'button-try-it' : modules.name === 'try-it'}">
                    <div class="w-100 text-center module-button-parent mx-auto">
                        <purplebutton :buttonprops="modules.button" class="button"></purplebutton>
                    </div>
                </b-col>
            </b-row>
        </b-card>
    </div>
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

<style scoped>
#modulev2 {
    /* max-width: 539px; */
    background: #F5F5F5;
    text-align: left;
    padding-top: 19px;
}
.modulev2-try-it {
    width: 279px;
    min-height: 313px;
}

.modulev2-timed {
    width: 401px;
    min-height: 247px;
}
.modulev2-template {
    max-width: 1114px;
    min-height: 184px;
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
    color: var(--text-normal, #18191F);
    font-feature-settings: 'liga' off;
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
    width:100%;
}

.button-template {
    min-width: 357px;
}

.button-try-it {
    max-width: 212px;
}

.module-button-parent {
    max-width:357px;
    margin: 0 30px 0 30px;
}

.col {
    border: 1px solid green;
}

.module-gutter {
    padding-bottom:19px;
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