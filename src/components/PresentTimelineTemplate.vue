<template>
<div>

	<div class="d-flex flex-row"  style="border-top: .5px solid #607D8B; position: relative;">
		
		<!-- ticks -->
		<div
			v-for="i in ticks +1"
			style="border-left: 2px solid #607D8B;  position: absolute; top: -7px; height: 15px"
			v-bind:style="{ left: (( ( (i-1)*(tickSize) )*100) /total) + '%' }"
			>
		</div>


		<!-- dates -->
		<div
			v-for="i in ticks +1"
			style="position: absolute; top: 10px; height: 15px; font-size: 12px;"
			v-bind:style="{ left: (( ( (i-1)*(tickSize) )*100) /total) - 1 + '%' }"
			>
			{{ minDate + ((i-1)*tickSize) }}
		</div>
		

		<!-- events -->
		<p class="ma-0 font-weight-medium font-italic"
		style="font-size: 14px; position: absolute; top: -35px;"
		v-bind:style="{ left: start + '%' }"
		>{{topicTitle}}</p>
		<div>
			<!-- <v-hover
			v-slot:default="{ hover }" 
			class="px-2"
			style="position: absolute; top: -5px; color: white;"
			v-bind:style="{ left: start + '%' }">
			:elevation="hover ? 15 : 10" -->
				<v-card 
				tile
				class="cardColor d-flex justify-center align-center"
				:width="width"
				style="position: absolute; top: -7px; font-size: 10px; height: 15px"
				v-bind:style="{ left: start + '%' }"
				> 
					<p v-if="hover" class="pa-0 ma-0 caption font-weight-medium">Expand</p>
				</v-card>

			<!-- @click="timeline = true"
			</v-hover> -->
		</div>


	</div>
</div>
	
</template>


<script>
import store from "@/store";

export default {
	props:{
		events: Array,
		topicTitle: String
	},
	data () { return {
		eventColors: this.$props.events,
		prevHover: 1,
		hover: null, 
		dates:[],
		ticks: 0,
		tickSize: 0,
		maxDate: 0,
		minDate: 0,
		total: 0,

		width: 0,
		start: 0,


	}},
	computed: {	
		timeline: {
	        get () { return store.state.timeline },
	        set (value) { store.dispatch("eventTimeline", value) }
	    }
	},
	methods:{

		calculatingDates () {

			var ev = this.$props.events
			
			var max = Math.max.apply(null, ev.map( d => { return d.date }));
			var min = Math.min.apply(null, ev.map( d => { return d.date }));
			
			this.maxDate = new Date().getFullYear(); 
			this.minDate = 1000

			var total = this.total = this.maxDate - this.minDate

			this.start = 100 - (((this.maxDate-min)/total) * 100)
			this.width = (max - min)
			// this.width = ( ( (max - min)/total ) * 100 )

			this.ticks = 10
			this.tickSize = 100
			
		}
			
	},
	mounted(){
		this.calculatingDates()
	}
}

</script>

<style type="text/css" scoped>
	.cardColor{
		border-radius: 50px;
		background-color: #FB8C00
	}
</style>
