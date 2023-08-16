<template>
  <div style="white-space: pre-line;" ref="doc" @mouseup="handleHighlight">
    <div id="essay-writing" class="min-height">
    <b-container fluid class="background">
        <b-row class="pt-4 responsive-padding">
            <breadcrumb :items="items"></breadcrumb>
        </b-row>
        <b-row class="px-4 pb-3 pt-2 title">
            <a class="strip back-button-style mx-3 mx-sm-5 mx-smd-5 mx-lg-5 mt-3" @click="handleBack()">Back</a>
            <h1 class="text-center prompt-title">
                Long Essay Question
            </h1>
        </b-row>
        <b-row class="px-4 white-container mx-4">
            <essayhead :prompt="exersize.prompt"></essayhead>
        </b-row>
    </b-container>
</div>
  </div>
</template>

<script>
import essayhead from '../../components/writing_feature/LEQEssay/EssayHead.vue';
import breadcrumb from '../../components/writing_feature/BreadCrumb.vue';
import { ref, onMounted, computed } from 'vue';
import storeWriting from '../../store/writing';
export default {
  components: {
    essayhead,
    breadcrumb
  },
    setup() {
        const doc = ref(null);
        const two = ref(null)
        const preserve = ref(null);
        const handleHighlight = () => {
            const one = window.getSelection()
            console.log('recieved selection');
            two.value = one.getRangeAt(0);
            console.log('range got',one.getRangeAt(0));
            var umm = document.createElement("span")
            umm.setAttribute("style", "background-color: pink;");
            let fallout = two.value.extractContents();
            console.log(fallout);
            // let result = "";
            const recursion = (elem) => {
                elem.childNodes.forEach(element => {
                  if (element.nodeName === "BR"){
                    umm.innerHTML += "<br />";
                  } else {
                    if (element.childNodes.length > 0) {
                      recursion(element);
                    } else {
                      umm.innerHTML += element.textContent;
                    }
                  }
                });
            }
            recursion(fallout);
            // umm.innerText =  result
            //fallout.textContent.replaceAll('\\n', '\n')
          
            two.value.insertNode(umm);
            // two.value.surroundContents(umm); 
            // umm.addEventListener('click', (e) => {
            //     console.log(e.target);
            // })
        }
        const handleText = () => {
          console.log(preserve.value)
        }
        onMounted(() => {
            window.scrollTo({ top: 0, behavior: "smooth"});
        })
        const items = [
            {
                text: 'Essay Writing: LEQ',
            }, 
            {
                text: `Essay Component Module: Timed`,
            },
            {
                text: 'Choose a Prompt',
            }, 
            {
                text: 'LEQ Essay', 
                active: 'yes!'
            }
        ]

        const store = storeWriting;
        const prompt_id = ref('sample');
        const exersize = computed(()=>store.getters.findPrompt({id: prompt_id.value, version: 'Timed'}));
        // const initialize = async () => {
        //     const feedback = await store.getters.findFeedback({id: id.value, version: 'Timed'});
        //     if (feedback === 202) {
        //         //push to a page not found 
        //     } else {
        //         console.log('feedback found!', feedback)
        //         prompt_id.value = feedback.prompt_id;
        //     }
        // }
        // initialize();
        return {doc, handleHighlight, two, preserve, handleText, items, exersize}
    }
}
</script>

<style scoped>
span, p {
  white-space: pre-line;
}
</style>