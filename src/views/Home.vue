<template>
<v-container>
	<v-row>
		<v-col cols="12" md="6" wrap color="purple" v-for="(period, index) in timePeriods" :key="index">
			<v-card class="mx-auto" outlined>
				<v-list-item-title class="headline pa-2 grey lighten-3 text-wrap title">{{ period.title }}</v-list-item-title>
				<v-container class="py-0">
					<v-row>
						<v-col cols="3" class="pa-0" v-for="(topic, i) in period.topicTitles" :key="i">
							<v-card class="mx-auto box" outlined :to="`/Topic/${topic.topicID}`">
								<!-- v-on:click.native="routerPassInfo(topic)" -->
								<div class="done pa-2">
									<v-responsive>
										<v-img :src="require(`@/assets/${topic.thumbURL}`)" aspect-ratio="1"></v-img>
									</v-responsive>
									<v-card-subtitle class="text-center font-weight-bold caption">{{topic.title}}</v-card-subtitle>
								</div>
							</v-card>
							<!-- Watermark topic -->
								<!-- <v-card v-else id="watermark" class="mx-auto box" outlined>
									<div class="pa-2">
										<v-responsive>
											<v-img :src="require(`@/assets/${topic.img}`)" aspect-ratio="1"></v-img>
										</v-responsive>
										<v-card-subtitle class="text-center">{{ topic.topicTitle }}</v-card-subtitle>
									</div>
								</v-card> -->
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
export default {
	data () { return {
		timePeriods: []
	}},
	methods: {
		routerPassInfo (id){
			tc.topic = id;
			if (router.currentRoute.path !== "/Topic") {
				router.push({ path: "Topic", params: { topic: id } }); // Only on auth
			}
		}
	},
	mounted () {
		db.collection('timePeriods').get().then( function(snapshot) {
			snapshot.forEach(doc => {
				this.timePeriods.push(doc.data())
			})
		}.bind(this))
	}
}
</script>





<style scoped>
	.done:hover {
		border: 2px solid grey;
		font-weight: normal;
	}
	.box{
		min-height: 100%;
		border: .5px solid lightgrey;
		text-align: center;
		min-height: 100%;
		opacity: 1;
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
</style>

