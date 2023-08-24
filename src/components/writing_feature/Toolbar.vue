<template>
  <b-row class="toolbar-contain py-0 px-2 m-0" align-h="between">
    <b-col v-for="(label, index) in labels" :key="label" cols="auto" class="toolbar-center toolbar-hover" id="toolbar" @click="$emit('clickLabel', [label.palette, label.title])">
        <b-img id="toolbar" class="toolbar-circle" alt="Icon" :src="require(`@/assets/writing_feature/Ellipse ${108 + index}.svg`)"></b-img>
        <p class="toolbar-text" :style="{'color' : label.palette.slice(0, 7)}">{{label.title}}</p>
    </b-col>
    <b-img class="polygon" alt="Image" :src="require('@/assets/writing_feature/Polygon 1.svg')"></b-img>
  </b-row>
</template>

<script>
export default {
    setup() {
        const labels = [{
            title : "Contextualization",
            palette: "#CCEBA580"
        }, 
        {
            title:"Thesis",
            palette: "#CAE2F180"
        },
        {
            title: "Evidence",
            palette: "#DCBAE580"
        }, 
        {
            title: "Analysis", 
            palette: "#F5EBBB80"
        }, 
        {
            title:"Conclusion", 
            palette: "#FFC27880"
        }];
        return {labels}
    }
}
</script>

<style scoped>
.toolbar-contain {
    width: 305px;
    height: 48px;
    border-radius: 3px;
    background: var(--text-normal-2, #474A57);
    position: relative;
}

p {
    color: var(--accent-blue, #CAE2F1);
    font-feature-settings: 'liga' off;
    font-family: Manrope;
    font-size: 8px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    padding-top: 3px
}

img {
    display:block;
    margin-left:auto;
    margin-right:auto;
}

.toolbar-center {
    padding: 7px 0 0 0;
}
.toolbar-hover:hover .toolbar-circle{
    transform: scale(1.2);
}
.toolbar-hover:hover .toolbar-text{
    font-weight: 800;
}
.polygon {
    width: 44px;
    height: 44px;
    position: absolute;
    bottom: -30px;
    z-index: 10;
    left: 35px;
}
</style>
<style lang="sass" scoped src="@/assets/css/essayWriting.sass"></style>