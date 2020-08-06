<template>
<v-row>
	<v-col v-if="dialog"class="d-flex align-center">
		<v-btn color="blue" small rounded outlined dark @click="dialog=false"> 
			<v-icon dark right class="pr-4">mdi-plus</v-icon> Add Image
		</v-btn>
	</v-col>

	<v-col v-else>
		<v-card elevation="4" max-width="100%">
			<v-form ref="form" v-model="valid" class="py-2 pt-4 ma-7">
				<v-row >
					<v-file-input full-width dense v-model="image.file" accept="image/*" counter show-size label="Image" :rules="imgRule"></v-file-input>
				</v-row>
				<v-row class="pt-2">
					<v-textarea v-model="image.caption" outlined label="Caption" auto-fill="off" :rules="rule" required></v-textarea>
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
		image: {
			parentType: this.$props.type,
			resourceType: 'image',
			file: null,
			caption: ''
		},
		// Validation
		valid: true,
		rule: [ v => !!v || 'Required' ],
		imgRule: [ v => !v || v.size < 2000000 || 'Image size should be less than 2 MB!']
	}},
	methods:{
		submit(){
			var arr = {parentType: this.$props.type, resourceType: 'image', caption: this.image.caption, file: this.image.file, preview: URL.createObjectURL(this.image.file)}

			this.$emit('updateResource', arr, "image")
			this.image = {parentType: this.$props.type, resourceType: 'image', file: null, caption: ''}
			this.reset()
		},

		reset() { 
			this.dialog = true
			this.$refs.form.reset() 
		},

		validate () { this.$refs.form.validate() },
	}
}
</script>