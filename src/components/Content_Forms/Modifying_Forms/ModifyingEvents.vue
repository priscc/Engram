<template>
<div id="app">

	<!-- **** still need to put img rules -->
	<v-container class="mt-6">
		<v-row>
			<!-- adding new event -->
			<v-col cols="4" class="d-flex flex-column align-center justify-center">
				<v-hover v-slot:default="{ hover }">
						<v-btn :elevation="hover ? 12 : 2" color="pink" dark large fab @click="[dialogNew = true, newEvent = true]">
							<v-icon>mdi-plus</v-icon>
						</v-btn>
				</v-hover>
				<p class="caption pt-3 mb-0 font-weight-medium">Add Event</p>
				<p class="caption pt-0">(add resources after event is created)</p>
			</v-col>
			<!-- displaying current events -->
			<v-col cols="4" v-for="(event, i) in events" :key="i">
				<v-hover v-slot:default="{ hover }">
					<v-card :elevation="hover ? 12 : 2" class="mx-auto">
						<v-btn fab small absolute top right @click="[dialog = true, eventDialog = event]">
							<v-icon>mdi-lead-pencil</v-icon>
						</v-btn>
						<v-img height="125" :src="event.thumbURL"></v-img>
						<v-card-text>{{event.title}}</v-card-text>
					</v-card>
				</v-hover>
			</v-col>
		</v-row>
	</v-container>

	<!-- NEW events form -->
	<v-dialog v-model="dialogNew" :width="width">
		<v-card outlined>
			<v-btn color="orange lighten-1" small fab absolute right dark rounded @click="[dialogNew = false, reset()]"><v-icon dark>mdi-close</v-icon></v-btn>
			<v-form ref="form" class="px-8 pt-8">
				<v-row>
					<v-col class="pb-0">
						<v-row>
							<v-col>
								<v-text-field dense filled v-model="eventDialogNew.title" label="Title:" auto-fill="off" clearable></v-text-field>
							</v-col>
						</v-row>
						<v-row>
							<v-col>
								<v-text-field filled v-model="eventDialogNew.startDate" label="Birth:" placeholder="YYYY" auto-fill="off"></v-text-field>
							</v-col>
							<v-col>
								<v-text-field filled v-model="eventDialogNew.endDate" label="Passing:" placeholder="YYYY" auto-fill="off"></v-text-field>
							</v-col>
						</v-row>
						<v-row>
							<v-col>
								<v-file-input dense v-model="eventDialogNew.thumbnail" accept="image/*" counter show-size label="Thumbnail" :rules="imgRule" clearable></v-file-input>
							</v-col>
							<v-col>
								<v-select dense v-model="eventDialogNew.eventType" :items="typeOfEvent" outlined label="Event Category:" clearable></v-select>
							</v-col>
						</v-row>
						<v-row>
							<v-col>
								<v-text-field dense filled v-model="eventDialogNew.summaryMD" label="Summary of event on topic:" clearable></v-text-field>
								<v-textarea dense filled v-model="eventDialogNew.contentMD" label="Main event content: *has markdown"></v-textarea>
							</v-col>
						</v-row>
					</v-col>
				</v-row>
			</v-form>
			<v-card-actions class="d-flex justify-end">
				<v-btn class="white--text" color="green" @click="[dialogNew = false, submit()]" > Accept Changes</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>



	<!-- MOD events form -->
	<v-dialog v-model="dialog" :width="width">
		<v-card outlined>
			<v-btn color="orange lighten-1" small fab absolute right dark rounded @click="reset()"><v-icon dark>mdi-close</v-icon></v-btn>
			<v-form ref="form" class="px-8 pt-8">
				<v-row>
					<v-col class="pb-0">
						<v-row>
							<v-col>
								<v-text-field dense filled v-model="eventDialog.title" label="Title:" auto-fill="off" clearable></v-text-field>
							</v-col>
						</v-row>
						<v-row>
							<v-col>
								<v-text-field filled v-model="eventDialog.startDate" label="Start:" placeholder="YYYY" auto-fill="off"></v-text-field>
							</v-col>
							<v-col>
								<v-text-field filled v-model="eventDialog.endDate" label="End:" placeholder="YYYY" auto-fill="off"></v-text-field>
							</v-col>
						</v-row>
						<v-row>
							<v-col>
								<v-file-input dense v-model="eventDialog.thumbnail" accept="image/*" counter show-size label="Thumbnail" :placeholder="eventDialog.thumbFile" :rules="imgRule" clearable></v-file-input>
							</v-col>
							<v-col>
								<v-select dense v-model="eventDialog.eventType" :items="typeOfEvent" outlined label="Event Category:" :placeholder="eventDialog.eventType" clearable></v-select>
							</v-col>
						</v-row>
						<v-row>
							<v-col>
								<v-btn v-if="!newEvent" small rounded class="mb-6 purple lighten-1 text-center" block dark @click="[addResources = true, width='100%']">Add & Edit Resources</v-btn>
								<v-text-field dense filled v-model="eventDialog.summaryMD" label="Summary of event on topic:" :placeholder="eventDialog.summaryMD" clearable></v-text-field>
								<v-textarea dense filled v-model="eventDialog.contentMD" label="Main event content: *has markdown" :placeholder="eventDialog.contentMD"></v-textarea>
							</v-col>
						</v-row>
					</v-col>

					<!-- mod event resources -->
					<v-col v-if="addResources"cols="7">
						<v-card outlined class="py-2 px-4" style="border-color: #AB47BC;" >
							<add-resources :parentID="eventDialog.id" :parentType="'event'"></add-resources>
							
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
import addResources from "../Resource_Forms2/addResources.vue"
import { db } from '@/main'
import store from "@/store";
import firebase from 'firebase'
export default {
	components:{
		addResources
	},
	data: function () { return {
		dialogNew: false,
		dialog: false,
		eventDialog: {}, //passes event into v-model eventDialog and allows form to change it
		eventDialogNew: { title:'', topicID:'', startDate: '', endDate: '', thumbURL:'', contentMD:'', summaryMD:'', eventType:''},
		width: '750px',
		newEvent: false,
		addResources: false,
		menu: false,
		preview: '',
		typeOfEvent: ['None', 'Cause', 'Turning Point', 'Impact'],
		imgRule: [ v => !v || v.size > 0 && v.size < 2000000 || 'Image required']
	}},
	computed: {
		events() { return this.$store.state.events; },
		removedResources() { return this.$store.state.removedResources; },
		newResources() { return this.$store.state.newResources; },
	},
	methods:{
		async submit(){
			
			//if new event
			if(this.newEvent){ //updates db & store.events
				if(this.eventDialogNew.thumbnail){
					await this.saveImage(this.eventDialogNew)
				}
				this.eventDialogNew.topicID = this.$store.state.topic.id
				console.log('topic', this.eventDialogNew)
				
				db.collection("events").add(this.eventDialogNew)
				.then(function() { console.log("Document successfully updated!"); })
				.catch(function(error) { console.error("Error updating document:", error); });
				
				store.dispatch("addEvent", this.eventDialogNew);
				this.newEvent = false
			}
			else{
				if(this.eventDialog.thumbnail){
					// await this.deleteImage(this.eventDialog)
					await this.saveImage(this.eventDialog)
				}

				// console.log('this.eventDialog', this.eventDialog.id)
				db.collection("events").doc(this.eventDialog.id).update(this.eventDialog)
				.then(function() { console.log("Document successfully updated!"); })
				.catch(function(error) { console.error("Error updating document:", error); });
			}
			
			console.log('this.removedResources', this.removedResources)
			console.log('this.newResources', this.newResources)
			//if there are resources to remove
			if (this.removedResources.length != 0){ this.removingResources() }

			//if there are resources to add
			if (this.newResources.length != 0){ this.addingResources() }


			this.reset()
		},

		removingResources(){
			var batch = db.batch()
			var promises = []

			//promise to remove resource image files first
			var images = this.removedResources.filter(r => r.resourceType === 'image')
			images.forEach(doc => {
				promises.push(this.deleteImage(doc));
			});

			//batch commit all resources after all promises are resolved
			Promise.all(promises)
			.then( function(doc) { 
				this.removedResources.forEach(function(doc) {
					var ref = db.collection('resources').doc(doc.id)
					batch.delete(ref);
				}.bind(this));
			}.bind(this))
			.then( function(doc) { batch.commit() })
			.then( function (doc) { store.dispatch("clear_removedResources") });
		},

		addingResources(){
			var batch = db.batch()
			var promises = []

			//promise to upload any resource image files first
			var images = this.newResources.filter(r => r.resourceType === 'image')
			images.forEach(doc => {
				delete doc.preview;
				promises.push(this.saveImage(doc));
			});

			//batch commit all resources after all promises are resolved
			Promise.all(promises)
			.then( function(doc) { 
				this.newResources.forEach(function(doc) {
					doc.topicID = this.$store.state.topic.id
					var ref = db.collection('resources').doc()
					batch.set(ref, doc);
				}.bind(this));
			}.bind(this))
			.then( function(doc) { batch.commit() })
			.then( function (doc) { store.dispatch("clear_newResources") });
		},

		//clears firebase storage - thumbFile - thumbURL
		async deleteImage(file){
			console.log('file')
			var desertRef = firebase.storage().ref().child(file.thumbFile);
			console.log(desertRef)
			await desertRef.delete()
			.catch(function(error) { console.error("Error updating document: ", error) });
		},

		//updates firebase storeage - thumbFile - thumbURL - deletes thumbURL
		async saveImage(file){
			var storageRef = firebase.storage().ref().child(file.thumbnail.name)
			await storageRef.put(file.thumbnail)
			file.thumbFile = file.thumbnail.name
			file.thumbURL = await storageRef.getDownloadURL()
			delete file.thumbnail
			console.log("img added", file)
		},

		save (date) { this.$refs.menu.save(date) },
		reset () { 
			this.eventDialog = {}
			this.eventDialogNew = { title:'', topicID:'', startDate: '', endDate: '', thumbURL:'', contentMD:'', summaryMD:'', eventType:''}
			this.newEvent = false
			this.dialog = false
			this.addResources = false
			this.width = '750px'

			this.$refs.form.reset() 
		},

	},
	watch: {
		menu (val) {
			val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
		}
	}
		
}
</script>
