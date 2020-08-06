<template>
<div id="app">
	<h3 class="font-weight-medium text-center pb-4"><u>Add Resources</u></h3>	
	<v-expansion-panels multiple focusable>	
		<!-- Images -->
		<v-expansion-panel @change="imageID = !imageID">
				<v-expansion-panel-header>
					Images
					<template v-slot:actions>
						<v-btn v-if="save[0]" color="error" outlined >
							Save <v-icon color="error" class="ml-2">mdi-cloud-upload mdi-rotate-180</v-icon>
						</v-btn>
						<v-icon v-if="save[0] == false">mdi-arrow-down-drop-circle-outline</v-icon>
					</template>
				</v-expansion-panel-header>
				<v-expansion-panel-content>
						<v-row>
							<v-col v-for="(i, index) in images" :keys="index" cols="3">
								<v-card class="pa-2"outlined >
									<v-btn x-small absolute dark fab top right color="pink" @click="close(index, images)">
										<v-icon>mdi-close</v-icon>
									</v-btn>
									<v-img max-height="70" max-width="100%" :src="i.preview" style="border: 1px solid black"></v-img>
									<p class="caption">{{i.caption}}</p>
								</v-card>
							</v-col>
							<v-col v-if="dialogImage==false" cols="3" class="d-flex align-center">
								<v-btn color="blue" small rounded outlined dark @click="dialogImage=true"> 
									<v-icon dark right class="pr-4">mdi-plus</v-icon> Add Image
								</v-btn>
							</v-col>
							<v-card elevation="4">
								<v-col v-if="dialogImage" >
									<v-form ref="form" v-model="validImage" class="px-5">
										<v-row>
												<v-file-input v-model="image.file" accept="image/*" counter show-size label="Image" :rules="imgRule"></v-file-input>
										</v-row>
										<v-row>
											<v-textarea v-model="image.caption" outlined label="Caption" auto-fill="off" :rules="rule" required></v-textarea>
										</v-row>
										<v-row>
											<v-col>
												<v-btn color="primary" text @click="reset('images')"> Close </v-btn>
												<v-btn color="primary" text :disabled="!validImage" @click="saveImage"> Save </v-btn>
											</v-col>
										</v-row>
									</v-form>
								</v-col>
							</v-card>
						</v-row>
				</v-expansion-panel-content>
		</v-expansion-panel>
		<!-- Articles -->
		<v-expansion-panel @change="articleID = !articleID">
			<v-expansion-panel-header>
				Articles
				<template v-slot:actions>
					<v-btn v-if="save[1]" color="error" outlined >
						Save <v-icon color="error" class="ml-2">mdi-cloud-upload mdi-rotate-180</v-icon>
					</v-btn>
					<v-icon v-if="save[1] == false">mdi-arrow-down-drop-circle-outline</v-icon>
				</template>
			</v-expansion-panel-header>
			<v-expansion-panel-content>
						<v-row>
							<v-col v-for="(i, index) in articles" :keys="index" cols="4">
								<v-card class="pa-2"outlined >
									<v-btn x-small absolute dark fab top right color="pink" @click="close(index, articles)">
										<v-icon>mdi-close</v-icon>
									</v-btn>
									<p>{{i.title}}</p>
									<p class="caption">{{i.link}}</p>
								</v-card>
							</v-col>
						</v-row>
						<v-row>
							<v-col v-if="dialogArticle==false" cols="3" class="d-flex align-center">
								<v-btn color="blue" small rounded outlined dark @click="dialogArticle=true"> 
									<v-icon dark right class="pr-4">mdi-plus</v-icon> Add Article
								</v-btn>
							</v-col>
							<v-col v-if="dialogArticle">
								<v-card elevation="4">
									<v-form ref="form" v-model="validArticle" class="py-2">
										<v-row class="ma-5">
												<v-text-field v-model="article.title" dense single-line label="title" auto-fill="off" :rules="rule" required></v-text-field>
										</v-row>
										<v-row class="ma-5">
												<v-text-field v-model="article.link" dense label="link"  single-line auto-fill="off" :rules="rule" required></v-text-field>
										</v-row>
										<v-row>
											<v-col>
												<v-btn color="primary" text @click="reset('articles')"> Close </v-btn>
												<v-btn color="primary" text :disabled="!validArticle" @click="saveArticle"> Save </v-btn>
											</v-col>
										</v-row>
									</v-form>
								</v-card>
							</v-col>
						</v-row>
			</v-expansion-panel-content>
		</v-expansion-panel>
		<!-- Videos -->
		<!-- <v-expansion-panel @change="videoID = !videoID">
			<v-expansion-panel-header>
				Videos
				<template v-slot:actions>
					<v-btn v-if="save[2]" color="error" outlined >
						Save <v-icon color="error" class="ml-2">mdi-cloud-upload mdi-rotate-180</v-icon>
					</v-btn>
					<v-icon v-if="save[2] == false">mdi-arrow-down-drop-circle-outline</v-icon>
				</template>
			</v-expansion-panel-header>
			<v-expansion-panel-content>
						<v-row>
							<v-col v-for="(i, index) in videos" :keys="index" cols="4">
								<v-card class="pa-2"outlined >
									<v-btn x-small absolute dark fab top right color="pink" @click="close(index, videos)">
										<v-icon>mdi-close</v-icon>
									</v-btn>
									<iframe aspect-ratio="1.7" width="100%" :src="i.src" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
									<p class="caption">{{i.title}}</p>
								</v-card>
							</v-col>
						</v-row>
						<v-row>
							<v-col v-if="dialogVideo==false" cols="4" class="d-flex align-center">
								<v-btn color="blue" small rounded outlined dark @click="dialogVideo=true">
									<v-icon dark right class="pr-4">mdi-plus</v-icon> Add Video
								</v-btn>
							</v-col>
							<v-col v-if="dialogVideo" >
								<v-card elevation="4">
									<v-form ref="form" v-model="validVideo" class="py-2">
										<v-row class="ma-5">
												<v-text-field v-model="video.title" dense single-line label="title" auto-fill="off" :rules="rule" required></v-text-field>
										</v-row>
										<v-row class="ma-5">
												<v-text-field v-model="video.link" dense label="link"  single-line auto-fill="off" :rules="rule" required></v-text-field>
										</v-row>
										<v-row>
											<v-col>
												<v-btn color="primary" text @click="reset('videos')"> Close </v-btn>
												<v-btn color="primary" text :disabled="!validVideo" @click="saveVideo"> Save </v-btn>
											</v-col>
										</v-row>
									</v-form>
								</v-card>
							</v-col>
						</v-row>
			</v-expansion-panel-content>
		</v-expansion-panel> -->
	</v-expansion-panels>
</div>
</template>



<script>
export default {
	props:{
		// images: Array,
		// articles: Array,
		// videos: Array
	},
	data: function () {
		return {
			save: [false, false, false],
		//Image Resources
			dialogImage: false,
			imageID: true,
			image: {
				caption: '',
				file: [],
				preview: ''
			},
		// Article Resources 
			dialogArticle: false,
			articleID: true,
			articles: [],
			article:{
				title: '',
				link: ''
			},
		// Article Resources 
			dialogVideo: false,
			videoID: true,
			video:{
				title: '',
				link: ''
			},
		// Validation
			validImage: true,
			validArticle: true,
			validVideo: true,
			rule: [ v => !!v || 'Required' ],
			imgRule: [ v => !v || v.size < 2000000 || 'Image size should be less than 2 MB!']

		}
	},
	methods:{

		saveImage(){
			var arr = {caption: this.image.caption, file: this.image.file, preview: URL.createObjectURL(this.image.file)}
			this.$props.images.push(arr)
			console.log(this.$props.images)
			this.reset('images')
			this.save[0] = true
		},

		async saveArticle(){
			var arr = {title: this.article.title, url: this.article.link}
			// this.$props.articles.push(arr)
			await this.$emit('updateResource', arr)
			this.reset('articles')
			this.save[1] = true
		},

		saveVideo(){
			var arr = {title: this.video.title, url: this.video.link}
			this.$props.videos.push(arr)
			this.reset('videos')
			this.save[2] = true
		},

		close(i, arr){
			arr.splice(i, 1)
		},

		reset(i) {
			if(i == 'images'){
				this.validImage = false
				this.dialogImage = false
			}
			else if(i == 'articles'){
				this.validArticle = false
				this.dialogArticle = false
			}
			else{
				this.validVideo = false
				this.dialogVideo = false
			}
			this.$refs.form.reset()
		},

		validate () { this.$refs.form.validate() },
	},
	watch: {
		imageID: function(){
			if(this.imageID){
				this.save[0] = false
			}
		},
		articleID: function(){
			if(this.articleID){
				this.save[1] = false
			}
		},
		videoID: function(){
			if(this.videoID){
				this.save[2] = false
			}
		}
	}
}
</script>