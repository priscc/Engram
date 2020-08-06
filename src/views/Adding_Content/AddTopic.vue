<template>
<div id="app">
	<v-container>
		<v-row class="blue-grey darken-2 white--text text-center">
			<v-col>
				<h1 class="display-1">Add a New Topic</h1>
				<blockquote class="blockquote pa-0">Fill the following form to add topics and topics to the home web page</blockquote>
			</v-col>
		</v-row>
		<!-- FORM -->
		<v-form ref="form" v-model="valid">
			<v-row>
				<v-spacer></v-spacer>
				<v-col cols="9">
					<v-text-field label="Topic title:" autocomplete="off" v-model="createdTopic.title" :rules="rule" required></v-text-field>
					<v-select v-model="timePeriod" :items="timePeriods" label="Choose Time Period:" outlined dense :rules="rule" required>{{ timePeriods }}</v-select>
					<v-row class="pt-2">
						<v-col cols="4">
							<v-file-input :rules="imgRule" accept="image/*" counter show-size label="Thumbnail"></v-file-input>
						</v-col>
						<v-col>
							<v-textarea disabled outlined name="input-7-4" label="Topic intro content" value="This is just a tester, don't fill out" ></v-textarea>
						</v-col>
					</v-row>
					<v-row>
						<v-col class="d-flex justify-end row-reverse">
							<v-btn class="mr-3" large color="error" outlined @click="reset">Reset Form</v-btn>
							<v-btn :disabled="!valid" large color="success" @click="submitData">SUBMIT</v-btn>
						</v-col>
					</v-row>
				</v-col>
				<v-spacer></v-spacer>
			</v-row>
		</v-form>
	</v-container>
</div>
</template>


<script>
import { db } from '@/main'
import firebase from '@/main'
import _ from 'lodash'
export default {
	data: function () { return {
		// New Topic info
		createdTopic: {
			title: '',
			thumbURL: 'logo.png',
			contentMD: 'this is introductory content that will probably end up being a paragraph long'
		},
		// Form
		timePeriods: [
			'Regional Interactions c.1200 - c.1450',
			'First Global Age c.1450 - c.1750',
			'Revolutions & Industrialization c.1750-c.1900',
			'Modern Times c.1900 - Present'
		],
		timePeriod: '',
		// Validation
		valid: true,
		rule: [ v => !!v || 'Required' ],
		imgRule: [ v => !v || v.size < 2000000 || 'Image size should be less than 2 MB!']
	}},
	methods: {
		async submitData () {
			//creating doc
			let topicID = await db.collection("topics").add(this.createdTopic)
				.then(function(docRef) {
					return docRef.id;
				}).catch(function(error) {
					console.error("Error adding document: ", error);
				});
			
			//pulling info from timePeriods
			var updatedTopics = []
			var id = ''
			await db.collection("timePeriods").where('title', '==', this.timePeriod).get()
				.then(function(querySnapshot) {
					querySnapshot.forEach(function(doc) {
						updatedTopics = doc.data().topicTitles
						id = doc.id
					});
				})
				.catch(function(error) {
					console.log("Error getting documents: ", error);
				});
				
			//updating timePeriods
			var newTopic = {topicID: topicID, title: this.createdTopic.title, thumbURL: this.createdTopic.thumbURL}
			updatedTopics.push(newTopic)
			db.collection("timePeriods").doc(id).update( {'topicTitles': updatedTopics} )
				.then(function() { console.log( "Document successfully updated!"); })
				.catch(function(error) { console.error( "Error updating document: ", error); });
			
			this.reset()
		},
		validate () { 
			this.valid = false
			this.$refs.form.validate() 
		},
		reset () { this.$refs.form.reset() }
	}
}
</script>
