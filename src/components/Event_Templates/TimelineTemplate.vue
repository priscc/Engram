<template>
<div>
	<div class="d-flex flex-row" 
	style="border-top: 7px solid #FFCA28; position: relative; top: 3px"
	v-bind:style="{ left: topicRange + '%', width: topicRangeW + '%'}"
	>
	</div>


	<div class="d-flex flex-row"  style="border-top: .5px solid #78909C; position: relative;">
		
		<!-- ticks -->
		<div
			v-for="i in ticks +1"
			style="border-left: 2px solid #607D8B;  position: absolute; top: -9px; height: 16px"
			v-bind:style="{ left: (( ( (i-1)*(tickSize) )*100) /total) + '%' }"
			>
		</div>


		<!-- dates -->
		<div
			v-for="i in ticks +1"
			style="position: absolute; top: 10px; height: 15px; font-size: 12px;"
			v-bind:style="{ left: (( ( (i-1)*(tickSize) )*100) /total) - 1 + '%' }"
			>
			{{ minDate + ((i-1)*tickSize)   }}
		</div>
		
		
		<!-- events -->
		<div style="top: -70px;">
			<v-hover
			v-slot:default="{ hover }" v-for="(i, index) in dates" :key="index" 
			class="px-2"
			style="position: absolute; border-radius: 25px; color: white;"
			v-bind:style="{ left: i.tick + '%', top: (i.stack * -20)-40 +'px'}"
			>
				<v-card
				:elevation="hover ? 15 : 5" 
				:id="`cardBorder${(i.i-1)}`"
				class="cardColor"
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
		startDate: String,
		endDate: String
	},
	data () { return {
		eventColors: this.$props.events,
		prevHover: 0,
		hover: null, 
		dates:[],
		ticks: 0,
		tickSize: 0,
		maxDate: 0,
		minDate: 0,
		total: 0,
		topicRange: 0,
		topicRangeW: 0

	}},
	computed: {	
		model: {
			get () { return store.state.eventModel  },
			set (value) { store.dispatch("eventModal", value) }
	    }
	},
	watch: {
		model: function (e){
			document.getElementById("cardBorder"+this.prevHover).style.border = "none";
			
			document.getElementById("cardBorder"+e).style.border = "2px solid #FFA726";
				this.prevHover = e
		}
	},
	methods:{

		calculatingDates () {

			var ev = this.$props.events

			// timeline range
			var startDate = new Date(this.$props.startDate).getFullYear() + 1; 
			var endDate = new Date(this.$props.endDate).getFullYear() + 2;
			var max = this.maxDate = 1700;
			var min = this.minDate = (Math.min.apply(null, ev.map( d => d.date ))) - 200
			
			if ( (endDate - startDate) < 200){
				console.log('in here')
				max = this.maxDate = endDate + 200
			}
			
			if (min >= 1000 && min <= 1200){
				min = this.minDate = 1000;
			}
			
			var total = this.total = max - min

			// toipc date range
			this.topicRange = 100 - (((max - startDate)/total) * 100)
			var topicMin = 100 - (((max - endDate)/total) * 100)

			this.topicRangeW = topicMin - this.topicRange

			ev.forEach( (d, i) => {
				var dot = d.date
				var x = 100 - (((max-dot)/total) * 100)
				var last = _.last(this.dates)
				i++
				if (last && (x - last.tick <= 5) && last.stack < 3) {
					this.dates.push( {i: i, title: d.title, date: dot, tick: x, stack: last.stack + 1} )
				}
				else{
					this.dates.push( {i: i, title: d.title, date: dot, tick: x, stack: 0} )
				}
			})

			_.reverse(this.dates);
			

			// Calutating ticks
			if (total >= 600){
				this.ticks = Math.floor(total/100)
				this.tickSize = 100
			}
			if (total >= 500){
				this.ticks = Math.floor(total/50)
				this.tickSize = 50
			}
			else if (total >= 250){
				this.ticks = Math.floor(total/25)
				this.tickSize = 25
				// console.log('> 100', total)
			}
			else if (total >= 100){
				this.ticks = total/10
				this.tickSize = 10
				// console.log('> 100', total)
			}
			else if ( total >= 50){
				this.ticks = total/10
				this.tickSize = 10
				// console.log('> 50', total)
			}
			else if ( total >= 20){
				this.ticks = total/5
				this.tickSize = 5
				// console.log('> 20', total)
			}
			else{
				this.ticks = total
				this.tickSize = 1
				// console.log('< 20', total)
			}
		}
			
	},
	mounted(){
		this.calculatingDates()
	}
}

</script>

<style type="text/css" scoped>
	.cardColor{
		background-color: #607D8B
	}
	#cardBorder0{
		border: 2px solid #FFA726
	}
</style>
