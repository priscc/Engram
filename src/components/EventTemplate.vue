<template>
<v-col class="ml-7" height="100%">
	<v-row class="text-center" style="border-bottom: 1px solid #26A69A;"> 
		<v-col class="pt-0">
			<h2 class="font-weight-light">Events of the {{topicObj.title}}</h2>
		</v-col>
	</v-row>
	
	<!-- Tabs -->
	<v-row>
		<v-tabs v-model="bottomNav" background-color="white" :color="color" right >
			<v-tab @click="color = 'red'">All</v-tab>
			<v-tab @click="color = 'purple'">Causes</v-tab>
			<v-tab @click="color = 'blue'">Turning Points</v-tab>
			<v-tab @click="color = 'green'"> Effects</v-tab>
		</v-tabs>
	</v-row>

	<!-- Timeline -->
	<v-row class="timeline my-10">
		<v-col class="my-0"> 
			<timeline :events="events"></timeline>
		</v-col>
		
	</v-row>

	<!-- Cards -->
	<v-row>
		<v-col>
		<v-card elevation="24" max-width="700" class="mx-auto" outlined>
		<v-carousel show-arrows-on-hover height="100%">
			<!-- @change="ChangeEvent" -->
		<v-carousel-item v-for="(slide, i) in events" :key="i" >
			<v-sheet light  height="100%" >
			<v-row  class="fill-height" align="center" justify="center" >
			<v-container class="mb-10"> 
				<v-row>

					<!-- Card image -->
					<v-col cols="5" class="pt-3 d-flex">
						<v-img class="align-center" max-width="100%" :src="slide.thumbURL"></v-img>
					</v-col>

					<!-- Card content -->
					<v-col class="pt-0 mr-2">
						<v-row>
							<v-col cols="12">
								<h2>{{slide.title}}</h2>
								<p class="subtitle-1">{{slide.date}}</p>  
							</v-col>
						</v-row>
						<v-divider></v-divider>
						<v-row>
							<v-col lg="6" md="6" sm="12" cols="12">
								<p class="subtitle-2 mb-0 font-italic">Def</p>
								<p class="caption">{{slide.contentMD}}</p>
							</v-col>
							<v-col lg="6" md="6" sm="12" cols="12">
								<p class="subtitle-2 mb-0 font-italic">Role</p>
								<p class="caption"> {{slide.rolesMD}}</p>
						</v-col>
						</v-row>
						<v-row>
							<v-col class="d-flex justify-end pr-5">
								<v-btn color="blue" :to="`/EventPage/${slide.id}`" dark>Learn More</v-btn>
							</v-col>
						</v-row>
					</v-col>
				</v-row>
			</v-container>
			</v-row>
			</v-sheet>
		</v-carousel-item>
		</v-carousel>
		</v-card>
		</v-col>
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

<style>
	.box p {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;  
		overflow: hidden;
	}

	.fade-enter-active, .fade-leave-active {
	transition: opacity .5s;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
		opacity: 0;
	}

	ul{
		margin-left: 10%;
	}
	.timeline{
		background-color: white;
		opacity: 1;
		z-index: 10;
	}
	div.tooltip {
			position: absolute;
			text-align: center;
			padding: 5px;
			font: 12px sans-serif;
			background: lightsteelblue;
			border: 0px;
			border-radius: 8px;
			pointer-events: none;
	}
	.axis path, .axis line {
		fill: none;
		stroke: #717171;
		stroke-width: 1.5px;
		shape-rendering: crispEdges;
	}
	.axis text {
		font-family: sans-serif;
		font-size: 12px;
		fill: #717171;
		stroke: #717171;
		stroke-width: .10px;
	}
	.timeline-label {
		font-family: sans-serif;
	}
	#timeline .axis {
		/*transform: translate(0px,40px);*/
		-ms-transform: translate(0px,40px); /* IE 9 */
		-webkit-transform: translate(0px,40px); /* Safari and Chrome */
		-o-transform: translate(0px,40px); /* Opera */
		-moz-transform: translate(0px,40px); /* Firefox */
	}
	.coloredDiv {
		height: 20px;
		width: 20px;
		float: left;
	}

</style>
