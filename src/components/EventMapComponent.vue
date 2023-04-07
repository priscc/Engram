<template>
  <div>
    <div style="display: none">
      {{ model }} (do not remove div, required to rended computed property
    </div>
    <div class="dates">
      <p v-if="eventEndTickDate != 0">
        {{ eventTickDateText }} - {{ eventEndTickDateText }}
      </p>
      <p v-else>
        {{ eventTickDate }}
      </p>
    </div>
    <p class="legend"></p>
    <div class="map_container">
      <div id="map"></div>
      <div class="timeline">
        <div v-for="i in ticks + 1" :key="i">
          <div
            class="timeline_ticks"
            :style="{ top: ((i - 1) * tickSize * 100) / diffYears + '%' }"
          >
            <p class="timeline_tickText">
              {{ minDate + (i - 1) * tickSize }}
            </p>
          </div>
        </div>
        <div
          class="timeline_eventSegment"
          v-bind:style="{
            top: ((eventTickDate - minDate) / diffYears) * 100 + '%',
            height: tickHeight + '%'
          }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import storeTopic from "@/store/topic.js";
import countries from "@/countries.json";
import * as d3 from "d3";
import * as topojson from "topojson";

// inspired from: http://bl.ocks.org/wiesson/ef18dba71256d526eb42#license
// OR https://gist.github.com/wiesson/ef18dba71256d526eb42?short_path=ca92d9d
export default {
  props: {
    events: Object
  },
  data() {
    return {
      items: countries,
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
            "SRB"
          ])
        },
        {
          name: "Northern Europe",
          set: d3.set(["DNK", "FRO", "FIN", "GRL", "ISL", "NOR", "SWE"])
        },
        {
          name: "North America",
          set: d3.set(["CAN", "MEX", "USA"])
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
            "GRD"
          ])
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
            "TTO"
          ])
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
            "ZWE"
          ])
        },
        {
          name: "South Pacific",
          set: d3.set(["AUS", "NZL"])
        },
        {
          name: "India",
          set: d3.set(["IND", "BGD", "LKA"])
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
            "ARM"
          ])
        },
        {
          name: "Russia",
          set: d3.set(["RUS", "KAZ", "UZB", "TKM", "KGZ", "TJK"])
        },

        {
          name: "China",
          set: d3.set(["CHN"])
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
            "KAS"
          ])
        }
      ],
      width: null,
      mapRatio: null,
      height: null,
      projection: null,
      path: null,
      svg: null,
      minDate: "",
      ticks: 0,
      tickSize: 0,
      diffYears: 0,
      eventTickDate: null,
      eventTickDateText: "",
      eventEndTickDate: null,
      eventEndTickDateText: "",
      tickHeight: 0
    };
  },
  watch: {
    events: {
      handler(newVal) {
        console.log("WATCHER MAP: mounting map", newVal);
        if (newVal.length > 0) {
          this.model;
        }
      },
      flush: "post"
    }
  },
  methods: {
    loadMap(ev) {
      this.worldMap(ev);
      if (this.events.length != 0) {
        console.log("in loadMap", this.events, ev, this.events[ev]);
        this.calculatingDates(0);
        this.timelineEventDot(ev);
      }
    },
    timelineEventDot(ev) {
      var model = ev;

      if (this.events[model]) {
        this.eventTickDate = this.events[model].startDate.dateNum;
        this.eventTickDateText = this.events[model].startDate.date;
        this.eventEndTickDate = this.events[model].endDate.dateNum;
        this.eventEndTickDateText = this.events[model].endDate.date;
        if (this.eventEndTickDate != 0) {
          this.tickHeight =
            ((this.eventEndTickDate - this.minDate) / this.diffYears) * 100 -
            ((this.eventTickDate - this.minDate) / this.diffYears) * 100;
        } else {
          this.tickHeight = 0;
        }
      }
    },

    calculatingDates(ev) {
      console.log("in calculatingDates", this.events);
      const date2 = new Date().getFullYear();
      const date1 =
        Math.round((this.events[ev].startDate.dateNum - 20) / 100) * 100;
      this.minDate = date1;
      this.diffYears = date2 - date1;

      // Calutating ticks
      if (this.diffYears >= 2000) {
        this.ticks = Math.floor(this.diffYears / 500);
        this.tickSize = 500;
      } else if (this.diffYears >= 1000) {
        this.ticks = Math.floor(this.diffYears / 200);
        this.tickSize = 200;
      } else if (this.diffYears >= 500) {
        this.ticks = Math.floor(this.diffYears / 100);
        this.tickSize = 100;
      } else if (this.diffYears >= 250) {
        this.ticks = Math.floor(this.diffYears / 25);
        this.tickSize = 25;
      } else if (this.diffYears >= 100) {
        this.ticks = Math.floor(this.diffYears / 10);
        this.tickSize = 10;
      } else if (this.diffYears >= 50) {
        this.ticks = Math.floor(this.diffYears / 10);
        this.tickSize = 10;
      } else if (this.diffYears >= 20) {
        this.ticks = Math.floor(this.diffYears / 5);
        this.tickSize = 5;
      } else {
        this.ticks = Math.floor(this.diffYears / 2);
        this.tickSize = 2;
      }
    },

    worldMap(ev) {
      console.log("in Event primary ", ev);
      let list = document.getElementById("map");
      if (list != null) {
        // As long as <ul> has a child node, remove it
        while (list.hasChildNodes()) {
          list.removeChild(list.firstChild);
        }
      }

      // CREATING MAP
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
          .attr("fill", "#464646")
          .on("mouseover", function() {
            var region = d3.select(this);
            region.attr("fill", "#ff9800");
            document.querySelector(".legend").innerText = region.attr(
              "data-name"
            );
          })
          .on("mouseout", function() {
            var region = d3.select(this);
            region.attr("fill", "#464646");
            document.querySelector(".legend").innerText = "";
          });
      }

      // LAYERING MAP COORDINATES
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
          Object.keys(coordinates).forEach(map => {
            if (coordinates[map].length > 1) {
              svg
                .append("path")
                .attr("d", lineFunction(coordinates[map]))
                .attr("stroke", "red")
                .attr("stroke-width", 2)
                .attr("fill", "#BDFF00")
                .on("mouseover", function() {
                  var region = d3.select(this);
                  region.attr("fill", "#ff9800");
                  document.querySelector(".legend").innerText = map;
                })
                .on("mouseout", function() {
                  var region = d3.select(this);
                  region.attr("fill", "#BDFF00");
                  document.querySelector(".legend").innerText = "";
                });
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
    }
  },
  computed: {
    model() {
      console.log("COMPUTED MAP: map eventIndex", storeTopic.state.eventIndex);
      return this.loadMap(storeTopic.state.eventIndex);
    }
  }
};
</script>

<style lang="sass" scoped src="@/assets/css/topicEvents.sass"></style>
