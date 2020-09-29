<template>
<div id="app">
	
	<!-- Topic Components -->
	<v-container class="mt-6 px-12">
		<h1 class="font-weight-medium text-center pb-10">Topics</h1>
		<v-row>
			<!-- adding new event -->
			<!-- <v-col cols="4" class="d-flex flex-column align-center justify-center">
				<v-hover v-slot:default="{ hover }">
						<v-btn :elevation="hover ? 12 : 2" color="pink" dark large fab @click="[dialog = true, newTopic = true]">
							<v-icon>mdi-plus</v-icon>
						</v-btn>
				</v-hover>
				<p class="caption pt-3 mb-0 font-weight-medium">Add Topic</p>
				<p class="caption pt-0">(add resources after event is created)</p>
				<p class="caption pt-0">Reminder: - fill in all inputs for new items, - refresh page before adding resources</p>
			</v-col> -->
			
			<!-- displaying current events -->
			<v-col cols="4" v-for="(t, i) in topics" :key="i">
				<v-hover v-slot:default="{ hover }">
					<v-card :elevation="hover ? 12 : 2" class="mx-auto">
						<v-btn fab small absolute top right @click="[dialog = true, topicDialog = t]">
							<v-icon>mdi-lead-pencil</v-icon>
						</v-btn>
						<v-img height="125" :src="t.thumbURL"></v-img>
						<v-card-text>{{t.title}}</v-card-text>
					</v-card>
				</v-hover>
			</v-col>
		</v-row>
	</v-container>


	<!-- mod events form -->
	<v-dialog v-model="dialog" :width="width">
		<v-card outlined>
			<v-btn color="orange lighten-1" small fab absolute right dark rounded @click="[dialog = false, reset()]"><v-icon dark>mdi-close</v-icon></v-btn>
			<v-form ref="form" class="px-8 pt-8">
				<v-row>
					<!-- mod event content -->
					<v-col class="pb-0">
						<v-row>
							<v-col>
								<v-text-field dense filled v-model="topicDialog.title" label="Title:" auto-fill="off" clearable></v-text-field>
							</v-col>
						</v-row>
						<v-row>
							<v-col class="py-0">
								<v-expansion-panels>
									<v-expansion-panel>
										<v-expansion-panel-header>Time Period</v-expansion-panel-header>
										<v-expansion-panel-content>
											<v-radio-group v-model="topicDialog.timePeriod" :mandatory="false">
												<v-radio label="Regional Interactions (1200 - 1450)" value="1"></v-radio>
												<v-radio label="First Global Age (1450 - 1750)" value="2"></v-radio>
												<v-radio label="'Revolutions & Industrialization (1750 - 1900)')" value="3"></v-radio>
												<v-radio label="Modern Times (1900 - Present)" value="4"></v-radio>
											</v-radio-group>
										</v-expansion-panel-content>
									</v-expansion-panel>
								</v-expansion-panels>
							</v-col>
							<v-col class="d-flex justify-end align-center flex-row my-0">
								<v-switch class="mt-0" v-model="topicDialog.disabled" inset></v-switch>
								<p>Disable</p>
							</v-col>
						</v-row>
					
						<v-row class="pt-5">
							<v-col cols="5">
								<v-file-input dense v-model="topicDialog.thumbnail" accept="image/*" counter show-size label="Thumbnail" :placeholder="topicDialog.thumbFile" :rules="imgRule" clearable></v-file-input>
							</v-col>
							<v-col cols="5">
								<v-file-input dense v-model="topicDialog.mapThumbnail" accept="image/*" counter show-size label="Map Thumbnail" :placeholder="topicDialog.mapThumbFile" :rules="imgRule" clearable></v-file-input>
							</v-col>
						</v-row>
						<v-row>
							<v-col>
								<v-text-field dense filled v-model="topicDialog.startDate" label="Start Date:" auto-fill="off" clearable></v-text-field>
							</v-col>
							<v-col>
								<v-text-field dense filled v-model="topicDialog.endDate" label="End Date:" auto-fill="off" clearable></v-text-field>
							</v-col>
						</v-row>
						<v-row>
							<v-col>
								<v-btn v-if="!newTopic" small rounded class="mb-6 purple lighten-1 text-center" block dark @click="[addResources = true, width='100%']">Add & Edit Resources</v-btn>
								<v-textarea dense filled v-model="topicDialog.contentMD" label="Main event content: *has markdown" :placeholder="topicDialog.contentMD"></v-textarea>
							</v-col>
						</v-row>
					</v-col>

					<!-- mod event resources -->
					<v-col v-if="addResources"cols="7">
						<v-card outlined class="py-2 px-4" style="border-color: #AB47BC;" >
							<v-expansion-panels multiple focusable>
								<v-expansion-panel>
									<v-expansion-panel-header>Videos</v-expansion-panel-header>
									<v-expansion-panel-content>
										<video-panel :parentID="topicDialog.id" :parentType="'topic'"></video-panel>
									</v-expansion-panel-content>
								</v-expansion-panel>
								<v-expansion-panel>
									<v-expansion-panel-header>Articles</v-expansion-panel-header>
									<v-expansion-panel-content>
										<article-panel :parentID="topicDialog.id" :parentType="'topic'"></article-panel>
									</v-expansion-panel-content>
								</v-expansion-panel>
							</v-expansion-panels>

							<v-card-actions class="d-flex justify-end">
								<v-btn color="green" dark @click="[addResources = false, width = '750px']">Done</v-btn>
							</v-card-actions>
						</v-card>
					</v-col>
				</v-row>
			</v-form>
			<v-card-actions class="d-flex justify-end">
				<v-btn class="white--text" color="green" @click="[dialog = false, submit()]" > Accept Changes</v-btn>
			</v-card-actions>
			
		</v-card>
	</v-dialog>
</div>
</template>

<script>
import { db } from '@/main'
import firebase from 'firebase'
import store from "@/store"
import videoPanel from '@/components/Content_Forms/Resource_Forms2/videoPanel.vue'
import articlePanel from '@/components/Content_Forms/Resource_Forms2/articlePanel.vue'


export default {
	components:{
		videoPanel,
		articlePanel
	},
	data: function () { return {
		dialog: false,
		topicDialog: {}, 
			//contains {title:'', thumbnail:'', mapThumbnail:'', startDate:'', endDate:'', contentMD:''}
		width: '750px',
		newTopic: false,
		addResources: false,
		imgRule: [ v => !v || v.size > 0 && v.size < 2000000 || 'More than 2MB required'],
	}},
	computed: {
		topics() { return this.$store.state.allTopics; },
		removedResources() { return this.$store.state.removedResources; },
		newResources() { return this.$store.state.newResources; },
	},
	methods: {

		async mountTopics(){
			var topics = []
			await db.collection("topics").get().then( doc => {
				doc.forEach(function(i) {
					var t = i.data()
					t.id = i.id
					topics.push(t)
				})
			})
			store.dispatch("setAllTopics", topics);

			var res = []
			await db.collection("resources").get().then( doc => {
				doc.forEach(function(i) {
					var t = i.data()
					t.id = i.id
					res.push(t)
				})
			})
			store.dispatch("setResources", res);
		},

		async submit(){

			// if new event
			// if(this.newTopic){ //updates db & store.events
			// 	if(this.topicDialog.thumbnail){
			// 		await this.saveImage(this.topicDialog)
			// 	}
			// 	this.topicDialog.topicID = this.$store.state.topic.id
			// 	console.log('topic', this.topicDialog)
				
			// 	db.collection("events").add(this.topicDialog)
			// 	.then(function() { console.log("Document successfully updated!"); })
			// 	.catch(function(error) { console.error("Error updating document:", error); });
				
			// 	store.dispatch("addEvent", this.topicDialog);
			// 	this.newTopic = false
			// }
			// else{
				if(this.topicDialog.thumbnail){
					await this.deleteImage(this.topicDialog)
					await this.saveImage(this.topicDialog)
				}

				if(this.topicDialog.mapThumbnail){
					await this.deleteMapImage(this.topicDialog)
					await this.saveMapImage(this.topicDialog)
				}
				
				await db.collection("topics").doc(this.topicDialog.id)
				.update(this.topicDialog)
				.then(function() { console.log("Topics successfully updated!"); })
				.catch(function(error) { console.error("Error updating document:", error); });


				await db.collection("timePeriods").get().then( e => {
					e.forEach( doc =>{
						doc.data().topicTitles.forEach( (i, index) => {
							if (i.topicID == this.topicDialog.id){
								var newI = { thumbURL: this.topicDialog.thumbURL, title: this.topicDialog.title, topicID: this.topicDialog.id }
								var arr = doc.data().topicTitles
								arr.splice(index, 1, newI);

								doc.ref.update({
									topicTitles: arr
								})
							}
						})
					})
				})
				.then(function() { console.log("timePeriods successfully updated!"); })
				.catch(function(error) { console.error("Error updating timePeriod document:", error); });

			// }
			
			//if there are resources to remove
			if (this.removedResources.length != 0){ this.removingResources() }

			//if there are resources to add
			if (this.newResources.length != 0){ this.addingResources() }


			this.reset()
		},


		removingResources(){
			var batch = db.batch()
			
			this.removedResources.forEach(function(doc) {
				var ref = db.collection('resources').doc(doc.id)
				batch.delete(ref);
			});

			batch.commit()
			.then( function (doc) { store.dispatch("clear_removedResources") });
		},

		addingResources(){
			var batch = db.batch()

			this.newResources.forEach(function(doc) {
				var ref = db.collection('resources').doc()
				batch.set(ref, doc);
			});
	
			batch.commit()
			.then( function (doc) { store.dispatch("clear_newResources") });
		},


		//clears firebase storage - thumbFile - thumbURL
		async deleteImage(file){
			var desertRef = firebase.storage().ref().child(file.thumbnail.name);
			await desertRef.delete()
			.then(function() { 
				file.thumbFile = ''
				file.thumbURL = ''
			})
			.catch(function(error) { console.error("Error updating document: ", error) });
		},

		//updates firebase storeage - thumbFile - thumbURL - deletes thumbURL
		async saveImage(file){
			var storageRef = firebase.storage().ref().child(file.thumbnail.name)
			await storageRef.put(file.thumbnail)
			file.thumbFile = file.thumbnail.name
			file.thumbURL = await storageRef.getDownloadURL()
			delete file.thumbnail
		},


		// FOR ** MAP ** IMAGE //
		async deleteMapImage(file){
			var desertRef = firebase.storage().ref().child(file.mapThumbnail.name);
			await desertRef.delete()
			.then(function() { 
				file.mapThumbFile = ''
				file.mapThumbURL = ''
			})
			.catch(function(error) { console.error("Error updating document: ", error) });
		},

		async saveMapImage(file){
			var storageRef = firebase.storage().ref().child(file.mapThumbnail.name)
			await storageRef.put(file.mapThumbnail)
			file.mapThumbFile = file.mapThumbnail.name
			file.mapThumbURL = await storageRef.getDownloadURL()
			delete file.mapThumbnail
		},

		reset () {
			this.topicDialog = {}
			this.$refs.form.reset()
		},
	},
	mounted(){
		this.mountTopics()
	}
}
</script>
