<template>
<div>

	<div class="d-flex flex-row"  style="border-top: .5px solid black; position: relative;">
		
		<!-- ticks -->
		<div
			v-for="i in ticks +1"
			style="border: 1px solid orange;  position: absolute; top: -7px; height: 15px"
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
		
		
		<!-- bluegrey then when hover it is #FF7043 -->
		<!-- 1) see blue grey dots with numbers && see 1st card menu (hover / click)
			2) when hover turns border orange
			3) when click has fixed card && border is orange
			4) click on tabs dots turn color but has the orange/blue-grey border  -->
		<!-- events -->
		<v-hover v-slot:default="{ hover }" v-for="(i, index) in dates" :key="index" class="px-2"
				style="position: absolute; top: -35px; 
					background-color: deeppink; border-radius: 25px; color: white;"
				v-bind:style="{ left: i.tick + '%' }">
			<v-card :elevation="hover ? 12 : 3" @hover="test" style="font-size: 12px; font-weight: 550"> 
				{{index + 1}} 
			<!-- <p v-if="hover">{{i.title}}</p> -->
			</v-card>
			<!-- <div :elevation="hover ? 20 : 2" style="border-top: 1px solid black"> <p>x</p></div> -->
		</v-hover>


		<!-- <div
			v-for="i in dates" inline max-width="7" min-height="5" 
			style="position: absolute; top: -35px; 
			background-color: deeppink; border-radius: 50%;
			min-width: 10px; min-height: 10px
			"
			v-bind:style="{ left: i.tick + '%' }"
			>
			{{i.title}}
		</div> -->
	</div>
</div>
	
</template>


<script>

export default {
	props:{
		events: Array
	},
	data () { return {
		hover: null, 
		dates:[],
		ticks: 0,
		tickSize: 0,
		maxDate: 0,
		minDate: 0,
		total: 0,

	}},
	methods:{




		test(ev){
			console.log(ev)
		},


		calculatingDates () {

			var ev = this.$props.events
			
			var max = new Date(Math.max.apply(null, ev.map( d => { return new Date(d.date)}))).getFullYear();
			var min = new Date(Math.min.apply(null, ev.map( d => { return new Date(d.date)}))).getFullYear();
			
			this.maxDate = max = (parseInt(max/10, 10)+1)*10 // round up to the nearest 10
			this.minDate = min = parseInt(min / 10, 10) * 10 // round down to the nearest 10

			var total = this.total = max - min

			console.log('total', total)
			console.log('max', max)
			console.log('min', min)

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