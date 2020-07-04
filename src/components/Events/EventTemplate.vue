<template>
	<v-col class="pl-10">
		<v-row class="text-center" id="eventExtend">
			<!-- Causes -->
			<v-col class="pa-0">
				<event-col :header="`Cause`"  :events="time"/>
			</v-col>
			<!-- line 2 -->
			<v-col cols="1" class="pa-0" style="max-width: 10px;">
				<svg width="100%" height="100%">
				  <path d="M5,400 v-400" fill="yellow" stroke="lightgray" stroke-width="1" />
				</svg>
			</v-col>
			<!-- TP -->
			<v-col class="pa-0">
				<event-col :header="`Turning Points`" :events="time"/>
			</v-col>
			<!-- line 2 -->
			<v-col cols="1" class="pa-0" style="max-width: 10px;">
				<svg width="100%" height="100%">
				  <path d="M5,400 v-400" fill="yellow" stroke="lightgray" stroke-width="1" />
				</svg>
			</v-col>
			<!-- Effects -->
			<v-col class="pa-0">
				<event-col :header="`Effect`" :events="time"/>
			</v-col>
		</v-row>
		<!-- <v-row>
			<v-btn block v-if="showBtn" @click="extendbtn" id="buttonExtend" ><v-icon dark large>{{btntext}}</v-icon></v-btn>

		</v-row> -->
		<v-row class="py-4 timeline" style="background-color: transparent; border-top: .5px dashed lightgrey">
			<v-col cols="2" class="pa-0">
				<v-img height="100%" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT-ILL4LOZYbDF3-j7toq45fCjtR6RnsOr6TerzjUGBAUXfsjAz&usqp=CAU"> </v-img>
			</v-col>
			<v-col class="my-auto">
				<div id="timeline2"></div>
				<div id="timeline"></div>
			</v-col>
		</v-row>
	</v-col>
</template>

<script>
import eventCol from '@/components/Events/EventColumn.vue'
import { db } from '@/main'
import * as d3 from 'd3'

export default {
  name: 'Topics',
  props: {
    causes: Array,
    turningP: Array,
    effects: Array,
    header: String
  },
  components: {
    eventCol
  },
  data () {
    return {
	  	id: this.$route.params.id,
	  	extend: false,
	  	showBtn: false,
	  	btntext: 'mdi-chevron-down',
	  	time: [
        {
          times: [

          ]
        }
      ],
      data: {},
      Width: null,
      svg: null, // #timeline
      chart: null, // timeline axis
      g: null,
      tool: null,
      margin: { top: 20, right: 20, bottom: 20, left: 20 }
    }
  },
  methods: {
  		searchDataSets () {

  		},
    async pullData () {
      // var h = header.replace(/\s+/g, '').toLowerCase()
      const todosRef = db.collection(this.id).doc('Events')

      var x = await todosRef.get().then(function (doc) {
        var times = []
        doc.data().events.forEach(doc => {
          var x = {}
          x.start = doc.date.slice(0, 4)
          x.end = doc.date.slice(0, 4)
          x.label = doc.badge.toString()
          x.name = doc.eventTitle
          x.type = doc.eventType
          x.color = '#FF0000'
          x.border = ''
          times.push(x)
        })
        return times
      })
      this.time[0].times = x
      this.myFunction()
    },

    myFunction () {
      this.datA(this.time)
      var svg = d3.select('#timeline').append('svg')
      this.timeline(svg)
    },

    // datA: formats timeline date data, parse to start and end dates, find min and max date
    datA (items) {
      // grabbing data
      var items = items[0].times

      var today = new Date()

      // copying data to dictionary
      this.data.items = items
      // forEach: parse String data to dates & clean end dates
      this.data.items.forEach(function (item) {
        item.start = d3.time.format('%Y').parse(item.start)
        if (item.end == '') { // if has no end time
          item.end = new Date(item.start.getTime() + instantOffset)
          item.instant = true
        } else {
          item.end = d3.time.format('%Y').parse(item.end)
          item.instant = false
        }
        // prevent timeline from going into the future
        if (item.end > today) { item.end = today };
      })
      // find min and max date
      this.data.minDate = d3.min(this.data.items, function (d) { return d.start })
      this.data.maxDate = d3.max(this.data.items, function (d) { return d.end })
    },

    // timeline: sets svg dimension, (creates svg tag layout) adds circles then adds timeline axis
    timeline (gParent) {
      // cal svg elements
      var outerWidth = 700
      var outerHeight = 100
      var width = outerWidth - this.margin.left - this.margin.right
      var height = outerHeight - this.margin.top - this.margin.bottom
      this.Width = width

      // gets svg of <div #timeline>, sets dimensions
      var div = gParent[0][0]
      var svg = d3.select(div)
        .attr('width', '100%')
        .attr('height', outerHeight)

      // Define the div for the tooltip
      this.tool = d3.select('#timeline2').append('div')
        .attr('width', '100%')
        .attr('height', '100%')
			    .attr('class', 'tooltip')
			    .style('opacity', 0)

      // append g element for circles and timeline axis (chart)
      var g = svg.append('g')
        .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')')
      this.DrawCircles(g)

      // appends nested g for timeline axis
      var chart = g.append('g')
        .attr('class', 'chart')
        .attr('clip-path', 'url(#chart-area)')
      this.xAxis(chart, svg)
    },

    DrawCircles (g) {
      // used for positioning
      var scaleFactor = (1 / (this.data.maxDate - this.data.minDate)) * (this.Width - this.margin.left - this.margin.right)
      var itemHeight = 20; var itemMargin = 5
      var Circledata = this.data.items

      // issue warning about using id per data set. Ids should be individual to data elements
      if (typeof (this.data.id) !== 'undefined') {
        console.warn("d3Timeline Warning: Ids per dataset is deprecated in favor of a 'class' key. Ids are now per data element.")
      }

      // circles
      g.selectAll('svg').data(Circledata).enter()
        .append('circle')
        .attr('class', 'circle')
        .attr('id', function (d) { return ('circle' + d.label) })
        .on('mouseover', this.mouseover.bind(this))
        .on('mouseout', this.mouseout.bind(this))
      // for each stacked rect (contains track of circles)
        .attr('x', getXPos.bind(this))
        .attr('y', getYPos.bind(this))
        .attr('width', function (d, i) { return (d.end - d.start) * 0.5 })
      // circles
        .attr('cy', getYPos.bind(this))
        .attr('cx', getXPos.bind(this))
        .attr('r', itemHeight / 1.8)
        .attr('height', itemHeight)
        .attr('fill', function (d, i) { return d.color })

      // circle text
      g.selectAll('svg').data(Circledata).enter()
        .append('text')
        .on('mouseover', this.mouseover.bind(this))
        .on('mouseout', this.mouseout.bind(this))
        .attr('x', function (d) {
          var result = this.margin.left + (d.start - this.data.minDate) * scaleFactor
          if (parseInt(d.label) > 9) result = result - 9
          else result = result - 4.5
          return result
        }.bind(this))
        .attr('y', function (d) {
          var result = this.margin.top + (itemHeight + itemMargin) * scaleFactor
          result = result + 5
          return result
        }.bind(this))
        .text(function (d) { return d.label })
        .style('fill', 'white')

      // functions called by attributes
      function getYPos (d, i, text) {
        var result = this.margin.top + (itemHeight + itemMargin) * scaleFactor
        if (text) { result = result + 15 };
        return result
      }
      function getXPos (d, i, text) {
        var result = this.margin.left + (d.start - this.data.minDate) * scaleFactor
        if (text) { result = result - 4.5 };
        return result
      }
    },

    // Create Event Handlers for mouse
    mouseover (d) {
      d.border = '1px solid black'
      document.getElementById('circle' + d.label).style.stroke = 'black'
    },

    mouseout (d) {
      d.border = ''
      document.getElementById('circle' + d.label).style.stroke = 'none'
    },

    // xAxis: create axis and axis year intervals
    xAxis (chart, svg) {
      // create axis intervals
      var xScale = d3.time.scale()
        .domain([this.data.minDate, this.data.maxDate])
        .range([0, this.Width])
      // add ticks with year format
      var axis = d3.svg.axis()
        .scale(xScale)
        .orient('bottom')
        .tickSize(6, 0)
        .tickFormat(function (d) { return d.getUTCFullYear() })
      // call and dislay axis
      var xAxis = chart.append('g')
        .attr('class', 'axis')
        .call(axis)
      return timeline
    }

  },
  mounted () {
    this.pullData()
  }
}
</script>

<style scope>
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
