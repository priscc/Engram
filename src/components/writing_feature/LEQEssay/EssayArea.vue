<template>
    <b-form class="essay-area p-0" @submit.prevent="handleSubmit">
        <b-container fluid class="essay-area p-0">
            <b-row class="form-row mx-auto pt-5" align-h="center">
                <b-col>
                    <b-form-group v-for="stream in stream" :key="stream.title" class="stream-droplet px-4">
                        <div v-if="stream.title === 'Conclusion'" class="add-evidence-button mx-auto user-responsivity" @click="addEvidence"> Add additional evidence <img class="mb-1" alt="Icon" :src="require('@/assets/writing_feature/plus.svg')"></div>
                        <span class="area-title">{{ stream.title }}</span><br>
                        <div class="area-subtitle">{{ stream.subtitle }}</div>
                        <textareavue @focusin="handleFocus" :moduleVersion="moduleVersion" :dataRequested="dataRequested" :string="stream.template.template" :bgColor="stream.palette" @click.native="setCurrentSection(stream.title)" @fulfillRequest="(data) => handleRequest(data, stream.template)"></textareavue>
                        <div v-if="stream.subTemplateSubtitle" class="subsubtitle">
                            <div class="area-subtitle">{{ stream.subTemplateSubtitle.subtitle }}</div>
                            <textareavue :moduleVersion="moduleVersion" :dataRequested="dataRequested" :string="stream.subTemplate.template" :placeholder="stream.placeholder" :bgColor="'#F5E07B'" @click.native="setCurrentSection(stream.subTemplateSubtitle.title)" @fulfillRequest="(data) => handleRequest(data, stream.subTemplate)"></textareavue>
                        </div>
                    </b-form-group>
                </b-col>
                <b-col class="component p-0 mx-4 mb-5">
                    <breakdown @changeSection="(section) => setCurrentSection(section)" :currentSection="currentSection"></breakdown>
                </b-col>
            </b-row>
            <b-row align-h="end" class="px-5 pb-5 my-4 mt-5 mt-sm-0 mt-md-0 mt-lg-0">
                <b-button id="purple" class="border-0 mb-1 back-button " @click="router.push({name: '002'})">Back</b-button>
                <b-button id="purple" class="finish-button border-0 mb-1" v-b-modal.my-modal type="submit">Finish</b-button>
                <b-modal id="my-modal" hide-footer hide-header size="lg"><finishmodal @close="$bvModal.hide('my-modal')" :ready="submitted"></finishmodal></b-modal>
            </b-row>
        </b-container>
    </b-form>
</template>

<script>
import { onMounted, ref, watch, computed, reactive } from 'vue';
import { useRouter } from 'vue-router';
import breakdown from './BreakDown.vue';
import finishmodal from './FinishModal.vue';
import storeWriting from '../../../store/writing';
import textareavue from './TextArea.vue';
export default {
    props: ['props', 'identification', 'moduleVersion'],
    components: {
        breakdown,
        finishmodal,
        textareavue
    },
    emits: ['updateProgress'],
    setup(props, { emit }) {
        //STORE 
        const submitted = ref(false);
        const store = storeWriting;

        //V-MODEL REFS
        const contextualization = reactive({ template: props.props.template.templates.contextualization});
        const thesis = reactive({ template:props.props.template.templates.thesis});
        const evidence = [];
        props.props.template.templates.evidence.forEach(x => {evidence.push([reactive({ template: x[0]}), reactive({ template:x[1]})]);})
        const conclusion = reactive({ template:props.props.template.templates.conclusion });

        //ROUTER 
        const router = useRouter();

        //STRUCTURE AVAILABLE TO ADD ADDITIONAL EVIDENCES 
        const evidences = ref(evidence.length);
        const addEvidence = () => {
            evidences.value++;
            evidence.push([reactive({ template: props.props.template.templates.evidence[0][0]}), reactive({ template: props.props.template.templates.evidence[0][1]})]);
            const cap = stream.value.pop();
            stream.value.push({
                title: `Evidence #${evidences.value}`,
                subtitle: 'fill in the topic sentence template',
                template: evidence[evidence.length - 1][0],
                subTemplate: evidence[evidence.length - 1][1],
                subTemplateSubtitle: evidenceSubTemplateSubtitle,
                palette: '#D289E5'
            })
            stream.value.push(cap);
            console.log('add evidence triggered')
        }
        const initializeEvidences = () => {
            if (evidence.length > 2) {
                for(var i = 2; i < evidence.length; i++) {
                    const cap = stream.value.pop();
                    stream.value.push({
                        title: `Evidence #${i + 1}`,
                        subtitle: 'fill in the topic sentence template',
                        template: evidence[i][0],
                        subTemplate: evidence[i][1],
                        subTemplateSubtitle: evidenceSubTemplateSubtitle,
                        palette: '#D289E5'
                    })
                    stream.value.push(cap);
                }
            }
        }
        
        //CONTENT CONSTANTS 
        const evidenceSubTemplateSubtitle = {subtitle: "add 1 sentence to analysis your evidence and support your thesis statement", title: "Analysis"};
        const stream = ref([
            {
                title: 'Contextualization',
                subtitle: 'add 1 sentence of historical context relevant to the prompt',
                template: contextualization,
                palette: '#CCEBA5'
            }, 
            {
                title: 'Thesis',
                subtitle: 'fill in the Change & Continuity thesis statement template',
                template: thesis,
                palette: '#85CDF9'
            },
            {
                title: 'Evidence #1',
                subtitle: 'fill in the topic sentence template',
                template: evidence[0][0],
                subTemplate: evidence[0][1],
                subTemplateSubtitle: evidenceSubTemplateSubtitle,
                palette: '#D289E5',
                placeholder: 'The result of...'
            },
            {
                title: 'Evidence #2',
                subtitle: 'fill in the topic sentence template',
                template: evidence[1][0],
                subTemplate: evidence[1][1],
                subTemplateSubtitle: evidenceSubTemplateSubtitle,
                palette: '#D289E5'
            }, 
            {
                title: 'Conclusion',
                subtitle: 'add 1 sentence of historical context relevant to the prompt',
                template: conclusion,
                palette: '#FE9A22'
            },

        ])

        // total emits = stream length and # of evidences (because analysis is wrapped within the evidence obj, but has their own textarea component within their own emits)
        const totalEmits = computed(() => stream.value.length + evidences.value);
        const currentEmits = ref(0);
        const dataRequested = ref(false);

        //Submits user input to store when all textarea components have emitted their events and updated data in parent
        
        watch(currentEmits, (newEmit, oldEmit) => {
            console.log(`${newEmit} emits from ${oldEmit}`);
            if (newEmit === totalEmits.value) {
                console.log('All emits processed, triggering event!');
                let evidencePost = [];
                evidence.forEach(x => {evidencePost.push([x[0].template, x[1].template]);})
                const idea = {

                    prompt_id: props.identification, //ID to identify prompt
                    id: store.getters.getUniqueId, //Unique ID assigned to new feedback obj (to be replaced by firestore id's)
                    moduleVersion: props.moduleVersion, //For segregating beginner and advanced modules

                    //User input -- analysis is wrapped within the evidence obj
                    contextualization: contextualization.template,
                    evidence: evidencePost,
                    conclusion: conclusion.template,
                    thesis: thesis.template
                }

                // console.log('criminal', idea)
                store.dispatch('setUserInput', idea);
                store.dispatch('setModuleVersion', props.moduleVersion);
                submitted.value = true;
                console.log('handled submit',store.state.feedback, store.state.completedPrompts);
            }
        }, {deep: true})
        //EVENT HANDLER: SUBMIT
        const handleSubmit = () => {
            //note: check if feedback obj has aleady been created for this prompt before uploading data
            //update: handled already created exception within store
            if (!submitted.value) {
                console.log('before submit', contextualization.template, thesis.template, evidence, conclusion.template);
                dataRequested.value = true
            }
        }
        const handleRequest = (data, stream) => {
            console.log(stream);
            stream.template = data;

            console.log('handled', data, stream.template)
            currentEmits.value++;
        }
        //EVENT HANDLER: BREAKDOWN COMPONENT CONNECTION 
        const currentSection = ref(null)
        const setCurrentSection = (breakdown) => {
            if (breakdown) {
                currentSection.value = breakdown.split(' ')[0];
            } else {
                currentSection.value = null;
            }
            console.log('click', currentSection.value);
            emit('updateProgress', currentSection.value);
        }
        const handleFocus = () => {
            console.log("focused!")
        }
        //LIFECYCLE HOOKS (initialize or reset variables)
        onMounted(() => {
            initializeEvidences();
        })  
        
        // const testing = 'During the time period between ___(date)__ and __(date)___ in __(geographic location)__  there were significant changes in  __(AP Theme)__   such as  __(category)__,  __(category)__ , and __(category)__.'
        return { 
            stream, evidence, evidenceSubTemplateSubtitle, currentSection, 
            setCurrentSection, router, handleSubmit, submitted, 
            handleRequest, dataRequested,  handleFocus, addEvidence
        }
    }
} 
</script>

<style scoped>
.essay-area {
    border-radius: 10px;
    background: #FFF;
}
.component {
    max-width: 400px;
}

.form-row {
    max-width:100%;
}

.stream-droplet {
    padding-bottom: 60px;
}

.area-title {
    color: var(--text-normal, #18191F);
    font-feature-settings: 'liga' off;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
}

.area-subtitle {
    color: var(--text-normal-2, #474A57);
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    padding: 5px 0 10px 0;
}

.subsubtitle {
    padding-top: 5px;
}

.finish-button {
    max-width: 239px;
}

.back-button {
    max-width: 170px;
    margin: 0 30px 0 0;
}

.add-evidence-button {
    color: var(--brand-purple, #8C30F5);
    font-feature-settings: 'liga' off;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 30px;
    margin-bottom: 50px;
    cursor: pointer;
    width: fit-content;
}
@media screen and (max-width:426px) {
    .finish-button {
        max-width: 239px;
        margin:auto;
    }

    .back-button {
        max-width: 170px;
        margin:auto

    }
}
</style>
<style lang="sass" scoped src="@/assets/css/essayWriting.sass"></style>