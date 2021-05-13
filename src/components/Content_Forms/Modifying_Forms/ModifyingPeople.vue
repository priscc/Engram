<template>
<div id="app">

	<v-container class="mt-6">
		<v-row>
			<!-- adding new person -->
			<v-col cols="4" class="d-flex flex-column align-center justify-center">
				<v-hover v-slot:default="{ hover }">
						<v-btn :elevation="hover ? 12 : 2" color="pink" dark large fab @click="[dialog = true, newEvent = true]">
							<v-icon>mdi-plus</v-icon>
						</v-btn>
				</v-hover>
				<p class="caption pt-3 mb-0 font-weight-medium">Add Image</p>
				<p class="caption pt-0">(add resources after person is created)</p>
			</v-col>
			
			<!-- displaying current events -->
			<v-col cols="4" v-for="(person, i) in people" :key="i">
				<v-hover v-slot:default="{ hover }">
					<v-card :elevation="hover ? 12 : 2" class="mx-auto">
						<v-btn fab small absolute top right @click="[dialog = true, personDialog = person]">
							<v-icon>mdi-lead-pencil</v-icon>
						</v-btn>
						<v-img height="125" :src="person.thumbURL"></v-img>
						<v-card-text>{{person.name}}</v-card-text>
					</v-card>
				</v-hover>
			</v-col>
		</v-row>
	</v-container>

	<!-- mod events form -->
	<v-dialog v-model="dialog" :width="width">
		<v-card outlined>
			<v-btn color="orange lighten-1" small fab absolute right dark rounded @click="reset()"><v-icon dark>mdi-close</v-icon></v-btn>
			<v-form ref="form" class="px-8 pt-8">
				<v-row>
					<!-- mod event content -->
					<v-col class="pb-0">
						<v-text-field filled v-model="personDialog.name" label="Figure name:" auto-fill="off"></v-text-field>
						<v-row>
							<v-col cols="5">
								<v-file-input dense v-model="personDialog.thumbnail" accept="image/*" counter show-size label="Thumbnail" :placeholder="personDialog.thumbFile" ></v-file-input>
							</v-col>
							<v-col>
								<v-text-field filled v-model="personDialog.dateOfBirth" label="Birth:" placeholder="YYYY" auto-fill="off"></v-text-field>
							</v-col>
							<v-col>
								<v-text-field filled v-model="personDialog.dateOfDeath" label="Passing:" placeholder="YYYY" auto-fill="off"></v-text-field>
							</v-col>
						</v-row>
						<v-btn v-if="!newEvent" small rounded class="mb-6 purple lighten-1 text-center" block dark @click="[addResources = true, width='100%']">Add & Edit Resources</v-btn>
						<v-textarea filled v-model="personDialog.contentMD" label="Main event content: *has markdown" :placeholder="personDialog.contentMD" ></v-textarea>
		

					</v-col>

					<!-- mod event resources -->
					<v-col v-if="addResources"cols="7">
						<v-card outlined class="py-2 px-4" style="border-color: #AB47BC;" >
							<add-resources :parentID="personDialog.id" :parentType="'people'"></add-resources>
							
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
		dialog: false,
		personDialog: {}, //passes event into v-model personDialog and allows form to change it
			//form contains --> { title:'', topicID:'', date:null, thumbURL:'', contentMD:'', roleMD:'', eventType:'', personDialog:'' (is deleted before doc creation) }
		width: '750px',
		newEvent: false,
		addResources: false,
		menu: false,
		preview: '',
		typeOfEvent: ['Cause', 'Turning Points', 'Effect'],
		imgRule: [ v => !v || v.size > 0 && v.size < 2000000 || 'Image larger than 2MB']
	}},
	computed: {
		people() { return this.$store.state.people; },
		removedResources() { return this.$store.state.removedResources; },
		newResources() { return this.$store.state.newResources; },
	},
	methods:{
		async submit(){
			
			//if new event
			if(this.newEvent){ //updates db & store.events
				if(this.personDialog.thumbnail){
					await this.saveImage(this.personDialog)
				}
				this.personDialog.topicID = this.$store.state.topic.id
				console.log('topic', this.personDialog)
				
				db.collection("people").add(this.personDialog)
				.then(function() { console.log("Document successfully updated!"); })
				.catch(function(error) { console.error("Error updating document:", error); });
				
				store.dispatch("addPerson", this.personDialog);
				this.newEvent = false
			}
			else{
				if(this.personDialog.thumbnail){
					await this.deleteImage(this.personDialog)
					await this.saveImage(this.personDialog)
				}
				db.collection("people").doc(this.personDialog.id).update(this.personDialog)
				.then(function() { console.log("Document successfully updated!"); })
				.catch(function(error) { console.error("Error updating document:", error); });
			}
			
			//if there are resources to remove
			if (this.removedResources.length != 0){ this.removingResources() }

				console.log('new resources', this.$store.state.newResources)
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
					// batch.set(ref, doc);
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
					console.log(doc)
					var ref = db.collection('resources').doc()
					batch.set(ref, doc);
				}.bind(this));
			}.bind(this))
			.then( function(doc) { batch.commit() })
			.then( function (doc) { store.dispatch("clear_newResources") });
		},

		//clears firebase storage - thumbFile - thumbURL
		async deleteImage(file){
			var desertRef = firebase.storage().ref().child(file.thumbFile);
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
			console.log("img added", file)
		},

		save (date) { this.$refs.menu.save(date) },
		reset () { 
			this.personDialog = {}
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
