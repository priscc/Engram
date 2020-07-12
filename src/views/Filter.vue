<template>
<v-container>

	<v-row>
		<v-col>
			Comp
			<tester-comp :time="time"></tester-comp>
			Inside filter

			<div  :class="{ 'on-hover': hover }" class="my-2" :style="{border: i.border}" v-for="(i, index) in time[0].times" :key="index" @mouseover="hover(true, index)" @mouseleave="hover(false, index)"> {{i.label}} </div>

</v-col>
	</v-row>
	<v-row style="border: 1px solid black">
		<v-col>
			<div id="myClass"></div>
			<div id="timeline2"></div>
			<div id="timeline"></div>
		</v-col>
	</v-row>

<div style="height: 500px"></div>

	<v-row class="pt-5">
		<v-col v-for="n in 3" :key="n">
			<v-hover v-slot:default="{ hover }">
				<v-card class="mx-auto" color="grey lighten-4" max-width="600">
				<v-img :aspect-ratio="16/9" src="https://cdn.vuetifyjs.com/images/cards/kitchen.png" >
					<v-expand-x-transition>
						<div v-if="hover" class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal display-3 white--text" style="height: 100%;" >
							$14.99
						</div>
					</v-expand-x-transition>
				</v-img>
				</v-card>
			</v-hover>
		</v-col>
	</v-row>

	<!-- <blog-show></blog-show> -->

	<v-row class="pt-5">
		<v-col>
			<v-text-field label="Main input" autocomplete="off" v-model="state" @input="filterStates"></v-text-field>
		</v-col>
	</v-row>

	<v-row v-if="filteredStates && modal">
		<v-col>
			<v-list-item>
					<v-list-item-content>
						<v-list-item-title v-for="filteredState in filteredStates" :key="filteredState" @click="setState(filteredState)"> {{ filteredState }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
		</v-col>
	</v-row>
</v-container>
</template>

<script>
import blogShow from '@/components/othercomponents/blogShow.vue'
import barchart from '@/components/Barchart.vue'
import testerComp from '@/views/other_pages/testertestComp.vue'
import timeline from '@/components/Timeline.vue'
import * as d3 from 'd3'
// var timeline = require('@/tester.js');
import { db } from '@/main'

export default {
  data: function () {
    return {
      activeColor: 'red',

      accessingChildComp: [1, 2, 3, 4],
      accessingChildComp2: [
        { moreStyles: { border: '1px solid lightgrey' }, num: 1 },
        { moreStyles: { border: '1px solid lightgrey' }, num: 2 },
        { moreStyles: { border: '1px solid lightgrey' }, num: 3 }
      ],
      testData: [
        {
          label: 'person a',
          times: [
            { starting_time: 1355752800000, ending_time: 1355759900000 },
            { starting_time: 1355767900000, ending_time: 1355774400000 }]
        },
        {
          label: 'person b',
          times: [
            { starting_time: 1355759910000, ending_time: 1355761900000 }]
        },
        {
          label: 'person c',
          times: [
            { starting_time: 1355761910000, ending_time: 1355763910000 }]
        }
      ],
      testData2: [
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
      barChartData: [
        { name: 'Roses', amount: 25 },
        { name: 'Tulips', amount: 40 },
        { name: 'Daisies', amount: 15 },
        { name: 'Narcissuses', amount: 9 }
      ],
      state: '',
      modal: true,
      states: ['Alaska', 'Alabama', 'California', 'Colorado', 'Connecticut', 'Missouri', 'Florida'],
      filteredStates: [],
      filteredPeriods: [],
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

  components: {
    blogShow,
    barchart,
    timeline,
    testerComp
  },
  methods: {
    hover (d, index) {
      if (d) {
        var num = this.time[0].times[index].label
        var circle = document.getElementById('circle' + num)
        circle.style.stroke = 'black'
        circle.style.strokeWidth = '2'
      } else {
        var num = this.time[0].times[index].label
        var circle = document.getElementById('circle' + num)
        circle.style.stroke = 'none'
      }
    },
    async pullData () {
      const todosRef = db.collection('tester').doc('rzMOembAuSuFfBKeXb2i')

      var x = await todosRef.get().then(function (doc) {
        var times = []
        doc.data().events.forEach(doc => {
          var x = {}
          x.start = doc.start
          x.end = doc.end
          x.label = doc.label
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

      var svg = d3.select('#timeline')
        .append('svg')

      this.timeline(svg)

      // var div = d3.select("#myClass").append("svg").append("rect");
      // var i = 1
      // div .attr("height", "20")
      // 	.attr("width", "100")
      // 	.attr("fill", "blue")
      // 	.on("mouseover", function(){
      // 		this.accessingChildComp2[i].moreStyles.border = "2px solid black"
      // 	}.bind(this))
      // 	.on("mouseout", function(){

      // 		this.accessingChildComp2[i].moreStyles.border = "1px solid lightgrey"
      // 	}.bind(this));
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
          result = result - 4.5
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
      d.border = '2px solid lightgrey'
    },

    mouseout (d) {
      d.border = ''
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
    },

    filterStates () {
      this.filteredStates = this.states.filter(state => {
        return state.toLowerCase().startsWith(this.state.toLowerCase())
      })
    },
    setState (state) {
      this.state = state
    },
    periodAutofill () {
      this.filteredPeriods = this.state.filter(state => {
        var x = state.toLowerCase()
        console.log(x)
        return x
      })

      // let snapshot = db.collection('TimePeriods').where('header', '==', 'special').get();
      // snapshot.forEach (doc => {
      // 	let appDate = doc.data();
      // 	console.log(appDate);
      // });
    }
  },
  mounted () {
    this.pullData()
  }
}

</script>

<style type="text/css" scoped>

	.timeline{
		background-color: white;
		opacity: 1;
		z-index: 10;
	}
	/*div.tooltip {
	    position: absolute;
	    text-align: center;
	    padding: 5px;
	    font: 12px sans-serif;
	    background: lightsteelblue;
	    border: 0px;
	    border-radius: 8px;
	    pointer-events: none;
	}*/
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
