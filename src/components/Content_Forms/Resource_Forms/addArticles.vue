<template>
<v-row>
	<v-col v-if="dialog" cols="3" class="d-flex align-center">
		<v-btn color="blue" small rounded outlined dark @click="dialog=false"> 
			<v-icon dark right class="pr-4">mdi-plus</v-icon> Add Article
		</v-btn>
	</v-col>

	<v-col v-else>
		<v-card elevation="4">
			<v-form ref="form" v-model="valid" class="py-2">
				<v-row class="ma-5">
					<v-text-field v-model="article.title" dense single-line label="title" auto-fill="off" :rules="rule" required></v-text-field>
				</v-row>
				<v-row class="ma-5">
					<v-text-field v-model="article.link" dense label="link"  single-line auto-fill="off" :rules="rule" required></v-text-field>
				</v-row>
				<v-row>
					<v-col>
						<v-btn color="primary" text @click="reset"> Close </v-btn>
						<v-btn color="primary" text :disabled="!valid" @click="submit"> Save </v-btn>
					</v-col>
				</v-row>
			</v-form>
		</v-card>
	</v-col>

</v-row>
</template>


<script>
export default {
	props: {
		type: String
	},
	data: function () {return {
		dialog: true,
		// Form
		article: {
			parentType: this.$props.type,
			resourceType: 'article',
			title: '',
			link: ''
		},
		// Validation
		valid: true,
		rule: [ v => !!v || 'Required' ]
	}},
	methods:{
		submit(){
			this.$emit('updateResource', this.article, "article")
			this.article = {parentType: this.$props.type, resourceType: 'article', title: '', link: ''}
			this.dialog = true
		},

		reset() { 
			this.dialog = true
			this.$refs.form.reset() 
		},

		validate () { this.$refs.form.validate() },
	}
}
</script>