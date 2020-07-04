<template>
<v-container class="py-0">
	<v-row>
		<v-col class="pt-0">
			<h4 class="header">{{header}}</h4>
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
					<v-row >
						<v-col class=" py-0 d-flex align-center" >
							<p class="mt-2 badgeText">{{i.label}}</p>
						</v-col>
						<v-col class=" py-0" lg="11" md="9" sm="6">
							<v-list-item-content>
					            <v-list-item-title class="text-wrap" v-text="i.name"></v-list-item-title>
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
      if (d) {
        circle.style.transitionDelay = 'all 2s'
        circle.style.r = 15
        circle.style.stroke = 'black'
        circle.style.strokeWidth = '1'
      } else {
        circle.style.r = 20 / 1.8
        circle.style.stroke = 'none'
      }
    }
  }

}
</script>

<style type="text/css" scope>
	.outlineItem{
		border: 1px solid lightgrey;
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
