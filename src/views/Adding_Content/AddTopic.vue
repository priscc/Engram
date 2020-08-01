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
				<v-col cols="8">
					<v-text-field label="Enter topic title:" autocomplete="off" v-model="createdTopic.topic" :rules="rule" required></v-text-field>
					<v-select v-model="createdTopic.timeperiod" :items="timePeriods" label="Choose:" outlined :rules="rule" required>{{ timePeriods }}</v-select>
					<v-file-input :rules="imgRule" accept="image/*" counter show-size label="Thumbnail"></v-file-input>
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
import _ from 'lodash'

export default {
  data: function () {
	 return {
	 	// New Topic info
			createdTopic: {
			  topic: '',
			  timeperiod: '',
			  img: 'logo.png',
			  published: false
			  //  add event, epople, term, works
			},
		// Form
		timePeriods: [
		  'Regional Interactions c.1200 - c.1450',
		  'First Global Age c.1450 - c.1750',
		  'Revolutions & Industrialization c.1750-c.1900',
		  'Modern Times c.1900 - Present'
		],
		timeperiod: 0,
		// Validation
		  valid: true,
		  rule: [ v => !!v || 'Required' ],
		  imgRule: [ v => !v || v.size < 2000000 || 'Image size should be less than 2 MB!']
	 }
  },
  methods: {
	 async submitData () {
	 	this.valid = false
		
		let newTopic = db.collection("topics").doc(_.camelCase(this.createdTopic.topic))
		
		newTopic.set(this.createdTopic)
		newTopic.collection("events").doc("parentCollection").set(this.createdTopic)
		newTopic.collection("terms").doc("parentCollection").set(this.createdTopic)
		newTopic.collection("people").doc("parentCollection").set(this.createdTopic)
		newTopic.collection("works").doc("parentCollection").set(this.createdTopic)

		this.reset()
	 },

	 validate () { this.$refs.form.validate() },
	 reset () { this.$refs.form.reset() }
  }
}
</script>
