<template>
<div id="app">
	<!-- Header -->
	<v-container>
		<v-row class="blue-grey darken-2 white--text text-center">
			<v-col>
				<!-- <h1 class="display-1">Add Content to a Topic</h1> -->
				<blockquote class="blockquote pa-0">Select a topic below</blockquote>
				<p class="caption pa-0">Reminder:
					<br>(1) <u>Before</u> adding resources, events refresh the page
					<br>(2) <u>Before</u> modifying anything, refresh page
					<br>(3) If a date is unknown put 3 underscores ('___')
					<br>(4) Resize Work images to have have an aspect ratio of 2.1 (21:10)
				</p>
			</v-col>
		</v-row>
		<!-- Drop down -->
		<v-row>
			<v-spacer></v-spacer>
			<v-col cols="7">
				<v-select v-model="topic" :items="topics" item-text="title" menu-props="auto" label="Select a topic" single-line ripple @change="topicData"></v-select>
			</v-col>
			<v-spacer></v-spacer>
		</v-row>
	</v-container>
	<!-- Topic Components -->
	<v-container fluid>
		<v-row v-if="topic != '' ">
			<v-col>
				<!-- Tab bar -->
					<v-card outlined>
						<v-tabs v-model="tab" centered icons-and-text color="pink">
							<v-tabs-slider></v-tabs-slider>
							<v-tab class="py-2" v-for="(t, i) in tabs" :key="i" :href="`#`+t.doc">
								<p class="caption">{{t.title}}</p>
								<v-icon medium>{{t.icon}}</v-icon>
							</v-tab>
						</v-tabs>
					</v-card>
					<!-- Different Content Forms -->
					<v-tabs-items v-model="tab">
						<v-tab-item v-for="(t, i) in tabs" :key="i" :value="t.doc" >
							<mod-events v-if="tab == 'Events'"></mod-events>
							<mod-terms v-if="tab == 'Terminology'"></mod-terms>
							<mod-people v-if="tab == 'People'"></mod-people>
							<mod-works v-if="tab == 'Works'"></mod-works>
						</v-tab-item>
					</v-tabs-items>
			</v-col>
		</v-row>
	</v-container>
</div>
</template>

<script>
import modEvents from '@/components/Content_Forms/Modifying_Forms/ModifyingEvents.vue'
import modTerms from '@/components/Content_Forms/Modifying_Forms/ModifyingTerminology.vue'
import modPeople from '@/components/Content_Forms/Modifying_Forms/ModifyingPeople.vue'
import modWorks from '@/components/Content_Forms/Modifying_Forms/ModifyingWorks.vue'
import { db } from '@/main'
import firebase from 'firebase'
import store from "@/store"


export default {
	components: {
		modEvents,
		modTerms,
		modPeople,
		modWorks
	},
	data: function () { return {
		// Drop down
		topic: '',

		// Toggle bar
		tab: 'Events',
		tabs: [
			{ title: 'Events', icon: 'mdi-clock-start', doc: 'Events' },
			{ title: 'Terminology', icon: 'mdi-view-dashboard', doc: 'Terminology' },
			{ title: 'Historical People', icon: 'mdi-account', doc: 'People' },
			{ title: 'Works of The Time', icon: 'mdi-book-open-variant', doc: 'Works' }
		],
		
		// firestore arrays
		topics: [],
		events: [],
		people: [],
		terms: [],
		resources: []
	}},
	firestore() {
		return {
			topics: db.collection("topics"),
			events: db.collection("events"),
			people: db.collection("people"),
			terms: db.collection("terminology"),
			works: db.collection("works"),
			resources: db.collection("resources"),
		};
	},
	methods: {
		// isolates topic selected from drop down
		topicData () {
			var topicObj = this.topics.find(t => t.title === this.topic);
			store.dispatch("setTopic", topicObj);
			

			var events = this.events.filter(t => t.topicID === topicObj.id);
			store.dispatch("setEvents", events);

			var people = this.people.filter(t => t.topicID === topicObj.id);
			store.dispatch("setPeople", people);

			var terms = this.terms.filter(t => t.topicID.includes(topicObj.id));
			store.dispatch("setTerms", terms);

			var works = this.works.filter(t => t.topicID === topicObj.id);
			store.dispatch("setWorks", works);

			var res = []
			var e = events.concat(people)
			e.forEach( i => {
				var r = this.resources.filter(r => r.parentID === i.id);
				res = res.concat(r)
			})
			store.dispatch("setResources", res);
		},
	}
}
</script>