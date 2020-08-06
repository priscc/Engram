<template>
<v-container class="px-12" fluid>
	<v-row class="py-4">
		
		<!-- Arrow -->
		<v-col cols="1">
			<v-avatar size="32">
				<v-btn color="blue lighten-2" dark rounded style="height: 100%;" @click="back">
					<v-icon dark >mdi-arrow-left</v-icon>
				</v-btn>
			</v-avatar>
		</v-col>
		
		<!-- Content -->
		<v-col cols="5">
			<v-row>
				<v-col>
					<h2><u>{{figure.name}}</u></h2>
					<p>{{figure.date}}</p>
				</v-col>
				<v-col cols="6">
					<v-img class="profile" aspect-ratio="1" :src="figure.thumbURL"></v-img>
				</v-col>
			</v-row>
			<!-- <h4 class="pt-6"><u>Event Content Below</u></h4> -->
			<div :key="figure.contentMD" v-markdown>{{figure.contentMD}}</div>
		</v-col>
		
		<!-- Resources -->
		<v-col class="pl-6 mt-6">
			<resources :resources="resources"></resources>
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
		resources: [],
		overlay: false
	}},
	methods: {

		pullData () {
			db.collection('people').doc(this.id).get().then(function(doc) {
				this.figure = doc.data()
			}.bind(this))

			db.collection('resources').where('parentID', '==', this.id).get().then(function(querySnapshot) {
				if (querySnapshot.docs.length == 0) querySnapshot = undefined
					querySnapshot.forEach(function(doc) {
						this.resources.push(doc.data())
					}.bind(this));
				}.bind(this))
			.catch(function(error) {
			  console.log("Error getting documents: ", error);
			  // alert('no events yet')
			});
		},

		// childComp: communicating with the resource component
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
		height: 150px;
		/*height: 100%;*/
		margin-left: 21%;
		margin-right: 21%;
	}
</style>
