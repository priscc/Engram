<template>
    <b-card
    id="step"
    class="border-0"
    >
    <div style="text-align: left;">
        <b-card-img :src="require('../../assets/writing_feature/' + step.img + '')" alt="Image" top id="icons" :height="step.height" :width="step.width"></b-card-img>
    </div>
    <b-card-title class="title">
        {{ step.title }}
    </b-card-title>
        <b-card-text class="description">
            {{ step.description }}
        </b-card-text>
    </b-card>
</template>

<script>
export default {
    props: ['step']
}
</script>

<style scoped>
#step {
    height: 172px;
    width: 257px;
    text-align: left;
}
.title {
    color: var(--text-gray-900, #18191F);
    /* Subtitle / Subtitle 1 */
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 28px;
}

.description {
    color: var(--text-normal, #111);

    /* Body / Body 1 */
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 26px;
}

</style>