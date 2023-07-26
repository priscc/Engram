<template>
    <div class="section-container fontist">
        <div v-for="point in points.points" :key="point.body">
            <h1>
                {{ point.title }}
            </h1>
            <p>
                {{ point.body }}
            </p>
        </div>
    </div>
</template>

<script>
export default {
    props: ['points']
}
</script>

<style scoped>
.section-container {
    padding: 30px;
    white-space: pre-wrap;
}

h1 {
    color: #111;
    font-size: 14px;
    font-style: normal;
    font-weight: 800;
    line-height: 22px; /* 157.143% */
}

p {
    color: var(--text-normal, #18191F);
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px; /* 183.333% */
}

div > div {
    padding-bottom: 30px;
}
</style>
<style lang="sass" scoped src="@/assets/css/essayWriting.sass"></style>
