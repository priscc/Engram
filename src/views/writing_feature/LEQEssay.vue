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
            <essayarea :props="exersize"></essayarea>
        </b-row>
    </b-container>
</div>
</template>

<script>
// import whitecontainer from '../../components/writing_feature/WhiteContainer.vue'
import breadcrumb from '../../components/writing_feature/BreadCrumb.vue';
import essayarea from '../../components/writing_feature/LEQEssay/EssayArea.vue';
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

        return { items, buttonprops, exersize}
    }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@700&display=swap');

</style>
<style lang="sass" scoped src="@/assets/css/essayWriting.sass"></style>
