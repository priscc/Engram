<template>
  <div class="Event" style="height: 100%">
    <v-container fluid class="pt-2">
      <v-row
        class="background background-filter white--text"
        style="height: 140px"
        :style="{
          'background-image': `url(${event.thumbURL})`,
        }"
      >
        <v-col cols="2" class="d-flex align-center u-non-blurred">
          <v-btn text @click="back()" color="white">
            <v-icon class="pr-1" small dark>
              mdi-arrow-left-drop-circle-outline
            </v-icon>
            Back
          </v-btn>
        </v-col>
        <v-col class="d-flex flex-column justify-center u-non-blurred">
          <p class="caption">{{ timePeriodHeaders.header }}</p>
          <p class="page_header mb-0" style="line-height: 20px">
            {{ topic.title }} > {{ event.title }}
          </p>
        </v-col>
      </v-row>
    </v-container>

    <v-container fluid class="mb-10 pt-10 px-14">
      <v-row>
        <v-col lg="7" md="7" sm="12">
          <v-row class="d-flex justify-space-around ml-10 mr-5">
            <v-col cols="8" class="pt-0">
              <div class="view" id="map"></div>
            </v-col>
          </v-row>
          <v-row class="d-flex justify-space-between ml-10 mr-5">
            <v-col class="pt-5">
              <p class="people_header mb-0">{{ event.title }}</p>
              <p
                v-if="event.endDate.date.length == 0"
                class="people_subheader mb-0"
              >
                ({{ event.startDate.date }})
              </p>
              <p v-else class="people_subheader mb-0">
                ({{ event.startDate.date }} - {{ event.endDate.date }})
              </p>
              <p class="intro_paragraph intro_content pt-6">
                {{ event.mainMD }}
              </p>
            </v-col>
          </v-row>
        </v-col>
        <v-col>
          <v-row>
            <v-col>
              <!-- <h3 class="intro_headers mb-6">Resources</h3> -->
              <v-row>
                <v-col v-for="(video, index) in videos" :key="index">
                  <iframe
                    width="365"
                    height="230"
                    :src="'https://www.youtube.com/embed/' + video.url"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row v-if="articles.length != 0">
            <v-col>
              <h3 class="intro_headers mb-6">Articles</h3>
              <!-- <articles></articles> -->
              <v-row v-for="(article, index) in articles" :key="index">
                <v-col>
                  <articlecomp :article="article"></articlecomp>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import store from "@/store";
import storeTopic from "@/store/topic.js";
import countries from "@/countries2.json";
import * as d3 from "d3";
import * as topojson from "topojson";
import articlecomp from "./ArticleComponent.vue";
import { db } from "@/main";

export default {
  name: "Event",
  components: { articlecomp },
  data() {
    return {
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
  computed: {
    timePeriodHeaders() {
      return store.state.timePeriodHeaders[store.state.currentTimePeriod];
    },
    topic() {
      return storeTopic.state.topic;
    },
    event() {
      return storeTopic.state.event;
    },
    videos() {
      var r = storeTopic.state.resources.filter(
        (video) =>
          video.parentID == this.event.id &&
          video.resourceType == "video" &&
          video.parentType == "event"
      );
      console.log("resources", r);
      return r;
    },
    articles() {
      var r = storeTopic.state.resources.filter(
        (article) =>
          article.parentID == this.event.id &&
          article.resourceType == "article" &&
          article.parentType == "event"
      );
      console.log("resources", r);
      return r;
    },
  },
  methods: {
    back() {
      storeTopic.dispatch("eventContentRESET");
      this.$router.push({
        name: "Topic",
        params: {
          period: this.$route.params.period,
          topic: this.$route.params.topic,
          category: this.$route.params.category,
        },
      });
      // this.$router.go(-1);
    },
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
      var coordinates = this.event.coordinates;

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
  async mounted() {
    console.log("mounted");
    store.dispatch("setTimePeriod", this.$route.params.period);

    var newTopic = await db
      .collection("topics")
      .doc(this.$route.params.topic)
      .get()
      .then(
        function(querySnapshot) {
          var entry = querySnapshot.data();
          entry.id = querySnapshot.id;
          return entry;
        }.bind(this)
      );
    storeTopic.dispatch("topicContent", newTopic);

    var newEvent = await db
      .collection("events")
      .doc(this.$route.params.event)
      .get()
      .then(
        function(querySnapshot) {
          var entry = querySnapshot.data();
          entry.id = querySnapshot.id;
          return entry;
        }.bind(this)
      );
    console.log(newEvent.id);
    console.log(storeTopic.state.resources);

    storeTopic.dispatch("eventContent", newEvent);

    this.primary(0);
  },
};
</script>

<style type="text/css" scoped>
h3 {
  font-family: "Montserrat", sans-serif;
  font-size: 30px;
  font-weight: 620;
}
h5 {
  line-height: 1;
  word-break: normal;
}
.background-filter::after {
  -webkit-backdrop-filter: blur(
    5px
  ); /* Use for Safari 9+, Edge 17+ (not a mistake) and iOS Safari 9.2+ */
  backdrop-filter: brightness(50%); /* Supported in Chrome 76 */
  content: "";
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
}
.background-filter {
  position: relative;
}
.background {
  background-size: cover;
  background-position: right 15% bottom 55%;
}
/* Use for content that should not be blurred */
.u-non-blurred {
  position: relative;
  z-index: 1;
}
.page_header {
  font-family: "Montserrat", sans-serif;
  letter-spacing: -0.5px;
  font-size: 34px;
  line-height: 10px;
}
.people_header {
  font-family: "Montserrat", sans-serif;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 550;
}
.people_subheader {
  font-family: "Montserrat", sans-serif;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 500;
  color: grey;
}
.line {
  fill: none;
  stroke: red;
  stroke-width: 6;
}
#map {
  color: #464646;
}
.card {
  opacity: 0.7;
}
.card:hover {
  opacity: 1;
  cursor: pointer;
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
</style>
