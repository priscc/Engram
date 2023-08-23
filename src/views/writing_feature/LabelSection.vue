<template>
  <div style="white-space: pre-line;">
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
            <div class="essay-area mx-1 mt-4">
              <div ref="doc" id="essayArea" class="p-5 mt-4" style="position: relative;" @mouseup="handleHighlight" @mousedown="checkHighlight" @click="handleClick">
              {{ feedback.content.raw.text || "Error" }}
                <div class="toolbar unselectable test" ref="invisible" id="toolbar">
                  <toolbarvue @clickLabel="(label) => handleClickLabel(label)"></toolbarvue>
                </div>
              </div>
              <b-row align-h="end" class="px-5 pt-5 pb-3">
                <b-button @click="parseUserSelections" id="purple" class="finish-button border-0 mb-2" type="button">Submit</b-button>
              </b-row>
          </div>
        </b-row>
    </b-container>
    <!-- <b-button @click="parseUserSelections">Parse</b-button> -->
</div>
  </div>
</template>

<script>
import essayhead from '../../components/writing_feature/LEQEssay/EssayHead.vue';
import breadcrumb from '../../components/writing_feature/BreadCrumb.vue';
import { ref, onMounted, computed } from 'vue';
import storeWriting from '../../store/writing';
import toolbarvue from '../../components/writing_feature/Toolbar.vue';
import { useRouter } from 'vue-router';
export default {
  components: {
    essayhead,
    breadcrumb,
    toolbarvue
  },
    setup() {
      //
      const router = useRouter();
        const store = storeWriting;

        //DOM MANIPULATION REFS
        const doc = ref(null);
        const range = ref(null)
        const invisible = ref(null)
        const preserve = ref(null);
        const selectionNode = ref(null);
        
        //USER WRITING REFS

        //NOTE! check if all sections are present in labels via className to prevent user manipulation with inspect element
        const parseUserSelections = () => {
          console.log("check")
          var thesis, conclusion, contextualization = null;
          var evidence = [{}];
          doc.value.childNodes.forEach(elem => {
            if(elem.className === "Thesis") {
              console.log(elem.innerText);
              thesis = elem.innerText;
            } else if (elem.className === "Conclusion") {
              console.log(elem.innerText);
              conclusion = elem.innerText;
            } else if (elem.className === "Contextualization") {
              console.log(elem.innerText);
              contextualization = elem.innerText;
            } else if (elem.className === "Evidence") {
              console.log(elem.innerText);
              if (evidence[evidence.length - 1].evidence) {
                evidence.push({evidence: elem.innerText});
              } else {
                evidence[evidence.length - 1].evidence = elem.innerText;
              }
            } else if (elem.className === "Analysis") {
              console.log(elem.innerText);
              evidence[evidence.length - 1].analysis += elem.innerText;
            }   
          }); 
          for (var i in evidence) {
            evidence[i] = [evidence[i].evidence, evidence[i].analysis];
          }
          const idea = {
            prompt_id: feedback.value.prompt_id, //ID to identify prompt
            id: store.getters.getUniqueId, //Unique ID assigned to new feedback obj (to be replaced by firestore id's)
            moduleVersion: "Timed", //For segregating beginner and advanced modules

            //User input -- analysis is wrapped within the evidence obj
            contextualization: contextualization,
            evidence: evidence,
            conclusion: conclusion,
            thesis: thesis
            }
            console.log("checkpoint");
            store.dispatch('setUserInput', idea);
            store.dispatch('setModuleVersion', "Timed");
            console.log('handled submit in labelled',store.state.feedback, store.state.completedPrompts);
            router.push({name: "004", params: {id: "user"}})
        }
        const handleClickLabel = (label) => {
          if (selectionNode.value) {
            selectionNode.value.style.background = label[0];
            selectionNode.value.setAttribute("class", label[1])
            selectionNode.value = null;
            invisible.value.parentNode.removeChild(invisible.value)
          }
        }

        const handleClick = (event) => {
          if (event.target.id === "background-editable") {
            event.target.replaceWith(...event.target.childNodes);
          }
        }
        const createTooltip = (selected, toolbar) => {
          selected.collapse(false);
          selected.insertNode(toolbar);
          const coor = toolbar.getBoundingClientRect();
          var x = coor.right
          console.log("home:", x, "leftover:", screen.width)
          if ((x + 55) > window.innerWidth) {
            toolbar.style.marginLeft = `${-60 - (x - window.innerWidth + 80)}px`
          } else {
            toolbar.style.marginLeft = "-55px"
          }
          console.log("parent?", toolbar.parentNode)
          // toolbar.style.display = "inline-block";
          toolbar.style.zIndex = "10";
        };

        //NOTE: depreciated, br not relevant 
        const recursion = (elem) => {
          var string = ""
          elem.childNodes.forEach(element => {
            if (element.nodeName === "BR"){
              string += "<br />";
              console.log("does it ever happen?")
            } else {
              if (element.childNodes.length > 0) {
                string += recursion(element);
              } else {
                string += element.textContent;
              }
            }
          })
          return string
        }

        const removeHighlight = (toolbar) => {
          if (selectionNode.value) {
            console.log("parent2?", toolbar.parentNode)
            toolbar.style.marginLeft = "-55px"
            toolbar.parentNode.removeChild(toolbar)
            selectionNode.value.replaceWith(...selectionNode.value.childNodes);
            selectionNode.value = null;
          }
          // toolbar.style.display = "none";
          // toolbar.style.zIndex = "-1";
        }

        const checkHighlight = (event) => {
          if (event.target.id !== "toolbar" && selectionNode.value) {
            removeHighlight(invisible.value)
          }
        }
        const preserveNewLines = (elem) => {
          var highlight = document.createElement("span")
          highlight.setAttribute("style", "background-color: pink;position: relative;border-radius: 5px;-moz-user-select: -moz-none;-khtml-user-select: none;-webkit-user-select: none;-o-user-select: none;user-select: none;");
          highlight.id = "background-editable"
            highlight.innerHTML += recursion(elem)
          return highlight
        }

        const handleHighlight = (event) => {
            const selection = window.getSelection()
            if (!selection.toString().trim()) {
              if (event.target.id !== "toolbar" && event.target.parentNode.id !=="toolbar") {
                console.log('Selected nothing else ');
                removeHighlight(invisible.value)
              }
            } else {
              console.log('recieved selection');

              range.value = selection.getRangeAt(0);
              console.log(range.value.startContainer)
              if (range.value.startContainer.parentNode.id === "essayArea") {
                const fallout = range.value.extractContents();
                selectionNode.value = (preserveNewLines(fallout));
                
                range.value.insertNode(selectionNode.value);
                createTooltip(range.value, invisible.value)
                selection.removeAllRanges()
              }
            }
        }
        const handleText = () => {
          console.log(preserve.value)
        }
        onMounted(() => {
            window.scrollTo({ top: 0, behavior: "smooth"});
            // const exersize = store.getters.findPrompt({id: store.state.uniqueId, version: "Timed"});
            // console.log("accessing in labelled section:", exersize, "payload:", {id: store.state.uniqueId, version: "Timed"});
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

        // const prompt_id = ref('sample');
        console.log({id: store.state.uniqueId, version: "Timed"})
        const feedback = computed(()=>store.getters.findFeedback({id: store.state.uniqueId, version: "Timed"}));
        const exersize = computed(()=>store.getters.findPrompt({id: feedback.value.prompt_id, version: 'Timed'}));
        console.log(feedback,exersize);
       
        return {doc, handleHighlight, preserve, handleText, items, exersize, feedback, invisible, checkHighlight, 
          handleClickLabel, handleClick, parseUserSelections}
    }
}
</script>

<style scoped>
span, p {
  white-space: pre-line;
}
.toolbar {
  position:absolute;
  display: inline-block;
  width: fit-content;
  z-index: -1;
  margin-top: -60px;
  margin-left: -55px;
}

.unselectable {
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -o-user-select: none;
    user-select: none;
}
</style>
<style lang="sass" scoped src="@/assets/css/essayWriting.sass"></style>