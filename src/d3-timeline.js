// inspired and adapted from:
// https://github.com/jiahuang/d3-timeline (works more with stacks)
// http://bl.ocks.org/rengel-de/5603464 (works with BC, draggin and zooming)

//* * Future:
// one thing this code doesn't take into account for is if there are start dates with the same date

// STEPS:
// 1) all global variables are registered with setting functions
// 1a) some variables are set in timeline()

// 2) datA() - should always be called by external file
// 2a) copy data to new dic
// 2b) parse dates & clean up end dates
// 2c) find min and max date

// * note: if wanted to later add other functions (stacked()), when these are called they will be done before timeline() is completed
// 3) timeline() - should always be called by external file - will be reached last
// 3a) svg dimensions are set
// 3b) svg layout created, <div #timeline> <g></g> </div>
// 3c) DrawCircles()
// 3d) g added, <div #timeline> <g> <circle></circle> <g></g> </g> </div>
// 3c) xAxis()

// 4) xAxis() - will always be called by timeline()
// 4a) create intervals, year tick marks, then adds axis to svg

d3.timeline = function () {
  // Global variables
  var data = {}
  var Width
  var svg // #timeline
  var chart // timeline axis
  var g
  var tool
  var whale // contains the g timeline axis and circles
  var margin = { top: 20, right: 20, bottom: 20, left: 20 }

  // timeline: sets svg dimension, (creates svg tag layout) adds circles then adds timeline axis
  function timeline (gParent) {
    // cal svg elements
    var outerWidth = 700
    var outerHeight = 100
    var width = outerWidth - margin.left - margin.right
    var height = outerHeight - margin.top - margin.bottom
    Width = width

    // gets svg of <div #timeline>, sets dimensions
    var div = gParent[0][0]
    svg = d3.select(div)
      .attr('width', '100%')
      .attr('height', outerHeight)

    // Define the div for the tooltip
    tool = d3.select('#timeline2').append('div')
      .attr('width', '100%')
      .attr('height', '100%')
		    .attr('class', 'tooltip')
		    .style('opacity', 0)

    // append g element for circles and timeline axis (chart)
    g = svg.append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
    DrawCircles()

    // appends nested g for timeline axis
    chart = g.append('g')
      .attr('class', 'chart')
      .attr('clip-path', 'url(#chart-area)')
    xAxis()
  };

  // datA: formats timeline date data, parse to start and end dates, find min and max date
  timeline.datA = function (items) {
    // grabbing data
    items = items[0].times

    var today = new Date()
    var tracks = []
    // copying data to dictionary
    data.items = items
    // forEach: parse String data to dates & clean end dates
    data.items.forEach(function (item) {
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
    data.minDate = d3.min(data.items, function (d) { return d.start })
    data.maxDate = d3.max(data.items, function (d) { return d.end })

    return timeline
  }

  var DrawCircles = function () {
    // used for positioning
    var scaleFactor = (1 / (data.maxDate - data.minDate)) * (Width - margin.left - margin.right)
    var itemHeight = 20; var itemMargin = 5
    var Circledata = data.items

    // issue warning about using id per data set. Ids should be individual to data elements
    if (typeof (data.id) !== 'undefined') {
      console.warn("d3Timeline Warning: Ids per dataset is deprecated in favor of a 'class' key. Ids are now per data element.")
    }

    // circles
    g.selectAll('svg').data(Circledata).enter()
      .append('circle')
      .attr('class', 'circle')
      .on('mouseover', mouseover)
      .on('mouseout', mouseout)
    // for each stacked rect (contains track of circles)
      .attr('x', getXPos)
      .attr('y', getYPos)
      .attr('width', function (d, i) { return (d.end - d.start) * 0.5 })
    // circles
      .attr('cy', getYPos)
      .attr('cx', getXPos)
      .attr('r', itemHeight / 1.8)
      .attr('height', itemHeight)
      .attr('fill', function (d, i) { return d.color })
    // circle text
    g.selectAll('svg').data(Circledata).enter()
      .append('text')
      .on('mouseover', mouseover)
      .on('mouseout', mouseout)
      .attr('x', function (d, i) { return getXPos(d, i, true) })
      .attr('y', function (d, i) { return getYPos(d, i, true) })
      .text(function (d) { return d.label })
      .style('fill', 'white')

    // functions called by attributes
    function getYPos (d, i, text) {
      var result = margin.top + (itemHeight + itemMargin) * scaleFactor
      if (text) { result = result + 5 }
      return result
    }
    function getXPos (d, i, text) {
      var result = margin.left + (d.start - data.minDate) * scaleFactor
      if (text) { result = result - 4.5 }
      return result
    }

    return timeline
  }

  // Create Event Handlers for mouse
  var mouseover = function (d) {
    tool.transition()
      .duration(200)
      .style('opacity', 0.9)
      .text(d.name)
      .style('left', (d3.event.pageX) + 'px')
      .style('top', (d3.event.pageY - 105) + 'px')
    hover = true

    timeline.hover(hover)
  }

  var mouseout = function (d) {
    tool.transition()
      .duration(50)
      .style('opacity', 0)
  }

  // xAxis: create axis and axis year intervals
  var xAxis = function () {
    // create axis intervals
    var xScale = d3.time.scale()
      .domain([data.minDate, data.maxDate])
      .range([0, Width])
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

  // Setting Functions
  timeline.data = function (p) {
    if (!arguments.length) return data
    data = p
    return timeline
  }
  timeline.Width = function (p) {
    if (!arguments.length) return Width
    Width = p
    return timeline
  }
  timeline.svg = function (p) {
    if (!arguments.length) return svg
    svg = p
    return timeline
  }
  timeline.hover = function (p) {
    // console.log(p)
    if (p) return true
    return false
  }
  timeline.margin = function (p) {
    if (!arguments.length) return margin
    margin = p
    return timeline
  }

  return timeline
}
