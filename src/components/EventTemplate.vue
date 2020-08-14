<template>
<v-col>
	<v-row class="text-center" style="border-bottom: 1px solid #26A69A;"> 
		<v-col class="pt-0">
			<h2 class="font-weight-light">Events of the {{topicObj.title}}</h2>
		</v-col>
	</v-row>
	
	<!-- Tabs -->
	<v-row>
		<v-col class="pl-7">
			<v-img aspect-ratio="1.2" width="150px" height="100px" src="@/assets/worldmap.jpg" style="border: .5px solid lightgrey " ></v-img>
		</v-col>
		<v-col cols="7">
			<v-card flat >
				<v-tabs height="30px" v-model="bottomNav" center-active show-arrows  right background-color="transparent" :color="color">
					<v-tab @click="color = 'red'">All</v-tab>
					<v-tab @click="color = 'purple'">Causes</v-tab>
					<v-tab @click="color = 'blue'">Turning Points</v-tab>
					<v-tab @click="color = 'green'"> Effects</v-tab>
				</v-tabs>
			</v-card>
		</v-col>
	</v-row>
	
	

	<!-- Timeline -->
	<v-row class="timeline pl-5 mt-2 mb-10">
		<v-col class="my-10"> 
			<timeline :events="events"></timeline>
		</v-col>
	</v-row>

	<!-- Cards -->
	<v-row>
		<v-col></v-col>
		<v-col lg="8" md="9" cols="12">
			<v-card elevation="2" width="100%" outlined>
				<v-carousel show-arrows-on-hover height="100%">
					<v-carousel-item v-for="(slide, i) in events" :key="i">
						<v-sheet light height="100%" >
						<v-row class="fill-height" align="center" justify="center" >
							<v-container fluid class="mb-10"> 
								<v-row>
									<v-col cols="5" class="d-flex">
										<v-img class="align-center" height="100%" aspect-ratio="1.7" :src="slide.thumbURL"></v-img>
									</v-col>

									<v-col class="pt-0 mr-2">
										<v-row>
											<v-col cols="12" class="py-0 d-flex flex-nowrap">
												<h2 class="font-weight-medium d-flex align-center">{{slide.title}}</h2>
												<p class="subtitle-2 d-flex align-center mt-5 pl-3 font-italic font-weight-light">({{slide.date}})</p>  
											</v-col>
										</v-row>
										<v-divider></v-divider>
										<v-row>
											<v-col lg="6" md="6" sm="12" cols="12">
												<p class="subtitle-2 mb-0 font-italic">Def</p>
												<p class="caption truncate">{{slide.contentMD}}</p>
											</v-col>
											<v-col lg="6" md="6" sm="12" cols="12">
												<p class="subtitle-2 mb-0 font-italic">Role</p>
												<p class="caption truncate"> {{slide.rolesMD}}</p>
										</v-col>
										</v-row>
										
									</v-col>
								</v-row>
								<v-row>
											<v-col class="d-flex justify-end pr-5">
												<v-btn color="blue" :to="`/EventPage/${slide.id}`" dark>Learn More</v-btn>
											</v-col>
										</v-row>
							</v-container>
						</v-row>
						</v-sheet>
					</v-carousel-item>
				</v-carousel>
			</v-card>
		</v-col>
		<v-col></v-col>
	</v-row>
</v-col>
</template>

<script>
import { db} from "@/main";
import * as d3 from 'd3'
import timeline from "./TimelineTemplate.vue"

export default {
	props: {
		topicObj: Object,
		events: Array
	},
	components: {
		timeline
	},
	data () { return {
		//carousel
		colors: ['green','secondary','yellow darken-4','red lighten-2','orange darken-1'],
		CurCircle: null,
		//top navbar
		color: "red",
		bottomNav: 0,
		prvCircle: 0,
			causeDis: "none",
			tpDis: "none",
			effectDis: "none",
	}}
}
</script>

<style type="text/css" scoped>
	.truncate {
		display: block;
		display: -webkit-box;
		max-width: 200px;
		-webkit-line-clamp: 4;
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>