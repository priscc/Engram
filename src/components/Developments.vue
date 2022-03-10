<template>
  <div id="app" style="background-color: black; height: 100%">
    <v-card
      outlined
      elevation="24"
      height="50%"
      width="34%"
      dark
      style="position: fixed; top: 45%; left: 17%"
    >
      <v-system-bar lights-out height="auto"> </v-system-bar>
      <v-carousel
        height="100%"
        hide-delimiter-background
        show-arrows-on-hover
        v-model="model"
        @change="
          primary(model);
          timelineEventDot(model);
        "
      >
        <v-carousel-item v-for="(slide, i) in events" :key="i">
          <v-sheet
            max-height="100%"
            max-width="100%"
            tile
            class="d-flex flex-no-wrap justify-space-between align-stretch"
            :style="{ 'background-image': `url(${slide.thumbURL})` }"
            style="background-size: cover; background-size: 100% 100%"
          >
            <v-container fluid class="cardCaptions">
              <v-row
                style="background-color:black"
                class="d-flex align-stretch pt-2 mb-2"
              >
                <v-col
                  v-if="slide.theme.length > 0"
                  class="d-flex flex-row flex-wrap align-center"
                >
                  <div class="caption pr-2">Themes:</div>
                  <div
                    v-for="i in slide.theme"
                    :key="i"
                    heigh="auto"
                    width="auto"
                    class=" px-4 ma-1"
                    :style="{
                      'border-color': eventTheme[i],
                      'border-width': 1 + 'px',
                    }"
                    style=" font-size: 12px; border-radius: 25px; border: solid; "
                  >
                    {{ i }}
                  </div>
                </v-col>
              </v-row>
              <v-row
                dense
                class="d-flex align-stretch ma-3 mx-xs-1 mx-md-8 mx-lg-16"
              >
                <v-col class="d-flex flex-column">
                  <h1 class="card_header" style="word-break: normal" dark>
                    {{ slide.title }}
                  </h1>
                  <h2
                    v-if="slide.endDate.date.length != 0"
                    style="word-break: normal"
                    dark
                  >
                    ({{ slide.startDate.date }} - {{ slide.endDate.date }})
                  </h2>
                  <h2 v-else style="word-break: normal" dark>
                    {{ slide.startDate.date }}
                  </h2>
                  <p
                    class="mt-4 mr-4 card_Description caption mb-0"
                    style="height: 3rem"
                  >
                    {{ slide.descriptionMD }}
                  </p>
                  <v-card-actions class="pl-0 pt-4">
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
      console.log("event", event.id);
      this.$router.push({ name: "Event", params: { event: event.id } });
    },

    timelineEventDot(model) {
      this.eventTickDate = this.events[model].startDate.dateNum;
      this.eventEndTickDate = this.events[model].endDate.dateNum;
      if (this.eventEndTickDate != 0) {
        this.tickHeight =
          ((this.eventEndTickDate - this.minDate) / this.diffYears) * 100 -
          ((this.eventTickDate - this.minDate) / this.diffYears) * 100;
      } else {
        this.tickHeight = 0;
      }
    },

    calculatingDates() {
      // const endingDatesMax = Math.max.apply(
      //   Math,
      //   this.events.map(function (o) {
      //     return o.endDate.dateNum;
      //   })
      // );
      // const startingDatesMax = Math.max.apply(
      //   Math,
      //   this.events.map(function (o) {
      //     return o.startDate.dateNum;
      //   })
      // );
      // var date2;
      // if (endingDatesMax > startingDatesMax) {
      //   date2 = endingDatesMax;
      // } else {
      //   date2 = startingDatesMax;
      // }
      const date2 = new Date().getFullYear();
      const date1 =
        Math.round((this.events[0].startDate.dateNum - 20) / 100) * 100;
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
        // console.log('> 100', total)
      } else if (this.diffYears >= 100) {
        this.ticks = Math.floor(this.diffYears / 10);
        this.tickSize = 10;
        // console.log('> 100', total)
      } else if (this.diffYears >= 50) {
        this.ticks = Math.floor(this.diffYears / 10);
        this.tickSize = 10;
        // console.log('> 50', total)
      } else if (this.diffYears >= 20) {
        this.ticks = Math.floor(this.diffYears / 5);
        this.tickSize = 5;
        // console.log('> 50', total)
      } else {
        this.ticks = Math.floor(this.diffYears / 2);
        this.tickSize = 2;
        // console.log('> 20', total)
      }
    },

    async primary(model) {
      let list = document.getElementById("map");
      if (list != null) {
        // As long as <ul> has a child node, remove it
        while (list.hasChildNodes()) {
          list.removeChild(list.firstChild);
        }
      }

      d3.select(window).on("resize", this.resize);

      // var width = document.querySelector("#map").offsetWidth;
      var width = 1400;
      // var mapRatio = 0.7;
      // var height = width * mapRatio;
      var height = 800;

      var projection = d3.geo
        .mercator()
        .scale(width / 1.5 / Math.PI)
        .rotate([-1, 0])
        .translate([width / 1.5, (height * 1.35) / 2])
        .precision(0.1);

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

      //This is the accessor function we talked about above
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

      // console.log("in map creator", this.events[model].coordinates);
      var coordinates = this.events[model].coordinates;
      console.log("coordinates", coordinates);
      //The line SVG Path we draw
      if (coordinates.length > 0) {
        Object.keys(coordinates).forEach((map) => {
          svg
            .append("path")
            .attr("d", lineFunction(coordinates[map]))
            .attr("stroke", "red")
            .attr("stroke-width", 2)
            .attr("fill", "#BDFF00");
        });
      }
    },
  },
  computed: {
    events() {
      return storeTopic.state.events;
    },
  },
  mounted() {
    this.primary(0);
    this.timelineEventDot(0);
    // this.eventTickDate = this.events[0].startDate.dateNum;
    this.calculatingDates();
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
  background: rgba(0, 0, 0, 0.8);
  padding: 4px 6px;
  color: white;
}
.card_header {
  line-height: 100%;
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
</style>
