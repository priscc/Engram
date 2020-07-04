<!-- Database SETUP
1) Add topic to *TIMEPERIOD Collection
2) Add topic TIMEPERIOD location && topic Collection info to the *SEARCH Collection
3) Create an new Collection for the added topic -->

<template>
	<div id="app">
	<v-container>
		<h1 class="pt-5">Add a New Topic</h1>
		<blockquote class="blockquote mb-3">Fill the following form to add topics and topics to the home web page</blockquote>
		<hr>
		<div style="height: 50px;"></div>
		<!-- FORM -->
		<!-- Adding Topic -->
		<v-form ref="form">
			<v-row>
				<v-col cols="7">
					<!-- Choose time period -->
					<h2 class="pb-4">Time Period</h2>
					<v-select class="ml-5 pl-5" v-model="selectedTimePeriod" :items="timePeriodsCategories" label="Choose:" outlined >{{ timePeriodsCategories }}</v-select>
					<h2 class="pt-5 pb-4">Topic Information</h2>
					<!-- enter topic name -->
					<v-text-field class="ml-5 pl-5" label="Enter topic title:" autocomplete="off" v-model="createdTopic.topicTitle"></v-text-field>
					<!-- upload image file -->
					<v-file-input class="ml-5 pl-5" accept="image/*" label="File input: topic icon image"></v-file-input>
				</v-col>
				<v-spacer></v-spacer>
				<v-col cols="3" class="d-flex align-start  flex-column">
					<!-- Submit Button -->
					<v-btn class="mt-auto" large color="success" v-on:click.prevent="submitData">SUBMIT</v-btn>
					<!-- Add Content -->
					<!-- <v-btn :disabled="createdTopic.topicTitle == '' " class="mt-5" large color="cyan" style="color: white;" to="/AddTcContent">Add Content to Topic</v-btn> -->
					<!-- Reset -->
					<v-btn class="mt-5" large outlined color="error" @click="reset">Reset Form</v-btn>
				</v-col>
			</v-row>
		</v-form>
	</v-container>
	</div>
</template>

<script>
import { db } from '@/main'
export default {
  data: function () {
    return {
      selectedTimePeriod: '',
      createdTopic: {
        topicTitle: '',
        img: 'logo.png',
        topicContent_published: false,
        collectionName: ''
      },
      timePeriodsCategories: ['Regional Interactions c.1200 - c.1450',
        'First Global Age c.1450 - c.1750',
        'Revolutions & Industrialization c.1750-c.1900',
        'Modern Times c.1900 - Present'],
      menu: false,
      url: '',
      timeperiod: 0
    }
  },
  methods: {
    async submitData () {
      this.timeperiod = this.timePeriodsCategories.indexOf(this.selectedTimePeriod) + 1
      const todosRef = await db.collection('*TIME_PERIODS')
      const id = todosRef.doc('time_period_' + this.timeperiod)
      var topics = await id.get().then(function (doc) {
        return doc.data().topics
      })
      // creating special collection name for newly added topic
      this.url = this.createdTopic.topicTitle.replace(/\s+/g, '').toLowerCase()
      this.createdTopic.collectionName = this.url
      // UPDATING *TIME_PERIODS collection
      topics.push(this.createdTopic)
      id.update({
        topics: topics
      })
      this.createCollection()
      this.addToSearch()
      this.reset()
    },
    async createCollection () {
      db.doc(this.url + '/Events').set({
        events: []
      })
    },
    async addToSearch () {
      db.collection('*SEARCH').doc().set({
        name: this.createdTopic.topicTitle,
        typeofContent: 'topic',
        collectionName: this.createdTopic.collectionName,
        locationInTIME_PERIODS: {
          collection: '*TIME_PERIODS',
          doc: 'time_period_' + this.timeperiod
        }
      })
    },
    save (date) { this.$refs.menu.save(date) },
    validate () { this.$refs.form.validate() },
    reset () { this.$refs.form.reset() },
    resetValidation () { this.$refs.form.resetValidation() }
  },
  watch: {
    menu (val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    }
  }
}
</script>
