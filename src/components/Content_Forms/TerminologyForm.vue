<template>
<v-container class="mt-6" fluid>
	<!-- Adding Content -->
	<v-row>
		<v-col class="py-0">
			<h2 class="text-center font-weight-light pb-2"><u> Add terms</u></h2>
			<v-form ref="form" v-model="valid" style="border:1px solid darkturquoise; border-radius:10px;" class="px-8">
				<v-row>
					<!-- Term Content -->
					<v-col cols="6">
						<h3 class="Subtitle-1 font-weight-bold text-center"><u>Add Term Content</u></h3>
						<v-row>
							<v-col>
								<v-row>
									<v-text-field v-model="createdTerm.term" label="Term:" auto-fill="off" :rules="rule" required></v-text-field>
								</v-row>
								<v-row>
									<v-col>
										<v-textarea outlined v-model="createdTerm.definition"  name="inputTextarea" label="Definition" :rules="rule" required></v-textarea>
									</v-col>
								</v-row>
							</v-col>
						</v-row>
						
					</v-col>

					<!-- Preview -->
					<v-col class="ml-4" >
						<h3 class="Subtitle-1 font-weight-bold text-center"><u>Preview</u></h3>
						<v-row class="pt-9">
							<v-col style="border: 1px solid grey">
								<div >{{createdTerm.term}}</div>
						<div :key="createdTerm.definition" v-markdown>{{createdTerm.definition}}</div>
							</v-col>
						
						</v-row>
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
	</v-row>
	
	<!-- Modifying Content -->
	<!-- Side Events -->
	 <!--  <v-col cols="4" class="py-0">
			<h2 class="text-center font-weight-light pb-2"><u>Terms of the {{topicObj.title}}</u></h2>
				<v-card class="mx-auto" max-width="400" tile >
					<v-list-item v-for="(item, i) in items" :key="i">
							<v-list-item-title>{{item.term}}</v-list-item-title>
					</v-list-item>
					
				</v-card>
		</v-col> -->
</v-container>

</template>

<script>
import _ from 'lodash'
export default {
	props: {
		topicObj: Object
	},
	data: function () { return {	
		// Form
		createdTerm: {
			term: '',
			definition: ''
		},
		markdown: '',
		// Validation
		valid: true,
		rule: [ v => !!v || 'Required' ],
	}},
	methods: { 
		submitData () {

			this.valid = false
			var keywords = _.words(this.createdTerm.term);

			var term = {  
				topicID: this.$props.topicObj.id,
				term: this.createdTerm.term,
				definition: this.createdTerm.definition,
				searchArray: keywords
			}

			this.$emit('updateTopic', term, null, 'terminology')

			this.reset()	 
		},


		reset () { this.$refs.form.reset() },
		validate () { this.$refs.form.validate() },
	},
}
</script>
