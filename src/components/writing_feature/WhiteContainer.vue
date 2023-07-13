<template>

    <b-container fluid class="true-white-container">
        <b-row>
                <p class="pt-4 px-5 mb-0 title-white-container">{{ title }}</p>
                <p class="px-5 pb-5 mb-0 subtitle-white-container">{{ subtitle }}</p>
        </b-row>
        <b-row class="h-100 mt-0 px-5 pb-3">
            <slot></slot>
        </b-row>
    </b-container>

</template>

<script>
export default {
    props: ['title', 'subtitle'],
}
</script>

<style scoped>
.true-white-container {
    background: white;
    min-height: 600px;
    border-radius: 10px;
    min-width: 700px;
}
.title-white-container { 
    color: #111;
    font-size: 24px;
    font-style: normal;
    font-weight: 800;
    line-height: 64px;
}
.subtitle-white-container {
    color: #000;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 26px;

}

</style>