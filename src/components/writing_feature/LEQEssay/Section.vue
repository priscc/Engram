<template>
    <div class="section-container fontist">
        <div v-for="point in points.points" :key="point.body">
            <h1>
                {{ point.title }}
            </h1>
            <p v-if="point.html" v-html="point.body"></p>
            <p v-if="point.style === 'bulleted'" class="">
                <ul class="m-0 ps-3">
                    <li v-for="body in point.body" :key="body" class="">
                        {{ body }}
                    </li>
                </ul>
            </p>
            <p v-if="point.style === 'quoted'" class="mt-3">
                <span class="quoted">
                    {{ point.body }}
                </span>
            </p>
            <p v-if="point.style === 'normal'">
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
div > div:last-child {
    padding-bottom: 15px;
}
.quoted {
    color: var(--text-normal, #18191F);
    font-size: 10px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px; /* 220% */
}
.quoted::before {
    content: '“'
}
.quoted::after {
    content: '”'
}
</style>
<style lang="sass" scoped src="@/assets/css/essayWriting.sass"></style>
