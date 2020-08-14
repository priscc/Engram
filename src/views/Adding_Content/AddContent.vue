<template>
<div id="app">
	<!-- Header -->
	<v-container>
		<v-row class="blue-grey darken-2 white--text text-center">
			<v-col>
				<!-- <h1 class="display-1">Add Content to a Topic</h1> -->
				<blockquote class="blockquote pa-0">Select a topic below</blockquote>
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
							<add-events v-if="tab == 'Events'" :topicObj="topicObj" @updateTopic="updateTopic"></add-events>
							<add-term v-if="tab == 'Terminology'" :topicObj="topicObj" @updateTopic="updateTopic"></add-term>
							<add-people v-if="tab == 'People'" :topicObj="topicObj" @updateTopic="updateTopic"></add-people>
							<add-works v-if="tab == 'Works'" :topicObj="topicObj" @updateTopic="updateTopic"></add-works>
						</v-tab-item>
					</v-tabs-items>
			</v-col>
		</v-row>
	</v-container>
</div>
</template>

<script>
// import addEvents from '@/components/Content_Forms/EventsForm.vue'
import addEvents from '@/components/Content_Forms/Add_Forms/EventsForm.vue'
import addTerm from '@/components/Content_Forms/Add_Forms/TerminologyForm.vue'
import addPeople from '@/components/Content_Forms/Add_Forms/PeopleForm.vue'
import addWorks from '@/components/Content_Forms/Add_Forms/WorksForm.vue'
import { db } from '@/main'
import firebase from 'firebase'
export default {
	components: {
		addEvents,
		addTerm,
		addPeople,
		addWorks
	},
	data: function () { return {
		// Drop down
		topics: [],
		topic: '',

		// Toggle bar
		tab: 'Events',
		tabs: [
			{ title: 'Events', icon: 'mdi-clock-start', doc: 'Events' },
			{ title: 'Terminology', icon: 'mdi-view-dashboard', doc: 'Terminology' },
			{ title: 'Historical People', icon: 'mdi-account', doc: 'People' },
			{ title: 'Works of The Time', icon: 'mdi-book-open-variant', doc: 'Works' }
		],
		
		// sending to components
		topicObj: {},
	}},
	methods: {

		// grabs all topics from db
		async listTopics () {
			await db.collection('topics').get().then(doc => {
				doc.forEach(doc => {
					var topic = doc.data()
					var id = doc.id
					topic['id'] = id
					this.topics.push(topic)
				})
			})
		},

		// isolates topic selected from drop down
		topicData () {
			this.topicObj = this.topics.find(t => t.title === this.topic);
		},

		// save new topic content (event, people, terms, works, and resources)
		async updateTopic(item, r, type){
			// upload content thumbnail
			if ( type == 'events' || type == 'people' || type == 'works'){
				var url = await this.savingImages(item.thumbURL)
				item.thumbURL = url
			}

			// upload topic content
			var itemID = await db.collection(type).add(item)
				.then(function(docRef) {
					return docRef.id;
				}).catch(function(error) {
					console.error("Error adding document: ", error);
				});

			// upload any resources if there is some
			if (r != null){
				var batch = db.batch();
				for (const [key, value] of Object.entries(r)) {
					value.forEach( doc => {
						doc.parentID = itemID
						var ref = db.collection("resources").doc();
						batch.set(ref, doc);
					})
				}
				batch.commit().then(function () {
					console.log( "Document successfully updated!"); 
				});
			}
		},

		// upload content thumbnail images
		async savingImages(image){
			var storageRef = firebase.storage().ref().child(image.name)
			await storageRef.put(image)
			var x = await storageRef.getDownloadURL()
			return x
		},

	},
	mounted () {
		this.listTopics()
	}
}
</script>