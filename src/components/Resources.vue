<template>
<v-container fluid id="app">

	<h3 v-if="images.length != 0 || articles.length != 0 || videos.length != 0" class="font-weight-regular text-center pb-4">Additional Resources</h3>
	
	<!-- Images -->
	<div v-if="images.length != 0" class="mb-10">
		<h4
			v-if="articles.length != 0 || videos.length != 0"
			class="font-weight-light" style="border-bottom: 1.5px solid blue;">
			Images
		</h4>
		<v-row>
			<v-col v-for="(i, index) in images"  :key="index" cols="4">
			<v-hover v-slot:default="{ hover }">
				<v-card class="mx-auto" color="grey lighten-4" max-width="600" >
					<v-img aspect-ratio="1.2" :src="i.thumbURL" >
						<v-expand-transition>
							<div v-if="hover" class="d-flex transition-fast-in-fast-out blue-grey darken-5 v-card--reveal px-2" style="height: 100%; color: white; opacity: .8" >
								{{i.caption}}
							</div>
						</v-expand-transition>
					</v-img>
				</v-card>
			</v-hover>
			</v-col>	
		</v-row>
	</div>
	

	<!-- Videos -->
	<div v-if="videos.length != 0" class="mb-10">
		<h4 
			v-if="images.length != 0 || articles.length != 0"
			class="font-weight-light" style="border-bottom: 1.5px solid blue;">
			Videos
		</h4>
		<v-row>
			<v-col v-for="(i, index) in videos" :key="index" cols="6">
				<v-card class="mx-auto" color="grey lighten-4">
					<iframe width="100%"  :src="`https://www.youtube.com/embed/${i.url}`" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
						
					</iframe>
					<div class="caption px-2 pb-1">{{i.title}}</div>
				</v-card>
			</v-col>	
		</v-row>
	</div>

	<!-- Articles -->
	<div v-if="articles.length != 0" class="mb-10">
		<h4 
			v-if="images.length != 0 || videos.length != 0"
			class="font-weight-light mb-4" style="border-bottom: 1.5px solid blue;">
			Articles
		</h4>
		<v-row v-for="article in articles" class="pb-5">
			<v-col>
			<v-card outlined>
				<div class="d-flex flex-no-wrap justify-space-between">
					<div class="mb-5">
						<v-card-subtitle class="pb-0" style="font-size: 10px" v-text="article.newsSource"></v-card-subtitle>
						<p class="preview pt-1 pl-4 ma-0" style="font-size: 18px">{{article.title}}</p>
						<v-card-subtitle class="caption py-0" v-text="article.published"></v-card-subtitle>
						<v-card-subtitle class="truncate" style="height: 60px; font-size: 14px" >
							<p>{{article.summary}}</p>
						</v-card-subtitle>
					</div>
					<div class="d-flex flex-column justify-end align-end">
						<v-avatar v-if="article.articleURL" class="ma-3 ml-0" size="100" tile style="border: 1px solid lightgrey">
							<v-img :src="article.articleURL"></v-img>
						</v-avatar>
						<v-card-actions>
							<v-btn text color="deep-purple accent-4" :href="article.url" target="_blank" > Read More</v-btn>
						</v-card-actions>
					</div>
				</div>
			</v-card>
		</v-col>
		</v-row>
	</div>


</v-container>
	
	<!-- Dialog -->
	<!-- <v-row v-if="resource.img.length > 3">
		<v-col class="d-flex align-end flex-column">
			<v-dialog v-model="dialog" width="75%">
				<template v-slot:activator="{ on, attrs }">
					<a class="blue--text text-right body-1"  medium v-bind="attrs" v-on="on">
						<u>See more</u>
					</a>
				</template>
				<v-card>
					<v-card-title class="headline grey lighten-2" primary-title >
						<v-row class="ml-12">
							<v-col class="d-flex align-end pb-2"><h4><u>{{resource.header}}</u></h4></v-col>
							<v-col cols="1">
								<v-btn icon absolute right @click="dialog = false" opacity=".5">
								<v-icon>mdi-close</v-icon>
							</v-btn>
							</v-col>
						</v-row>

					</v-card-title>
					<v-card-text>
						<v-col id="text" class="px-12 pt-6 pb-12">
							<v-row>
								<v-col v-for="(img, index) in resource.img" :key="index" cols="3">
									<v-hover v-slot:default="{ hover }">
										<v-card class="mx-auto" color="grey lighten-4" max-width="600" >
											<v-img aspect-ratio="1.2" :src="img.src" >
												<v-expand-transition>
													<div v-if="hover" class="d-flex transition-fast-in-fast-out blue-grey lighten-5 v-card--reveal blue-grey darken-2--text px-2" style="height: 100%;" >
														Caption with words describing the image
													</div>
												</v-expand-transition>
											</v-img>
										</v-card>
									</v-hover>
								</v-col>
							</v-row>
						</v-col>
					</v-card-text>
					<v-divider></v-divider>
				</v-card>
			</v-dialog>
		</v-col>
	</v-row> -->
		
</template>



<script>
export default {
	props: {
		images: Array,
		articles: Array,
		videos: Array
	},
	data () { return {
		dialog: false,
		// overlay: false,
		// images: [],
		// articles: [],
		// videos: []
	}},
	// methods: {
	// 	mountResources(){
	// 		var rArr = this.$props.resources

	// 		rArr.forEach( r => {
	// 			if( r.resourceType == 'image') {
	// 				this.images.push(r)
	// 			}
	// 			else if( r.resourceType == 'article') {
	// 				this.articles.push(r)
	// 			}
	// 			else{
	// 				this.videos.push(r)
	// 			}
	// 			console.log(this.images)
	// 			console.log(this.articles)
	// 			console.log(this.videos)
	// 		})
	// 	}
	// },
	// mounted (){
	// 	this.mountResources()
	// }
}
</script>



<style scoped>
	h4 {
		font-weight: normal;
	}
	.v-card--reveal {
		align-items: center;
		bottom: 0;
		justify-content: center;
		opacity: .5;
		position: absolute;
		width: 100%;
	}
	.preview {
		-webkit-hyphens: auto;
		-moz-hyphens: auto;
		-ms-hyphens: auto;
		hyphens: auto;
	}
	.truncate {
		display: block;
		display: -webkit-box;
		max-width: 100%;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
