<template>
    <div>
        <div>
            <span class="prompt-subtitle">Essay Type:&nbsp;</span>
            <span class="subtitle-body"><b>{{ prompt.type }}</b></span>
        </div>
        <div>
            <span class="prompt-subtitle">Period:&nbsp;</span>
            <span class="subtitle-body">{{ prompt.period }}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: ["prompt"]
}
</script>

<style scoped>
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
</style>