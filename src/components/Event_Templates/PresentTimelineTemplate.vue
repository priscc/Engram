<template>
<div>

	<div class="d-flex flex-row" style="border-top: .5px solid #607D8B; position: relative;">
		
		<!-- ticks -->
		<div
			v-for="i in ticks +1"
			style="border-left: 2px solid #607D8B;  position: absolute; top: -7px; height: 15px"
			v-bind:style="{ left: (( ( (i-1)*(tickSize) )*100) /total) + '%' }"
			>
		</div>


		<!-- tick dates -->
		<div
			v-for="i in ticks +1"
			style="position: absolute; top: 10px; height: 15px; font-size: 12px;"
			v-bind:style="{ left: (( ( (i-1)*(tickSize) )*100) /total) - 1 + '%' }"
			>

			<p v-if=" minDate + ((i-1)*tickSize) == 2000" class="mb-0 rotated pl-1">Present</p>
			<p v-if=" minDate + ((i-1)*tickSize) < 0" class="mb-0">{{ (minDate*-1) - ((i-1)*tickSize) }}</p>
			<p v-else class="mb-0">{{ minDate + ((i-1)*tickSize) }}</p>
			
		</div>
		

		<!-- topic range -->
		<p class="ma-0 font-italic"
		style="font-size: 14px; position: absolute; top: -54px;"
		v-bind:style="{ left: start + '%' }"
		>{{topicTitle}} ({{startDate}}-{{endDate}})</p>
		<div>
			<v-card 
			tile
			flat
			class="rangeColor d-flex justify-center align-center"
			:width="`${width}%`"
			style="position: absolute; top: -34px; height: 18px;"
			v-bind:style="{ left: start + '%' }"
			>
			</v-card>
		</div>

		<!-- events -->
		<div>
			<v-hover
			v-slot:default="{ hover }" v-for="(i, index) in dates" :key="index" 
			class="px-2"
			style="position: absolute; top: -30px;  border-radius: 25px; color: white;"
			v-bind:style="{ left: i.tick + '%', top: (i.stack * -20)-40 +'px'}">

				<v-card
				:elevation="hover ? 15 : 5" 
				:id="`eventBorder${(i.i-1)}`"
				class="eventColor"
				v-on:mouseover="model = (i.i-1)"
				style="font-size: 12px; font-weight: 550;"
				:z-index="hover ? 500 : 5"
				> 
					<p v-if="hover" class="pl-4 my-1 mx-2">{{i.date}} <br> {{i.title}}</p>
					<p v-else class="ma-0">{{i.i}}</p>
				</v-card>
			</v-hover>
		</div>

	</div>
</div>
	
</template>


<script>
import store from "@/store";
import _ from 'lodash'
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
		dates:[],
		prevHover: 0,

	}},
	computed: {	
		model: {
			// get () { return ((this.eventColors.length-1)-store.state.eventModel)  },
			// set (value) { store.dispatch("eventModal", ((this.eventColors.length+1)-value) ) }
			get () { return store.state.eventModel  },
			set (value) { store.dispatch("eventModal", value) }
	    }
	},
	watch: {
		model: function (e){
			document.getElementById("eventBorder"+this.prevHover).style.border = "none";
			
			document.getElementById("eventBorder"+e).style.border = "2px solid #FFA726";
				this.prevHover = e
		},
	},
	methods:{

		calculatingDates () {
			var ev = this.$props.events
			
			// timeline range
			this.maxDate = new Date().getFullYear(); 
			this.minDate = Math.min.apply(null, ev.map( d => d.date ))
			
			
			if (this.minDate > 0 || this.minDate/0 == Infinity){
				this.minDate = 200
				this.ticks = 18
				this.tickSize = 100
			}
			else{
				if(this.minDate % 200 != 0) {
					this.minDate = (parseInt(this.minDate / 10, 10) * 10 )
					this.minDate =  this.minDate - (200 + (this.minDate / 200) * 200)
				}
			}

			var total = this.total = this.maxDate - this.minDate

			if (this.minDate < 0){
				this.ticks = Math.floor(total/200)
				this.tickSize = 200
			}
			
			
			// topic date range
			var max = new Date(this.$props.endDate).getFullYear(); 
			var min = new Date(this.$props.startDate).getFullYear(); 

			// var min = 1000
			var end = 100 - (((this.maxDate - max)/total) * 100)
			this.start = 100 - (((this.maxDate - min)/total) * 100)
			this.width = end - this.start

			ev.forEach( (d, i) => {
				var dot = d.date
				var x = 100 - (((this.maxDate-dot)/total) * 100)
				var last = _.last(this.dates)
				i++
				if (last && (x - last.tick <= 5) ) {
					this.dates.push( {i: i, title: d.title, date: d.startDate, tick: x, stack: last.stack + 1} )
				}
				else{
					this.dates.push( {i: i, title: d.title, date: d.startDate, tick: x, stack: 0} )
				}
			})

			_.reverse(this.dates);

		}
			
	},
	mounted(){
		this.calculatingDates()
	}
}
</script>


<style type="text/css" scoped>
	.rangeColor{
		border-radius: 50px;
		/*border: 3px solid #FFCA28;*/
		background-color: #FFCA28; 

	}
	.eventColor{
		background-color: #607D8B
	}
	#eventBorder0{
		border: 2px solid #FFA726
	}
	.rotated {
		margin-left: 10px;
		margin-top: -22px;
		-webkit-transform: rotate(90deg);
		-moz-transform: rotate(90deg);
		-o-transform: rotate(90deg);
		transform: rotate(90deg);
		font-size: 16px;
		font-weight: 530;
	}
</style>
