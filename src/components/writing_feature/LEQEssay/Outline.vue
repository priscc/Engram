<template>
    <div class="accordion essay-area" role="tablist">
        <b-card no-body class="border-0">
        <b-card-header header-tag="header" class="essay-area border-0 outline-accordion text-center position-relative" role="tab" v-b-toggle.accordion-1>
            Outline
            <img class="when-closed chevron-accord" :src="require('../../../assets/writing_feature/chevron-down-gray.svg')" alt="Icon">
            <img class="when-open chevron-accord" :src="require('../../../assets/writing_feature/chevron-up-gray.svg')" alt="Icon">
        </b-card-header>
        <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel">
            <b-card-body>
                <b-textarea class="textbox-border textbox mx-auto py-4 px-5 mb-2" max-rows="12" rows="8" v-model="outline"></b-textarea>
            </b-card-body>
        </b-collapse>
        </b-card>
    </div>
</template>

<script>
import { ref, watch } from 'vue'
export default {
    props: ['totalEmits', 'outlineText'],
    emits: ['TimedOutline'],
    setup(props, {emit}) {
        const outline = ref(props.outlineText);
        watch(() => props.totalEmits, (newEmit) => {
            console.log(newEmit)
            if (newEmit === 1) {
                emit('TimedOutline', outline.value)
            }
        }, {deep: true})

        return {outline}
    }
}
</script>

<style scoped>
.outline-accordion {
    height: 87px;
    padding-top:25px;
    color: var(--text-subtle, #969BAB);
    font-feature-settings: 'liga' off;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
}
.chevron-accord {
    position:absolute;
    right: 20px;
    margin-top: -3px;
}
.textbox {
    max-width: 948px;
}
</style>
<style lang="sass" scoped src="@/assets/css/essayWriting.sass"></style>