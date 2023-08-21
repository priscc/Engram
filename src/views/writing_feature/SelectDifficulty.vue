<template>
  <div id="essay-writing">
    <b-container fluid class="background">
        <b-row class="pt-4 px-4">
            <breadcrumb :items="items"></breadcrumb>
        </b-row>
        <b-row class="px-4 pb-4 pt-2 title">
            Select a Module
        </b-row>
        <b-row class="px-4 white-container">
            <whitecontainer :title="title" :subtitle="subtitle" id="module-white-container">
                <b-container>
                    <b-row class="justify-content-sm-center justify-content-md-between justify-content-lg-between">
                        <b-col v-for="modules in moduleses" :key="modules.name" sm="12" md="6" class="mx-auto module-column py-4 module-container">
                            <modules :modules="modules"></modules>
                        </b-col>
                    </b-row>
                </b-container>
            </whitecontainer>
        </b-row>
    </b-container>
  </div>
</template>

<script>
import whitecontainer from '../../components/writing_feature/WhiteContainer.vue'
import breadcrumb from '../../components/writing_feature/BreadCrumb.vue'
import modules from '../../components/writing_feature/Modules.vue'
export default {
    components: {
        whitecontainer, 
        breadcrumb, 
        modules,
    },
    setup() {
        const items = [
            {
                text: 'Essay Writing',
            }, 
            {
                text: 'Select a Module',
            },
            {
                text: 'Choose a Level of Difficulty',
                active: 'reallyVeryTrue'
            }
        ]

        const moduleses = [
            {
                img: 'ModuleIcon3.svg', 
                title: 'For Beginner',
                points: ['Step by step tips on each section', 'No time restriction'], 
                button: {content: "Practice Beginner Mode", route: 'SelectModule'}
            }, 
            {
                img: 'ModuleIcon2.svg', 
                title: 'For Advance Learner',
                points: ['Real Exam Format', '45 Minute Time Restriction'],
                button: {content: "Practice Advance Mode", route: 'SelectModule'}
            }
        ]

        const title = "Choose your level of difficulty"
        const subtitle = "Master the long essay questions of AP World History exam with practice and review. "
        return { items, moduleses, title, subtitle}
    }
}
</script>

<style lang="sass" scoped src="@/assets/css/essayWriting.sass"></style>
