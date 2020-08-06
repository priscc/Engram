<template>
<div>
	<div class="d-flex flex-row"  style="border: 1px solid black; position: relative;">
		
		<!-- ticks -->
		<!-- <div
			v-for="i in ticks"
			style="border: 1.5px solid orange;  position: absolute; top: -5px; height: 15px"
			v-bind:style="{ left: i * (100/tickSize) + '%' }"
			>
			{{i}}
		</div> -->

		<!-- dates -->
		<!-- <div
			v-for="i in 3" max-height="5" 
			style="position: absolute; top: 10px"
			v-bind:style="{ left: i * 30 + '%' }"
			>
			{{i}}
		</div> -->
		
		<!-- events -->
		<div
			v-for="i in dates" inline max-width="7" min-height="5" 
			style="position: absolute; top: -35px; 
			background-color: deeppink; border-radius: 50%;
			min-width: 10px; min-height: 10px
			"
			v-bind:style="{ left: i.tick + '%' }"
			>
			<!-- {{i.title}} -->
		</div>
	</div>
</div>
	
</template>


<script>

export default {
	props:{
		events: Array
	},
	data () { return {
		dates:[],
		ticks: 0,
		tickSize: 0,
		maxDate: 0,
		minDate: 0,

	}},
	methods:{
		calculatingDates () {

			var ev = this.$props.events
			
			var max = new Date(Math.max.apply(null, ev.map( d => { return new Date(d.date)}))).getFullYear();
			var min = new Date(Math.min.apply(null, ev.map( d => { return new Date(d.date)}))).getFullYear();
			min = 1999
			this.maxDate = (parseInt(max/10, 10)+1)*10 // round up to the nearest 10
			this.minDate = parseInt(min / 10, 10) * 10 // round down to the nearest 10


			var total = max - min

			ev.forEach( d =>{
				var dot = new Date(d.date).getFullYear()
				var x = 100 - (((max-dot)/total) * 100)
				
				this.dates.push( {title: d.title, tick: x} )
			})
			
			// // Calutating ticks
			if (total >= 100){
				this.ticks = total/10
				this.tickSize = 10
				console.log('> 100', total)
			}
			else if ( total >= 50){
				this.ticks = total/10
				this.tickSize = 10
				console.log('> 50', total)
			}
			else if ( total >= 20){
				this.ticks = total/5
				this.tickSize = 5
				console.log('> 20', total)
			}
			else{
				this.ticks = total
				this.tickSize = 1
				console.log('< 20', total)
			}
		}
			
	},
	mounted(){
		this.calculatingDates()
	}
}

</script>