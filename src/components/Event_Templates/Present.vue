<template>
<div id="app">
	<v-row class="timeline pl-5 mt-7">
		<v-col class="my-10">
			<timeline-present
				:events="causeEvents" 
				:topicTitle="topicObj.title" 
				:startDate="topicObj.startDate"
				:endDate="topicObj.endDate"
			></timeline-present>
		</v-col>
	</v-row>
	
	<v-row v-if="causeEvents.length != 0">
		<v-col cols="8">
			<v-card elevation="2" outlined>
				<v-carousel v-model="model" show-arrows-on-hover height="100%" delimiters>
					<!-- Other Event cards -->
					<v-carousel-item v-for="(slide, i) in causeEvents" :key="i">
						<v-sheet light class="">
							<v-container class="mx-3 mb-10"> 
								<v-row>
									<v-col class="pt-0 mr-2">
										<v-row>
											<v-col cols="1">
												<v-avatar color="blue-grey" size="25">
													<span class="white--text body-2 font-weight-medium">{{i+1}}</span>
												</v-avatar>
											</v-col>
											<v-col cols="8" class="px-0">
												<v-row>
													<v-col class="py-0 d-flex flex-row">
														<h2 class="font-weight-medium"> 
															{{slide.title}}
														</h2>
													</v-col>
												</v-row>
												<v-row>
													<v-col class="py-0">
														<p v-if="slide.endDate" class="mb-1 subtitle-1 d-flex align-center font-weight-light"> ({{slide.startDate}} - {{slide.endDate}}) </p> 
														<p v-else class="mb-1 subtitle-1 d-flex align-center font-weight-light"> ({{slide.startDate}}) </p> 
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
												<p class="subtitle-1 mb-0 font-weight-medium">Summary</p>
												<p class="font-weight-light">{{slide.summaryMD}}</p>
											</v-col>
										</v-row>
									</v-col>
								</v-row>
							</v-container>
						</v-sheet>
					</v-carousel-item>
				</v-carousel>
			</v-card>
		</v-col>
	</v-row>
</div>
</template>

<script>
import timelinePresent from "./PresentTimelineTemplate.vue"
import store from "@/store";
import { analytics } from "@/main";
export default {
	props: {
		topicObj: Object,
		causeEvents: Array
	},
	components: {
		timelinePresent
	},
	computed: {	
		model: {
			get () { return store.state.eventModel },
			set (value) { store.dispatch("eventModal", value) }
		}
	},
	mounted(){
		this.model = 0
		analytics.logEvent('Topic_Event_Present', { topic: this.$props.topicObj.title } );
	}
}
</script>



