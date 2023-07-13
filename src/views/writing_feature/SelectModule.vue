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
            <whitecontainer :title="title" :subtitle="subtitle">
                <b-container class="py-auto">
                    <b-row class="h-100" align-h="center" align-v="center">
                        <b-col v-for="modules in moduleses" :key="modules.name" sm="auto" md="auto" lg="auto">
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
// import purplebutton from '../../components/writing_feature/PurpleButton.vue'
export default {
    components: {
        whitecontainer, 
        breadcrumb, 
        // purplebutton,
    },
    setup() {
        const items = [
            {
                text: 'Essay Writing',
            }, 
            {
                text: 'Select a Module',
                active: 'true'
            },
        ]

        const moduleses = [{}]

        const title = "Learning & Practice Module for your writing skills"
        const subtitle = "Each module will improve your LEQ writing skills."
        return { items, moduleses, title, subtitle}
    }
}
</script>

<style lang="sass" scoped src="@/assets/css/essayWriting.sass"></style>
