<template>
  <div style="white-space: pre-line;">
    <div id="essay-writing" class="min-height">
      <b-container fluid class="background">
        <b-row class="px-4 pb-2 pt-4 title">
          <b-col>
            <a
              class="strip back-button-style mx-2 mx-sm-4 mx-smd-4 mx-lg-4 p-0"
              @click="handleBack()"
              >Back</a
            >
          </b-col>
        </b-row>
        <b-row class="responsive-padding">
          <breadcrumb :items="items"></breadcrumb>
        </b-row>
        <b-row>
          <b-col>
            <p class="instructions">
              Instructions: Self identify each section so we can assess and
              grade your essay.
            </p>
          </b-col>
        </b-row>
        <b-row
          class="px-1 px-sm-4 px-md-4 px-lg-4 white-container mx-0 mx-sm-4 mx-md-4 mx-lg-4"
        >
          <essayhead :prompt="exersize.prompt" :none="true"></essayhead>
          <div class="essay-area mx-1 mt-4">
            <div
              ref="doc"
              id="essayArea"
              class="p-5 mt-5 mx-auto position-relative labelled-contain"
              style="position: relative;"
              @mouseup="handleHighlight"
              @mousedown="checkHighlight"
              @click="handleClick"
            >
              {{ feedback.content.raw.text || "Text was not submit" }}
              <div class="toolbar unselectable" ref="invisible" id="toolbar">
                <toolbarvue
                  @clickLabel="(label) => handleClickLabel(label)"
                ></toolbarvue>
              </div>
            </div>
            <!-- <b-row align-h="end" class="px-5 pt-5 pb-3">
              <b-button
                @click="parseUserSelections"
                id="purple"
                class="finish-button border-0 mb-2 fontlist purple-button"
                type="button"
                >Submit</b-button
              >
            </b-row> -->
            <b-row
              align-h="end"
              class="pt-5 px-5 pb-5 my-4 mt-5 mt-sm-0 mt-md-0 mt-lg-0"
            >
              <b-button
                class="border-0 mb-1 back-button fontist purple-button"
                @click="handleBack()"
                >Back</b-button
              >
              <b-button
                class="finish-button border-0 mb-1 fontist purple-button"
                @click="parseUserSelections"
                v-b-modal.my-modal
                type="submit"
                >Submit</b-button
              >
              <b-modal id="my-modal" hide-footer hide-header size="lg">
                <finishmodal @close="$bvModal.hide('my-modal')" :ready="true">
                </finishmodal
              ></b-modal>
              <!-- <b-modal id="my-modal" hide-footer hide-header size="lg"
                ><finishmodal
                  @close="$bvModal.hide('my-modal')"
                  :ready="true"
                  :socials="false"
                  :header="'Congratulations!'"
                  :subheader="''"
                  :subtitle="
                    'Continue to self identify each section so we can assess and grade your essay!'
                  "
                  :buttonprops="buttonprops"
                ></finishmodal
              ></b-modal> -->
            </b-row>
          </div>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import essayhead from "../../components/writing_feature/LEQEssay/EssayHead.vue";
import breadcrumb from "../../components/writing_feature/BreadCrumb.vue";
import storeWriting from "../../store/writing";
import toolbarvue from "../../components/writing_feature/Toolbar.vue";
import finishmodal from "@/components/writing_feature/LEQEssay/FinishModal.vue";
export default {
  components: {
    essayhead,
    breadcrumb,
    toolbarvue,
    finishmodal,
  },
  setup() {
    //
    const router = useRouter();
    const store = storeWriting;

    //DOM MANIPULATION REFS
    const doc = ref(null);
    const range = ref(null);
    const invisible = ref(null);
    const preserve = ref(null);
    const selectionNode = ref(null);

    //USER WRITING REFS

    //NOTE! check if all sections are present in labels via className to prevent user manipulation with inspect element
    const parseUserSelections = () => {
      console.log("check");
      var thesis,
        conclusion,
        contextualization = null;
      var evidence = [{}];
      doc.value.childNodes.forEach((elem) => {
        if (elem.className === "Thesis") {
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
            evidence.push({ evidence: elem.innerText });
          } else {
            evidence[evidence.length - 1].evidence = elem.innerText;
          }
        } else if (elem.className === "Analysis") {
          console.log(elem.innerText);
          evidence[evidence.length - 1].analysis =
            evidence[evidence.length - 1].analysis || "" + elem.innerText;
        }
      });
      for (var i in evidence) {
        evidence[i] = [evidence[i].evidence, evidence[i].analysis];
      }
      const idea = {
        prompt_id: feedback.value.prompt_id, //ID to identify prompt
        id: store.getters.getUniqueId, //Unique ID assigned to new feedback obj (to be replaced by firestore id's)
        moduleVersion: "Expert", //For segregating beginner and advanced modules

        //User input -- analysis is wrapped within the evidence obj
        contextualization: contextualization,
        evidence: evidence,
        conclusion: conclusion,
        thesis: thesis,
      };
      console.log("checkpoint");
      store.dispatch("setUserInput", idea);
      store.dispatch("setModuleVersion", "Expert");
      console.log(
        "handled submit in labelled",
        store.state.feedback,
        store.state.completedPrompts,
      );
      // router.push({ name: "004", params: { id: "user" } });
    };
    const handleClickLabel = (label) => {
      if (selectionNode.value) {
        selectionNode.value.style.background = label[0];
        selectionNode.value.style.color = "#00000080";
        selectionNode.value.setAttribute("class", label[1]);
        selectionNode.value = null;
        invisible.value.parentNode.removeChild(invisible.value);
      }
    };

    const handleClick = (event) => {
      if (event.target.id === "background-editable") {
        event.target.replaceWith(...event.target.childNodes);
      }
    };
    const createTooltip = (selected, toolbar, wrap) => {
      selected.collapse(wrap);
      selected.insertNode(toolbar);
      const coor = toolbar.getBoundingClientRect();
      var x = coor.right;
      console.log("home:", x, "leftover:", screen.width);
      if (x + 55 > window.innerWidth) {
        toolbar.style.marginLeft = `${-60 - (x - window.innerWidth + 80)}px`;
      } else {
        toolbar.style.marginLeft = "-55px";
        toolbar.style.float = "right";
      }
      console.log("parent?", toolbar.parentNode);
      // toolbar.style.display = "inline-block";
      toolbar.style.zIndex = "10";
    };

    const recursion = (elem) => {
      var string = "";
      elem.childNodes.forEach((element) => {
        //NOTE: depreciated, br not relevant
        if (element.nodeName === "BR") {
          string += "<br />";
          console.log("does it ever happen?");
        } else {
          if (element.childNodes.length > 0) {
            string += recursion(element);
          } else {
            string += element.textContent;
          }
        }
      });
      return string;
    };

    const removeHighlight = (toolbar) => {
      if (selectionNode.value) {
        console.log("parent2?", toolbar.parentNode);
        toolbar.style.marginLeft = "-55px";
        toolbar.parentNode.removeChild(toolbar);
        selectionNode.value.replaceWith(...selectionNode.value.childNodes);
        selectionNode.value = null;
      }
      // toolbar.style.display = "none";
      // toolbar.style.zIndex = "-1";
    };

    const checkHighlight = (event) => {
      if (event.target.id !== "toolbar" && selectionNode.value) {
        removeHighlight(invisible.value);
      }
    };
    const preserveNewLines = (elem) => {
      var highlight = document.createElement("span");
      highlight.setAttribute(
        "style",
        "background-color: pink;position: relative;border-radius: 5px;-moz-user-select: -moz-none;-khtml-user-select: none;-webkit-user-select: none;-o-user-select: none;user-select: none;",
      );
      highlight.id = "background-editable";
      highlight.innerHTML += recursion(elem);
      return highlight;
    };

    const handleHighlight = (event) => {
      const selection = window.getSelection();
      if (!selection.toString().trim()) {
        if (
          event.target.id !== "toolbar" &&
          event.target.parentNode.id !== "toolbar"
        ) {
          console.log("Selected nothing else ");
          removeHighlight(invisible.value);
        }
      } else {
        console.log("recieved selection", selection);
        // let anchor = selection.anchorOffset;
        // let focus = selection.focusOffset;

        range.value = selection.getRangeAt(0);
        console.log(range.value);
        if (range.value.startContainer.parentNode.id === "essayArea") {
          const fallout = range.value.extractContents();
          const wrap =
            fallout.textContent.charAt(fallout.textContent.length - 1) === " ";

          selectionNode.value = preserveNewLines(fallout);

          range.value.insertNode(selectionNode.value);
          createTooltip(range.value, invisible.value, wrap);
          selection.removeAllRanges();
        }
      }
    };

    const handleBack = () => {
      router.push({
        name: "003",
        params: { id: feedback.value.prompt_id, module: "Expert" },
      });
    };

    const feedback = computed(() =>
      store.getters.findFeedback({
        id: store.state.uniqueId,
        version: "Expert",
      }),
    );
    const exersize = computed(() =>
      store.getters.findPrompt({
        id: feedback.value.prompt_id,
        version: "Expert",
      }),
    );
    onMounted(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (!feedback.value.prompt_id) {
        router.push({ name: "002", params: { module: "Expert" } });
      }
    });
    const items = [
      {
        text: "Essay Writing: LEQ",
      },
      {
        text: `Essay Component Module: Expert`,
      },
      {
        text: "Choose a Prompt",
      },
      {
        text: "LEQ Essay",
        active: "yes!",
      },
    ];

    return {
      doc,
      handleHighlight,
      preserve,
      items,
      exersize,
      feedback,
      invisible,
      checkHighlight,
      handleClickLabel,
      handleClick,
      parseUserSelections,
      handleBack,
    };
  },
};
</script>

<style scoped>
span,
p {
  white-space: pre-line;
}
.toolbar {
  position: absolute;
  display: inline-block;
  width: fit-content;
  z-index: -1;
  margin-top: -60px;
  margin-left: -55px;
}

.instructions {
  color: #9b51e0;
  font-feature-settings: "liga" off;
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
  line-height: 30px; /* 166.667% */
  text-align: center;
  padding-top: 20px;
}

.unselectable {
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -o-user-select: none;
  user-select: none;
}

::-moz-selection {
  /* Code for Firefox */
  background: pink;
}

::selection {
  background: pink;
}

.labelled-contain {
  border-radius: 10px;
  border: 0.5px solid var(--text-subtle, #969bab);
  max-width: 948px;
}
</style>
<style lang="sass" scoped src="@/assets/css/essayWriting.sass"></style>
