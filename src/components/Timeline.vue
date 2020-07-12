<template>
	<v-row class="py-4 timeline" style="border-top: .5px dashed lightgrey ">
		<v-col cols="2" class="pa-0">
			<v-img height="100%" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT-ILL4LOZYbDF3-j7toq45fCjtR6RnsOr6TerzjUGBAUXfsjAz&usqp=CAU"> </v-img>
		</v-col>
		<v-col class="my-auto">
			<div id="timeline2"></div>
			<div id="timeline"></div>
		</v-col>
	</v-row>
</template>

<script type="text/javascript">
import * as d3 from 'd3'
import { db } from '@/main'
var timeline = require('@/d3-timeline.js')

export default {
  name: 'BarChart',
  props: {
    causes: Array,
    turningP: Array,
    effects: Array
  },
  data: function () {
    return {
      id: this.$route.params.id,
      whale: 1,
      testData: [
        {
          times: [
            { color: '#FF0000', label: '6', start: '1361', end: '1369' },
            { color: '#FF0000', label: '1', start: '1360', end: '1376' },
            { color: '#FF0000', label: '2', start: '1357', end: '1356' },
            { color: '#FF0000', label: '3', start: '1355', end: '1358' },
            { color: '#FF0000', label: '4', start: '1358', end: '1359' },
            { color: '#FF0000', label: '5', start: '1340', end: '1359' }
          ]
        }
      ],
      time: [
        {
          times: [

          ]
        }
      ]
    }
  },
  methods: {
    async data () {
      const todosRef = db.collection(this.id).doc('Events')
      var x = await todosRef.get().then(function (doc) {
        var times = []
        doc.data().events.forEach(doc => {
          var x = {}
          x.start = doc.date.slice(0, 4)
          x.end = doc.date.slice(0, 4)
          x.label = doc.badge.toString()
          x.name = doc.eventTitle
          x.color = '#FF0000'
          times.push(x)
        })
        return times
      })
      this.time[0].times = x
      this.timelineCircle()
    },
    timelineCircle () {
      var chart = d3.timeline()
        .datA(this.time)

      var svg = d3.select('#timeline')
        .append('svg')
        .call(chart)

      window.hotdog = chart.data

      // console.log(chart.hover(this.whale))
      // console.log(chart.hover())
    }

  },
  mounted () {
    this.data()
  }
}

</script>

<style type="text/css" scoped>
	.timeline{
		background-color: white;
		opacity: 1;
		z-index: 10;
	}
	div.tooltip {
	    position: absolute;
	    text-align: center;
	    padding: 5px;
	    font: 12px sans-serif;
	    background: lightsteelblue;
	    border: 0px;
	    border-radius: 8px;
	    pointer-events: none;
	}
	.axis path, .axis line {
		fill: none;
		stroke: black;
		shape-rendering: crispEdges;
	}
	.axis text {
		font-family: sans-serif;
		font-size: 10px;
	}
	.timeline-label {
		font-family: sans-serif;
	}
	#timeline .axis {
		/*transform: translate(0px,40px);*/
		-ms-transform: translate(0px,40px); /* IE 9 */
		-webkit-transform: translate(0px,40px); /* Safari and Chrome */
		-o-transform: translate(0px,40px); /* Opera */
		-moz-transform: translate(0px,40px); /* Firefox */
	}
	.coloredDiv {
		height: 20px;
		width: 20px;
		float: left;
	}
</style>
