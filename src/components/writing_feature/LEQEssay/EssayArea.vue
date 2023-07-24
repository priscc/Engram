<template>
    <b-form class="essay-area">
        <b-container fluid class="essay-area">
            <b-row class="form-row">
                <!-- {{ evidence }} -->
                <b-col class="text-area">
                    <b-form-group v-for="stream in stream" :key="stream.title" class="stream-droplet">
                        <span class="area-title">{{ stream.title }}</span><br>
                        <div class="area-subtitle">{{ stream.subtitle }}</div>
                        <b-form-textarea v-model="stream.template" type="text" required max-rows="8" placeholder="...add text here"></b-form-textarea>
                        <div v-if="stream.subTemplateSubtitle" class="subsubtitle">
                            <div class="area-subtitle">{{ stream.subTemplateSubtitle }}</div>
                            <b-form-input v-model="stream.subTemplate" type="text" placeholder="...add text here"></b-form-input>
                        </div>
                    </b-form-group>
                </b-col>
                <b-col class="component">

                </b-col>
            </b-row>
        </b-container>
    </b-form>
</template>

<script>
import { ref } from 'vue'
export default {
    props: ['props'],
    setup(props) {
        //CONTENT CONSTANTS 
        const evidenceSubTemplateSubtitle = 'add 1 sentence on how this evidence supports your thesis statement';

        //V-MODEL REFS
        const contextualization = ref(props.props.template.templates.contextualization);
        const thesis = ref(props.props.template.templates.thesis);
        const evidence = [ [ref(props.props.template.templates.evidence), ref('')], [ref(props.props.template.templates.evidence), ref('')]]
        
        //STRUCTURE AVAILABLE TO ADD ADDITIONAL EVIDENCES 
        const evidences = ref(2);
        const addEvidence = () => {
            evidences.value++;
            evidence.push([ref(props.props.template.templates.evidence), ref('')]);
            stream.value.push({
                title: `Evidence #${evidences.value}`,
                subtitle: 'fill in the Change & Continuity thesis statement template',
                template: evidence[evidence.length - 1][0],
                subTemplate: evidence[evidence.length - 1][1],
                subTemplateSubtitle: evidenceSubTemplateSubtitle
            })
        }
        const initializeEvidences = () => {
            if (evidences.value > 2) {
                for (var i = 0; i < (evidences.value - 2); i++) {
                    addEvidence();
                }
            }
        }

        //
        const stream = ref([
            {
                title: 'Contextualization',
                subtitle: 'add 1 sentence of historical context relevant to the prompt',
                template: contextualization.value
            }, 
            {
                title: 'Thesis',
                subtitle: 'fill in the Change & Continuity thesis statement template',
                template: thesis.value
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

        ])
        initializeEvidences();
        const streamEnd = ref([
            {
                title: 'Contextualization',
                subtitle: 'add 1 sentence of historical context relevant to the prompt',
                template: contextualization 
            },
        ])

        return { stream, streamEnd, evidence, evidenceSubTemplateSubtitle}
    }
} 
</script>

<style scoped>
.essay-area {
    border-radius: 10px;
    background: #FFF;
    border: 1px solid red;
}
.text-area {
    border: 1px solid red;
}
.component {
    max-width: 353px;
}

.form-row {
    max-width:100%
}

.stream-droplet {
    padding: 60px 0
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
</style>