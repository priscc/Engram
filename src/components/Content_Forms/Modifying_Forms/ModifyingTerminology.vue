<template>
<div id="app">

	<v-container fluid class="pl-9">
		<v-form ref="form" v-model="valid">
			<v-row>
				<v-col cols="5">
					<v-text-field 
						v-model="newterm.term" label="Term" dense :rules="rule" required>
					</v-text-field>
					<v-textarea outlined rows="2" v-model="newterm.definition" label="Definition" :rules="rule" required></v-textarea>
				</v-col>
				<v-col class="d-flex justify-center pt-8" cols="1">
					<v-btn fab small class="white--text" :disabled="!valid" color="green" @click="add"><v-icon>mdi-plus</v-icon></v-btn>
				</v-col>
				<v-spacer></v-spacer>
			</v-row>
		</v-form>
	</v-container>

	<v-container>
		<!-- display terms -->
		<v-row class="pt-5">
			<v-col v-for="(i, index) in terms" :key="index" cols="4">
				<v-card class="pa-2 d-flex flex-column">
					<div class="subtitle-2">{{ i.term }}</div>
					<div class="caption">{{ i.definition }}</div>
					<v-btn fab x-small absolute top right @click="[dialog = true, term = i]">
						<v-icon>mdi-lead-pencil</v-icon>
					</v-btn>
				</v-card>
			</v-col>
		</v-row>
	</v-container>

	<!-- add article -->
	<v-dialog v-model="dialog" width="500px">
		<v-card elevation="4">
			<v-btn color="orange lighten-1" small fab absolute right dark rounded @click="reset()"><v-icon dark>mdi-close</v-icon></v-btn>
			<v-form class=" pt-6" ref="form" v-model="valid">
				<v-container>
					<v-row>
						<v-col>
							<v-text-field 
								v-model="term.term" label="Term" :placeholder="term.term" dense :rules="rule" required>
							</v-text-field>
							<v-text-field 
								v-model="term.definition" label="Definition" :placeholder="term.definition" :rules="rule" required>
							</v-text-field>
						</v-col>
					</v-row>
				</v-container>
			</v-form>
			<v-card-actions class="d-flex justify-end">
				<v-btn class="white--text" color="green" @click="[dialog = false, submit()]">Save</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</div>
</template>


<script type="text/javascript">
import { db } from '@/main'
import store from "@/store";
import _ from 'lodash'
export default {
	data: function () {return {
		dialog: false,
		newterm: {}, //form creates objects -- {term:'', definition:''}
		term: {}, //form creates objects -- {term:'', definition:''}
		// Validation
		valid: true,
		rule: [ v => !!v || 'Required' ]
	}},

	computed: {
		terms() {
			return this.$store.state.terms
		}
	},

	methods: {

		add(){
			var keywords = _.words(this.newterm.term);
			var t = {
				topicID: [this.$store.state.topic.id],
				searchArray: keywords,
				term: this.newterm.term,
				definition: this.newterm.definition,
			}
				
			db.collection("terminology").add(t)
				.then(function() { console.log("Document successfully updated!"); })
				.catch(function(error) { console.error("Error updating document:", error); });
			
			store.dispatch("addTerm", t);
			this.newTerm = {}
			this.reset()
		},

		submit(){
			db.collection("terminology").doc(this.term.id).update(this.term)
				.then(function() { console.log("Document successfully updated!"); })
				.catch(function(error) { console.error("Error updating document:", error); });

			this.reset()
		},

		reset () { 
			this.term = {}
			this.dialog = false
			this.$refs.form.reset() 
		},
		validate () { this.$refs.form.validate() },
	}
}
</script>