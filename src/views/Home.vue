<template>
<v-container fluid class="px-12">

	<!-- <div v-for="i in resources" :key="i">
		<v-row v-if="!i.topicID" style="border:1px solid black">
			<p>{{i.id}}
			<br>
			{{i.title}}</p>
		</v-row>
	</div> -->
	
	<v-row>
		<v-col v-for="(period, index) in timePeriods" :key="index" cols="12" lg="6" md="6" class=" d-flex align-self-stretch" wrap color="purple" >	
			<v-card class="mx-0" outlined width="100%">
				<v-card-title class="subtitle-1 font-weight-bold pa-2 grey lighten-3 text-wrap title">{{ period.header }}</v-card-title>
				<v-container class="py-0" fluid >
					<v-row class="align-stretch">
						<v-col v-for="(topic, i) in period.topics" :key="i" lg="3" md="3" cols="2" class="pa-0 align-stretch">
							<v-card :disabled="topic.disabled" class="mx-auto done" style="height: 170px" :to="`/Topic/${topic.id}`" >
								<div>
									<v-responsive class="py-2 px-1" height="100px">
										<v-img width="100%" :src="topic.thumbURL" aspect-ratio="1.2"></v-img>
									</v-responsive>
									<v-card-subtitle class="subtitle-2 text-center font-weight-normal pa-0 my-2 mx-3">
										<p class="truncate">{{topic.title}}</p>
									</v-card-subtitle>
								</div>
							</v-card>
						</v-col>
					</v-row>
				</v-container>
			</v-card>
		</v-col>
	</v-row>
</v-container>
</template>


<script>
import router from "@/router";
import { db, tc } from "@/main";
import _ from 'lodash'
import store from "@/store"
export default {
	data () { return {
		timePeriods: [
			{header:'Regional Interactions (1200 - 1450)', topics:[]},
			{header:'First Global Age (1450 - 1750)', topics:[]},
			{header:'Revolutions & Industrialization (1750 - 1900)', topics:[]},
			{header:'Modern Times (1900 - Present)', topics:[]},
		]
	}},
	methods: {
		async mountTopics(){
			await db.collection('topics').get().then( function(snapshot) {
				snapshot.forEach(doc => {
					var d = doc.data()
					this.timePeriods[(d.timePeriod-1)].topics.push(d)
				})
			}.bind(this))
		}
	},
	mounted () {
		this.mountTopics()
	}
}
</script>



<style scoped>
	.done:hover {
		border: 2px solid grey;
		font-weight: normal;
	}
	#watermark:after {
		content: "";
		display: block;
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0px;
		left: 0px;
		background-image: url("https://www.thinkoutsidetheslide.com/wp-content/uploads/2019/10/DRAFT-background.jpg");
		background-size: 100% 100%;
		background-repeat: no-repeat;
		opacity: 0.4;
	}
	.truncate {
		display: block;
		display: -webkit-box;
		max-width: 200px;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>

