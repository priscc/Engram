<template>
<v-container class="py-0">
	<v-row>
		<v-col class="pt-0 header">
			<h5 >{{header}} </h5>
			<!-- <h5>of the American Revolution</h5> -->
		</v-col>
	</v-row>
	<v-row>
		<v-col class="pt-0 scrollEvents">
			<v-list rounded style="background-color: transparent;">
				<v-list-item
					v-for="(i, index) in events[0].times" :key="index"
					class="outlineItem"
					:to="`/EventPage/${i.name}`"
					:style="{'border': i.border}"
					v-if="i.type == header"
					@mouseover="hover(true, i)" @mouseleave="hover(false, i)"
				>
					<v-row>
						<v-col class=" py-0 d-flex align-center" style="max-width:50px">
							<p class="mt-2 badgeText">{{i.label}}</p>
						</v-col>
						<v-col class="py-0 px-1 d-flex align-center">
							<v-list-item-content>
					            <v-list-item-title class="text-wrap" style="font-size: 14px;"v-text="i.name"></v-list-item-title>
					            <v-list-item-subtitle class="text-wrap" style="font-size: 14px;"><i>({{i.date}})</i></v-list-item-subtitle>
							</v-list-item-content>
						</v-col>
					</v-row>
				</v-list-item>
			</v-list>
		</v-col>
	</v-row>

</v-container>
</template>

<script>

export default {
  name: 'Topics',
  props: {
    events: Array,
    header: String
  },
  methods: {
    hover (d, i) {
      var num = i.label
      var circle = document.getElementById('circle' + num)
      var tool = document.getElementsByClassName('tooltip')[0]
      
      if (d) {
        circle.style.transitionDelay = 'all 2s'
        circle.style.r = 15
        circle.style.stroke = 'black'
        circle.style.strokeWidth = '1.25'
        
        var pageX = circle.getBoundingClientRect().left
        var pageY = circle.getBoundingClientRect().top
       
        d3.select(tool)
	      .transition()
	      .duration(200)
	      .style('opacity', 0.9)
	      .text(i.name + " (" + i.date + ")")
	      .style('left', pageX + 'px')
	      .style('top', (pageY - 100)+ 'px')
      } else {
        circle.style.r = 20 / 1.8
        circle.style.stroke = 'none'
        
        d3.select(tool).transition()
	      .duration(50)
	      .style('opacity', 0)
      }
    }
  }

}
</script>

<style type="text/css" scoped>
	.outlineItem{
		/*border: 1px solid lightgrey;*/
		/*opacity: .5*/
	}
	.header{
		border: 1px solid black;
	}
	.scrollEvents{
		height: 320px;
		overflow: scroll;
	}
	.badgeText{
		color: white;
		width: 100%;
		background-color: #FF0000;
		border-radius: 25px;

	}

</style>
