<template>
<v-container fluid class="px-12">
	<v-row>
		<v-col v-for="(period, index) in timePeriods" :key="index" cols="12" lg="6" md="6" class=" d-flex align-self-stretch" wrap color="purple" >	
			<v-card class="mx-0" outlined width="100%">
				<v-card-title class="subtitle-1 font-weight-bold pa-2 grey lighten-3 text-wrap title">{{ period.title }}</v-card-title>
				<v-container class="py-0" fluid >
					<v-row class="align-stretch">
						<v-col v-for="(topic, i) in period.topicTitles" :key="i" lg="3" md="3" cols="2" class="pa-0 align-stretch">
							<v-card class="mx-auto done" style="height: 190px" :to="`/Topic/${topic.topicID}`" >
								<div>
									<v-responsive class="pa-6" height="120px">
										<v-img width="100%" :src="require(`@/assets/${topic.thumbURL}`)" aspect-ratio="1.2"></v-img>
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
export default {
	data () { return {
		timePeriods: []
	}},
	methods: {
		async mountTopics(){
			var tp = []
			await db.collection('timePeriods').get().then( function(snapshot) {
				snapshot.forEach(doc => {
					tp.push(doc.data())
				})
			}.bind(this))
			tp = _.sortBy(tp, [function(o) { return o.periodStart }]);
			this.timePeriods = tp
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

