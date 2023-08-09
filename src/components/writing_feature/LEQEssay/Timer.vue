<template>
  <div class="test">
    <svg class="test" xmlns="http://www.w3.org/2000/svg" width="139" height="139" viewBox="-75 -80 155 150" fill="none">
        <path d="M0 -69 A69 69 0 1 1 0 69 69 69 0 1 1 0 -69" :stroke="currentTime >= maxTime - 10 ? '#8C30F5' : '#D9DBE1'" stroke-width="2"/>
        <path :d="`M0 -69 A69 69 0 ${currentTime > (maxTime / 2) ? 1 : 0} 1 ${endX} ${endY}`" stroke="#8C30F5" stroke-width="2"/>
        <!-- <circle cx="0" cy="0" r="5" stroke="#D9DBE1" stroke-width="1"></circle> -->
        <circle cx="100" cy="0" r="5" stroke="#D9DBE1" stroke-width="1"></circle>
        <circle cx="0" cy="100" r="5" stroke="#D9DBE1" stroke-width="1"></circle>
        <circle v-for="landmark in landmarks" :key="landmark" stroke="#D9DBE1" stroke-width="1" :class="{'passed-circle' : landmark.value.passed }" :cx="landmark.value.cx" :cy="landmark.value.cy" :r="landmark.value.passed? 8.5 : 6.5"></circle>
    </svg>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
export default {
    setup() {
        const multiplier = ref(1)
        const maxTime = ref(2700 * multiplier.value)
        const currentTime = ref(2700) 
        
        const frac = computed(() => (currentTime.value / maxTime.value) * Math.PI * 2);
        const endX = computed(() => Math.cos(frac.value + (Math.PI * 0.5) ) * -69);
        const endY = computed(() => Math.sin(frac.value + (Math.PI * 0.5) ) * -69);
        console.log(frac, endX, endY)
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
        return {endX, endY, landmarks, currentTime, maxTime}
    }
}
</script>

<style>
.passed-circle {
    stroke: #8C30F5;
    fill: #8C30F5;
}
</style>
<style lang="sass" src="@/assets/css/essayWriting.sass"></style>