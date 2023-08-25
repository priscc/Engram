<template>
  <div id="essay-writing">
    <navbarvue style="position: absolute; top: 0; width: 100%;"></navbarvue>
    <b-container fluid class="background">
        <b-row class="pt-4 responsive-padding">
            <breadcrumb :items="items"></breadcrumb>
        </b-row>
        <b-row class="px-4 pb-3 pt-2 title" style="position:relative">
            <a class="strip back-button-style mx-3 mx-sm-5 mx-smd-5 mx-lg-5 mt-3" @click="handleBack()">Back</a>
            <h1 class="text-center prompt-title moderate-padding">
                Choose a Prompt
            </h1>
        </b-row>
        <b-row class="px-4 white-container responsive-padding mx-0 mx-sm-4 mx-md-4 mx-lg-4">
            <whitecontainer :refresh="true" :buttonprops="buttonprops" id="module-white-container">
                <template>
                    <prompt v-for="prompt in prompts" :key="prompt.prompt" :prompt="prompt" class="prompt" id="prompt" :hover="true" :class="{'active' : currentPrompt === prompt.id}"></prompt>
                </template>
            </whitecontainer>
        </b-row>
    </b-container>
  </div>
</template>

<script>
import whitecontainer from '../../components/writing_feature/WhiteContainer.vue'
import breadcrumb from '../../components/writing_feature/BreadCrumb.vue'
import prompt from '../../components/writing_feature/Prompt.vue'
import storeWriting from '@/store/writing.js'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
export default {
    components: {
        whitecontainer, 
        breadcrumb, 
        prompt,
    },
    setup() {
        const router = useRouter();
        const route = useRoute();
        if (!['Beginners', 'Advanced', 'Timed'].includes(route.params.module)) {
            router.push({name: '001'});
        }
        const store = storeWriting;
        onMounted(() => {
            store.dispatch('unSetSelectedPrompt');
            window.scrollTo({top: 0, behavior: "smooth"});
        });
        const canClick = computed(() => store.state.selectedPrompt === null)
        const currentPrompt = computed(() => store.state.selectedPrompt)
        const prompts = computed(() => store.state.prompts.slice(0, 3))
        const items = [
            {
                text: 'Essay Writing: LEQ',
            },
            {
                text: 'Essay Component Module: Beginner'
            }, 
            {
                text: 'Choose a Prompt',
                active: 'yes'
            }
        ]
        const title = "Choose a Prompt"
        const subtitle = "Choose one of three long essay question prompts to answer. The long essay requires students to demonstrate their ability to use historical evidence in writing a thoughtful historical argument. In the following questions, students will analyze an issue using the reasoning skill of continuity and change over time."
        const buttonprops = ref({content: "Get Started", route: '003', disabled: canClick, params: {id : currentPrompt, module: route.params.module}})

        const handleBack = () => {
            router.push({name: '001'});
        }
        return { items, title, subtitle, prompts, buttonprops, currentPrompt, handleBack}
    }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@700&display=swap');
.active {
    opacity:1;
}
#module-white-container {
    padding-bottom: 0px;
}

.prompt {
    transition: 0.1s;
}
.prompt:nth-child(1) {
    background: var(--accent-blue-1, rgb(202, 226, 241, 0.50));
}
.prompt:nth-child(2) {
    background: var(--accent-green-1, rgba(204, 235, 165, 0.50));
    margin: 15px 0;
}
.prompt:nth-child(3) {
    background: var(--accent-yellow-1, rgba(245, 235, 187, 0.50));

}

.prompt:nth-child(1).active,
.prompt:nth-child(1):hover {
    background: var(--dark-accent-blue, #85CDF9);
}

.prompt:nth-child(2).active,
.prompt:nth-child(2):hover {
    background: var(--dark-accent-green, #9BD84F);
}

.prompt:nth-child(3).active,
.prompt:nth-child(3):hover {
    background: var(--dark-accent-yellow, #F5E07B);
}

.prompt.active, .prompt:hover {
    color: white;
}
.back-button-style {
    position: absolute;
    left:0;
    width: fit-content;
    color: var(--brand-purple, #8C30F5);
    font-feature-settings: 'clig' off, 'liga' off;

    /* Label / Medium Label */
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px; /* 142.857% */
    cursor: pointer;
}
.back-button-style::before{
    content: url('../../assets/writing_feature/chevron-left.svg') !important;
    position: relative;
    top: 5px;
    right: 5px;
}
</style>
<style lang="sass" scoped src="@/assets/css/essayWriting.sass"></style>
