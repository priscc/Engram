<template>

  <!-- Add Evnet definition -->
  <v-container v-if="topicSelected != ''" class="mt-6" fluid >
    <v-row>
      <!-- FORM INPUTS-->
      <v-col class="py-0">
        <h2 class="text-center font-weight-light pb-2"><u> Add terms</u></h2>
        <v-form ref="form" v-model="valid" style="border:1px solid darkturquoise; border-radius:10px;" class="px-8">
          <v-row>
            <v-col cols="6">
              <v-row>
                <v-text-field v-model="createdTerm.term" label="Term:" auto-fill="off" :rules="rule" required></v-text-field>
              </v-row>
              <v-row>
                <v-col>
                  Definition: <v-textarea outlined v-model="createdTerm.definition"  name="inputTextarea" label="Description" :rules="rule" required></v-textarea>
                </v-col>
              </v-row>
            </v-col>
            <v-col class="my-4 ml-4" style="border: 1px solid black">
              <p class="mb-0">Preview:</p>
              <div :key="createdTerm.definition" v-markdown>{{createdTerm.definition}}</div>
            </v-col>
          </v-row>
          
          <!-- Submit Button -->
          <v-row class="pt-5">
            <v-col class="d-flex align-end flex-column">
              <v-btn  :disabled="!valid" large color="success" @click="submitData">SUBMIT</v-btn>
              <!-- Reset -->
              <v-btn class="mt-5" large outlined color="error" @click="reset">Reset Form</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>

      <!-- Side Events -->
      <v-col cols="4" class="py-0">
        <h2 class="text-center font-weight-light pb-2"><u>Terms of the {{topicSelected}}</u></h2>
          <v-card class="mx-auto" max-width="400" tile >
            <v-list-item v-for="(item, i) in items" :key="i">
                <v-list-item-title>{{item.term}}</v-list-item-title>
            </v-list-item>
            
          </v-card>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>

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
        createdTerm: {
          term: '',
          name: '',
          definition: ''
        },
        markdown: '',
        typeOfEvent: ['Cause', 'Turning Points', 'Effect'],
        menu: false,
      // Validation
        valid: true,
        rule: [ v => !!v || 'Required' ],
    }
  },
  methods: { 

    // submitData: called when submit button is pressed
    async submitData () {

      this.createdTerm.name = this.createdTerm.term.replace(/\s+/g, '').toLowerCase()
      this.$props.items.push(this.createdTerm)
      // this.organization()

      await this.$emit('updateTopic', this.$props.items)

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

    // reset: resets form
    reset () { this.$refs.form.reset() },

    validate () { this.$refs.form.validate() },
  },
}
</script>
