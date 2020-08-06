<template>
<v-container class="mt-6" fluid>
	<!-- Adding Content -->
	<v-row>

		<v-col class="py-0">
			<h2 class="text-center font-weight-light pb-2"><u>Add Figure</u></h2>
			<v-form ref="form" v-model="valid" style="border:1px solid deeppink; border-radius:10px;" class="px-8">
				
				<!-- Figure Content -->
				<v-row>
					<v-col>
						<h3 class="Subtitle-1 font-weight-bold text-center pb-4 pt-4"><u>Add Figure Content</u></h3> 
						<v-text-field filled v-model="createdFigure.name" label="Figure name:" auto-fill="off" :rules="rule" required></v-text-field>
						<v-row>
							<v-col>
								<v-file-input dense v-model="thumbnail" :rules="imgRule" accept="image/*" counter show-size label="Thumbnail" @change="thumbnailPreview"></v-file-input>
							</v-col>
							<v-col>
								<v-menu ref="menu" v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y min-width="290px">
									<template v-slot:activator="{ on }" >
										<v-text-field dense prepend-icon="event" v-model="createdFigure.date" label="Start date" readonly v-on="on" ></v-text-field>
									</template>
									<v-date-picker ref="picker" v-model="createdFigure.date" type="month" :max="new Date().toISOString().substr(0, 10)" min="1-01-01" no-title >
										 <v-spacer></v-spacer>
											<v-btn text color="primary" @click="menu = false">Cancel</v-btn>
											<v-btn text color="primary" @click="save">OK</v-btn>
									</v-date-picker>
								</v-menu>
							</v-col>
						</v-row>
						<v-textarea filled v-model="createdFigure.contentMD" label="Main content:" :rules="rule" required></v-textarea>
					</v-col>
				</v-row>
				
				<!-- Resources -->
				<v-row>
					<v-col class="mx-3">
						<add-resources :resetBool="resetBool" @resourceArray="resourceArray"></add-resources>
					</v-col>
				</v-row>

				<!-- Preview -->
				<v-row>
					<v-col class="mx-3">
						<h3 class="Subtitle-1 font-weight-bold text-center pt-6 pb-4"><u>Preview</u></h3>
						<v-row style="border: .5px solid grey">
							<v-col cols="7">
								<div class="pl-3 d-flex row">
									<p class="font-weight-bold mb-0">{{createdFigure.name}}</p>
									<p v-if="createdFigure.date != null" class="font-weight-light font-italic preview pl-5" :key="createdFigure.date" v-markdown>( {{createdFigure.date}} )</p>
								</div>
								<p class="font-weight-light subtitle-2 preview" :key="createdFigure.contentMD" v-markdown>{{createdFigure.contentMD}}</p>
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

	<!-- Modifying Content -->
	<!-- Side Events -->
		<!-- <v-col cols="4" class="py-0">
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
		</v-col> -->
		
</v-container>
</template>

<script>
import firebase from 'firebase'
import { db } from '@/main'
import addResources from "./Resource_Forms/addResources.vue"
export default {
	props: {
		topicObj: Object
	},
	components:{
		addResources
	},
	data: function () { return {
		resetBool: false,
		// Form
		createdFigure: {
			topicID: '',
			date: null,
			thumbURL: '',
			name: '',
			contentMD: '',
		},
		thumbnail: [],  // figure thumbnail
		menu: false,  // figure calendar
		resources: {},  // collection of all resources (articles, images, videos)
		//Preview
		preview: '',
		markdown: '',
		// Validation
		valid: true,
		rule: [ v => !!v || 'Required' ],
		imgRule: [ v => !v || v.size < 2000000 || 'Image size should be less than 2 MB!']
	}},
	methods: { 
		async submitData () {
			this.valid = false
			var figure = { 
				topicID: this.$props.topicObj.id,
				date: this.createdFigure.date, 
				thumbURL: this.thumbnail, 
				thumbFile: this.thumbnail.name, 
				name: this.createdFigure.name, 
				contentMD: this.createdFigure.contentMD, 
			}

			// upload resource images {{can this be done better?}}
			if (this.resources.images) {
				var array = []
				this.resources.images.forEach( i => {
					array.push(this.savingImages(i.file))
				})
				var urls = Promise.all(array).then(values => { 
						values.forEach( (url, index) => {
							var images = this.resources.images
							images[index].thumbFile = images[index].file.name;
						images[index].thumbURL = url
						delete images[index].file;
						delete images[index].preview;
					})
					this.$emit('updateTopic', figure, this.resources, 'people')
					this.resources = {}
					this.resetBool = !this.resetBool //sends reset to resources 
					this.reset()
				});
			}
			else{
				this.$emit('updateTopic', figure, null, 'people')
				this.resources = {}
				this.resetBool = !this.resetBool //sends reset to resources 
				this.reset()
			}
		},

		async savingImages(image){
			var storageRef = firebase.storage().ref().child(image.name)
			await storageRef.put(image)
			var x = await storageRef.getDownloadURL()
			console.log('x', x)
			return x
		},

		thumbnailPreview (p){
			if (p) this.preview = URL.createObjectURL(p)
			else this.preview = ''
		},

		//recieve array of resources from child resource
		resourceArray (r, type){
			this.resources[type] = r
		},

		save (date) { this.$refs.menu.save(date) },
		reset () { this.$refs.form.reset() },
		validate () { this.$refs.form.validate() },
	},
	watch: {
		menu (val) {
			val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
		}
	}
}
</script>