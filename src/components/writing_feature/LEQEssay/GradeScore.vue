<template>
    <div class="score-jumbotron">
        <div style="position: relative;" class="">
          <div class="gradient"></div>
          <span class="zero">0</span>
          <span class="sixty-five">65</span>
          <span class="seventy-five">75</span>
          <span class="one-hundred">100</span>
          <span v-if="gradePercent" class="grade-position" :style="{'left' : `${gradePercent}%`}"></span>
        </div>
        <div class="mt-4 pt-2">
            <span class="score-title">Score&nbsp;</span>
            <span v-if="APscore" class="score-title ms-3" style="color: var(--text-gray-900, #18191F);">{{ APscore }}</span>
        </div>
    </div>
</template>

<script>
import { onMounted, ref } from 'vue'
export default {
    props: ["score"],
    setup(props) {
        const gradePercent = ref(null)
        const APscore = ref(null)
        onMounted(() => {
            if (props.score <= 65) {
                gradePercent.value = (props.score / 65) * 30; 
            } else if (props.score <= 75) {
                gradePercent.value = (((props.score - 65) / 10) * 30) + 30; 
            } else if (props.score <= 100) {
                gradePercent.value = (((props.score - 75) / 25) * 33) + 62;
            }

            if (props.score <= 33) {
                APscore.value = 1
            } else if (props.score <= 48) {
                APscore.value = 2
            } else if (props.score <= 61) {
                APscore.value = 3
            } else if (props.score <= 74) {
                APscore.value = 4
            } else {
                APscore.value = 5
            }
        })
        return { gradePercent, APscore }
    }
}
</script>

<style scoped>
.score-title {
    color: #9B51E0;
    font-feature-settings: 'liga' off;
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: 30px; /* 93.75% */
}

.subtitle-body {
    color: var(--text-gray-900, #18191F);
    font-family: Manrope;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
}
.gradient {
    max-width: 318px;
    height: 16px;
    background: linear-gradient(90deg, #EB5757 0%, #F8D840 51.80%, #27AE60 100%);
    border-radius: 30px;
}
.zero, .sixty-five, .seventy-five, .one-hundred {
    color: var(--text-subtle, #969BAB);
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 30px; /* 187.5% */
}
.zero {
    position: absolute;
    top:15px;
}
.sixty-five {
    position: absolute;
    top:15px;
    left: 30%;
}
.seventy-five {
    position: absolute;
    top:15px;
    left: 60%;
}
.one-hundred {
    position: absolute;
    top:15px;
    right:0
}
.grade-position {
    height: 15px;
    width: 15px;
    background-color: #474A57;
    border-radius: 50%;
    position: absolute;
    z-index: 2;
    top:1px;
}
.score-jumbotron {
    /* height: 140px; */
}
</style>
<style lang="sass" scoped src="@/assets/css/essayWriting.sass"></style>