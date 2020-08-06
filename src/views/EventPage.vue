<template>
<v-container class="px-12" fluid>
	<v-row>

		<!-- Arrow -->
		<v-col cols="1">
			<v-avatar size="32">
				<v-btn color="blue lighten-2" dark rounded style="height: 100%;" @click="back">
					<v-icon dark>mdi-arrow-left</v-icon>
				</v-btn>
			</v-avatar>
		</v-col>

		<!-- Content -->
		<v-col cols="5">
			<v-row>
				<v-col>
					<h2><u>{{event.title}}</u></h2>
					<p>{{event.date}}</p>
				</v-col>
				<v-col cols="6">
					<v-img class="profile" aspect-ratio="1" :src="event.thumbURL"></v-img>
				</v-col>
			</v-row>
			<!-- <h4 class="pt-6"><u>Event Content Below</u></h4> -->
			<div class="font-italic pb-6" :key="event.roleMD" v-markdown>{{event.roleMD}}</div>
			<div :key="event.contentMD" v-markdown>{{event.contentMD}}</div>
		</v-col>

		<!-- Resources -->
		<v-col class="pl-6 mt-6">
			<resources :resources="resources"></resources>
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
		resources: [],
		overlay: false,
	}},
	methods: {

		pullData () {
			db.collection('events').doc(this.id).get().then(function(doc) {
				this.event = doc.data()
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
		height: 150px;
		/*height: 100%;*/
		margin-left: 21%;
		margin-right: 21%;
	}
</style>
