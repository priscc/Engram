<!-- form that adds blog -->

<template>
<div id="app">
<v-container>

	<h3 class="pt-4">Interface</h3>
	<h5 class="font-weight-lighter">
		<i>Fill the following form to add content to the web pages below</i>
	</h5>
	<v-row>
		<v-col>
			<v-text-field label="Main input" autocomplete="off" v-model="form.title"></v-text-field>

			<v-textarea outlined v-model="form.description"  name="inputTextarea" label="Description" value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."></v-textarea>

			<!-- Submit Button -->
			<v-btn v-on:click.prevent="addTodo">SUBMIT</v-btn>
		</v-col>
	</v-row>
</v-container>
</div>
</template>

<script>
import { db } from '@/main'

export default {
  data: function () {
    return {
      form: {
        title: '',
        date: undefined,
        section: '',
        description: '',
        datetime13: ''
      }
    }
  },
  methods: {
    addTodo () {
      const todosRef = db.collection('tester')
      var id = todosRef.doc().id
      console.log(id)
      todosRef.doc(id).set({
        id: id,
        title: this.form.title,
        description: this.form.description
      })
      db.doc('testerCreatedCollection' + '/data').set({
				  name: 'first name',
				  email: 'email'
      })
    },
    submitData () {
      this.$http.post('https://ap-studybit.firebaseio.com/post.json', this.form).then(function (data) {
        console.log(data)
      })
    }
  }
}
</script>
