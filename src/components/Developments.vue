<template>
  <div id="app" style="background-color: black; height: 100%">
    <h3>Developments</h3>

    <v-card
      elevation="24"
      max-width="444"
      class="mx-auto"
      dark
      style="position: absolute; left: 220px; top: 250px"
    >
      <v-system-bar dark class="d-flex align-center justify-end pr-4 py-3">
        <v-avatar class="mr-1" color="indigo" size="17">
          <v-icon class="ma-0" x-small>mdi-gavel</v-icon>
        </v-avatar>
        <v-avatar class="mr-1" color="orange" size="17">
          <v-icon class="ma-0" x-small>mdi-currency-usd</v-icon>
        </v-avatar>
      </v-system-bar>

      <v-carousel
        show-arrows
        delimiter-icon="mdi-minus"
        height="300"
        max-width="444"
        v-model="model"
        @change="primary(model)"
      >
        <v-carousel-item v-for="(slide, i) in events" :key="i">
          <v-sheet
            height="88%"
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
                <v-col cols="9" class="px-7">
                  <h1 class="mt-5" style="word-break: normal" dark>
                    {{ slide.startDate.date }}
                  </h1>
                  <h2 style="word-break: normal" dark>
                    {{ slide.title }}
                  </h2>
                  <p class="mt-9 eventDescription caption">
                    {{ slide.descriptionMD }} Slide
                  </p>
                </v-col>
                <v-spacer></v-spacer>
              </v-row>
              <!-- <v-row>
                <div class="display-3">{{ slide.title }} Slide</div>
              </v-row> -->
            </v-container>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
      <!-- FOR ADDING AUTHOR -->
      <!-- <v-list two-line>
        <v-list-item>
          <v-list-item-avatar>
            <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>John Leider</v-list-item-title>
            <v-list-item-subtitle>Author</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-switch v-model="cycle" label="Cycle Slides" inset></v-switch>
          </v-list-item-action>
        </v-list-item>
      </v-list> -->
    </v-card>
    <!-- <div class="legend pb-6"></div> -->
    <div class="view" id="map"></div>
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
  data() {
    return {
      url: `url("https://placekitten.com/1200/800")`,
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
    };
  },
  methods: {
    async primary(model) {
      console.log("in primary", model);

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

      // var coordinates = [
      //   //   {
      //   //     map: [
      //   //       { lon: 99.53224852103409, lat: 36.9635628750092 },
      //   //       { lon: 101.8388754146548, lat: 31.38238257894329 },
      //   //       { lon: 111.0327506638422, lat: 32.68926261313212 },
      //   //       { lon: 99.53224852103409, lat: 36.9635628750092 },
      //   //     ],
      //   //   },
      //   //   {
      //   //     map: [
      //   //       { lon: 114.7000004839849, lat: 42.02254999787689 },
      //   //       { lon: 118.3845903213028, lat: 39.36174581708054 },
      //   //       { lon: 121.5839796969244, lat: 40.71770109427904 },
      //   //       { lon: 114.7000004839849, lat: 42.02254999787689 },
      //   //     ],
      //   //   },
      //   // ];
      // var coordinates = [
      //   { lon: 114.7000004839849, lat: 42.02254999787689 },
      //   // { lon: 113.1672067240925, lat: 40.58903258718775 },
      //   // { lon: 108.5885758869572, lat: 38.01556166653811 },
      //   // { lon: 104.4627858529494, lat: 37.53921058237947 },
      //   // { lon: 102.1835644979335, lat: 34.91691173911467 },
      //   // { lon: 100.999099564981, lat: 33.99707385393174 },
      //   // { lon: 97.18808307950999, lat: 32.3025788858757 },
      //   // { lon: 95.66013730464984, lat: 29.09017865729048 },
      //   // { lon: 98.57342394735846, lat: 28.2005605394243 },
      //   // { lon: 101.8740222074411, lat: 26.13804480224899 },
      //   // { lon: 104.9973476309196, lat: 24.53510765041384 },
      //   // { lon: 106.6435046493752, lat: 22.50452433642101 },
      //   // { lon: 109.5871716936629, lat: 21.25475605332846 },
      //   // { lon: 116.4594192837376, lat: 22.9595454015056 },
      //   // { lon: 120.818784551134, lat: 26.99130045205105 },
      //   // { lon: 122.2920420167496, lat: 30.74267415824754 },
      //   // { lon: 119.3883278138953, lat: 34.83517495263233 },
      //   // { lon: 122.8639669075088, lat: 37.2223767144566 },
      //   // { lon: 120.9378067497715, lat: 38.30397804622267 },
      //   // { lon: 119.5893720324662, lat: 37.42414800444499 },
      //   // { lon: 117.8742460402969, lat: 38.72758280400602 },
      //   { lon: 118.3845903213028, lat: 39.36174581708054 },
      //   { lon: 121.5839796969244, lat: 40.71770109427904 },
      //   { lon: 114.7000004839849, lat: 42.02254999787689 },
      // ];

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
  overflow: hidden;
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
  overflow: hidden;
  left: 10%;
}
.svg-content-responsive {
  display: inline-block;
  position: absolute;
  top: 20px;
}
.cardCaptions {
  background: rgba(0, 0, 0, 0.5);
  padding: 4px 8px;
  color: white;
}
</style>
