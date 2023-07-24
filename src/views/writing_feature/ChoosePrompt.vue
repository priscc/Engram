<template>
  <div id="essay-writing">
    <b-container fluid class="background">
        <b-row class="pt-4 px-4">
            <breadcrumb :items="items"></breadcrumb>
        </b-row>
        <b-row class="px-4 pb-4 pt-2 title">
            Section Module: Beginners {{ currentPrompt }}
        </b-row>
        <b-row class="px-4 white-container">
            <whitecontainer :title="title" :subtitle="subtitle" :refresh="true" :buttonprops="buttonprops" id="module-white-container">
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
// import purplebutton from '../../components/writing_feature/PurpleButton.vue'
// import { useStore } from 'vuex'
import storeWriting from '@/store/writing.js'
import { computed, ref } from 'vue'
export default {
    components: {
        whitecontainer, 
        breadcrumb, 
        // purplebutton,
        prompt
    },
    setup() {
        const canClick = computed(() => store.state.selectedPrompt === null)
        const currentPrompt = computed(() => store.state.selectedPrompt)
        const store = storeWriting
        const prompts = computed(() => store.state.prompts)
        const items = [
            {
                text: 'Essay Writing: LEQ',
            }, 
            {
                text: 'Choose a Prompt',
                active: 'yes'
            }
        ]

        const title = "Choose a Prompt"
        const subtitle = "Choose one of three long essay question prompts to answer. The long essay requires students to demonstrate their ability to use historical evidence in writing a thoughtful historical argument. In the following questions, students will analyze an issue using the reasoning skill of continuity and change over time."
        const buttonprops = ref({content: "Get Started", route: '003', disabled: canClick, params: {id : currentPrompt}})

        return { items, title, subtitle, prompts, buttonprops, currentPrompt}
    }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@700&display=swap');

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
/* #prompt:hover {
  color:white;  
} */
</style>
<style lang="sass" scoped src="@/assets/css/essayWriting.sass"></style>
