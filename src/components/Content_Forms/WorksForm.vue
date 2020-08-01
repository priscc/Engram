<template>

  <!-- Add Evnet definition -->
  <v-container v-if="topicSelected != ''" class="mt-6" fluid >
    <v-row>
      <v-col class="py-0">
        <h2 class="text-center font-weight-light pb-2"><u> Add Works of the Time</u></h2>
        
        <!-- FORM -->
        <v-form ref="form" v-model="valid" style="border:1px solid darkturquoise; border-radius:10px;" class="px-8">
          <!-- Inputs -->
          <v-row>
            <v-col cols="5">
              <v-row>
                <v-text-field v-model="createdWorks.work" label="Artifact:" auto-fill="off" :rules="rule" ></v-text-field>
              </v-row>
              <v-row>
                <!-- File upload -->
                <v-file-input v-model="files" :rules="imgRule" accept="image/*" counter show-size label="File input" @change="change"></v-file-input>
              </v-row>
            </v-col>
            <v-col class="ml-2 pt-5">
                  Description: <v-textarea outlined v-model="createdWorks.description"  name="inputTextarea" label="Description" :rules="rule" ></v-textarea>
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
                  <p class="subtitle-1 mb-1">{{createdWorks.work}}</p>
                  <p class="font-weight-light subtitle-2 preview" height="10" :key="createdWorks.description" v-markdown>{{createdWorks.description}}</p>
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
        <h2 class="text-center font-weight-light pb-2"><u>Works of the {{topicSelected}}</u></h2>
        <v-card class="mx-auto" max-width="400" tile >
          <v-list-item v-for="(item, i) in items" :key="i">
              <v-list-item-avatar>
                <v-img :src="item.image"></v-img>
              </v-list-item-avatar>
              <v-list-item-title>{{item.work}}</v-list-item-title>
              
          </v-list-item>
        </v-card>
        <!-- <v-progress-circular class="mt-5" :rotate="360" :size="100" :width="15" :value="value" color="teal"> {{ value }} </v-progress-circular> -->
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
      value: 0,
      // Form
        createdWorks: {
          work: '',
          name: '',
          image: '',
          description: ''
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
      
      var storageRef = firebase.storage().ref().child(this.$props.collection +'/Works/'+ file.name)

      await storageRef.put(file)

      // .on('state_changed',
      //     function progress(snapshot){
      //       var percentage = Math.floor((snapshot.bytesTransferred /snapshot.totalBytes) * 100)
      //       this.value = percentage
      //     }.bind(this),

      //     function error(err){},
      //     function complete(){
      //       if (this.value === 100) {
      //         return (this.value = 0)
      //       }
      //     }.bind(this),
      // )

      const imageRef = await storageRef.getDownloadURL()

      this.createdWorks.name = this.createdWorks.work.replace(/\s+/g, '').toLowerCase()
      this.createdWorks.image = imageRef
      this.$props.items.push(this.createdWorks)

      await this.$emit('updateTopic', this.$props.items)
      
      
      this.reset()

       
    },
   
    change(e){
    //   console.log('evet ', e)

      if (e)
        this.preview = URL.createObjectURL(e)
      else
        this.preview = ''
    },


    // reset: resets form
    reset () { 
      this.value = 0
      this.$refs.form.reset()
    },

    validate () { this.$refs.form.validate() },
  }
}
</script>

<style scoped>
  .preview {
    max-width: 500px;
    margin: 0 auto;
    width: 100%;
    text-align: justify;
  }
  .preview {
    -webkit-hyphens: auto;
    -moz-hyphens: auto;
    -ms-hyphens: auto;
    hyphens: auto;
  }
</style>
