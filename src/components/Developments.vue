<template>
  <div id="app" style="background-color: black; height: 100%">
    <v-card
      outlined
      elevation="24"
      height="auto"
      width="27%"
      dark
      style="position: absolute; top: 39%; left: 17%"
    >
      <v-carousel
        class="myCarousel"
        height="100%"
        v-model="model"
        @change="
          primary();
          timelineEventDot();
        "
      >
        <template v-slot:prev="{ on, attrs }">
          <v-icon
            style="left: -20px; "
            v-bind="attrs"
            v-on="on"
            large
            dark
            class="carousel-arrow"
          >
            mdi-chevron-left</v-icon
          >
        </template>
        <template v-slot:next="{ on, attrs }">
          <v-icon
            style="right: -20px; "
            v-bind="attrs"
            v-on="on"
            large
            dark
            class="carousel-arrow"
          >
            mdi-chevron-right</v-icon
          >
        </template>
        <v-carousel-item v-for="(slide, i) in events" :key="i">
          <v-sheet
            width="100%"
            tile
            class="d-flex flex-no-wrap justify-space-between align-stretch"
            :style="{ 'background-image': `url(${slide.thumbURL})` }"
            style="background-size: cover; background-size: 100% 100%"
          >
            <v-container fluid class="cardCaptions">
              <v-row
                dense
                class="d-flex align-stretch ma-3 mx-xs-5 mx-md-7 mx-lg-7"
              >
                <v-col>
                  <h1
                    class="card_header"
                    style="font-size: 22px; word-break: normal"
                    dark
                  >
                    {{ slide.title }}
                  </h1>
                  <div class=" mt-2 mb-4">
                    <h1
                      v-if="slide.endDate.date.length != 0"
                      style="font-size: 16px; word-break: normal "
                      class="card_header light-green--text text--lighten-2"
                      dark
                    >
                      ({{ slide.startDate.date }} - {{ slide.endDate.date }})
                    </h1>
                    <h1
                      v-else
                      style="font-size: 16px; word-break: normal"
                      class="card_header light-green--text text--lighten-2"
                      dark
                    >
                      ({{ slide.startDate.date }})
                    </h1>
                  </div>
                  <p
                    class="mt-4 mr-4 card_Description caption mb-0"
                    style="height: 3rem"
                  >
                    {{ slide.descriptionMD }}
                  </p>
                  <v-card-text v-if="slide.theme.length > 0" class="px-0">
                    <div
                      class="d-flex flex-row card_Description caption flex-wrap"
                    >
                      Themes:
                      <div
                        v-for="i in slide.theme"
                        :key="i"
                        class="d-flex flex-column pl-1 "
                      >
                        {{ i }},
                      </div>
                    </div>
                  </v-card-text>
                  <v-card-actions class="d-flex justify-end pl-0 pt-4 mb-10">
                    <v-btn
                      @click="goTo(slide)"
                      color="light-green lighten-2"
                      light
                      x-small
                    >
                      Learn More
                    </v-btn>
                  </v-card-actions>
                </v-col>
              </v-row>
            </v-container>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </v-card>
    <v-container
      fluid
      class="pt-0 align-stretch"
      style="background-color: black; height: 100%"
    >
      <v-row class="pt-0">
        <v-col class="pt-0 pb-0">
          <h3>Developments</h3>
          <p class="legend"></p>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pa-0">
          <div id="map"></div>
        </v-col>
        <div class="timeline">
          <div v-for="i in ticks + 1" :key="i">
            <div
              style="position: absolute; min-width: 100%"
              v-bind:style="{
                top: ((i - 1) * tickSize * 100) / diffYears + '%',
              }"
            >
              <p
                v-if="ticks + 1 != i"
                class="caption"
                style="color: white; position: absolute; top: -9px; left: -40px"
              >
                {{ minDate + (i - 1) * tickSize }}
              </p>
              <p
                v-if="ticks + 1 == i"
                class="caption font-weight-bold"
                style="color: white; position: absolute; left: -75px"
                v-bind:style="{
                  top:
                    ((new Date().getFullYear() - minDate) / diffYears) * 100 +
                    '%',
                }"
              >
                Modern Day
              </p>
            </div>
          </div>
          <div
            style="
              border: 2px solid #bdff00;
              min-width: 100%;
              position: absolute;
              top: 20px;
              background-color: #bdff00;

            "
            v-bind:style="{
              top: ((eventTickDate - minDate) / diffYears) * 100 + '%',
              height: tickHeight + '%',
            }"
          >
            <p
              v-if="eventEndTickDate != 0"
              class="caption font-weight-bold text-grey px-2"
              style="
                border: 1px solid #bdff00;
                position: absolute;
                top: -9px;
                left: -135px;
                background-color: #bdff00;
                opacity: 0.8;
                border: 1px solid white;
              "
            >
              {{ eventTickDate }} - {{ eventEndTickDate }}
            </p>
            <p
              v-else
              class="caption font-weight-bold text-grey px-2"
              style="
                border: 1px solid #bdff00;
                position: absolute;
                top: -9px;
                left: -90px;
                background-color: #bdff00;
                opacity: 0.8;
              "
            >
              {{ eventTickDate }}
            </p>
          </div>
        </div>

        <!--  v-bind:style="{
                top: ((i - 1) * tickSize * 100) / diffYears - 1 + '%',
              }"
            >
              <p
                class="caption"
                style="color: white; position: absolute; top: -9px; left: -40px"
              >
                {{ minDate + (i - 1) * tickSize }}
              </p> -->

        <!-- ticks -->
        <!--  <div
        v-for="i in ticks"
        :key="i"
        style="
          border-left: 2px solid #607d8b;
          position: absolute;
          top: -9px;
          height: 16px;
        "
        v-bind:style="{ top: ((i - 1) * 5 * 100) / 250 + '%' }"
      ></div> -->
      </v-row>
    </v-container>
  </div>
</template>

<script type="text/javascript">
import storeTopic from "@/store/topic.js";
import countries from "@/countries2.json";
import * as d3 from "d3";
import * as topojson from "topojson";
// import { db } from "@/main";

// inspired from: http://bl.ocks.org/wiesson/ef18dba71256d526eb42#license
// OR https://gist.github.com/wiesson/ef18dba71256d526eb42?short_path=ca92d9d
export default {
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
      model: 0,
      ticks: 0,
      tickSize: 0,
      diffYears: 0,
      eventTickDate: null,
      eventEndTickDate: null,
      tickHeight: 0,
    };
  },
  methods: {
    goTo(event) {
      storeTopic.dispatch("eventContent", event);
      console.log("learn more about event", event.id);
      this.$router.push({ name: "Event", params: { event: event.id } });
    },

    timelineEventDot() {
      var model = this.model;

      if (this.events[model]) {
        this.eventTickDate = this.events[model].startDate.dateNum;
        this.eventEndTickDate = this.events[model].endDate.dateNum;
        if (this.eventEndTickDate != 0) {
          this.tickHeight =
            ((this.eventEndTickDate - this.minDate) / this.diffYears) * 100 -
            ((this.eventTickDate - this.minDate) / this.diffYears) * 100;
        } else {
          this.tickHeight = 0;
        }
      }
    },

    calculatingDates() {
      const date2 = new Date().getFullYear();
      const date1 =
        Math.round((this.events[this.model].startDate.dateNum - 20) / 100) *
        100;
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

    async primary() {
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

      var model = this.model;

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
                .attr("stroke-width", 4)
                // .attr("fill-opacity", 0.4)
                .on("mouseover", function() {
                  // console.log("bleep", this);
                  var region = d3.select(this);
                  region.attr("fill", "#ff9800");
                  document.querySelector(".legend").innerText = map;
                })
                .on("mouseout", function() {
                  var region = d3.select(this);
                  region.attr("fill", "#BDFF00");
                  document.querySelector(".legend").innerText = "";
                });
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
        .attr("stroke-width", 3)
        // .attr("fill-opacity", 0.4)
        .on("mouseover", function() {
          // console.log("bleep", this);
          var region = d3.select(this);
          region.attr("fill", "#ff9800");
          document.querySelector(".legend").innerText = "bleep";
        })
        .on("mouseout", function() {
          var region = d3.select(this);
          region.attr("fill", "#464646");
          document.querySelector(".legend").innerText = "";
        });
    },
  },
  computed: {
    events() {
      return storeTopic.state.events;
    },
  },
  async mounted() {
    await storeTopic.dispatch("eventsContent");
    console.log("mounted events");
    this.model = 0;
    this.primary();
    this.calculatingDates();
    this.timelineEventDot();
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
  padding-left: 22%;
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
