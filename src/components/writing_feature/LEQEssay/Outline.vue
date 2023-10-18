<template>
    <div class="accordion essay-area" role="tablist">
        <div no-body class="border-0">
            <div
                header-tag="header"
                class="essay-area border-0 outline-accordion text-center position-relative"
                role="tab"
                v-b-toggle.accordion-1
            >
                Outline
                <img
                    class="when-closed chevron-accord outline_icon"
                    :src="
                        require('../../../assets/writing_feature/chevron-down-gray.svg')
                    "
                    alt="Icon"
                />
                <img
                    class="when-open chevron-accord outline_icon"
                    :src="
                        require('../../../assets/writing_feature/chevron-up-gray.svg')
                    "
                    alt="Icon"
                />
            </div>
            <b-collapse
                id="accordion-1"
                accordion="my-accordion"
                role="tabpanel"
            >
                <div>
                    <b-textarea
                        class="no-scroll-bar textbox-border textbox mx-auto py-4 p-3 p-sm-5 p-md-5 p-lg-5 mb-5"
                        max-rows="12"
                        rows="8"
                        no-resize
                        v-model="outline"
                    ></b-textarea>
                </div>
            </b-collapse>
        </div>
    </div>
</template>

<script>
import { ref, watch } from "vue";
export default {
    props: ["totalEmits", "outlineText"],
    emits: ["TimedOutline"],
    setup(props, { emit }) {
        const outline = ref(props.outlineText);
        watch(
            () => props.totalEmits,
            (newEmit) => {
                console.log(newEmit);
                if (newEmit === 1) {
                    emit("TimedOutline", outline.value);
                }
            },
            { deep: true },
        );

        return { outline };
    },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&display=swap");
.outline-accordion {
    height: 87px;
    padding-top: 25px;
    color: var(--text-subtle, #969bab);
    font-feature-settings: "liga" off;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
}
.chevron-accord {
    position: absolute;
    right: 20px;
    margin-top: -3px;
}
.textbox {
    max-width: 948px;
    font-family: "Nanum Pen Script", cursive;
    color: var(--text-normal, #18191f);
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 120% */
}
</style>
<style lang="sass" scoped src="@/assets/css/essayWriting.sass"></style>
