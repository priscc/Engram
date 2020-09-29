<template>
<div id="app">
	<!-- Timeline -->
	<v-row class="timeline pl-5 mt-7">
		<v-col class="my-10">
			<topic-timeline
				:events="events"
				:startDate="topicObj.startDate"
				:endDate="topicObj.endDate"
			></topic-timeline>
		</v-col>
	</v-row>

	<!-- Cards -->
	<v-row>
		<v-col cols="8">
			<v-card elevation="2" outlined>
				<v-carousel v-model="model" show-arrows-on-hover height="100%" delimiters>
					<!-- Other Event cards -->
					<v-carousel-item v-for="(slide, i) in events" :key="i">
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
														<h2 v-if="slide.endDate" class="d-flex align-center font-weight-light"> ({{slide.startDate}} - {{slide.endDate}}) </h2> 
														<h2 v-else class="mb-1 d-flex align-center font-weight-light"> ({{slide.startDate}}) </h2> 
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

								<div class="d-flex justify-end" absolute>
									<p class="caption font-italic mb-0">{{slide.eventType}}</p>
								</div>
							</v-container>
						</v-sheet>
					</v-carousel-item>
				</v-carousel>
			</v-card>
		</v-col>
		<v-col>
			<v-expansion-panels flat>
				<v-expansion-panel style="border: .75px solid #FFA726">
					<v-expansion-panel-header expand-icon="mdi-arrow-down-drop-circle-outline">List of Events on Timeline</v-expansion-panel-header>
					<v-expansion-panel-content>
						<div cols="4" class="pa-0 mb-4" v-for="(event, i) in events" :key="i">
							<p class="caption ma-0">({{i+1}}) {{event.title}}</p>
						</div>
					</v-expansion-panel-content>
				</v-expansion-panel>
			</v-expansion-panels>
		</v-col>
	</v-row>
</div>
</template>

<script>
import topicTimeline from "./TimelineTemplate.vue"
import store from "@/store";
import { analytics } from "@/main";
export default {
	props: {
		topicObj: Object,
		events: Array,
	},
	components: {
		topicTimeline
	},
	computed: {	
		model: {
			get () { return store.state.eventModel },
			set (value) { store.dispatch("eventModal", value) }
		}
	},
	mounted(){
		this.model = 0
		analytics.logEvent('Topic_Event_Detail', { topic: this.$props.topicObj.title } );
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