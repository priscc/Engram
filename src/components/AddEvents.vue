** Form: Adding Events **

{ Shows Topic adding event to }

(form for adding events) | (events current in Topic)

****************************************************

<template>
<div id="app" >
	<v-container>
	<!-- Events Header -->
	<v-row class="pt-8">
		<v-col class="pb-0" cols="8">
			<h2 style="display: inline">Adding event to: </h2>
			<h2 style="display: inline" class="font-weight-light"><u><i>{{topicSelected}}</i></u></h2>
			<p>** need to put validations on the form</p>
			<!-- Events -->
			<v-expansion-panels class="pt-1" multiple>
				<v-expansion-panel>
					<v-expansion-panel-header>Events uploaded in the {{topicSelected}} </v-expansion-panel-header>
					<v-expansion-panel-content>
						<v-list rounded>
							<v-list-item class="box" v-for="event in events" :key="event.eventTitle">
								<v-row>
									<v-col class="d-flex align-center">
										<v-badge class="mt-2" color="red accent-4" :content="event.badge"></v-badge>
									</v-col>
									<v-col cols="10 pl-0">
											<p class="body-1" style="display: inline"><u>{{event.eventTitle}}</u></p>
											<p class="pl-3" style="display: inline">({{event.date}})</p>
									</v-col>
								</v-row>
							</v-list-item>
						</v-list>
					</v-expansion-panel-content>
				</v-expansion-panel>
			</v-expansion-panels>
		</v-col>
	</v-row>
	<!-- Add Evnet Content -->
	<v-container class="mt-6 px-6" fluid style="border:1px solid black; border-radius:10px;" >
		<v-row>
			<!-- FORM INPUTS-->
			<v-col>
				<v-form ref="form">

					<!-- Event type & title -->
					<v-row>
						<v-col>
							<v-select v-model="createdEvent.eventType" :items="typeOfEvent" outlined label="Event type:"></v-select>
						</v-col>
						<v-col cols="9">
							<v-text-field label="Enter event title:" autocomplete="off" v-model="createdEvent.eventTitle"></v-text-field>
						</v-col>
					</v-row>

					<!-- Date (calandar input) -->
					<v-row>
						<v-col>
							<v-menu  ref="menu" v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y min-width="290px">
								<template v-slot:activator="{ on }" >
									<v-text-field prepend-icon="event"  v-model="createdEvent.date" label="Event Start Date" readonly v-on="on" ></v-text-field>
								</template>
								<v-date-picker ref="picker" v-model="createdEvent.date" type="month" :max="new Date().toISOString().substr(0, 10)" min="1-01-01" @change="save" ></v-date-picker>
							</v-menu>
						</v-col>
						<!-- <v-col> -->
							<!-- <v-menu  ref="menu" v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y min-width="290px">
								<template v-slot:activator="{ on }" >
									<v-text-field prepend-icon="event" label="Event End Date" readonly v-on="on" ></v-text-field>
								</template>
								<v-date-picker ref="picker" v-model="createdEvent.date" type="month" :max="new Date().toISOString().substr(0, 10)" min="1-01-01" @change="save" ></v-date-picker>
							</v-menu> -->
						<!-- </v-col> -->
					</v-row>

					<!-- Event CONTENT -->
					<v-row>
						<v-col>
							Content: <v-textarea outlined v-model="createdEvent.content"  name="inputTextarea" label="Description"></v-textarea>
						</v-col>
						<v-col cols="6" class="text-wrap">
							<p class="mb-0">Preview:</p>
							<div  :key="createdEvent.content" v-markdown>{{createdEvent.content}}</div>
						</v-col>
					</v-row>
					<!-- Submit Button -->
					<v-row class="pt-5">
						<v-col class="d-flex align-end flex-column">
							<v-btn large color="success" v-on:click.prevent="submitData">SUBMIT</v-btn>
							<!-- Reset -->
							<v-btn class="mt-5" large outlined color="error" @click="reset">Reset Form</v-btn>
						</v-col>
					</v-row>
				</v-form>
			</v-col>
		</v-row>
	</v-container>
	</v-container>
</div>
</template>

<script>
import { db } from '@/main'

export default {
  props: {
    topicSelected: String
  },
  data: function () {
    return {
      markdown: '',
      topic: '',
      createdEvent: {
        eventName: '',
        contentType: 'Events',
        eventType: '',
        eventTitle: '',
        date: null,
        content: ''
      },
      events: [],
      typeOfInformation: ['Event', 'Terminology', 'Historical People'],
      typeOfEvent: ['Cause', 'Turning Points', 'Effect'],
      menu: false,
      collectionName: '',
      url: ''
    }
  },
  methods: {
    // STEPs:
    // 1) mounted locatingCollection()
    // 1a) search *SEARCH collection
    // 1b) set Topic which events will be adding to
    // 2) mountedEvents() is called by locatingCollection - displays events on right
    // 3) when the sumbit button is clicked, submitData() is called
    // 3a) creates in eventName
    // 3b) update topic/Events/ with new event
    // 3c) update *SEARCH with new event
    // 4) mountedEvents() is called, update displayed events on right

    // locatingCollection [wateched]: setting Topic which events are added to & refresh right Events
    async locatingCollection () {
      // finding collection name from *SEARCH
      var id = await db.collection('*SEARCH').where('name', '==', this.topicSelected).get().then(querySnapshot => {
        var x
        querySnapshot.forEach(doc => {
          x = doc.data().collectionName
          // grabbing the time_period its in
          var y = doc.data().locationInTIME_PERIODS.doc
          // this.updateTimePeroid(x, y);
        })
        return x
      })
      this.collectionName = id
      this.mountedEvents()
    },

    // mountedEvents: adding events to the right
    async mountedEvents () {
      this.events = []
      const todosRef = db.collection(this.collectionName).doc('Events')
      var events = await todosRef.get().then(function (doc) {
        var x = []
        doc.data().events.forEach(doc => {
          x.push(doc)
        })
        return x
      })
      this.events = this.organization(events) // sort events
    },

    // submitData: called when submit button is pressed
    async submitData () {
      console.log('ehy')
      // grabbing events currently within the topic
      const updateEvents = await db.collection(this.collectionName).doc(this.createdEvent.contentType)
      // fill in eventName
      this.url = this.createdEvent.eventTitle.replace(/\s+/g, '').toLowerCase()
      this.createdEvent.eventName = this.url
      // UPDATING events of topic
      this.events.push(this.createdEvent)
      var x = this.organization(this.events)
      updateEvents.update({
        events: x
      })
      this.mountedEvents()
      this.updateSearch()
      this.reset()
    },

    // updateSearch: updates *SEARCH collection
    async updateSearch () {
      db.collection('*SEARCH').doc().set({
        name: this.createdEvent.eventTitle,
        typeofContent: 'event',
        eventName: this.createdEvent.eventName,
        location: {
          collection: this.collectionName,
          doc: 'Events',
          dataArr: 'events'
        }
      })
    },

    // organization: sorts events by start date & add badge # accordingly
    organization (x) {
      x.sort(function (a, b) {
        a = new Date(a.date)
        b = new Date(b.date)
        return b - a
      })
      x.forEach((doc, i) => {
        doc.badge = i + 1
      })
      return x
    },

    // updateTimePeroid: updating topicContent_published if Topic now has content
    //* ***not used, find if there is a better way to do this
    async updateTimePeroid (x, y) {
      var id = await db.collection('*TIME_PERIODS').doc(y)
      var d = await id.get().then(querySnapshot => {
        return querySnapshot.data().topics
      })
      d.forEach(doc => {
        if (doc.collectionName == x) {
          doc.topicContent_published = true
        }
      })
      id.update({
        topics: d
      })
    },

    // save: used for calendar
    save (date) { this.$refs.menu.save(date) },

    // reset: resets form
    reset () { this.$refs.form.reset() }
  },
  watch: {
    // menu: used for calendar
    menu (val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    },
    // topicSelected: listens when Topic is change, updates Topic and mounted events
    topicSelected: function (val) {
      this.locatingCollection()
    }
  },
  mounted () {
    this.locatingCollection()
  }
}
</script>

<style type="text/css" scope>
	.box{
		text-align: left;
		background-color: #FCE4EC;
	}
</style>
