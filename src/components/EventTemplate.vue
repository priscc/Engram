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
			<v-img aspect-ratio="1.2" width="150px" height="100px" src="@/assets/map.png" style="border: .5px solid lightgrey " ></v-img>
		</v-col>
		<v-col class="d-flex align-end">
			<v-btn v-if="!timelineExpanded" height="20px" small block outlined color="orange darken-2" @click="[timelineExpanded = true]">
				Expand Timeline
			</v-btn>

			<v-btn v-else small block outlined height="20px" color="orange darken-2" @click="[timelineExpanded = false, bottomNav = 0, model = 0]">
				Collapse Timeline
			</v-btn>


		</v-col>
		<v-col class="d-flex flex-column align-end" cols="4" >
		 	<!-- **** change color of items?-->
			<v-select v-if="timelineExpanded" v-model="bottomNav" dense :items="selects" style="min-width: 100%" label="Type of Events"></v-select>
			<div  class="pt-6 d-flex flex-column align-end">
				<!-- <p class="ma-0 caption">Expanded Timeline</p> -->
				<!-- <v-switch class="ma-0" inset v-model="timelineExpanded" :value="timelineExpanded" color="orange" hide-details @change="[bottomNav = 0, model = 0]"></v-switch> -->
			</div>
		</v-col>
	</v-row>

	
	

	<!-- Timeline -->
	<v-row class="timeline pl-5 mt-2 mb-10">
		<v-col class="my-10"> 
			
			<timeline-in-context v-if="!timelineExpanded" :events="events" :topicTitle="topicObj.title"></timeline-in-context>
			<timeline v-else :events="events" :bottomNav="bottomNav"></timeline>
			
		</v-col>
	</v-row>

	<!-- Cards -->
	<v-row>
		<v-col></v-col>

		<v-col cols="8">
			<v-card elevation="2" outlined>
				<v-carousel v-model="model" show-arrows-on-hover height="100%" delimiters>

					<!-- First Card -->
					<v-carousel-item>
						<v-sheet light>
							<v-container> 
								<v-card class="mx-12 px-12 mb-10" flat tile>
									<h3 class="">List of Events</h3>
									<v-list-item-content  v-for="(event, i) in events" :key="i">
										<v-list-item-title>{{event.date}} - {{event.title}}</v-list-item-title>
									</v-list-item-content>
								</v-card>
							</v-container>
						</v-sheet>
					</v-carousel-item>

					<!-- Other Event cards -->
					<v-carousel-item v-for="(slide, i) in carouselEvents" :key="i">
						<v-sheet light class="">
							<v-container class="mx-3 mb-10"> 
								<v-row>
									<v-col class="pt-0 mr-2">
										<v-row>
											<v-col cols="8">
												<v-row>
													<v-col class="py-0">
														<h2 class="font-weight-medium">{{slide.title}}</h2>
													</v-col>
												</v-row>
												<v-row>
													<v-col class="py-0">
														<p class="mb-1 pl-2 subtitle-2 d-flex align-center font-weight-light"> - {{slide.date}} - </p> 
													</v-col>
												</v-row>
												

											</v-col>
											<v-col class="d-flex justify-end">
												<v-btn rounded color="blue" :to="`/EventPage/${slide.id}`" dark>Learn More</v-btn>
											</v-col>
										</v-row>
										<v-divider></v-divider>
										<v-row>
											<v-col cols="6">
												<v-img height="100%" aspect-ratio="1.7" :src="slide.thumbURL"></v-img>
											</v-col>
											<v-col cols="6" class="d-flex flex-column">
												<p class="subtitle-2 mb-0 font-italic">Summary</p>
												<p class="caption">{{slide.summaryMD}}</p>
												
											</v-col>

										</v-row>
									</v-col>
								</v-row>

								<div class="d-flex justify-end" absolute>
									<p class="caption font-italic mb-0">{{slide.eventType}}</p>
								</div>
							</v-container>
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
import timelineInContext from "./PresentTimelineTemplate.vue"
import timeline from "./TimelineTemplate.vue"
import store from "@/store";

export default {
	props: {
		topicObj: Object,
		events: Array,
		carouselEvents: Array
	},
	components: {
		timeline, 
		timelineInContext
	},
	data () { return {

		selects: ["All", "Causes", "Turning Points", "Impact"], 
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
	}},
	computed: {	
		model: {
			get () { return store.state.eventModel },
			set (value) { store.dispatch("eventModal", value) }
		},
		timelineExpanded: {
	        get () { return store.state.timeline },
	        set (value) { store.dispatch("eventTimeline", value) }
	    }
	}
}
</script>

<style type="text/css" scoped>
	.v-carousel__controls{
       background: blue !important
   }
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