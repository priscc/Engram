<template>
	<v-col class="ml-7" height="100%">
    
    <!-- *** HEADER -->
    <v-row class="text-center" style="border-bottom: 1px solid #26A69A;"> 
      <v-col class="pt-0">
        <h2 class="font-weight-light">Events of the {{header}}</h2>
      </v-col>
    </v-row>
    
    <!-- *** NARRATIVE -->
      <v-row>
        <v-tabs v-model="bottomNav" background-color="white" :color="color" right >
          <v-tab @click="color = 'red'">All</v-tab>
          <v-tab @click="color = 'purple'">Causes</v-tab>
          <v-tab @click="color = 'blue'">Turning Points</v-tab>
          <v-tab @click="color = 'green'"> Effects</v-tab>
        </v-tabs>
      </v-row>

		<!-- ***TIMELINE -->
    <v-row class="timeline pt-2"> <!-- style="background-color: transparent; border-top: .5px dashed lightgrey" -->
			<v-col class="my-0"> <!-- background: linear-gradient(143deg, transparent 33px, #FFFCDD 0); -->
				<div id="timeline2"></div>
				<div id="timeline" ></div>
			</v-col>
		</v-row>

    <!-- *** CONTENT -->
    <v-row>
      <v-col>
        <v-card elevation="24"  max-width="700" class="mx-auto" >
          <v-carousel show-arrows-on-hover  height="100%" >
            <v-carousel-item v-for="(slide, i) in slides" :key="i">
              <v-sheet :color="colors[i]" height="100%" >
                <v-row  class="fill-height" align="center" justify="center" >
                  <v-container class="mx-5 my-4"> 
                      <v-row>       

                      <!-- MAP -->
                        <v-col lg="4" md="4" sm="6" xs="12" class="pt-0">
                          <v-img height="100%" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT-ILL4LOZYbDF3-j7toq45fCjtR6RnsOr6TerzjUGBAUXfsjAz&usqp=CAU"></v-img>
                        </v-col>
                        <!-- card content -->
                        <v-col lg="8" md="8" sm="6" cols="12" class="pt-0">
                          <v-row>
                            <v-col cols="12">
                              <h2>{{Descheader}}</h2>
                              <p class="subtitle-1">{{date}}</p>  
                            </v-col>
                          </v-row>
                          <v-divider></v-divider>
                          <v-row>
                            <v-col lg="6" md="6" sm="12" cols="12">
                              <p class="subtitle-2 mb-0 font-italic">Def</p>
                              <p>The cow jumped over the moon. The cow jumped over the moon. The cow jumped over the moon. The cow jumped over the moon.</p>
                            </v-col>
                            <v-col lg="6" md="6" sm="12" cols="12">
                              <p class="subtitle-2 mb-0 font-italic">Role in {{header}}</p>
                              <p>Tester card was just made for fun. Tester card was just made. Tester card was just made. Tester card was just made.</p>
                          </v-col>
                          </v-row>
                        </v-col>
                      </v-row>

                      <v-row class="mb-6">
                        <v-col class="d-flex justify-end">
                          <v-btn color="blue" :to="`/EventPage/${Descheader}`">Learn More</v-btn>
                        </v-col>

                      </v-row>
                  </v-container>
                </v-row>
              </v-sheet>
            </v-carousel-item>
          </v-carousel>
        </v-card>
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
      //carousel
          colors: ['green','secondary','yellow darken-4','red lighten-2','orange darken-1'],
          cycle: false,
          slides: ['First','Second','Third','Fourth','Fifth'],
          Descheader: "",
          content: "",
          date: "",
      //top navbar
          color: "red",
          bottomNav: 0,
          prvCircle: null,
          cause: false,
            causeDis: "none",
          tp: false,
            tpDis: "none",
          effect: false,
            effectDis: "none",
	  	id: this.$route.params.id,
	  	//timeline content
        time: [ {times: []} ],
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

      this.time[0].times.forEach(doc =>{
        console.log(doc)
        document.getElementById('circle' + doc.label).style.elevation = "above"
        // var x = document.getElementsByClassName('text' + this.prvCircle)
        // x[0].style.fontWeight = "normal"
        // x[1].style.fontWeight = "normal"
      })

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
      
      var outerHeight = 125
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
      this.date = d.date
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
    bottomNav: function () {
      this.time[0].times.forEach(doc => {
        var num = doc.label
        var circle = document.getElementById('circle' + num)
        //all
        if (this.bottomNav == 0){
          circle.style.transitionDelay = 'all 2s'
          circle.style.fill = "#FF0000"  // *** PURPLE
        }
        //Cause
        else if (doc.type == "Cause" && this.bottomNav == 1){
          circle.style.transitionDelay = 'all 2s'
          circle.style.fill = "#B388FF"  // *** PURPLE
          this.causeDis = "block"
        }
        else if (doc.type == "Cause" && this.bottomNav != 1){
          circle.style.fill = "#FF0000"
          this.causeDis = "none"
        }
        //TP
        else if (doc.type == "Turning Points" && this.bottomNav == 2){
          circle.style.transitionDelay = 'all 2s'
          circle.style.fill = "#80D8FF" // *** BLUE
          this.tpDis = "block"
        } 
        else if ( doc.type == "Turning Points" && this.bottomNav != 2){
          circle.style.fill = "#FF0000" 
          this.tpDis = "none"
        }
        //Effects
        if (doc.type == "Effect" && this.bottomNav == 3){
          circle.style.transitionDelay = 'all 2s'
          circle.style.fill = "#64DD17" // *** GREEN
          this.effectDis = "block"
        } 
        else if (doc.type == "Effect" && this.bottomNav != 3){
          circle.style.fill = "#FF0000"
          this.effectDis = "none"
        }


      })
    },
    //unused
      // cause: function () {
      //   this.time[0].times.forEach(doc => {
      //     var num = doc.label
      //     var circle = document.getElementById('circle' + num)
      //     else if (doc.type == "Cause" && this.cause == true){
      //       circle.style.transitionDelay = 'all 2s'
      //       circle.style.fill = "#B388FF"  // *** PURPLE
      //       this.causeDis = "block"
      //     } 
      //     else if (doc.type == "Cause" && this.cause == false){
      //       circle.style.fill = "#FF0000"
      //       this.causeDis = "none"
      //     }
      //   })
      // },
      // tp: function () {
      //   this.time[0].times.forEach(doc => {
      //     var num = doc.label
      //     var circle = document.getElementById('circle' + num)
      //     if (doc.type == "Turning Points" && this.tp == true){
      //       circle.style.transitionDelay = 'all 2s'
      //       circle.style.fill = "#81D4FA" // *** BLUE
      //       this.tpDis = "block"
      //     } 
      //     else if ( doc.type == "Turning Points" && this.tp == false){
      //       circle.style.fill = "#FF0000" 
      //       this.tpDis = "none"
      //     }
      //   })
      // },
    effect: function () {
      this.time[0].times.forEach(doc => {
        var num = doc.label
        var circle = document.getElementById('circle' + num)
        if (doc.type == "Effect" && this.effect == true){
          circle.style.transitionDelay = 'all 2s'
          circle.style.fill = "#AED581" // *** GREEN
          this.effectDis = "block"
        } 
        else if (doc.type == "Effect" && this.effect == false){
          circle.style.fill = "#FF0000"
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

<style>
.box p {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}

  .fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

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
		stroke: #717171;
    stroke-width: 1.5px;
		shape-rendering: crispEdges;
	}
	.axis text {
		font-family: sans-serif;
		font-size: 12px;
    fill: #717171;
    stroke: #717171;
    stroke-width: .10px;
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
