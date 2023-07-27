<template>
    <b-form class="essay-area p-0">
        <b-container fluid class="essay-area p-0">
            <b-row class="form-row mx-auto pt-5" align-h="center">
                <!-- {{ evidence }} -->
                <b-col class="text-area">
                    <b-form-group v-for="stream in stream" :key="stream.title" class="stream-droplet px-4">
                        <span class="area-title">{{ stream.title }}</span><br>
                        <div class="area-subtitle">{{ stream.subtitle }}</div>
                        <b-form-textarea @click="setCurrentSection(stream.title)" v-model="stream.template" type="text" required max-rows="8" placeholder="...add text here" class="user-input-area"></b-form-textarea>
                        <div v-if="stream.subTemplateSubtitle" class="subsubtitle">
                            <div class="area-subtitle">{{ stream.subTemplateSubtitle }}</div>
                            <b-form-input @click="setCurrentSection(stream.title)" v-model="stream.subTemplate" type="text" required placeholder="...add text here"></b-form-input>
                        </div>
                    </b-form-group>
                </b-col>
                <b-col class="component p-0 mx-4 mb-5">
                    <breakdown :currentSection="currentSection"></breakdown>
                </b-col>
            </b-row>
            <b-row align-h="end" class="px-5 pb-5 my-4">
                <b-button id="purple" class="border-0 mb-1 back-button " @click="router.push({name: '002'})">Back</b-button>
                <b-button id="purple" class="finish-button border-0 mb-1" v-b-modal.my-modal @click="unselect()" type="button">Finish</b-button>
                <b-modal id="my-modal" hide-footer hide-header size="lg"><finishmodal @close="$bvModal.hide('my-modal')"></finishmodal></b-modal>
            </b-row>
        </b-container>
    </b-form>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import breakdown from './BreakDown.vue';
import finishmodal from './FinishModal.vue';
import storeWriting from '../../../store/writing';
export default {
    props: ['props'],
    components: {
        breakdown,
        finishmodal,
    },
    emits: ['updateProgress'],
    setup(props, { emit }) {
        //STORE 
        const store = storeWriting;
        const unselect = () => {
            console.log('unset')
            store.dispatch('unSetSelectedPrompt');
        }
        const handleSubmit = () => {
            console.log('submitted')
        }
        //ROUTER 
        const router = useRouter();

        //CONTENT CONSTANTS 
        const evidenceSubTemplateSubtitle = 'add 1 sentence on how this evidence supports your thesis statement';

        //V-MODEL REFS
        const contextualization = ref(props.props.template.templates.contextualization);
        const thesis = ref(props.props.template.templates.thesis);
        const evidence = [ [ref(props.props.template.templates.evidence), ref('')], [ref(props.props.template.templates.evidence), ref('')]];
        const conclusion = ref(props.props.template.templates.conclusion);
        // const total = computed(() => {
        //     return contextualization.length && thesis.length && conclusion.length && evidence.length;
        //     // additionally check if the templates were modified
        // })
        //STRUCTURE AVAILABLE TO ADD ADDITIONAL EVIDENCES 
        const evidences = ref(2);
        const addEvidence = () => {
            evidences.value++;
            evidence.push([ref(props.props.template.templates.evidence), ref('')]);
            const cap = stream.value.pop();
            stream.value.push({
                title: `Evidence #${evidences.value}`,
                subtitle: 'fill in the Change & Continuity thesis statement template',
                template: evidence[evidence.length - 1][0],
                subTemplate: evidence[evidence.length - 1][1],
                subTemplateSubtitle: evidenceSubTemplateSubtitle
            })
            stream.value.push(cap);
        }
        const initializeEvidences = () => {
            const timeStamp = evidences.value;
            if (timeStamp > 2) {
                evidences.value = 2;
                for (var i = 0; i < (timeStamp - 2); i++) {
                    addEvidence();
                }
            }
        }
        // BREAKDOWN CONNECTION 
        const currentSection = ref(null)
        const setCurrentSection = (breakdown) => {
            const words = breakdown.split(' ');
            currentSection.value = words[0];
            console.log('click', currentSection.value);
            emit('updateProgress', currentSection.value);
        }
        //
        const stream = ref([
            {
                title: 'Contextualization',
                subtitle: 'add 1 sentence of historical context relevant to the prompt',
                template: contextualization
            }, 
            {
                title: 'Thesis',
                subtitle: 'fill in the Change & Continuity thesis statement template',
                template: thesis
            }, 
            {
                title: 'Evidence #1',
                subtitle: 'fill in the Change & Continuity thesis statement template',
                template: evidence[0][0],
                subTemplate: evidence[0][1],
                subTemplateSubtitle: evidenceSubTemplateSubtitle
            },
            {
                title: 'Evidence #2',
                subtitle: 'fill in the Change & Continuity thesis statement template',
                template: evidence[1][0],
                subTemplate: evidence[1][1],
                subTemplateSubtitle: evidenceSubTemplateSubtitle
            }, 
            {
                title: 'Conclusion',
                subtitle: 'add 1 sentence of historical context relevant to the prompt',
                template: conclusion 
            },

        ])
        onMounted(() => {
            initializeEvidences();
        })        
        return { stream, evidence, evidenceSubTemplateSubtitle, currentSection, setCurrentSection, router, unselect, handleSubmit}
    }
} 
</script>

<style scoped>
.essay-area {
    border-radius: 10px;
    background: #FFF;
}
.text-area {
}
.component {
    max-width: 353px;
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
.user-input-area {
    padding: 15px;
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