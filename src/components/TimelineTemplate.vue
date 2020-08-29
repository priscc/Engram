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
			{{ minDate + ((i-1)*tickSize)   }}
		</div>
		
		
		<div>
			<v-hover
			v-slot:default="{ hover }" v-for="(i, index) in dates" :key="index" 
			class="px-2"
			style="position: absolute; top: -30px;  border-radius: 25px; color: white;"
			v-bind:style="{ left: i.tick + '%' }">

				<v-card
				:elevation="hover ? 15 : 5" 
				:id="`cardBorder${index}`"
				class="cardColor"
				v-on:mouseover="model = index"
				style="font-size: 12px; font-weight: 550;"
				:z-index="hover ? 500 : 5"
				> 
					<p v-if="hover" class="ma-0">{{i.title}}</p>
					<p v-else class="ma-0">{{index +1}}</p>
				</v-card>
			</v-hover>
		</div>
	</div>
</div>
	
</template>


<script>
import store from "@/store";

export default {
	props:{
		events: Array,
		bottomNav: Number,
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
			document.getElementById("cardBorder"+this.prevHover).style.border = "none";
			
			document.getElementById("cardBorder"+e).style.border = "2px solid #FFA726";
				this.prevHover = e
		},
		bottomNav: function(ev) {
			this.eventColors.forEach( (doc, i) => {
				var circle = document.getElementById('cardBorder' + (i+1) )
				// Cause
				if (doc.eventType == "Cause" && ev == 'Cause')
					circle.style.backgroundColor = "#B388FF"  // *** PURPLE
				//TP
				else if (doc.eventType == "Turning Points" && ev == 'Turning Points')
					circle.style.backgroundColor = "#80D8FF" // *** BLUE
				//Effects
				else if (doc.eventType == "Effect" && ev == 'Impact')
					circle.style.backgroundColor = "#64DD17" // *** GREEN
				else
					circle.style.backgroundColor = "#607D8B" // **BLUEGREY
			})
		}
		
	},
	methods:{

		calculatingDates () {

			var ev = this.$props.events
			
			var max = new Date(this.$props.endDate).getFullYear(); 
			var min = new Date(this.$props.startDate).getFullYear(); 
			
			this.maxDate = max = (parseInt(max/10, 10)+1)*10 // round up to the nearest 10
			this.minDate = min = parseInt(min / 10, 10) * 10 // round down to the nearest 10

			var total = this.total = max - min

			// console.log('total', total)
			// console.log('max', max)
			// console.log('min', min)

			ev.forEach( d =>{
				var dot = d.date
				var x = 100 - (((max-dot)/total) * 100)
				
				this.dates.push( {title: d.title, tick: x} )
			})

			

			// // Calutating ticks
			if (total >= 500){
				this.ticks = Math.floor(total/100)
				this.tickSize = 100
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
