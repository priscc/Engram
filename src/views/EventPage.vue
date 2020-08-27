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
			<v-img max-width="70px" min-width="70px" min-height="90px" class="profile" aspect-ratio="1" :src="event.thumbURL"></v-img>
			<h2 class="pt-3 pl-10 pr-9 d-flex align-center font-weight-black px-5">{{event.title}}</h2>
			<p v-if="event.endDate" class="pt-5 d-flex align-center font-italic caption mb-0"> ({{event.startDate}} - {{event.endDate}})</p>
			<p v-else class="pt-5 d-flex align-center font-italic caption mb-0"> ({{event.startDate}})</p>
		</v-col>
	</v-row>

	<!-- Content -->
	<v-row>
		<v-spacer></v-spacer>		
		<v-col lg="11" md="11" cols="12" class="pl-0">
			<v-row class="pl-0">
				<v-col lg="6" md="6" cols="12" class="pl-0">
					<div class="pt-5 pr-12" :key="event.contentMD" v-markdown>{{event.contentMD}}</div>
				</v-col>

				<!-- Resources -->
				<v-col class="pl-0">
					<resources :images="images" :articles="articles" :videos="videos" ></resources>
				</v-col>
			</v-row>			
		</v-col>
	</v-row>
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
		event: {},
		overlay: false,
		resources: [],
		images: [],
		articles: [],
		videos: []
	}},
	methods: {

		async pullData () {
			await db.collection('events').doc(this.id).get().then(function(doc) {
				this.event = doc.data()
			}.bind(this))

			await db.collection('resources').where('parentID', '==', this.id).get().then(function(querySnapshot) {
				console.log('here')
					querySnapshot.forEach(function(doc) {
						this.resources.push(doc.data())
					}.bind(this));
				}.bind(this))

			this.resourcesSort()
		},

		resourcesSort (){
			console.log(this.resources)
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
		// back: goes to previous page
		back () {
			this.$router.go(-1)
		},

		
	},
	mounted () {
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
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
