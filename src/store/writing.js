import { createStore } from "vuex";

export const storeWriting = createStore({
    state: { 
        // currentEssayStructureModule: JSON.parse(localStorage.getItem('module') || {module: 'beginner'}),
        uniqueId: 0, //Global variable equivalent to most recent feedback obj id to access feedback w/o exposing id parameters
        moduleVersion: 'Beginners', //Function is the same as above, ONLY mutated upon pressing finsih on an essay
        prompts: [
            {
                prompt: 'In the late twentieth century, the spread of free-market economic ideas led to numerous changes around the world. Develop an argument that evaluates the extent to which the spread of free-market ideas led to economic change during this period.',
                period: '1900-present',
                type: 'Change & Continuity',
                id: 'AAA001'
            },
            {
                prompt: 'In the late twentieth century, the spread of free-market economic ideas led to numerous changes around the world. Develop an argument that evaluates the extent to which the spread of free-market ideas led to economic change during this period.',
                period: '1900-present',
                type: 'Change & Continuity',
                id: 'AAA002'
            },
            {
                prompt: 'In the late twentieth century, the spread of free-market economic ideas led to numerous changes around the world. Develop an argument that evaluates the extent to which the spread of free-market ideas led to economic change during this period.',
                period: '1900-present',
                type: 'Change & Continuity',
                id: 'AAA003'
            },
            {
                prompt: 'In the late twentieth century, the spread of free-market economic ideas led to numerous changes around the world. Develop an argument that evaluates the extent to which the spread of free-market ideas led to economic change during this period.',
                period: '1900-present',
                type: 'Change & Continuity',
                id: 'sample'
            },
        ],
        selectedPrompt : null, // most current selected prompt, RESETS upon accessing the chose prompt page, UPDATES on prompt click
        completedPrompts: [], // note: intended to have the same structure as promptTemplates but filled w/ user input
        promptTemplates: [
            {
                prompt_id: 'AAA001', 
                templates: {
                    thesis: 'During the time period between _____ and _____ in __(geographic location)__  there were significant changes in  __(AP Theme)__   such as  __(category)__,  __(category)__ , and __(category)__.',
                    evidence: [
                        ['During the time period __(date)__ to __(date)__,  __(world context: what event was occurring)__ causing many things to stay constant because ____(why did this event allow continuities?)___.', ''],
                        ['During the time period __(date)__ to __(date)__,  __(world context: what event was occurring)__ causing many things to stay constant because ____(why did this event allow continuities?)___.', '']
                    ],
                    contextualization: '', 
                    conclusion: ''
                }
            },
            {
                prompt_id: 'AAA002', 
                templates: {
                    thesis: 'During the time period between _____ and _____ in __(geographic location)__  there were significant changes in  __(AP Theme)__   such as  __(category)__,  __(category)__ , and __(category)__.',
                    evidence: [
                        ['During the time period __(date)__ to __(date)__,  __(world context: what event was occurring)__ causing many things to stay constant because ____(why did this event allow continuities?)___.', ''],
                        ['During the time period __(date)__ to __(date)__,  __(world context: what event was occurring)__ causing many things to stay constant because ____(why did this event allow continuities?)___.', '']
                    ],                    
                    contextualization: '', 
                    conclusion: ''
                }
            },
            {
                prompt_id: 'AAA003', 
                templates: {
                    thesis: 'During the time period between _____ and _____ in __(geographic location)__  there were significant changes in  __(AP Theme)__   such as  __(category)__,  __(category)__ , and __(category)__.',
                    evidence: [
                        ['During the time period __(date)__ to __(date)__,  __(world context: what event was occurring)__ causing many things to stay constant because ____(why did this event allow continuities?)___.', ''],
                        ['During the time period __(date)__ to __(date)__,  __(world context: what event was occurring)__ causing many things to stay constant because ____(why did this event allow continuities?)___.', '']
                    ],                    
                    contextualization: '', 
                    conclusion: ''
                }
            },
            {
                prompt_id: 'sample', 
                templates: {
                    thesis: 'During the time period between _____ and _____ in __(geographic location)__  there were significant changes in  __(AP Theme)__   such as  __(category)__,  __(category)__ , and __(category)__.',
                    evidence: [
                        ['During the time period __(date)__ to __(date)__,  __(world context: what event was occurring)__ causing many things to stay constant because ____(why did this event allow continuities?)___.', ''],
                        ['During the time period __(date)__ to __(date)__,  __(world context: what event was occurring)__ causing many things to stay constant because ____(why did this event allow continuities?)___.', '']
                    ],                    
                    contextualization: '', 
                    conclusion: ''
                }
            },
        ],
        feedback: [
            {
                id: 'sample',
                prompt_id: 'sample',
                moduleVersion: 'Beginners',
                feedback_given: false, // true if feedback is given 
                labelled: true, // true if user input is categorized for feedback page (i.e. default for beginner and advanced module)
                score: null,
                content: {
                    raw: {
                        outline: null,
                        text: null,
                    }, // exclusive to timed module, contains bare, unlabelled user essay
                    contextualization: {
                        userInput: 'Following the Post-Modern period, many regions around the world experienced instability and massive change due to increasingly global connections and the advent of new ideologies.',
                        good: null,
                        toImprove: null
                    },
                    thesis: {
                        userInput: 'Due to centuries of subjugation and domination or simply a design for change due to resentment of the past, these ideologies grew into movements among the people in both developing and industrialized countries. Ideologies such as fascism, nationalism, and communism uprooted the existing sociopolitical order by mobilizing the people through promises of reform and uniting them with a popular message and universal appeal, inspiring them to rise up.',
                        good: null,
                        toImprove: null
                    },
                    evidence: [
                        {
                            evidence: {
                                userInput: 'In countries everywhere, populist movements such as nationalism, fascism, and communism galvanized the people with promises of change and reform. In India, Mohammed Gandhi activated a huge movement of passive resistance based on nationalism and called for reforms to prevent the British from ever abusing or oppressing the Indians again. ',
                                good: null,
                                toImprove: null
                            }, 
                            analysis: {
                                userInput: 'Via this movement both the political and social order was rapidly changed, as Britain ultimately ceded political control to the Indians, and Indians, for the first time, dealt with the British as social equals. Ghandi’s nationalist movement only succeeded because he managed to get the majority of Indians to rise up and unity by thier national pride and tired of British dominance.',
                                good: null,
                                toImprove: null
                            }
                        }, 
                        {
                            evidence: {
                                userInput: 'In similar method to Ghandi, albiet much more violently and controversially, Mao Zedong headed the rise of Communism in China, and he also uprooted the existing social and political order. His popular movement grew to the people’s resentment to years of Japanese occupation and abuses and anger at the wealthy for controlling all the land and unfairly treating the peasantry. Mao also promised reform, offering redistribution of land and the building of new communist movement, the communists deposed the Japanese, the elite, and the Nationalists, drastically altering the the political landscape of China for years to come.',
                                good: null,
                                toImprove: null
                            }, 
                            analysis: {
                                userInput: 'it is apparent to see that one populist movement deposed another Communists led by Mao vs. Nationalist led by Chiang Kai-shek and it must be acknowledged that the people were not always satisfied with the results of these ideologies and oftentimes continued to struggle to change the existing system.',
                                good: null,
                                toImprove: null
                            }
                        }
                    ], 
                    conclusion: {
                        userInput: '',
                        good: null,
                        toImprove: null
                    }
                }
            }
        ]
    },
    getters: {
        getPrompts: state => state.prompts, 
        getUniqueId: state => {
            state.uniqueId++;
            return state.uniqueId;
        },
        parseFeedbackAsTemplate: (state) => (i) => {
            const feedback = state.feedback.filter(feed => feed.prompt_id === i.id && feed.moduleVersion === i.version );
            if (feedback.length > 0) {
                console.log("this is the one we're parsing: ", feedback[0])
                let completedTemplate = {
                    prompt_id: feedback[0].prompt_id, 
                    moduleVersion: feedback[0].moduleVersion,
                    templates: {
                        raw: feedback[0].content.raw,
                        thesis: feedback[0].content.thesis.userInput,
                        evidence: [],
                        contextualization: feedback[0].content.contextualization.userInput, 
                        conclusion: feedback[0].content.conclusion.userInput,
                    }
                }
                feedback[0].content.evidence.forEach(x => {
                    completedTemplate.templates.evidence.push([x.evidence.userInput, x.analysis.userInput])
                })
                console.log('successfully implemented feedback parsing as template', completedTemplate)
                return [completedTemplate]
            }
            return [];
        },
        findPrompt: (state, getters) => (i) => {
            //Prioritizes returning the completed user input over the original blank templates, completed user input is injected into textareas to save progress
            
            //NOTE: for both feedback and timed module, needing to use both findPrompt and findFeedback causes redundant returning of user input, 
            //      split findPrompt functionality into a function that solely returns prompt, and one that solely returns template
            if(i === null) {
                return null
            }
            const completedPromptres = getters.parseFeedbackAsTemplate(i);
            const promptres = state.prompts.filter(prompt => prompt.id === i.id);
            const templateres = state.promptTemplates.filter(template => template.prompt_id === i.id);
            return (completedPromptres.length > 0 ? {prompt: promptres[0], template: completedPromptres[0]} : {prompt: promptres[0], template: templateres[0]});
        }, 
        findFeedback: state => (i) => {
            const feedback = state.feedback.filter(feed => feed.id.toString() === i.id.toString() && feed.moduleVersion === i.version);
            console.log(feedback, state.uniqueId, state.feedback, i);
            if (!feedback.length) {
                return 202;
            } else if (!feedback[0].feedback_given) {
                //adding feedback
                //NOTE: feedback should call an action doing the following and getter should only return once feedback_given property is true
                //IMPLEMENTED (date): not yet
                feedback[0].content.contextualization.good = 'The response situates the emergence of German leader Adolf Hitler in the aftermath of World War I.';
                feedback[0].content.contextualization.toImprove = 'You could have added more contextualization to be more detailed ';
                feedback[0].content.thesis.good = 'The response situates the emergence of German leader Adolf Hitler in the aftermath of World War I.';
                feedback[0].content.thesis.toImprove = 'You could have added more contextualization to be more detailed ';
                feedback[0].content.conclusion.good = 'The response situates the emergence of German leader Adolf Hitler in the aftermath of World War I.';
                feedback[0].content.conclusion.toImprove = 'You could have added more contextualization to be more detailed ';
                feedback[0].content.evidence.forEach(x => {
                    x.analysis.good = 'The response situates the emergence of German leader Adolf Hitler in the aftermath of World War I.';
                    x.analysis.toImprove = 'You could have added more contextualization to be more detailed ';
                    x.evidence.good = 'The response situates the emergence of German leader Adolf Hitler in the aftermath of World War I.';
                    x.evidence.toImprove = 'You could have added more contextualization to be more detailed ';
                })
                feedback[0].feedback_given = true;
            }
            return feedback[0];
        }
    },
    mutations: {
        selectPrompt (state, payload) {
            if (payload === state.selectedPrompt) {
                state.selectedPrompt = null;
            } else {
                state.selectedPrompt = payload;
            }
        },
        unselectPrompt (state) {
            state.selectedPrompt = null;
        }, 
        changeVersion (state, payload) {
            state.moduleVersion = payload;
        },
        uploadUserInput (state, payload) {
            console.log('payload', payload)
            // Overrides/Updates existing feedback object if exists and has an equivalent prompt id 
            // Updates uniqueID to connect to existing feedback obj if exists
            //    -  uniqueID functions to identify the feedback obj without being exposed to user manipulation like route params would
            let index = state.feedback.findIndex(x => x.prompt_id === payload.prompt_id && x.moduleVersion === payload.moduleVersion);
            console.log('apparent index ', state.feedback[index] );
            // let completed_index = state.completedPrompts.findIndex(x => x.prompt_id === payload.prompt_id && x.moduleVersion === payload.moduleVersion);
            if (index > -1) {

                //set uniqueID
                state.uniqueId = state.feedback[index].id;
                //UPDATE 8/10/23: bug fix, set new inputs to userInput property of content fields instead of the entire field
                state.feedback[index].content.contextualization.userInput = payload.contextualization || state.feedback[index].content.contextualization.userInput;
                state.feedback[index].content.thesis.userInput = payload.thesis || state.feedback[index].content.thesis.userInput;
                state.feedback[index].content.conclusion.userInput = payload.conclusion || state.feedback[index].content.conclusion.userInput; 

                if (payload.moduleVersion === "Timed") {
                        state.feedback[index].labelled = payload.labelled || state.feedback[index].labelled;
                        state.feedback[index].content.raw = payload.raw || state.feedback[index].content.raw;
                }
                // state.completedPrompts[completed_index].templates.contextualization = payload.contextualization
                // state.completedPrompts[completed_index].templates.thesis = payload.thesis
                // state.completedPrompts[completed_index].templates.conclusion = payload.conclusion

                //Compatible with a dynamic amount of evidence
                for(let i in payload.evidence) {
                    if (i > state.feedback[index].content.evidence.length - 1) {
                        //adds new evidences when more is present 
                        const new_evidence = {
                            evidence: {
                                userInput: payload.evidence[i][0],
                                good: null,
                                toImprove: null
                            }, 
                            analysis: {
                                userInput: payload.evidence[i][1],
                                good: null,
                                toImprove: null
                            }
                        }
                        state.feedback[index].content.evidence.push(new_evidence);
                        // state.completedPrompts[completed_index].templates.evidence.push(new_evidence);
                    } else {
                        //overrides previous evidences 
                        state.feedback[index].content.evidence[i].evidence.userInput = payload.evidence[i][0] || null;
                        state.feedback[index].content.evidence[i].analysis.userInput = payload.evidence[i][1] || null;

                        // state.completedPrompts[completed_index].templates.evidence[i][0] = payload.evidence[i][0];
                        // state.completedPrompts[completed_index].templates.evidence[i][1] = payload.evidence[i][1];
                    }
                }
            } else {
                const userInput = {
                    id: payload.id,
                    prompt_id: payload.prompt_id,
                    moduleVersion: payload.moduleVersion,
                    feedback_given: false,
                    labelled: payload.moduleVersion !== "Timed",
                    score: null,
                    content: {
                        // raw: payload.moduleVersion === "Timed" ? payload.raw : null,
                        contextualization: {
                            userInput: payload.contextualization || null,
                            good: null,
                            toImprove: null
                        },
                        thesis: {
                            userInput: payload.thesis || null,
                            good: null,
                            toImprove: null
                        },
                        evidence: [], 
                        conclusion: {
                            userInput: payload.conclusion|| null,
                            good: null,
                            toImprove: null
                        }
                    }
                };

                userInput.content.raw = payload.raw || null;
                // const completedPrompt = {
                //     prompt_id: payload.prompt_id, 
                //     moduleVersion: payload.moduleVersion,
                //     templates: {
                //         thesis: payload.thesis,
                //         evidence: [],
                //         contextualization: payload.contextualization, 
                //         conclusion: payload.conclusion
                //     }
                // }
                (payload.evidence || []).forEach(x => {
                    const new_evidence = {
                        evidence: {
                            userInput: x[0],
                            good: null,
                            toImprove: null
                        }, 
                        analysis: {
                            userInput: x[1],
                            good: null,
                            toImprove: null
                        }
                    }
                    userInput.content.evidence.push(new_evidence);
                    // completedPrompt.templates.evidence.push([x[0], x[1]]);
                });
                //creates new completed prompt and feedback object 
                state.feedback.push(userInput);
                // state.completedPrompts.push(completedPrompt);
            }
        }
    },
    actions: {
        setSelectedPrompt({ commit }, payload) {
            commit('selectPrompt', payload);
        },
        unSetSelectedPrompt({ commit }) {
            commit('unselectPrompt');
        }, 
        setUserInput ({ commit }, payload) {
            commit('uploadUserInput', payload);
        },
        setModuleVersion({ commit }, payload) {
            commit('changeVersion', payload);
        }
    }
  });

export default storeWriting;