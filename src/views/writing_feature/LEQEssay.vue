<template>
<div id="essay-writing">
    <b-container fluid class="background">
        <b-row class="pt-4 px-4">
            <breadcrumb :items="items"></breadcrumb>
        </b-row>
        <b-row class="px-4 pb-3 pt-2 title">
            <a class="strip back-button-style mx-3 mx-sm-5 mx-smd-5 mx-lg-5 mt-3" @click="handleBack()">Back</a>
            <h1 class="text-center prompt-title">
                Long Essay Question
            </h1>
        </b-row>
        <b-row class="px-4 white-container">
            <essayhead :prompt="exersize.prompt"></essayhead>
            <progressvue :section="currentSection" class="my-4"></progressvue>
            <essayarea :props="exersize" :moduleVersion="moduleVersion" :identification="id" @updateProgress="(section) => handleUpdate(section)"></essayarea>
        </b-row>
    </b-container>
</div>
</template>

<script>
import breadcrumb from '../../components/writing_feature/BreadCrumb.vue';
import essayarea from '../../components/writing_feature/LEQEssay/EssayArea.vue';
import progressvue from '../../components/writing_feature/LEQEssay/Progress.vue';
import essayhead from '../../components/writing_feature/LEQEssay/EssayHead.vue';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import storeWriting from '../../store/writing';
export default {
    components: {
        breadcrumb, 
        essayarea,
        progressvue,
        essayhead,
    },
    setup() {
        const router = useRouter();
        const route = useRoute();
        const moduleVersion = route.params.module;
        if (moduleVersion !== 'Beginners' && moduleVersion !== 'Advanced') {
            router.push({name: '001'});
        }
        const store = storeWriting;
        const id = route.params.id;
        const exersize = store.getters.findPrompt({id: id, version: moduleVersion});
        console.log('initial fetch',id, exersize);
        const items = [
            {
                text: 'Essay Writing: LEQ',
            }, 
            {
                text: 'Essay Component Module: Beginner',
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
        } 
        const handleBack = () => {
            router.push({name: '002'});
        }
        onMounted(() => {
            window.scrollTo({ top: 0, behavior: "smooth"});
        })
        return { items, buttonprops, exersize, handleUpdate, currentSection, id, handleBack, moduleVersion}
    }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@700&display=swap');
</style>
<style lang="sass" scoped src="@/assets/css/essayWriting.sass"></style>
