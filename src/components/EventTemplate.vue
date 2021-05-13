<template>
<v-col>
	<v-row class="text-center" style="border-bottom: 1px solid #26A69A;"> 
		<v-col class="pt-0">
			<h2 class="font-weight-light">Events of {{topicObj.title}} ({{topicObj.startDate}} - {{topicObj.endDate}})</h2>
		</v-col>
	</v-row>
	<v-row class="pt-2">
		<v-col cols="4">
			<v-img aspect-ratio="1.2" width="140px" height="90px" :src="topicObj.mapThumbURL"style="border: .5px solid lightgrey " ></v-img>
		</v-col>
		<v-col class="d-flex align-end mb-4">
			<v-btn v-if="!timelineExpanded" height="20px" small block outlined color="orange accent-3" @click="[timelineExpanded = true]">
			Expand Timeline
			</v-btn>
			<v-btn v-else small block outlined height="20px" color="orange darken-2" @click="[timelineExpanded = false, bottomNav = 0, model = 0]">
				Collapse Timeline
			</v-btn>
		</v-col>
		<v-col cols="4"></v-col>
	</v-row>
	
	<div>
		<present v-if="!timelineExpanded" :topicObj="topicObj" :causeEvents="causeEvents"></present>
	
		<within-topic v-else :topicObj="topicObj" :events="events"></within-topic>
	</div>
	
	
	
</v-col>
</template>

<script>
import {db} from "@/main";
import * as d3 from 'd3'
import present from "./Event_Templates/Present.vue"
import withinTopic from "./Event_Templates/withinTopic.vue"
import store from "@/store";

export default {
	props: {
		topicObj: Object,
		events: Array,
		causeEvents: Array
	},
	components: {
		present,
		withinTopic
	},
	data () { return {
		timelineExpanded: false
	}},
	mounted(){
		this.timelineExpanded = false
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