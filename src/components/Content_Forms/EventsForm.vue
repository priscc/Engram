<template>

	<!-- Add Evnet Content -->
	<v-container v-if="topicSelected != ''" class="mt-6" fluid >
		<v-row>
			<v-col class="py-0">
				<h2 class="text-center font-weight-light pb-2"><u> Add Events</u></h2>
        
        <!-- FORM -->
        <v-form ref="form" v-model="valid" style="border:1px solid deeppink; border-radius:10px;" class="px-8">
					<v-row>
            <!-- Input -->
						<v-col cols="5">

							<v-row>
                <v-text-field v-model="createdEvent.eventTitle" label="Title:" auto-fill="off" :rules="rule" required></v-text-field>
              </v-row>
              <v-row>
                <v-file-input v-model="files" :rules="imgRule" accept="image/*" counter show-size label="Thumbnail" @change="change"></v-file-input>
              </v-row>
              <v-row>
                <v-menu ref="menu" v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y min-width="290px">
                <template v-slot:activator="{ on }" >
                  <v-text-field prepend-icon="event"  v-model="createdEvent.date" label="Start date" readonly v-on="on" ></v-text-field>
                </template>
                <v-date-picker ref="picker" v-model="createdEvent.date" type="month" :max="new Date().toISOString().substr(0, 10)" min="1-01-01" no-title >
                   <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="save">OK</v-btn>
                </v-date-picker>
                </v-menu>
              </v-row>
              <v-row class="">
                <v-select v-model="createdEvent.eventType" :items="typeOfEvent" dense outlined label="Category:" :rules="rule" required></v-select>
              </v-row>
            </v-col>
            <v-col class="ml-2 pt-4">
                Content: <v-textarea outlined v-model="createdEvent.content" name="inputTextarea" label="Description"  :rules="rule" required></v-textarea>
            </v-col>
					</v-row>

					<!-- Preview -->
          <v-row style="border: 1px solid black">
            <v-col class="mx-3">
              <v-row>
                <h3 class="font-weight-medium"><u>Preview:</u></h3>
              </v-row>
              <v-row>
                <v-col cols="7">
                  <div class="d-flex row">
                    <p class="font-weight-bold mb-0">{{createdEvent.eventTitle}}</p>
                    <p v-if="createdEvent.date != null" class="font-weight-light font-italic preview pl-5" :key="createdEvent.date" v-markdown>( {{createdEvent.date}} )</p>
                    <p class="font-weight-light pl-5"><small>{{createdEvent.eventType}}</small></p>
                  </div>

                  <p class="font-weight-light subtitle-2 preview" :key="createdEvent.content" v-markdown>{{createdEvent.content}}</p>
                  
                </v-col>
                <v-col class="d-flex justify-center">
                  <v-img v-if="files != ''" width="150" :src="preview"></v-img>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

					<!-- Submit Button -->
					<v-row>
            <v-col class="d-flex justify-end row-reverse">
              <v-btn class="mr-3" large color="error" outlined @click="reset">Reset Form</v-btn>
              <v-btn :disabled="!valid" large color="success" @click="submitData">SUBMIT</v-btn>
            </v-col>
          </v-row>
				</v-form>
			</v-col>

      <!-- Side Events -->
      <v-col cols="4" class="py-0">
        <h2 class="text-center font-weight-light pb-2"><u>Events in the {{topicSelected}}</u></h2>
          <v-card class="mx-auto" max-width="400" tile >
            <v-list-item two-line v-for="(event, i) in events" :key="i">
              <v-list-item-content>
                <v-row>
                  <v-col cols="1" class="ml-3">
                    <v-badge color="red accent-4" :content="event.badge"></v-badge>
                  </v-col>
                  <v-col>
                    <v-list-item-title>{{event.eventTitle}}</v-list-item-title>
                    <v-list-item-subtitle>({{event.date}})</v-list-item-subtitle>
                  </v-col>
                </v-row>
              </v-list-item-content>
              <v-list-item-avatar>
                <v-img :src="event.image"></v-img>
              </v-list-item-avatar>
            </v-list-item>
          </v-card>
      </v-col>
		</v-row>
	</v-container>

</template>

<script>
import { db } from '@/main'
import firebase from 'firebase'

export default {
  props: {
    topicSelected: String,
    collection: String,
    events: Array
  },
  data: function () {
    return {
      
      topic: '',
      // Form
        createdEvent: {
          eventTitle: '',
          image: '',
          name: '',
          eventType: '',
          date: null,
          content: ''
        },
        files: [],
        preview: '',
        markdown: '',
        typeOfEvent: ['Cause', 'Turning Points', 'Effect'],
        menu: false,
      // Validation
        valid: true,
        rule: [ v => !!v || 'Required' ],
        imgRule: [ v => !v || v.size < 2000000 || 'Image size should be less than 2 MB!']
    }
  },
  methods: { 

    // submitData: called when submit button is pressed
    async submitData () {
      
      this.valid = false

      var file = this.files
      
      var storageRef = firebase.storage().ref().child(this.$props.collection +'/Events/'+ file.name)
      await storageRef.put(file)
      const imageRef = await storageRef.getDownloadURL()

      this.createdEvent.name = this.createdEvent.eventTitle.replace(/\s+/g, '').toLowerCase()
      this.createdEvent.image = imageRef
      this.$props.events.push(this.createdEvent)

      this.organization()

      await this.$emit('updateTopic', this.$props.events)      
      this.reset()
    },
   

    // organization: sorts events by start date & add badge # accordingly
    organization () {
      var x = this.$props.events
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

    change(e){

      if (e)
        this.preview = URL.createObjectURL(e)
      else
        this.preview = ''
    },

    // save: used for calendar
    save (date) { this.$refs.menu.save(date) },
    // reset: resets form
    reset () { this.$refs.form.reset() },

    validate () { this.$refs.form.validate() },
  },
  watch: {
    // menu: used for calendar
    menu (val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    },
    // topicSelected: listens when Topic is change, updates Topic and mounted events
    // topicSelected: function (val) {
    //   this.locatingCollection()
    // }
  }
}
</script>
