<template>
<v-container class="mt-6" fluid >
	<!-- Adding Content -->
	<v-row>
		<v-col class="py-0">
		<h2 class="text-center font-weight-light pb-2"><u> Add Works of the Time</u></h2>
		<v-form ref="form" v-model="valid" style="border:1px solid darkturquoise; border-radius:10px;" class="px-8">

			<!-- Work Content -->
			<v-row>
				<v-col>
					<h3 class="Subtitle-1 font-weight-bold text-center pb-4 pt-4"><u>Add Content of Work</u></h3>
					<v-row>
						<v-col>
							<v-text-field v-model="createdWorks.title" label="Artifact:" auto-fill="off" :rules="rule" ></v-text-field>
							<v-file-input v-model="thumbnail" :rules="imgRule" accept="image/*" counter show-size label="File input" @change="thumbnailPreview"></v-file-input>
						</v-col>
						<v-col class="ml-2 pt-5">
							<v-textarea outlined v-model="createdWorks.caption"  name="inputTextarea" label="Description" :rules="rule" ></v-textarea>
						</v-col>
					</v-row>
				</v-col>
			</v-row>

			<!-- Preview -->
			<v-row>
				<v-col class="mx-3">
					<h3 class="Subtitle-1 font-weight-bold text-center pt-6 pb-4"><u>Preview</u></h3>
					<v-row style="border: .5px solid grey">
						<v-col cols="7">
							<p class="subtitle-1 mb-1">{{createdWorks.title}}</p>
							<p class="font-weight-light subtitle-2 preview" height="10" :key="createdWorks.caption" v-markdown>{{createdWorks.caption}}</p>
						</v-col>
						<v-col class="d-flex justify-center">
							<v-img v-if="thumbnail != ''" width="150" :src="preview"></v-img>
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
	</v-row>

	<!-- Side Events -->
		<!-- <v-col cols="4" class="py-0">
		<h2 class="text-center font-weight-light pb-2"><u>Works of the {{topicSelected}}</u></h2>
		<v-card class="mx-auto" max-width="400" tile >
		  <v-list-item v-for="(item, i) in items" :key="i">
			  <v-list-item-avatar>
				<v-img :src="item.image"></v-img>
			  </v-list-item-avatar>
			  <v-list-item-title>{{item.work}}</v-list-item-title>
			  
		  </v-list-item>
		</v-card> -->
		<!-- <v-progress-circular class="mt-5" :rotate="360" :size="100" :width="15" :value="value" color="teal"> {{ value }} </v-progress-circular> -->
		</v-col>

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
		createdWorks: {
			title: '',
			caption: '',
			thumbURL: ''
		},
		thumbnail: [],
		preview: '',
		markdown: '',
		// Validation
		valid: true,
		rule: [ v => !!v || 'Required' ],
		imgRule: [ v => !v || v.size < 2000000 || 'Image size should be less than 2 MB!']
	}},
	methods: { 

		submitData () {
			this.valid = false

			var keywords = _.words(this.createdWorks.title);

			var work = {  
				topicID: this.$props.topicObj.id,
				title: this.createdWorks.title,
				caption: this.createdWorks.caption,
				searchArray: keywords,
				thumbURL: this.thumbnail, 
				thumbFile: this.thumbnail.name, 
			}

			this.$emit('updateTopic', work, null, "works")
			this.reset()
		},

		thumbnailPreview (p){
			if (p) this.preview = URL.createObjectURL(p)
			else this.preview = ''
		},

		reset () { this.$refs.form.reset() },
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
