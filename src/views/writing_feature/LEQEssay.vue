<template>
<div id="essay-writing">
    <b-container fluid class="background">
        <b-row class="pt-4 px-4">
            <breadcrumb :items="items"></breadcrumb>
        </b-row>
        <b-row class="px-4 pb-4 pt-2 title">
            LEQ
        </b-row>
        <b-row class="px-4 white-container">
            <essayhead :prompt="exersize.prompt"></essayhead>
            <progressvue :section="currentSection" class="my-4"></progressvue>
            <essayarea :props="exersize" @updateProgress="(section) => handleUpdate(section)"></essayarea>
        </b-row>
    </b-container>
</div>
</template>

<script>
// import whitecontainer from '../../components/writing_feature/WhiteContainer.vue'
import breadcrumb from '../../components/writing_feature/BreadCrumb.vue';
import essayarea from '../../components/writing_feature/LEQEssay/EssayArea.vue';
import progressvue from '../../components/writing_feature/LEQEssay/Progress.vue';
import essayhead from '../../components/writing_feature/LEQEssay/EssayHead.vue';
// import purplebutton from '../../components/writing_feature/PurpleButton.vue'
// import { useStore } from 'vuex'
// import storeWriting from '@/store/writing.js'
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import storeWriting from '../../store/writing';
export default {
    components: {
        // whitecontainer, 
        breadcrumb, 
        essayarea,
        progressvue,
        essayhead,
        // purplebutton,
    },
    setup() {
        // const router = useRouter()
        const route = useRoute();
        const store = storeWriting;
        const id = route.params.id;
        const exersize = store.getters.findPrompt(id);
        console.log(id, exersize);
        const items = [
            {
                text: 'Essay Writing: LEQ',
            }, 
            {
                text: 'Choose a Prompt',
            }, 
            {
                text: 'LEQ Essay', 
                active: 'yes!'
            }
        ]

        const buttonprops = ref({content: "Get Started", route: 'SelectModule', disabled: false})
        const currentSection = ref(null)
        const handleUpdate = (section) => {
            currentSection.value = section;
            // console.log('handled!', section)
        } 
        return { items, buttonprops, exersize, handleUpdate, currentSection}
    }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@700&display=swap');

</style>
<style lang="sass" scoped src="@/assets/css/essayWriting.sass"></style>
