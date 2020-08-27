<template>
<div id="app">

	<!-- Adding new Work  -->
	<v-container fluid class="pl-9">
		<v-form ref="form" v-model="valid">
			<v-row>
				<v-col cols="2">
					<v-file-input dense v-model="newWork.thumbnail" accept="image/*" counter show-size label="Thumbnail" placeholder="Thumbnail" :rules="imgRule" clearable></v-file-input>
				</v-col>
				<v-col cols="4">
					<v-text-field 
						v-model="newWork.title" label="Title" dense :rules="rule" required>
					</v-text-field>
					<v-textarea outlined rows="2" v-model="newWork.caption" label="Caption" :rules="rule" required></v-textarea>
				</v-col>
				<v-col class="d-flex flex-row justify-center pt-8" cols="2">
					<v-btn fab class="white--text" :disabled="!valid" color="green" @click="add"><v-icon>mdi-plus</v-icon></v-btn>
					<v-btn outlined class="white--text ml-3 mt-3" color="red" @click="reset">RESET</v-btn>
				</v-col>
				<v-spacer></v-spacer>
			</v-row>
		</v-form>
	</v-container>
	
	<!-- Display works -->
	<v-container>
		<v-row class="pt-5">
			<v-col v-for="(w, index) in works" :key="index" cols="4">
				<v-card class="pa-2 d-flex flex-column">
					<v-img height="125" :src="w.thumbURL"></v-img>
					<v-card-text>{{w.title}}</v-card-text>
					<v-card-subtitle>{{w.caption}}</v-card-subtitle>
					<v-btn fab x-small absolute top right @click="[dialog = true, work = w]">
						<v-icon>mdi-lead-pencil</v-icon>
					</v-btn>
				</v-card>
			</v-col>
		</v-row>
	</v-container>

	<!-- Revise work -->
	<v-dialog v-model="dialog" width="500px">
		<v-card elevation="4">
			<v-btn color="orange lighten-1" small fab absolute right dark rounded @click="reset()"><v-icon dark>mdi-close</v-icon></v-btn>
			<v-form class=" pt-6" ref="form" v-model="valid">
				<v-container>
					<v-row>
						<v-col>
							<v-file-input dense v-model="work.thumbnail" accept="image/*" counter show-size label="Thumbnail" :placeholder="work.thumbFile" :rules="imgRule2" clearable></v-file-input>
							<v-text-field 
								v-model="work.title" label="Term" :placeholder="work.title" dense >
							</v-text-field>
							<v-textarea outlined rows="2" v-model="work.caption" :placeholder="work.caption"  label="Definition"></v-textarea>
						</v-col>
					</v-row>
				</v-container>
			</v-form>
			<v-card-actions class="d-flex justify-end">
				<v-btn class="white--text" color="green" @click="[submit(), dialog = false]">Save</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</div>
</template>


<script type="text/javascript">
import { db } from '@/main'
import store from "@/store";
import _ from 'lodash'
import firebase from 'firebase'
export default {
	data: function () {return {
		dialog: false,
		newWork: {}, //form creates objects -- {thumbnail:'', title:'', caption:''}
		work: {}, //form creates objects -- {thumbnail:'', title:'', caption:''} (thumnail is removed)
		// Validation
		valid: true,
		rule: [ v => !!v || 'Required' ],
		imgRule: [ 
			v => !v || v.size > 0 && v.size < 2000000 || 'Image required',
		],
		imgRule2: [ v => !v || v.size > 0 && v.size < 2000000 || 'Image required' ]
	}},

	computed: {
		works() {
			return this.$store.state.works
		}
	},

	methods: {

		async add(){
			var keywords = _.words(this.newWork.title);

			this.newWork.topicID = this.$store.state.topic.id
			this.newWork.searchArray = keywords
				
			if(this.newWork.thumbnail){
				await this.saveImage(this.newWork)
			}
			
			db.collection("works").add(this.newWork)
			.then(function() { console.log("Document successfully updated!"); })
			.catch(function(error) { console.error("Error updating document:", error); });
			
			store.dispatch("addWork", this.newWork);

			this.reset()
		},

		async submit(){
			console.log('in here')
			if(this.work.thumbnail){
				await this.deleteImage(this.work)
				await this.saveImage(this.work)
			}
			db.collection("works").doc(this.work.id).update(this.work)
				.then(function() { console.log("Document successfully updated!"); })
				.catch(function(error) { console.error("Error updating document:", error); });

			this.reset()
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

		reset () { 
			this.work = {}
			this.newWork = {}
			this.dialog = false
			this.$refs.form.reset() 
		},
		validate () { this.$refs.form.validate() },
	}
}
</script>