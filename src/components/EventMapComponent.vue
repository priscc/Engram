<template>
  <div>
    <div>
      <div style="display: none">
        {{ model }} (do not remove div, required to rended computed property
      </div>
      <p class="legend"></p>

      <div style="background-color: black; height: 100%" id="map"></div>
    </div>
  </div>
</template>

<script type="text/javascript">
import storeTopic from "@/store/topic.js";
import countries from "@/countries2.json";
import * as d3 from "d3";
import * as topojson from "topojson";

// inspired from: http://bl.ocks.org/wiesson/ef18dba71256d526eb42#license
// OR https://gist.github.com/wiesson/ef18dba71256d526eb42?short_path=ca92d9d
export default {
  props: {
    events: Object,
  },
  data() {
    return {
      eventTheme: {
        Society: "#FF9800",
        Politics: "#673AB7",
        Environment: "#b377f",
        Culture: "#3b4da6",
        Economics: "#16a175",
        Technology: "#009688",
        Independent: "grey",
      },
      colors: [
        "green",
        "secondary",
        "yellow darken-4",
        "red lighten-2",
        "orange darken-1",
      ],
      items: countries,
      data: [],
      sets: [
        {
          name: "Central Europe",
          set: d3.set([
            "BEL",
            "CHE",
            "DEU",
            "AUT",
            "ESP",
            "FRA",
            "ATF",
            "GBR",
            "GGY",
            "JEY",
            "FLK",
            "SGS",
            "GRC",
            "MLT",
            "IRL",
            "ITA",
            "LUX",
            "NLD",
            "AND",
            "POL",
            "PRT",
            "TUR",
            "CYP",
            "CYN",
            "MON",
            "ALD",
            "IMN",
            "LTU",
            "LVA",
            "EST",
            "BLR",
            "UKR",
            "MDA",
            "ROU",
            "HUN",
            "SVK",
            "SVN",
            "HRV",
            "BIH",
            "CZE",
            "BGR",
            "KOS",
            "MKD",
            "ALB",
            "MNE",
            "SRB",
          ]),
        },
        {
          name: "Northern Europe",
          set: d3.set(["DNK", "FRO", "FIN", "GRL", "ISL", "NOR", "SWE"]),
        },
        {
          name: "North America",
          set: d3.set(["CAN", "MEX", "USA"]),
        },
        {
          name: "Caribbean",
          set: d3.set([
            "BLZ",
            "CRI",
            "CUB",
            "GTM",
            "HND",
            "NIC",
            "PAN",
            "SLV",
            "HTI",
            "JAM",
            "DOM",
            "PRI",
            "BHS",
            "TCA",
            "ATG",
            "DMA",
            "BRB",
            "GRD",
          ]),
        },
        {
          name: "South America",
          set: d3.set([
            "ARG",
            "BOL",
            "BRA",
            "CHL",
            "COL",
            "ECU",
            "FLK",
            "GUY",
            "PRY",
            "PER",
            "SUR",
            "URY",
            "VEN",
            "TTO",
          ]),
        },
        {
          name: "Africa",
          set: d3.set([
            "AGO",
            "BDI",
            "BEN",
            "BFA",
            "BWA",
            "CAF",
            "CIV",
            "CMR",
            "COD",
            "COD",
            "COG",
            "COM",
            "CPV",
            "DJI",
            "DZA",
            "EGY",
            "ERI",
            "ETH",
            "GAB",
            "GHA",
            "GIN",
            "GMB",
            "GNB",
            "GNQ",
            "KEN",
            "LBR",
            "LBY",
            "LSO",
            "MAR",
            "MDG",
            "MLI",
            "MOZ",
            "MRT",
            "MUS",
            "MWI",
            "MYT",
            "NAM",
            "NER",
            "NGA",
            "REU",
            "RWA",
            "ESH",
            "SDN",
            "SDS",
            "SEN",
            "SHN",
            "SHN",
            "SLE",
            "SOM",
            "SOL",
            "SSD",
            "STP",
            "STP",
            "SWZ",
            "SYC",
            "TCD",
            "TGO",
            "TUN",
            "TZA",
            "TZA",
            "UGA",
            "ZAF",
            "ZMB",
            "ZWE",
          ]),
        },
        {
          name: "South Pacific",
          set: d3.set(["AUS", "NZL"]),
        },
        {
          name: "India",
          set: d3.set(["IND", "BGD", "LKA"]),
        },
        {
          name: "Orient",
          set: d3.set([
            "AZE",
            "ARE",
            "QAT",
            "IRN",
            "AFG",
            "PAK",
            "BHR",
            "SAU",
            "YEM",
            "OMN",
            "SYR",
            "JOR",
            "IRQ",
            "KWT",
            "ISR",
            "LBN",
            "PSX",
            "PSR",
            "GEO",
            "ARM",
          ]),
        },
        {
          name: "Russia",
          set: d3.set(["RUS", "KAZ", "UZB", "TKM", "KGZ", "TJK"]),
        },

        {
          name: "China",
          set: d3.set(["CHN"]),
        },
        {
          name: "Asia",
          set: d3.set([
            "BTN",

            "CHN2",
            "JPN",
            "IDN",
            "MNG",
            "NPL",
            "MMR",
            "THA",
            "KHM",
            "LAO",
            "VNM",
            "PRK",
            "KOR",
            "TWN",
            "MYS",
            "PNG",
            "SLB",
            "VUT",
            "NCL",
            "BRN",
            "PHL",
            "TLS",
            "HKG",
            "FJI",
            "GUM",
            "PLW",
            "FSM",
            "MNP",
            "KAS",
          ]),
        },
      ],
      markers: [
        { corsica: [{ lon: 9.083, lat: 42.149 }] }, // corsica
        { nice: [{ lon: 7.26, lat: 43.71 }] }, // nice
        { Paris: [{ lon: 2.349, lat: 48.864 }] }, // Paris
        { Hossegor: [{ lon: -1.397, lat: 43.664 }] }, // Hossegor
        { Lille: [{ lon: 3.075, lat: 50.64 }] }, // Lille
        { Morlaix: [{ lon: -3.83, lat: 58 }] }, // Morlaix
      ],
      width: null,
      mapRatio: null,
      height: null,
      projection: null,
      path: null,
      svg: null,
      minDate: 0,
      // model: 0,
      ticks: 0,
      tickSize: 0,
      diffYears: 0,
      eventTickDate: null,
      eventEndTickDate: null,
      tickHeight: 0,
    };
  },
  watch: {
    events: {
      handler(newVal) {
        console.log("mounting map", newVal);
        if (newVal.length > 0) {
          this.primary(this.model);
        }
      },
      flush: "post",
    },
  },
  methods: {
    primary(ev) {
      console.log("in Event primary ", ev);
      let list = document.getElementById("map");
      if (list != null) {
        // As long as <ul> has a child node, remove it
        while (list.hasChildNodes()) {
          list.removeChild(list.firstChild);
        }
      }

      d3.select(window).on("resize", this.resize);

      var width = 1400;
      var height = 800;

      var projection = d3.geo
        .mercator()
        .center([0, 9])
        .scale(width / 1.5 / Math.PI)
        .rotate([-11, 0])
        .translate([width / 1.5, (height * 1.35) / 2])
        .precision(0.5);

      var path = d3.geo.path().projection(projection);

      var svg = d3
        .select("#map")
        .append("div")
        .classed("svg-container", true)
        .append("svg")
        .attr("preserveAspectRatio", "xMinYMin")
        .attr("viewBox", "0 0 2000 1200")
        .classed("svg-content-responsive", true)
        .append("g");

      var w = this.items;

      svg
        .append("path")
        .datum(
          topojson.merge(
            w,
            w.objects.units.geometries.filter(function(d) {
              return d.id !== "ATA"; // Sorry Antarctica
            })
          )
        )
        .attr("class", "border")
        .attr("d", path)
        .attr("fill", "#d9edf7");

      for (var i = 0; i < this.sets.length; i++) {
        svg
          .append("path")
          .datum(
            topojson.merge(
              w,
              w.objects.units.geometries.filter(
                function(d) {
                  return this.sets[i].set.has(d.id);
                }.bind(this)
              )
            )
          )
          .attr("class", "regions selected")
          .attr("d", path)
          .attr({ "data-name": this.sets[i].name })
          .attr("fill", "#464646");
        // .on("mouseover", function() {
        //   var region = d3.select(this);
        //   region.attr("fill", "#ff9800");
        //   document.querySelector(".legend").innerText = region.attr(
        //     "data-name"
        //   );
        // })
        // .on("mouseout", function() {
        //   var region = d3.select(this);
        //   region.attr("fill", "#464646");
        //   document.querySelector(".legend").innerText = "";
        // });
      }

      var lineFunction = d3.svg
        .line()
        .x(function(d) {
          var x = projection([d.lon, d.lat]); // [longitude, latitude] -- [x, y]
          return x[0];
        })
        .y(function(d) {
          var x = projection([d.lon, d.lat]); // [longitude, latitude] -- [x, y]
          return x[1];
        })
        .interpolate("linear");
      var model = ev;

      if (this.events[model]) {
        var coordinates = this.events[model].coordinates;
        if (coordinates != null) {
          Object.keys(coordinates).forEach((map) => {
            console.log("in foreach " + map, " ", coordinates[map].length);
            if (coordinates[map].length > 1) {
              svg
                .append("path")
                .attr("d", lineFunction(coordinates[map]))
                .attr("stroke", "red")
                .attr("stroke-width", 2)
                .attr("fill", "#BDFF00");
              // .on("mouseover", function() {
              //   var region = d3.select(this);
              //   region.attr("fill", "#ff9800");
              //   document.querySelector(".legend").innerText = map;
              // })
              // .on("mouseout", function() {
              //   var region = d3.select(this);
              //   region.attr("fill", "#BDFF00");
              //   document.querySelector(".legend").innerText = "";
              // });
            } else {
              svg
                .selectAll("myCircles")
                .data(coordinates[map])
                .enter()
                .append("circle")
                .attr("cx", function(d) {
                  return projection([d.lon, d.lat])[0];
                })
                .attr("cy", function(d) {
                  return projection([d.lon, d.lat])[1];
                })
                .attr("r", 10)
                .style("fill", "#BDFF00")
                .attr("stroke", "red")
                .attr("stroke-width", 4);
              // .attr("fill-opacity", 0.4)
              // .on("mouseover", function() {
              //   // console.log("bleep", this);
              //   var region = d3.select(this);
              //   region.attr("fill", "#ff9800");
              //   document.querySelector(".legend").innerText = map;
              // })
              // .on("mouseout", function() {
              //   var region = d3.select(this);
              //   region.attr("fill", "#BDFF00");
              //   document.querySelector(".legend").innerText = "";
              // });
            }
          });
        }
      }

      // Add circles:
      svg
        .selectAll("myCircles")
        .data(this.markers)
        .enter()
        .append("circle")
        .attr("cx", function(d) {
          return projection([d.lon, d.lat])[0];
        })
        .attr("cy", function(d) {
          return projection([d.lon, d.lat])[1];
        })
        .attr("r", 14)
        .style("fill", "69b3a2")
        .attr("stroke", "#69b3a2")
        .attr("stroke-width", 3);
      // .attr("fill-opacity", 0.4)
      // .on("mouseover", function() {
      //   // console.log("bleep", this);
      //   var region = d3.select(this);
      //   region.attr("fill", "#ff9800");
      //   document.querySelector(".legend").innerText = "bleep";
      // })
      // .on("mouseout", function() {
      //   var region = d3.select(this);
      //   region.attr("fill", "#464646");
      //   document.querySelector(".legend").innerText = "";
      // });
    },
  },
  computed: {
    model() {
      console.log("map eventIndex", storeTopic.state.eventIndex);

      return this.primary(storeTopic.state.eventIndex);
    },
  },
};
</script>

<style type="text/css" scoped>
h1 {
  font-family: "Montserrat", sans-serif;
  font-size: 20px;
  line-height: 0.8;
  font-weight: 620;
}
h2 {
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  font-weight: 500;
}
h3 {
  font-family: "Montserrat", sans-serif;
  font-size: 30px;
  font-weight: 620;
  color: white;
}
.line {
  fill: none;
  stroke: red;
  stroke-width: 6;
}
#map {
  color: #464646;
}
.border {
  fill: #464646;
  stroke: #464646;
  stroke-width: 1px;
}
.regions.selected {
  fill: #464646;
  stroke: none;
  transition: all 0.2s ease;
}
.regions.selected:hover {
  fill: #ff9800;
  stroke: #d9edf7;
  stroke-width: 1px;
}
.legend {
  height: 10px;
  color: white;
  text-align: center;
}
.svg-container {
  display: inline-block;
  position: relative;
  width: 100%;
  max-height: 1000px;
  vertical-align: top;
  /*overflow: hidden;*/
}
.svg-content-responsive {
  display: inline-block;
  position: absolute;
  top: 20px;
}
.timeline {
  position: relative;
  right: 2%;
  background-color: purple;
  border: 1px solid white;
  min-width: 2%;
  height: 23rem;
}
.cardCaptions {
  background: rgba(0, 0, 0, 0.86);
  padding: 4px 6px;
  color: white;
}
.card_header {
  line-height: 110%;
}
.card_Description {
  font-size: 14px !important;
  line-height: 1rem;
  max-height: 3rem;
  -webkit-box-orient: vertical;
  display: block;
  display: -webkit-box;
  overflow: hidden !important;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
}

.carousel-arrow:hover {
  color: grey;
}
</style>
