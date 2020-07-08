<template>
	<v-col class="pl-7">
    
    <!-- *** HEADER -->
    <v-row class="text-center">
      <v-col class="pt-0 pb-8">
        <h2 class="font-weight-light"><u>Events of the {{header}}</u></h2>
      </v-col>
    </v-row>
    
		<!-- ***TIMELINE -->
    <v-row class=" timeline"> <!-- style="background-color: transparent; border-top: .5px dashed lightgrey" -->
			<v-col class="my-auto">
				<div id="timeline2"></div>
				<div id="timeline"></div>
			</v-col>
		</v-row>

    <!-- *** NARRATIVE  -->
    <v-row class="d-flex align-start pb-10" color="orange">
      <v-col>
        <!-- CAUSE switch -->
        <div class="pa-2 px-4" style="background-color: #EDE7F6; border-radius: 25px; border: 1px solid #512DA8;">
          <v-switch v-model="cause" label="Causes" class="ma-0 pa-0" color="#7E57C2" hide-details></v-switch>
        </div>
        <ul v-bind:style="{'display': causeDis}" v-for="i in causes">
          <li>
            {{i.eventTitle}}
          </li>
        </ul>
      </v-col>
      <v-col>
        <!-- TURNING POINT switch -->
        <div class="pa-2 px-4" style="background-color: #E3F2FD; border-radius: 25px; border: 1px solid #1E88E5;">
          <v-switch v-model="tp" label="Turning Points" class="ma-0 pa-0" color="#90CAF9" hide-details></v-switch>
        </div>
        <ul v-bind:style="{'display': tpDis}" v-for="i in turningP">
          <li>
            {{i.eventTitle}}
          </li>
        </ul>
      </v-col>
      <v-col>
        <!-- EFFECT switch -->
        <div class="pa-2 px-4" style="background-color: #F1F8E9; border-radius: 25px; border: 1px solid #7CB342;">
          <v-switch v-model="effect" label="Effects" class="ma-0 pa-0" color="#9CCC65" hide-details></v-switch>
        </div>
        <ul v-bind:style="{'display': effectDis}" v-for="i in effects">
          <li>
            {{i.eventTitle}}
          </li>
        </ul>
      </v-col>
    </v-row>

    <!-- *** CONTENT -->
    <v-row>
      <v-col style="max-width: 25%">
        <v-img width="100%" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT-ILL4LOZYbDF3-j7toq45fCjtR6RnsOr6TerzjUGBAUXfsjAz&usqp=CAU"> </v-img>
      </v-col>
      <v-col>
          <div class="py-2 px-2 pl-4" style="border: 1px solid black"> 
            <h4>{{Descheader}}</h4>
            <p style="font-size: 12px">{{content}}</p>
          </div>
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
      prvCircle: null,
      cause: false,
        causeDis: "none",
      tp: false,
        tpDis: "none",
      effect: false,
        effectDis: "none",
	  	id: this.$route.params.id,
	  	extend: false,
	  	showBtn: false,
	  	btntext: 'mdi-chevron-down',
	  	time: [
        { times: [ ] }
      ],
      Descheader: "",
      content: "",
      data: {},
      Width: null,
      svg: null, // #timeline
      chart: null, // timeline axis
      g: null,
      tool: null,
      margin: { top: 20, right: 50, bottom: 20, left: 10 }
    }
  },
  methods: {

    async pullData () {
      // var h = header.replace(/\s+/g, '').toLowerCase()
      const todosRef = db.collection(this.id).doc('Events')

      var x = await todosRef.get().then(function (doc) {
        var times = []
        doc.data().events.forEach(doc => {
          var x = {}
          x.start = doc.date.slice(0, 4)
          x.date = doc.date.slice(0, 4)
          x.end = doc.date.slice(0, 4)
          x.label = doc.badge.toString()
          x.name = doc.eventTitle
          x.type = doc.eventType
          x.content = doc.content
          x.color = '#FF0000'
          // x.border = ''
          times.push(x)
        })
        return times
      })
      this.time[0].times = x
      this.myFunction()
    },

///////////////
// TIMELINE //
//////////////

    //myFunction: calls timeline
    myFunction () {
      this.datA(this.time)
      var svg = d3.select('#timeline')
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

      // gets svg of <div #timeline>, sets dimensions
      var div = gParent[0][0]

      // cal svg elements
      var outerWidth = div.getBoundingClientRect().width
      
      var outerHeight = 150
      var width = outerWidth - this.margin.left - this.margin.right
      var height = outerHeight - this.margin.top - this.margin.bottom
      this.Width = width


      var svg = d3.select(div)
        .append('svg')
        .attr('overflow-x', "scroll")
        .attr("width", "100%")
        .attr("height", outerHeight)

      // Define the div for the tooltip
      this.tool = d3.select('#timeline2').append('div')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('class', 'tooltip')
        .style('opacity', 0)

      // append g element for circles and timeline axis (chart)
      var g = svg.append('g')
        .attr('transform', 'translate(' + this.margin.left + ',' + (  this.margin.top + 20 ) + ')')
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
        .attr('fill', function (d, i) { return d.color });
      
        //appending div
        // g.selectAll('svg').data(Circledata).enter()
        //   .append('div')
        //   .attr('height', "10px")
        //   .attr('width', "10px")


      //Rotated
      g.selectAll('svg').data(Circledata).enter()
        .append('text')
        .attr('class', function (d) { return ('text' + d.label) })
        .classed('trend-type', true)
        .style("text-anchor", "start")
        .attr("transform", function (d){
          var x = this.margin.left + (d.start - this.data.minDate) * scaleFactor + 10
          var y = this.margin.top + (itemHeight + itemMargin) * scaleFactor - 10
          // "translate(300,150) rotate(10)"
          return "translate(" + x + "," + y + ") rotate(-10)"
        }.bind(this))
        .style('font-size', "12px")
        .style('fill', 'black')
        .text(function (d){ return d.name });

          
      // circle text
      g.selectAll('svg').data(Circledata).enter()
        .append('text')
        .attr('class', function (d) { return ('text' + d.label) })
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

    tooltip(d){
      console.log(d)
      // d3.select('#timeline2').append('div')
      //   .attr('width', '10px')
      //   .attr('height', '10px')
      //   .attr('class', 'tooltip')
      //   .style('opacity', 1)
      //   .text(d.name)
      //   .style('fill', 'black')
        // .style('left', (d3.event.pageX) + 'px')
        // .style('top', (d3.event.pageY - 105) + 'px')
    },

    // Create Event Handlers for mouse
    mouseover (d) {
      
      if (this.prvCircle != null){
        document.getElementById('circle' + this.prvCircle).style.stroke = ''
        var x = document.getElementsByClassName('text' + this.prvCircle)
        x[0].style.fontWeight = "normal"
        x[1].style.fontWeight = "normal"
      } 
      
      var newCircle = document.getElementById('circle' + d.label)
        newCircle.style.stroke = '#263238'
        newCircle.style.strokeWidth = '1.8'
      
      var x = document.getElementsByClassName('text' + d.label)
          x[0].style.fontWeight = "bold"
          x[0].style.fill = "#37474F"
          x[1].style.fontWeight = "bold"
      
      this.Descheader = d.name
      this.content = d.content
    },

    mouseout (d) {
      this.prvCircle = d.label
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
  watch: {
    cause: function () {
      this.time[0].times.forEach(doc => {
        var num = doc.label
        var circle = document.getElementById('circle' + num)
        if (doc.type == "Cause" && this.cause == true){
          circle.style.transitionDelay = 'all 2s'
          circle.style.fill = "#7E57C2" 
          this.causeDis = "block"
        } 
        else if (doc.type == "Cause" && this.cause == false){
          circle.style.fill = "#FF0000"
          this.causeDis = "none"
        }
      })
    },
    tp: function () {
      this.time[0].times.forEach(doc => {
        var num = doc.label
        var circle = document.getElementById('circle' + num)
        if (doc.type == "Turning Points" && this.tp == true){
          circle.style.transitionDelay = 'all 2s'
          circle.style.fill = "#0288D1" 
          this.tpDis = "block"
        } 
        else if ( doc.type == "Turning Points" && this.tp == false){
          circle.style.fill = "#FF0000" 
          circle.style.stroke = 'none'
          this.tpDis = "none"
        }
      })
    },
    effect: function () {
      this.time[0].times.forEach(doc => {
        var num = doc.label
        var circle = document.getElementById('circle' + num)
        if (doc.type == "Effect" && this.effect == true){
          circle.style.transitionDelay = 'all 2s'
          circle.style.fill = "#7CB342" 
          this.effectDis = "block"
        } 
        else if (doc.type == "Effect" && this.effect == false){
          circle.style.fill = "#FF0000" 
          circle.style.stroke = 'none'
          this.effectDis = "none"
        }
      })
    }
     
  },
  mounted () {
    this.pullData()
  }
}
</script>

<style scope>

  ul{
    margin-left: 10%;
  }
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
    stroke-width: 1.5px;
		shape-rendering: crispEdges;
	}
	.axis text {
		font-family: sans-serif;
		font-size: 12px;
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
