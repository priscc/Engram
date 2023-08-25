<template>
  <b-container fluid>
    <b-row class="breakdown-container" align-h="center">
        <span class="section-breakdown">Section Breakdown</span>
        <b-col class="my-0 p-0" cols="auto">
            <div class="accordion fitted-section" role="tablist" style="position: relative;" :class="{'expansive' : currentSection}">
                <b-card no-body class="mb-3 breakdown-colors border-0" v-for="(section, index) in sections" :key="section.name" :style="CssVars(section)" :class="{'is-active' : currentSection === section.name}" @click="handleClick(section.name)">
                <b-card-header header-tag="header" class="p-1 ps-4 pe-4 section-header border-0" role="tab" v-b-toggle="'accordion-' + index">
                    <!-- <b-button block variant="info">Accordion 1</b-button> -->
                    {{ section.title }}
                    <span class="when-open ms-auto"><img :src="require('../../../assets/writing_feature/expand_more.svg')" alt="Icon"></span>
                    <span class="when-closed ms-auto"><img :src="require('../../../assets/writing_feature/expand_less.svg')" alt="Icon"></span>
                </b-card-header>
                <b-collapse :id="'accordion-' + index" :visible="currentSection === section.name" accordion="accrdion" role="tabpanel" class="border-0" style="opacity: 1;">
                    <sections :points="section" style="opacity: 1;"></sections>
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
    emits: ['changeSection'],
    setup(props, { emit }) {
        //NOTE: ADD HEIGHT TO BREAKDOWN WHEN ADD EVIDENCE
        const handleClick = (name) => {
            let emitValue = null
            if (props.currentSection !== name) {
                emitValue = name;
            } else {
                console.log('known null')
            }
            emit('changeSection', emitValue)
        }
        const sections = ref(
            [
                {
                    name: "Contextualization", 
                    title: "Contextualization (0-1 points)",
                    points: [
                        {
                            title: "How do I earn this point?",
                            body: [
                                "Describe the broader historical context the prompt take place in",
                                "It must explain the broader historical events, and or developments that occur before, during, or after the time frame of the question",
                                "This point is not awarded for simply adding sentence or reference.",
                            ],
                            style: "bulleted"
                        }, 
                        {
                            title: "Example (1pt)",
                            body: "Following the Post-Modern period, many regions around the world experienced instability and massive change due to increasingly global connections and the advent of new ideologies. Due to centuries of subjugation and domination or simply a design for change due to resentment of the past, these ideologies grew into movements among the people in both developing and industrialized countries.",
                            style: "quoted"
                        }
                    ],
                    palette: '#CCEBA5'
                },
                {
                    name: "Thesis", 
                    title: "Thesis/Claim (0-1 points)",
                    points: [
                        {
                            title: "How do I earn this point?",
                            body: [
                                "Respond with a historically defensible claim that establishes a line of reasoning.",
                                "A thesis does not need to encompass an entire period, but must identify relevant developments in the period",
                            ],
                            style: "bulleted"
                        }, 
                        {
                            title: "Example (1pt)",
                            body: "Ideologies such as fascism, nationalism, and communism uprooted the existing sociopolitical order by mobilizing the people through promises of reform and uniting them with a popular message and universal appeal, inspiring them to rise up.",
                            style: "quoted"
                        }
                    ],
                    palette: '#CAE2F1'
                },
                {
                    name: "Evidence", 
                    title: "Evidence (0-2 points)",
                    points: [
                        {
                            title: "How do I earn this point?",
                            body: [
                                "You earn 1 point for each piece of evidence you provide",
                                "Provides specific examples of evidence",
                                "Supports an argument in response to the prompt",
                                "For each e at least two specific historical examples"
                            ],
                            style: "bulleted"
                        }, 
                        {
                            title: "2-point example",
                            body: "In countries everywhere, populist movements such as nationalism, fascism, and communism galvanized the people with promises of change and reform. In India, Mahatma Gandhi activated a huge movement of passive resistance based on nationalism and called for reforms to prevent the British from ever abusing or oppressing the Indians again. Via this movement both the political and social order was rapidly changed, as Britain ultimately ceded political control to the Indians, and Indians, for the first time, dealt with the British as social equals.",
                            style: "quoted"
                        }
                    ],
                    palette: '#DCBAE5',
                },
                {
                    name: "Analysis", 
                    title: "Analysis/Reasoning (0-2 points)",
                    points: [
                        {
                            title: "How do I earn a point for historical reasoning?",
                            body: [
                                "You must explain how your evidence relate back to your thesis",
                                "Ensure you frame your evidence to addresses the prompt clearly",
                                "You can either use comparison, causation, or explain change and continuity over time to analyze your evidence",
                            ],
                            style: "bulleted"
                        }, 
                        {
                            title: "1-point example",
                            body: "Gandhi's nationalist movement only succeeded because he managed to get the majority of Indians to rise up and unity by their national pride and tired of British dominance.",
                            style: "quoted"
                        }
                    ],
                    palette:'#F5EBBB'
                },
                {
                    name: "Conclusion", 
                    title: "Conclusion (optional)",
                    points: [
                        {
                            title: "Are conclusions optional?",
                            body: "Yes writing a conclusion is optional, however, it is highly recommended that you write a conclusion as the grader will be looking at the beginning and end of your essay to evaluate the content. So simply restate and summarize your thesis.",
                            style: "normal"
                        }, 
                    ],
                    palette:'#FFC27880'
                },

            ]
        )
        const CssVars = (section) => {
            return {
                '--bg-color' : section.palette
            }
        };
        return { sections, CssVars, handleClick };
    }
}
</script>

<style scoped>
.fitted-section {
    height: auto;
}
.expansive {
    height: 1101px;
}
.breakdown-title {
    color: #000;
    font-feature-settings: 'liga' off;

    /* Others /Capitalised */
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
    width: 360px;
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
    border-radius: 8px;
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
    /* margin-left: px; */
}

.collapsed > .when-open,
.not-collapsed > .when-closed {
  display: none;
}

@media screen and (max-width:426px) {
    .section-header {
        white-space: normal;
    }
    .accordion {
        width: auto;
        max-width: 360px;
    }
    
}
</style>
<style lang="scss" scoped>
.breakdown-colors {
    background: var(--bg-color);
    opacity: 0.5;
}
.is-active {
    opacity: 1;
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.25);
    position: sticky;
    top:1%;
    z-index: 1;
}
</style>
<style lang="sass" scoped src="@/assets/css/essayWriting.sass"></style>
