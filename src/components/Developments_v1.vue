<template>
  <div id="app" style="background-color: black; height: 100%">
    <v-container fluid class="pt-0" style="background-color: black">
      <v-row class="pt-0">
        <v-col class="pt-0 pb-0">
          <h3>Developments</h3>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="4"
          class="d-flex align-start"
          style="padding-top: 5%; opacity: 0.2"
        >
          <v-card outlined elevation="24" max-width="444" class="mx-auto" dark>
            <v-carousel
              show-arrows-on-hover
              hide-delimiter-background
              height="310"
              max-width="444"
              v-model="model"
              @change="primary(model)"
            >
              <v-carousel-item v-for="(slide, i) in events" :key="i">
                <v-sheet
                  height="82%"
                  width="350"
                  tile
                  class="d-flex align-stretch"
                  :style="{ 'background-image': `url(${slide.thumbURL})` }"
                  style="background-size: cover; background-size: 100% 100%"
                >
                  <v-container
                    fluid
                    height="100%"
                    class="d-flex align-stretch cardCaptions"
                  >
                    <v-row>
                      <v-spacer></v-spacer>
                      <v-col cols="10" class="px-7">
                        <h1
                          class="mt-3 date_header"
                          style="word-break: normal"
                          dark
                        >
                          {{ slide.startDate.date }}
                        </h1>
                        <h2 style="word-break: normal" dark>
                          {{ slide.title }}
                        </h2>
                        <p
                          class="mt-4 eventDescription caption mb-0"
                          style="height: 5rem"
                        >
                          {{ slide.descriptionMD }}
                        </p>
                        <v-btn
                          rounded
                          outlined
                          @click="goTo(slide)"
                          style="
                            float: right;
                            background-color: lightgrey;
                            opacity: 0.85;
                          "
                          x-small
                          >Learn More</v-btn
                        >
                      </v-col>
                      <v-spacer></v-spacer>
                    </v-row>
                  </v-container>
                </v-sheet>
              </v-carousel-item>
            </v-carousel>
          </v-card>
        </v-col>
        <v-col class="pa-0 pt-4">
          <div id="map"></div>
        </v-col>
        <div
          style="
            position: relative;
            background-color: purple;
            top: -15%;
            right: 20px;
            min-height: 570px;
            min-width: 20px;
            border: 1px solid white;
          "
        >
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
        </div>
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
      colors: [
        "green",
        "secondary",
        "yellow darken-4",
        "red lighten-2",
        "orange darken-1",
      ],
      cycle: false,
      slides: ["First", "Second", "Third", "Fourth", "Fifth"],
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

      model: 0,
      ticks: 0,
    };
  },
  methods: {
    goTo(event) {
      storeTopic.dispatch("eventContent", event);
      this.$router.push({ name: "Event", params: { id: event.title } });
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
      var height = 900;

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
            w.objects.units.geometries.filter(function (d) {
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
                function (d) {
                  return this.sets[i].set.has(d.id);
                }.bind(this)
              )
            )
          )
          .attr("class", "regions selected")
          .attr("d", path)
          .attr({ "data-name": this.sets[i].name })
          .attr("fill", "#464646");
        // .on("mouseover", function () {
        //   var region = d3.select(this);
        //   region.attr("fill", "#ff9800");
        //   document.querySelector(".legend").innerText = region.attr(
        //     "data-name"
        //   );
        // })
        // .on("mouseout", function () {
        //   var region = d3.select(this);
        //   region.attr("fill", "#464646");
        //   document.querySelector(".legend").innerText = "";
        // });
      }

      //This is the accessor function we talked about above
      var lineFunction = d3.svg
        .line()
        .x(function (d) {
          var x = projection([d.lon, d.lat]); // [longitude, latitude] -- [x, y]
          return x[0];
        })
        .y(function (d) {
          var x = projection([d.lon, d.lat]); // [longitude, latitude] -- [x, y]
          return x[1];
        })
        .interpolate("linear");

      // console.log("in map creator", this.events[model].coordinates);
      var coordinates = this.events[model].coordinates;

      //The line SVG Path we draw
      if (coordinates) {
        coordinates.forEach((i) => {
          svg
            .append("path")
            .attr("d", lineFunction(i.map))
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
    // db.collection("events")
    //   .doc("5Tn7OMPpsa1drb4BRttZ")
    //   .update({
    //     coordinates: [
    //       {
    //         map: [
    //           { lat: 41.53294682717789, lon: -6.279077242678561 },
    //           { lat: 39.68067441525791, lon: -7.535531680230915 },
    //           { lat: 39.06902389582937, lon: -6.976537381914025 },
    //           { lat: 37.16797035838112, lon: -7.373266545896255 },
    //           { lat: 36.68494739774833, lon: -6.458981780285312 },
    //           { lat: 36.02068195292654, lon: -5.585557360365009 },
    //           { lat: 36.41286617542071, lon: -5.195728302957563 },
    //           { lat: 36.70560935223703, lon: -4.359585476291917 },
    //           { lat: 36.74668382737676, lon: -2.173012918072439 },
    //           { lat: 37.61929891737402, lon: -0.7528865684332375 },
    //           { lat: 38.73422090573457, lon: 0.2239995306543463 },
    //           { lat: 39.52948994290453, lon: -0.3128798541754829 },
    //           { lat: 40.91373170574281, lon: 0.8068974196975787 },
    //           { lat: 41.34363809841025, lon: 2.18251551002987 },
    //           { lat: 41.92082174494061, lon: 3.241886256029634 },
    //           { lat: 42.45076955866244, lon: 3.164554284141969 },
    //           { lat: 42.4293323719125, lon: 1.438502119114156 },
    //           { lat: 42.68908388890187, lon: 1.316044526314903 },
    //           { lat: 42.86684867855923, lon: 0.7087663975545011 },
    //           { lat: 42.70242060506381, lon: 0.7158024878953628 },
    //           { lat: 42.71323604536578, lon: -0.0939438454747466 },
    //           { lat: 42.9323940049625, lon: -0.7263477992466827 },
    //           { lat: 43.07419480676536, lon: -1.432319259150545 },
    //           { lat: 43.40563315986661, lon: -1.829149864106057 },
    //           { lat: 43.30795951420829, lon: -2.156231164560329 },
    //           { lat: 43.85659991945577, lon: -7.733561974349197 },
    //           { lat: 43.21977924297414, lon: -9.489606986628324 },
    //           { lat: 42.09900666301517, lon: -8.855638117833591 },
    //           { lat: 41.53294682717789, lon: -6.279077242678561 },
    //         ],
    //       },
    //     ],
    //   });
  },
};
</script>

<style type="text/css" scoped>
h3 {
  font-family: "Montserrat", sans-serif;
  font-size: 30px;
  font-weight: 620;
  color: white;
}
h1 {
  font-family: "Montserrat", sans-serif;
  font-size: 36px;
  line-height: 0.8;
  font-weight: 620;
}
h2 {
  font-family: "Montserrat", sans-serif;
  font-size: 18px;
  font-weight: 500;
}
.eventDescription {
  font-size: 14px !important;
  line-height: 1rem;
  max-height: 5rem;
  -webkit-box-orient: vertical;
  display: block;
  display: -webkit-box;
  overflow: hidden !important;
  text-overflow: ellipsis;
  -webkit-line-clamp: 5;
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
.cardCaptions {
  background: rgba(0, 0, 0, 0.6);
  padding: 4px 6px;
  color: white;
}

.date_header {
  line-height: 100%;
}
</style>
