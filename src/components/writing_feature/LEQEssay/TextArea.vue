<template>
  <div class="fontist" ref="container" @click="handleFocus">
    <div class="editable-textbox" @focus="handleFocus" ref="focus" tabindex="0" :style="CssVars" :class="{'focus-text-transition' : moduleVersion === 'Beginners', 'no-template-padding' : finalString[0].noTemplate, 'regular-padding' : !finalString[0].noTemplate}">
        <span class=""  v-show="moduleVersion === 'Beginners' || (moduleVersion === 'Advanced' && !advancedWriting[0].content.length && displayTemplatePlaceholder)">
            <span v-for="(word, index) in finalString" :key="index">
                    <span v-if="word.editable" class="" style="position: relative;">
                        <span @focus="handleFocus" v-if="word.noTemplate" class="">
                            <span  class="no-template" :placeholder="placeholder ? placeholder : '....add text here'" :contenteditable="moduleVersion === 'Advanced' ? false : true" @input="handleInput($event, word)">{{ word.shallow_copy }}</span>                    
                        </span>
                        <span  @focus="handleFocus" v-else class="parent">
                            <span class="shadow-none text-blank " :contenteditable="moduleVersion === 'Advanced' ? false : true"  :style="{'padding': `0 ${((((word.placeholder.length - word.content.length) * 10) > width) ? width * 0.3 : ((word.placeholder.length - word.content.length) * 4.1))}px`, 'max-width' : 'fit-content', 'display' : (word.content.length > 0 ? 'inline' : 'inline-block'), 'height': '30px'}" @input="handleInput($event, word)">{{ word.shallow_copy }}</span>
                            <span class="blank-label " :style="{'width': `${((((word.placeholder.length - word.content.length) * 10) > width) ? width * 0.5 : 'auto')}px`}">{{ word.placeholder }}</span>
                        </span>
                    </span>
                    <span v-else>{{ word.content }}</span>
            </span>
        </span>
        <span v-show="moduleVersion === 'Advanced' &&  (!displayTemplatePlaceholder || advancedWriting[0].content.length)">
            <span @blur="handleFocusout" ref="focusCandidate" class="no-template" contenteditable="true" @input="handleInput($event, advancedWriting[0])">{{ advancedWriting[0].shallow_copy }}</span>                    
        </span>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref, watch } from 'vue';
export default {
    props: ['string', 'bgColor', 'dataRequested', 'placeholder', 'moduleVersion'],
    emits: ['fulfillRequest'],
    setup(props, { emit }) {
        var processUnderscore = null;
        const finalString = ref([{noTemplate:false}]);
        const processed = ref(false);
        const advancedWriting = ref([{noTemplate : false, editable: true, content: ref(""), shallow_copy: "", template: null}]);
        const displayTemplatePlaceholder = ref(true);
        if(Object.prototype.toString.call(props.string) === '[object Array]') {
            processed.value = true;
            //NOTE: make sure NOT to pull prompts completed in beginner module and inject into advanced module parsing logic
            //^IMPLEMENTED (date): implemented 8/10/23
            if (props.moduleVersion === 'Advanced') {
                advancedWriting.value = props.string;
                finalString.value = props.string[0].template
            } else {
                finalString.value = props.string
                // console.log("look", props.string);
            }
        } else {
            console.log("Injected as fresh template")
            processUnderscore = props.string.split('_').filter(x => x !== "");
            if (processUnderscore.length === 0) {
                finalString.value = [{noTemplate : true, editable: true, content: ref(""), shallow_copy: ""}]
            }
        }

        const container = ref(null)
        const focus = ref(null)
        const focusCandidate = ref(null)
        const test = ref([])
        const width = ref(1)
        onMounted(() => {

            // process string on initial template injection
            // resultant finalString obj: 
            //      if editable is true, then object must have properties: shallow_copy 
            if (!processed.value) {
                processUnderscore.forEach(element => {
                    if(element.indexOf("(") > -1) {
                        finalString.value.push({ editable: true, content: ref(""), shallow_copy: ' ', placeholder: element.substring(element.indexOf("("), element.indexOf(")") + 1)});
                    } else {
                        finalString.value.push({ editable: false, content: (element + " "), placeholder: null});
                    }
                });
                //add inital template as a property to preserve it when this object is re-injected into this component
                if(props.moduleVersion === 'Advanced') {
                    advancedWriting.value[0].template = finalString.value;
                }
                // focus.addEventListener('focusin', handleFocus);
            }
            // console.log(focus.value.style)
            width.value = container.value.offsetWidth;
            // console.log(width.value, test.value, container.value)
        })
        const handleInput = (event, word) => {
            word.content = event.target.innerText;
            if(event.target.innerText === '') {
                event.target.innerText = ' ';
            }
            // emit('fulfillRequest', finalString);
        }

        const handleFocus = () => {
            // console.log("focused!")
            displayTemplatePlaceholder.value = false;
            focusCandidate.value.focus()
        }
        
        const handleFocusout = () => {
            // console.log("focused out!")
            displayTemplatePlaceholder.value = true
        }

        const CssVars = computed(() => {
            return {
                '--bg-color': props.bgColor,
            }
        })
        
        watch(() => props.dataRequested, () => {
            console.log('input request triggered!');
            (props.moduleVersion === 'Advanced' ? advancedWriting : finalString).value.forEach(x => {
                if (x.editable) {
                    console.log("what to look for",x.content)
                    x.shallow_copy = x.content;
                }
            })
            console.log('finished product', (props.moduleVersion === 'Advanced' ? advancedWriting : finalString))
            emit('fulfillRequest', (props.moduleVersion === 'Advanced' ? advancedWriting : finalString));
        }, {deep: true})
        
        return { finalString, processUnderscore, handleInput, CssVars , container, test, width,
            advancedWriting, focus, handleFocus, handleFocusout, displayTemplatePlaceholder, focusCandidate
        }
    }
}
</script>

<style scoped>
.parent {
    text-align: center;
}
.test {
    border: 1px solid red;
}
.fit-form {
    width: fit-content
}
.fit-general {
    width: 50px;
    margin-bottom: -6px;
}
.text-blank:hover,.text-blank:focus,.text-blank:active,
.no-template:hover,.no-template:focus,.no-template:active {
    outline: none;
    box-shadow: none;
    /* border: 2px solid yellow; */
}
.no-template{
    display: inline-block;
    width: 100%;
}
.no-template-padding{
    padding: 0 10px 0 20px;  
}
.regular-padding {
    padding: 17px 5px 35px 20px;  
}
.text-blank {
    margin-bottom: -6px;
    white-space: pre-wrap;
    /* word-wrap: break-word; */
    border-bottom: 1px solid #969BAB;
    /* display: block; */
}
.blank-label {
    position: absolute; 
    top: 23px; 
    /* left: 50%; */
    left: 15%;
    /* left: 15%; */
    /* -webkit-transform: translateX(-50%);
    transform: translateX(-50%); */
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--text-subtle, #969BAB);
    font-family: Manrope;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

.editable-textbox {
    border-radius: 10px;
    border: 0.5px solid var(--text-subtle, #969BAB);  
    line-height: 40px; /* 218.75% */
    color: var(--text-subtle, #969BAB);
    font-size: 16px;
    font-style: normal;
    font-weight: 100;
    overflow-x: scroll;
    -ms-overflow-style: none; 
    scrollbar-width: none; 
}
.focus-text-transition {
    transition: 0.1s ease-in-out;
}
.editable-textbox::-webkit-scrollbar { 
    display: none;
} 
.no-template:empty:not(:focus)::before{
        content:attr(placeholder);
        color:#969BAB;
}
.no-template:empty{
    margin-bottom: -15px;
}
</style>
<style lang="scss" scoped>
    .editable-textbox:focus, .editable-textbox:focus-within {
        color: black;
        border: 1px solid var(--bg-color);
        border-right: 5px solid var(--bg-color);
        margin-right: -5px
    }
    .editable-textbox:focus .text-blank, .editable-textbox:focus-within .text-blank {
        border-bottom: 1px solid var(--bg-color);
    }
</style>
<style lang="sass" src="@/assets/css/essayWriting.sass"></style>
