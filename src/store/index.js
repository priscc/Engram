import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		eventModel: 0,
		topic: null,
		allTopics: null,
		events: null,
		people: null,
		terms: null,
		works: null,
		resources: null,
		removedResources: [], 
		newResources: [],
		timeline: false
	},

	mutations: {
		EVENT_MODEL(state, index) {
			state.eventModel = index
		},
		EVENT_TIMELINE(state, index) {
			state.timeline = index
		},


		// SETTERS
			SET_TOPIC(state, topic) {
				state.topic = topic
			},
			SET_ALL_TOPIC(state, topics) {
				state.allTopics = topics
			},
			SET_EVENTS(state, events) {
				state.events = events
			},
			SET_PEOPLE(state, people) {
				state.people = people
			},
			SET_TERMS(state, terms) {
				state.terms = terms
			},
			SET_WORKS(state, works) {
				state.works = works
			},
			SET_RESOURCES(state, resources) {
				state.resources = resources
			},

		// MODIFIERS INCREMENT
			ADD_EVENTS(state, event) {
				state.events.push(event)
			},
			ADD_PERSON(state, person) {
				state.people.push(person)
			},
			ADD_TERM(state, term) {
				state.terms.push(term)
			},
			ADD_WORK(state, work) {
				state.works.push(work)
			},

		// RESOURCE MODIFIERS
			REMOVE_RESOURCE(state, payload) {
				console.log('REMOVE_RESOURCE', payload)
				const i = state.resources.map(item => item.id).indexOf(payload.id);
				state.resources.splice(i, 1);
			},
			ADD_RESOURCE(state, payload) {
				state.resources.push(payload)
				state.newResources.push(payload)
			},
			removeFrom_newResources(state, payload) {
				const i = state.newResources.map(item => item.title).indexOf(payload.title);
				state.newResources.splice(i, 1);
			},
			addTo_removedResources(state, payload) { //docs to remove from db
				console.log('addTo_removedResources', payload)
				state.removedResources.push(payload)
			},

		// CLEARING
			CLEAR_NEW_RESOURCES(state) {
				state.newResources = []
			},
			CLEAR_REMOVED_RESOURCES(state) {
				state.removedResources = []
			},


	},

	actions: {

		//SETTERS
			setTopic({ commit }, topic) {
				commit("SET_TOPIC", topic);
			},
			setAllTopics({ commit }, topics) {
				commit("SET_ALL_TOPIC", topics);
			},
			setEvents({ commit }, events) {
				commit("SET_EVENTS", events);
			},
			setPeople({ commit }, people) {
				commit("SET_PEOPLE", people);
			},
			setTerms({ commit }, terms) {
				commit("SET_TERMS", terms);
			},
			setWorks({ commit }, works) {
				commit("SET_WORKS", works);
			},
			setResources({ commit }, resources) {
				commit("SET_RESOURCES", resources);
			},
		
		// MODIFIERS
			addEvent({ commit }, event) {
				commit("ADD_EVENTS", event);
			},
			addPerson({ commit }, person) {
				commit("ADD_PERSON", person);
			},
			addTerm({ commit }, term) {
				commit("ADD_TERM", term);
			},
			addWork({ commit }, work) {
				commit("ADD_WORK", work);
			},
			removeResource({ commit }, resource) {
				console.log('in index, resource', resource)
				commit("REMOVE_RESOURCE", resource);
				if (resource.id == undefined){
					commit("removeFrom_newResources", resource);
				}
				else commit("addTo_removedResources", resource);
			},
			addResource({ commit }, resource) {
				commit("ADD_RESOURCE", resource);
			},

		// Clearning
			clear_newResources({ commit }) {
				commit("CLEAR_NEW_RESOURCES");
			},
			clear_removedResources({ commit }) {
				commit("CLEAR_REMOVED_RESOURCES");
			},

		// Timeline
			eventModal({ commit }, index) {
				commit("EVENT_MODEL", index);
			},
			eventTimeline({ commit }, index) {
				commit("EVENT_TIMELINE", index);
			},
	},

	modules: {
	}
})
