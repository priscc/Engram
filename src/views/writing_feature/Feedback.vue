<template>
    <div id="essay-writing">
        <b-container fluid class="background">
            <b-row class="pt-4 px-4">
                <breadcrumb :items="items"></breadcrumb>
            </b-row>
            <b-row class="px-4 pb-3 pt-2 title">
                <a class="strip back-button-style mx-3 mx-sm-5 mx-smd-5 mx-lg-5 mt-3" @click="handleBack()">Edit Essay</a>
                <h1 class="text-center prompt-title">
                    Feedback on Your Essay
                </h1>
                <a class="strip back-button-style-right mx-3 mx-sm-5 mx-smd-5 mx-lg-5 mt-3" @click="handleBack()">Back to Modules</a>
            </b-row>
            <b-row class="px-4 white-container">
                <essayhead :prompt="exersize.prompt" :score="65"></essayhead>
                <!-- <progressvue :section="currentSection" class="my-4"></progressvue> -->
                <!-- <essayarea :props="exersize" @updateProgress="(section) => handleUpdate(section)"></essayarea> -->
                <sectionfeedback class="mt-3"></sectionfeedback>
            </b-row>
        </b-container>
    </div>
</template>

<script>
// import whitecontainer from '../../components/writing_feature/WhiteContainer.vue'
import breadcrumb from '../../components/writing_feature/BreadCrumb.vue';
// import essayarea from '../../components/writing_feature/LEQEssay/EssayArea.vue';
// import progressvue from '../../components/writing_feature/LEQEssay/Progress.vue';
import essayhead from '../../components/writing_feature/LEQEssay/EssayHead.vue';
// import purplebutton from '../../components/writing_feature/PurpleButton.vue'
// import { useStore } from 'vuex'
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import storeWriting from '../../store/writing';
import sectionfeedback from '../../components/writing_feature/SectionFeedback.vue';
export default {
    components: {
        // whitecontainer, 
        breadcrumb, 
        // essayarea,
        // progressvue,
        essayhead,
        // purplebutton,
        sectionfeedback,
    },
    setup() {
        //ROUTE && FEEDBACK OBJECT ID
        const route = useRoute();
        const store = storeWriting;
        console.log(store.state.feedback);
        var id = ref(null);
        if (route.params.id === 'sample') {
            id.value = route.params.id
        } else {
            id = computed(() => store.state.uniqueId);
        };
        console.log('id', id.value)

        //REFS && CONSTANTS
        const variable = ref(null);
        const prompt_id = ref(null);
        const exersize = computed(()=>store.getters.findPrompt(prompt_id.value));
        const items = [
            {
                text: 'Essay Writing: LEQ',
            }, 
            {
                text: 'Choose a Prompt',
            }, 
            {
                text: 'LEQ Essay', 
            }, 
            {
                text: 'Feedback', 
                active: 'yes!'
            }
        ]
        const buttonprops = ref({content: "Get Started", route: 'SelectModule', disabled: false})

        //ACCESSING FEEDBACK OBJECT, for future database implementation 
        const initialize = async () => {
            const feedback = await store.getters.findFeedback(id.value);
            if (feedback === 202) {
                //push to a page not found 
            } else {
                variable.value = feedback.great_statement;
                prompt_id.value = feedback.prompt_id;
                console.log('initialized', prompt_id.value, exersize.value);
            }
        }

        initialize();

        //CALCULATING SCORE AND FEEDBACK 
        
        return { items, buttonprops, exersize, variable}
    }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@700&display=swap');

</style>
<style lang="sass" scoped src="@/assets/css/essayWriting.sass"></style>