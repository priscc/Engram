<template>
<v-container class="px-12" fluid>
	<v-row>
		
		<!-- Arrow -->
		<v-col  style="max-width: 70px">
			<v-avatar size="32">
				<v-btn color="blue lighten-2" dark rounded style="height: 100%;" @click="back">
					<v-icon dark >mdi-arrow-left</v-icon>
				</v-btn>
			</v-avatar>
		</v-col>

		<!-- Header -->
		<v-col class="d-flex flex-nowrap pt-0">
			<v-img max-width="70px" min-width="70px" min-height="90px" class="profile" aspect-ratio="1" :src="figure.thumbURL"></v-img>
			<h2 class="pt-3 pl-10 pr-9 d-flex align-center font-weight-medium px-5"><u>{{figure.name}}</u></h2>
			<p class="pt-5 d-flex align-center font-italic caption mb-0"> ({{figure.date}})</p>
		</v-col>
	</v-row>

	<!-- Content -->
	<v-row>
		<v-spacer></v-spacer>		
		<v-col lg="11" md="11" cols="12" class="pl-0">
			<v-row class="pl-0">
				<v-col lg="6" md="6" cols="12" class="pl-0">
					<div class="pt-5 pr-12" :key="figure.contentMD" v-markdown>{{figure.contentMD}}</div>
				</v-col>

				<!-- Resources -->
				<v-col class="pl-0">
					<resources :images="images" :articles="articles" :videos="videos" ></resources>
				</v-col>
			</v-row>			
		</v-col>
	</v-row>

	<!-- Overlay -->
	<!-- <v-dialog v-model="overlay" >
			<v-col id="text" class="px-12 pt-6 pb-12">
				<v-row>
					<v-btn id="button"  icon @click="overlay = false" opacity=".5" x-large outlined>
					<v-icon>mdi-close</v-icon>
				</v-btn>
				</v-row>
			<v-row>
				<v-col>
					<h1 class="white--text">{{header.header}}</h1>
				</v-col>
			</v-row>
			<v-row>
				<v-col v-for="(img, index) in header.img" :key="index" cols="3">
					<v-img aspect-ratio="1.4" :src="img.src"></v-img>
				</v-col>
			</v-row>
		</v-col>
	</v-dialog> -->
</v-container>
</template>



<script>
import { db } from '@/main'
import resources from '@/components/Resources.vue'

export default {
	components: {
		resources
	},
	data () { return {
		id: this.$route.params.id,
		figure: {},
		overlay: false,
		resources: [],
		images: [],
		articles: [],
		videos: []
	}},
	methods: {

		async pullData () {
			await db.collection('people').doc(this.id).get().then(function(doc) {
				this.figure = doc.data()
			}.bind(this))

			await db.collection('resources').where('parentID', '==', this.id).get().then(function(querySnapshot) {
				if (querySnapshot.docs.length == 0) querySnapshot = undefined
					querySnapshot.forEach(function(doc) {
						this.resources.push(doc.data())
					}.bind(this));
				}.bind(this))

			this.resourcesSort()
		},

		resourcesSort (){
			var rArr = this.resources

			rArr.forEach( r => {
				if( r.resourceType == 'image') {
					this.images.push(r)
				}
				else if( r.resourceType == 'article') {
					this.articles.push(r)
				}
				else{
					this.videos.push(r)
				}
			})
		},

		// for OVERLAY
		childComp (param, id) {
			console.log('received: ', id)
			this.header = id
			this.overlay = param
		},

		// back: goes to previous page
		back () {
			this.$router.go(-1)
		}
	},
	mounted () {
		this.pullData()
	}
}
</script>


<style scoped>
	#text{
		position: relative;
		color: white;
		max-height: 90%;
	}
	#button{
		position: absolute;
		top: 10%;
		right: 5%;
		color: white;
		transform: translate(-50%,-50%);
		-ms-transform: translate(-50%,-50%);
	}
	.profile{
		border: 1px solid black;
		border-radius: 50%;
	}
</style>
