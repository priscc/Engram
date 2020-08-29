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
		style="font-size: 14px; position: absolute; top: -44px;"
		v-bind:style="{ left: start + '%' }"
		>{{topicTitle}} ({{startDate}}-{{endDate}})</p>
		<div>
			<v-card 
			tile
			class="cardColor d-flex justify-center align-center"
			:width="`${width}%`"
			style="position: absolute; top: -20px; height: 10px"
			v-bind:style="{ left: start + '%' }"
			>
			</v-card>
		</div>

	</div>
</div>
	
</template>


<script>
import store from "@/store";

export default {
	props:{
		events: Array,
		topicTitle: String,
		startDate: String,
		endDate: String
	},
	data () { return {
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

			
			var max = new Date(this.$props.endDate).getFullYear(); 
			var min = new Date(this.$props.startDate).getFullYear(); 
			console.log(this.$props.endDate)
			
			this.maxDate = new Date().getFullYear(); 
			this.minDate = 200

			var total = this.total = this.maxDate - this.minDate

			var end = 100 - (((this.maxDate-max)/total) * 100)

			this.start = 100 - (((this.maxDate-min)/total) * 100)

			this.width = end - this.start
			console.log('width', end - this.start)

			this.ticks = 18
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
