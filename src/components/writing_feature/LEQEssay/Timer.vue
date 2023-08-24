<template>
    <div class="my-auto" style="border: 1px solid green; height: min-content;">
        <div class="test text-center my-auto" style="position: relative;">
            <svg class="test" xmlns="http://www.w3.org/2000/svg" width="145" height="145" viewBox="-75 -80 155 150" fill="none">
                <path d="M0 -69 A69 69 0 1 1 0 69 69 69 0 1 1 0 -69" :stroke="currentTime >= maxTime - 10 ? '#8C30F5' : '#D9DBE1'" stroke-width="2"/>
                <path :d="`M0 -69 A69 69 0 ${currentTime > (maxTime / 2) ? 1 : 0} 1 ${endX} ${endY}`" stroke="#8C30F5" stroke-width="2"/>
                <circle cx="100" cy="0" r="5" stroke="#D9DBE1" stroke-width="1"></circle>
                <circle cx="0" cy="100" r="5" stroke="#D9DBE1" stroke-width="1"></circle>
                <circle v-for="landmark in landmarks" :key="landmark" stroke="#D9DBE1" stroke-width="1" fill="#D9DBE1" :class="{'passed-circle' : landmark.value.passed }" :cx="landmark.value.cx" :cy="landmark.value.cy" :r="landmark.value.passed? 8.5 : 6.5"></circle>
            </svg>
            <div class="time">
                {{ currentTimeHoursMinutes }}
            </div>
            <span class="outline" :class="{'passed-indicator' : outline.passed}">
                Outline ({{ 10 * multiplier }} min)
            </span>
            <span class="contextualization" :class="{'passed-indicator' : contextualization.passed}">Contextualization ({{ 3 * multiplier }} min)</span>
            <span class="thesis" :class="{'passed-indicator' : thesis.passed}">Thesis ({{ 5 * multiplier }} min)</span>
            <span class="evidence1" :class="{'passed-indicator' : evidence1.passed}">Evidence #1 / Analysis ({{ 10 * multiplier }} min)</span>
            <span class="evidence2" :class="{'passed-indicator' : evidence2.passed}">Evidence #2 / Analysis ({{ 10 * multiplier }} min)</span>
            <span class="conclusion test" :class="{'passed-indicator' : conclusion.passed}">Conclusion ({{ 5 * multiplier }} min)</span>
            <span class="revisions" :class="{'passed-indicator' : revision.passed}">Revisions ({{ 2 * multiplier }} min)</span>
        </div>
        <div class="test mt-auto my-auto">  
            <b-form-group class="form-border-top">
                <!-- <b-form-checkbox-group
                    v-model="selected"
                    inline
                >  -->
                    <b-row align-h="center" class="g-5">
                        <b-col cols="auto">
                            <b-form-checkbox :disabled="checkboxable" v-model="fiftyPercentMultiplier"> I have 1.5x time {{  }}</b-form-checkbox>
                        </b-col>
                        <b-col cols="auto">
                            <b-form-checkbox :disabled="checkboxable" v-model="hundredPercentMultiplier"> I have 2x time</b-form-checkbox>
                        </b-col>
                    </b-row>
                <!-- </b-form-checkbox-group> -->
            </b-form-group>
        </div>
    </div>
</template>

<script>
import { computed, onMounted, onUnmounted, ref } from 'vue';
export default {
    setup() {
        //Checkbox
        const checkboxable = computed(() => fiftyPercentMultiplier.value || hundredPercentMultiplier.value);
        const fiftyPercentMultiplier = ref(false);
        const hundredPercentMultiplier = ref(false);
        //
        const multiplier = computed(() => {
            return fiftyPercentMultiplier.value ? 1.5 : hundredPercentMultiplier.value ? 2 : 1
        });
        const maxTime = computed( () => 2700 * multiplier.value);
        //NOTE: change current time value to value passed in as prop
        const currentTime = ref(0) ;
        const currentTimeHoursMinutes = computed(() => {
            let countdown = maxTime.value - currentTime.value;
            let hours = Math.floor(countdown / 60);
            let minutes = countdown % 60;
            return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`
        })
        const frac = computed(() => (currentTime.value / maxTime.value) * Math.PI * 2);
        const endX = computed(() => Math.cos(frac.value + (Math.PI * 0.5) ) * -69);
        const endY = computed(() => Math.sin(frac.value + (Math.PI * 0.5) ) * -69);
        console.log(frac, endX, endY);
        // const partition = (frac) => {
        //     let fraction = frac + Math.PI * 2;
        //     return {
        //         endX: Math.cos(fraction + (Math.PI * 0.5) ) * -69, 
        //         endY: Math.sin(fraction + (Math.PI * 0.5) ) * -69
        //     }
        // }
        const outline = computed(() => {
            return {
                passed: true,
                cx: 0,
                cy: -69
            }
        })
        const contextualization = computed(() => {
            return {
                passed: (10 * 60 * multiplier.value) < (currentTime.value),
                cx: Math.cos((((10 * 60 * multiplier.value) / maxTime.value) * Math.PI * 2) + (Math.PI * 0.5) ) * -69,
                cy: Math.sin((((10 * 60 * multiplier.value) / maxTime.value) * Math.PI * 2) + (Math.PI * 0.5) ) * -69
            }
        })
        const thesis = computed(() => {
            return {
                passed: (13 * 60 * multiplier.value) < (currentTime.value),
                cx: Math.cos((((13 * 60 * multiplier.value) / maxTime.value) * Math.PI * 2) + (Math.PI * 0.5) ) * -69,
                cy: Math.sin((((13 * 60 * multiplier.value) / maxTime.value) * Math.PI * 2) + (Math.PI * 0.5) ) * -69
            }
        })
        const evidence1 = computed(() => {
            return {
                passed: (18 * 60 * multiplier.value) < (currentTime.value),
                cx: Math.cos((((18 * 60 * multiplier.value) / maxTime.value) * Math.PI * 2) + (Math.PI * 0.5) ) * -69,
                cy: Math.sin((((18 * 60 * multiplier.value) / maxTime.value) * Math.PI * 2) + (Math.PI * 0.5) ) * -69
            }
        })
        const evidence2 = computed(() => {
            return {
                passed: (28 * 60 * multiplier.value) < (currentTime.value),
                cx: Math.cos((((28 * 60 * multiplier.value) / maxTime.value) * Math.PI * 2) + (Math.PI * 0.5) ) * -69,
                cy: Math.sin((((28 * 60 * multiplier.value) / maxTime.value) * Math.PI * 2) + (Math.PI * 0.5) ) * -69
            }
        })
        const conclusion = computed(() => {
            return {
                passed: (38 * 60 * multiplier.value) < (currentTime.value),
                cx: Math.cos((((38 * 60 * multiplier.value) / maxTime.value) * Math.PI * 2) + (Math.PI * 0.5) ) * -69,
                cy: Math.sin((((38 * 60 * multiplier.value) / maxTime.value) * Math.PI * 2) + (Math.PI * 0.5) ) * -69
            }
        })
        const revision = computed(() => {
            return {
                passed: (43 * 60 * multiplier.value) < (currentTime.value),
                cx: Math.cos((((43 * 60 * multiplier.value) / maxTime.value) * Math.PI * 2) + (Math.PI * 0.5) ) * -69,
                cy: Math.sin((((43 * 60 * multiplier.value) / maxTime.value) * Math.PI * 2) + (Math.PI * 0.5) ) * -69
            }
        })
        // const thesis = computed(() => (13 * multiplier.value) / maxTime.value)
        // const evidence1 = computed(() => (18 * multiplier.value) / maxTime.value)
        // const evidence2 = computed(() => (28 * multiplier.value) / maxTime.value)
        // const conslusion = computed(() => (38 * multiplier.value) / maxTime.value)
        // const revision = computed(() => (43 * multiplier.value) / maxTime.value)
        const landmarks = [outline,contextualization,thesis,evidence1,evidence2,conclusion,revision]
        // for (i in landmarks) {
        //     const coor = partition(landmarks[i])
        //     landmarks[i] = {
        //         fraction: landmarks[i]

        //     }
        // }
        console.log(landmarks)
        const id = ref(null)
        onMounted(() => {
            id.value = setInterval(() => {
                currentTime.value += 1;
                if (currentTime.value >= maxTime.value) {
                    clearInterval(id.value);
                }
            }, 1000);
        });
        onUnmounted(() => {
            clearInterval(id.value);
        });
        return {endX, endY, landmarks, currentTime, maxTime,
            outline, contextualization, thesis, evidence1, 
            evidence2, conclusion, revision, multiplier, currentTimeHoursMinutes,
            checkboxable, fiftyPercentMultiplier, hundredPercentMultiplier
        }
    }
}
</script>

<style scoped>
.passed-indicator {
    color: var(--text-accent, #9B51E0);
}
.passed-circle {
    stroke: #8C30F5;
    fill: #8C30F5;
}
.outline {
    position: absolute;
    top: -5px;
    right: 112px;
}
.contextualization {
    position: absolute;
    top: 55px;
    right: -255px;
}
.thesis {
    position: absolute;
    top: 88px;
    right: -232px;
}
.conclusion {
    position: absolute;
    top: 30px;
    left: 35px;
}
.evidence1 {
    position: absolute;
    top: 128px;
    right: -10px;
}
.evidence2 {
    position: absolute;
    top: 115px;
    left: -23px;
}
.revisions {
    position: absolute;
    top: 0px;
    left: 75px;
}
.time {
    position: absolute;
    top: 65px;
    right: 200px;
    color: #000;
    font-family: Manrope;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 157.143% */
}
span {
    color: var(--text-subtle-2, #D9DBE1);
    text-align: center;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    white-space: nowrap;
}
.form-border-top {
    margin-top:25px;
    padding-top: 5px;
    border-top: 2px solid #EEECEC;
}
</style>
<style lang="scss">
.custom-control .custom-control-label {
    padding-left: 5px;
    color: var(--text-normal, #18191F);
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
}
</style>
<style lang="sass" src="@/assets/css/essayWriting.sass"></style>