import { createStore } from "vuex";

export const storeWriting = createStore({
    state: {
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
        ],
        selectedPrompt : null, 
        promptTemplates: [
            {
                prompt_id: 'AAA001', 
                templates: {
                    thesis: 'During the time period between _____ and _____ in __(geographic location)__  there were significant changes in  __(AP Theme)__   such as  __(category)__,  __(category)__ , and __(category)__.',
                    evidence: 'During the time period __(date)__ to __(date)__,  __(world context: what event was occurring)__ causing many things to stay constant because ____(why did this event allow continuities?)___.',
                    contextualization: '', 
                    conclusion: ''
                }
            },
            {
                prompt_id: 'AAA002', 
                templates: {
                    thesis: 'During the time period between _____ and _____ in __(geographic location)__  there were significant changes in  __(AP Theme)__   such as  __(category)__,  __(category)__ , and __(category)__.',
                    evidence: 'During the time period __(date)__ to __(date)__,  __(world context: what event was occurring)__ causing many things to stay constant because ____(why did this event allow continuities?)___.',
                    contextualization: '', 
                    conclusion: ''
                }
            },
            {
                prompt_id: 'AAA003', 
                templates: {
                    thesis: 'During the time period between _____ and _____ in __(geographic location)__  there were significant changes in  __(AP Theme)__   such as  __(category)__,  __(category)__ , and __(category)__.',
                    evidence: 'During the time period __(date)__ to __(date)__,  __(world context: what event was occurring)__ causing many things to stay constant because ____(why did this event allow continuities?)___.',
                    contextualization: '', 
                    conclusion: ''
                }
            },
        ]
    },
    getters: {
        getPrompts: state => state.prompts, 
        findPrompt: state => (i) => {
            // let result = {prompt: null, template: null};
            const promptres = state.prompts.filter(prompt => prompt.id === i);
            const templateres = state.promptTemplates.filter(template => template.prompt_id === i);
            return {prompt: promptres[0], template: templateres[0]};
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
        }
    },
    actions: {
        setSelectedPrompt({ commit }, payload) {
            commit('selectPrompt', payload);
        },
        unSetSelectedPrompt({ commit }) {
            commit('unselectPrompt');
        }
    }
  });

export default storeWriting;