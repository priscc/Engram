<template>

  <!-- Add Evnet Content -->
  <v-container v-if="topicSelected != ''" class="mt-6" fluid >
    <v-row>
      
      <v-col class="py-0">
        <h2 class="text-center font-weight-light pb-2"><u> Add Historical Figures</u></h2>
        
        <!-- FORM -->       
        <v-form ref="form" v-model="valid" style="border:1px solid gold; border-radius:10px;" class="px-8">
          <v-row>
            <!-- Inputs -->
            <v-col>
              <v-row>
                <v-text-field v-model="createdFigure.figureName" label="Title:" auto-fill="off" :rules="rule" required></v-text-field>
              </v-row>
              <v-row>
                <v-menu ref="menu" v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y min-width="290px">
                  <template v-slot:activator="{ on }" >
                    <v-text-field prepend-icon="event" v-model="createdFigure.date" label="Date of Birth" readonly v-on="on" ></v-text-field>
                  </template>
                  <v-date-picker class="ma-0" ref="picker" v-model="createdFigure.date" type="month" :max="new Date().toISOString().substr(0, 10)" min="1-01-01" no-title >
                     <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                      <v-btn text color="primary" @click="save">OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-row>
              <!-- File upload -->
              <v-row>
                <v-file-input v-model="files" :rules="imgRule" accept="image/*" counter show-size label="File input" @change="change"></v-file-input>
              </v-row>
            </v-col>
            <v-col cols="7">
              Content: <v-textarea outlined v-model="createdFigure.content"  name="inputTextarea" label="Description" :rules="rule" required></v-textarea>
            </v-col>
          </v-row>


          <!-- Preview -->
          <v-row style="border: 1px solid black">
            <v-col class="mx-3">
              <v-row>
                <h3 class="font-weight-medium"><u>Preview:</u></h3>
              </v-row>
              <v-row>
                <v-col>
                  <div class="d-flex row">
                    <p class="font-weight-bold mb-0">{{createdFigure.figureName}}</p>
                    <p v-if="createdFigure.date != null" class="font-weight-light font-italic preview pl-5" :key="createdFigure.date" v-markdown>( {{createdFigure.date}} )</p>
                  </div>

                  <p class="font-weight-light subtitle-2 preview" :key="createdFigure.content" v-markdown>{{createdFigure.content}}</p>
                  
                </v-col>
                <v-col cols="7" class="d-flex justify-center">
                  <v-img v-if="files != ''" width="150" :src="preview"></v-img>
                </v-col>
              </v-row>
            </v-col></v-row>
          
          <!-- Submit Button -->
          <v-row>
            <v-col class="d-flex justify-end row-reverse">
              <v-btn class="mr-3" large color="error" outlined @click="reset">Reset Form</v-btn>
              <v-btn :disabled="!valid" large color="success" @click="submitData">SUBMIT</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>

      <!-- Side Display -->
      <v-col cols="4" class="py-0">
        <h2 class="text-center font-weight-light pb-2"><u>Historical Figures of the {{topicSelected}}</u></h2>
          <v-card class="mx-auto" max-width="400" tile >
            <v-list-item two-line v-for="(item, i) in items" :key="i">
              <v-list-item-content>
                  <v-list-item-title>{{item.figureName}}</v-list-item-title>
                  <v-list-item-subtitle>({{item.date}})</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-avatar>
                <v-img :src="item.image"></v-img>
              </v-list-item-avatar>
            </v-list-item>
          </v-card>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
import firebase from 'firebase'

export default {
  props: {
    topicSelected: String,
    collection: String,
    items: Array
  },
  data: function () {
    return {
      
      topic: '',
      // Form
        createdFigure: {
          figureName: '',
          name: '',
          image: '',
          date: null,
          content: ''
        },
        files: [],
        preview: '',
        markdown: '',
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
      
      var storageRef = firebase.storage().ref().child(this.$props.collection +'/People/'+ file.name)
      await storageRef.put(file)
      const imageRef = await storageRef.getDownloadURL()


      this.createdFigure.name = this.createdFigure.figureName.replace(/\s+/g, '').toLowerCase()
      this.createdFigure.image = imageRef
      this.$props.items.push(this.createdFigure)
      await this.$emit('updateTopic', this.$props.items)      
      this.reset()
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
  }
}
</script>
