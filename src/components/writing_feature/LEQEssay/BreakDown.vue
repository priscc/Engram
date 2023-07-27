<template>
  <b-container fluid>
    <b-row class="breakdown-container">
        <span class="section-breakdown">Section Breakdown</span>
        <b-col class="m-0 p-0">
            <div class="accordion" role="tablist">
                <b-card no-body class="mb-3 breakdown-colors border-0" v-for="(section, index) in sections" :key="section.name">
                <b-card-header header-tag="header" class="p-1 ps-4 pe-4 section-header border-0" role="tab" v-b-toggle="'accordion-' + index">
                    <!-- <b-button block variant="info">Accordion 1</b-button> -->
                    {{ section.title }}
                </b-card-header>
                <b-collapse :id="'accordion-' + index" :visible="currentSection === section.name" accordion="accrdion" role="tabpanel" class="border-0">
                    <sections :points="section"></sections>
                </b-collapse>
                </b-card>
            </div>
            
        </b-col>
    </b-row>
  </b-container>
</template>

<script>
import sections from './Section.vue';
import { ref } from 'vue';
export default {
    props: ['currentSection'],
    components: {
        sections,
    },
    setup() {
        const sections = ref(
            [
                {
                    name: "Contextualization", 
                    title: "Contextualization (0-1 points)",
                    points: [
                        {
                            title: "How do I earn this point?",
                            body: "Describe a broader historical context relevant to the prompt. This point is not awarded for merely a phrase or a reference.\n\n The response must relate the topic to broader historical events, developments, or processes that occur before, during, or continue after the timeframe of the question."
                        }, 
                        {
                            title: "1-point example",
                            body: "lorem ipsum"
                        }
                    ]
                },
                {
                    name: "Thesis", 
                    title: "Thesis/Claim (0-1 points)",
                    points: [
                        {
                            title: "How do I earn this point?",
                            body: "In your introduction, respond to the prompt with a historically defensible claim that establishes a line of reasoning.\n\nA thesis does not need to encompass an entire period, but it must identify relevant developments in the period."
                        }, 
                        {
                            title: "1-point example",
                            body: ""
                        }
                    ]
                },
                {
                    name: "Evidence", 
                    title: "Evidence (0-2 points)",
                    points: [
                        {
                            title: "How do I earn this point?",
                            body: "Provides specific examples of evidence relevant to the topic of the prompt or Supports an argument in response to the prompt using specific and relevant examples of evidence.\n\nFor two points, the response must use at least two specific historical examples to support an argument."
                        }, 
                        {
                            title: "2-point example",
                            body: "The response earned 2 points for evidence. There are numerous examples of evidence, and this evidence is used in support of an argument.."
                        }
                    ]
                },
                {
                    name: "Conclusion", 
                    title: "Analysis/Reasoning (0-2 points)",
                    points: [
                        {
                            title: "How do I earn a point for historical reasoning?",
                            body: "Provides specific examples of evidence relevant to the topic of the prompt or Supports an argument in response to the prompt using specific and relevant examples of evidence.\n\nFor two points, the response must use at least two specific historical examples to support an argument."
                        }, 
                        {
                            title: "1-point example",
                            body: "The response earned 1 point for using historical reasoning. The response provides an extensive discussion of how Indian nationalists pursued an independence movement against British rule."
                        },
                        {
                            title: "How do I earn a point for complexity?",
                            body: "Demonstrates complex understanding of the historical development that is the focus of prompt, using evidence to corroborate, qualify,or modify an argument addressesing the prompt."
                        }, 
                        {
                            title: "1-point example",
                            body: "The response offers evidence in paragraph 2.\n\nIt contrasts Indian nationalists with Chinese leader Mao Zedong. Later in the same paragraph, the response qualifies an earlier argument by contrasting the populist movements of Mao Zedong and Chiang Kai-Shek."
                        }
                    ]
                },

            ]
        )
        return { sections };
    }
}
</script>

<style>
.breakdown-title {
    color: #000;
    font-feature-settings: 'liga' off;

    /* Others /Capitalised */
    font-family: Manrope;
    font-size: 14px;
    font-style: normal;
    font-weight: 800;
    line-height: 18px; /* 128.571% */
    letter-spacing: 2px;
    text-transform: uppercase;
}

.breakdown-breakdown {
    color: #000;
    text-align: center;
    font-feature-settings: 'liga' off;
    font-family: Manrope;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 30px; /* 166.667% */
}

.accordion {
    max-width: 353px;
}

.section-header {
    height: 83px;
    display: flex;
    align-items: center;
    color: #000;
    text-align: center;
    font-feature-settings: 'liga' off;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 30px; /* 166.667% */
    white-space: nowrap;
}

.breakdown-container {
    padding: 0 15px;
    border-radius: 6px;
    background: #FAFAFA;
}

.section-breakdown {
    color: #000;
    font-feature-settings: 'liga' off;

    /* Others /Capitalised */
    font-size: 14px;
    font-style: normal;
    font-weight: 800;
    line-height: 18px; /* 128.571% */
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 27px 0;
    margin-left: -10px;
}

.breakdown-colors:nth-child(1) {
    border-radius: 8px;
    background: #CCEBA5;
}
.breakdown-colors:nth-child(2) {
    border-radius: 8px;
    background: #CAE2F1;
}
.breakdown-colors:nth-child(3) {
    border-radius: 8px;
    background: #DCBAE5;
}
.breakdown-colors:nth-child(4) {
    border-radius: 8px;
    background: #F5EBBB;
}

@media screen and (max-width:425px) {
    .section-header {
        white-space: normal;
    }
    
}
</style>

<style lang="sass" scoped src="@/assets/css/essayWriting.sass"></style>
