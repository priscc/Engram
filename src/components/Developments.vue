<template>
  <div id="app" style="background-color: black; height: 100%">
    <!-- <div
      style="
        position: fixed;
        top: 80px;
        right: 10px;
        min-height: 570px;
        min-width: 20px;
        border: 1px solid white;
      "
    > -->
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
    <!-- </div> -->

    <v-container fluid class="pt-0" style="background-color: black">
      <v-row class="pt-0">
        <v-col class="pt-0 pb-0">
          <h3>Developments</h3>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3" class="d-flex align-center">
          <v-card outlined elevation="24" max-width="444" class="mx-auto" dark>
            <v-carousel
              show-arrows
              delimiter-icon="mdi-minus"
              height="290"
              max-width="444"
              v-model="model"
              @change="primary(model)"
            >
              <v-carousel-item v-for="(slide, i) in events" :key="i">
                <v-sheet
                  height="85%"
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
                        <h1 class="mt-3" style="word-break: normal" dark>
                          {{ slide.startDate.date }}
                        </h1>
                        <h2 style="word-break: normal" dark>
                          {{ slide.title }}
                        </h2>
                        <p
                          class="mt-4 eventDescription caption"
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
      </v-row>
    </v-container>
  </div>
</template>

<script type="text/javascript">
import storeTopic from "@/store/topic.js";
import countries from "@/countries2.json";
import * as d3 from "d3";
import * as topojson from "topojson";
import { db } from "@/main";

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
      var width = 1500;
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
    console.log("hey - updating");
    db.collection("events")
      .doc("fj3GaVxSgwIUB6y6eNQV")
      .update({
        coordinates: [
          {
            map: [
              { lat: 14.14656334205164, lon: 105.5939745964939 },
              { lat: 14.09876321070584, lon: 105.3785643135504 },
              { lat: 14.25952743925434, lon: 105.1137981472876 },
              { lat: 14.26851183907403, lon: 103.0562997552205 },
              { lat: 13.60228446288216, lon: 102.3618224036036 },
              { lat: 13.32798649782186, lon: 102.3311758881816 },
              { lat: 12.95987013037025, lon: 102.5186824285624 },
              { lat: 12.39838893580494, lon: 102.7713723063408 },
              { lat: 12.15470752453156, lon: 102.6893076206088 },
              { lat: 10.87905067391432, lon: 103.1235759504928 },
              { lat: 11.079236317572, lon: 103.5191303249619 },
              { lat: 10.44361509152883, lon: 103.7164291991131 },
              { lat: 10.69092657316975, lon: 103.8811734474427 },
              { lat: 10.54626038037092, lon: 104.2591570586652 },
              { lat: 10.38293573552192, lon: 104.4561374995576 },
              { lat: 10.69585813722931, lon: 105.1457102884372 },
              { lat: 10.90692577048801, lon: 105.0308381584779 },
              { lat: 11.03645854877122, lon: 105.7695132033653 },
              { lat: 10.84060727855729, lon: 105.8515938709534 },
              { lat: 10.7564793818705, lon: 106.1967716726702 },
              { lat: 11.01690703685042, lon: 106.2133822508898 },
              { lat: 11.24650595705412, lon: 105.8684013439372 },
              { lat: 11.60322764576543, lon: 105.835884324957 },
              { lat: 11.77955912535968, lon: 106.0501474934808 },
              { lat: 11.69620341639882, lon: 106.4121329382685 },
              { lat: 11.9705426491078, lon: 106.4459742281426 },
              { lat: 12.04692246528287, lon: 106.9411044740258 },
              { lat: 12.38112120008138, lon: 107.3566900732055 },
              { lat: 12.23505548895679, lon: 107.421979400163 },
              { lat: 12.36195629601354, lon: 107.5888214641548 },
              { lat: 12.73316748903485, lon: 107.5914197394016 },
              { lat: 12.92751149795449, lon: 107.5102350362361 },
              { lat: 13.40945465701073, lon: 107.6311495537398 },
              { lat: 14.02345946309819, lon: 107.4197404155042 },
              { lat: 14.6819672955956, lon: 107.5778163720215 },
              { lat: 14.3011667699944, lon: 106.8891657731537 },
              { lat: 14.59284077212564, lon: 106.542540258944 },
              { lat: 14.38613610010424, lon: 106.0425494710839 },
              { lat: 13.88785248772828, lon: 106.1227711617087 },
              { lat: 14.14656334205164, lon: 105.5939745964939 },
            ],
          },
          {
            map: [
              { lat: 17.44639325303578, lon: 101.1658995625851 },
              { lat: 18.22827490839303, lon: 102.0904220839141 },
              { lat: 17.8302740448527, lon: 102.6515998484578 },
              { lat: 18.02460689633332, lon: 103.0896022462933 },
              { lat: 18.45856329281849, lon: 103.3085549430462 },
              { lat: 18.32999169315086, lon: 103.9683837452536 },
              { lat: 17.67012118286565, lon: 104.455772315265 },
              { lat: 17.42724142425547, lon: 104.7916574657617 },
              { lat: 17.05770568003107, lon: 104.7559575373043 },
              { lat: 16.54178175083094, lon: 104.7540378806872 },
              { lat: 16.10295114884282, lon: 105.0711948075145 },
              { lat: 15.74280908662655, lon: 105.4719079155355 },
              { lat: 15.05894564379027, lon: 105.4862158314805 },
              { lat: 14.73154267675686, lon: 105.5354317454863 },
              { lat: 14.46932922156583, lon: 105.5347700939374 },
              { lat: 14.32705032897318, lon: 105.21585639924 },
              { lat: 14.12688853361215, lon: 105.3831326590502 },
              { lat: 14.17276895991103, lon: 105.5677875726598 },
              { lat: 14.07069837925187, lon: 105.7687202346431 },
              { lat: 13.89918634180787, lon: 106.1041818924657 },
              { lat: 14.37802820484546, lon: 106.0382806508942 },
              { lat: 14.59715784249631, lon: 106.5276140593162 },
              { lat: 14.29214795506543, lon: 106.8977739401487 },
              { lat: 14.65110825666194, lon: 107.5616073694678 },
              { lat: 15.43510132577024, lon: 107.6367088023193 },
              { lat: 15.80704442904837, lon: 107.2117684256079 },
              { lat: 16.1075797687031, lon: 107.4900563164981 },
              { lat: 16.48264372738338, lon: 106.7271965745989 },
              { lat: 16.97078196820333, lon: 106.5465586862227 },
              { lat: 17.29726539748587, lon: 106.3130135288435 },
              { lat: 17.69155598198721, lon: 105.740916401071 },
              { lat: 18.15975835601032, lon: 105.5759278929399 },
              { lat: 18.25903561042983, lon: 105.253160715485 },
              { lat: 18.48498974499669, lon: 105.1378009836771 },
              { lat: 18.67742961827647, lon: 105.2080485749646 },
              { lat: 19.32550151801111, lon: 103.9365482222082 },
              { lat: 19.64710516999724, lon: 104.1250360758524 },
              { lat: 19.62916597602521, lon: 104.6196593046972 },
              { lat: 20.08057056684607, lon: 105.0016232996582 },
              { lat: 20.45363709469521, lon: 104.4378080890078 },
              { lat: 20.69701025687408, lon: 104.6467214105174 },
              { lat: 20.97456575936292, lon: 104.2004081272817 },
              { lat: 20.73049764181304, lon: 103.7167778525328 },
              { lat: 20.89339108840862, lon: 103.1824070947105 },
              { lat: 21.28195980919159, lon: 102.8695629192286 },
              { lat: 21.73955678931181, lon: 102.9705562913794 },
              { lat: 21.68997778313488, lon: 102.7101368167522 },
              { lat: 22.01938480989714, lon: 102.5320950790811 },
              { lat: 22.44592581803963, lon: 102.158887130956 },
              { lat: 22.49158183260604, lon: 101.7372695471053 },
              { lat: 22.22774351836933, lon: 101.5667624063536 },
              { lat: 21.93196662768889, lon: 101.6255612835522 },
              { lat: 21.63651444558571, lon: 101.82392021583 },
              { lat: 21.16348046932386, lon: 101.8145471946078 },
              { lat: 21.19516869409558, lon: 101.2912810081804 },
              { lat: 21.57146693142702, lon: 101.1947789548417 },
              { lat: 21.30668887062965, lon: 100.746714285372 },
              { lat: 20.89570411343389, lon: 100.5320028217478 },
              { lat: 20.79575247485713, lon: 100.3432954417517 },
              { lat: 20.61532615646723, lon: 100.1557278924277 },
              { lat: 20.27358184242237, lon: 100.1131951051592 },
              { lat: 20.35643244302586, lon: 100.3032422440591 },
              { lat: 20.06749742961858, lon: 100.5887364517999 },
              { lat: 19.54812887034742, lon: 100.4984971816548 },
              { lat: 19.48747939118731, lon: 100.7742618159495 },
              { lat: 19.57332354977131, lon: 101.3236556601405 },
              { lat: 19.0097463302578, lon: 101.3493875387473 },
              { lat: 18.44301978096839, lon: 101.0500605136497 },
              { lat: 18.0421546402089, lon: 101.1751847626122 },
              { lat: 17.8950790718795, lon: 101.0072758510897 },
              { lat: 17.44639325303578, lon: 101.1658995625851 },
            ],
          },
          {
            map: [
              { lat: 9.518291642652748, lon: 106.5682800647005 },
              { lat: 10.43975773935464, lon: 106.9043954802356 },
              { lat: 11.24294046858144, lon: 108.9513665985752 },
              { lat: 12.69941986196515, lon: 109.4099091665092 },
              { lat: 15.25484313705629, lon: 108.9346892377553 },
              { lat: 18.99213030934022, lon: 105.6907501874184 },
              { lat: 19.95629787391394, lon: 106.0603184947646 },
              { lat: 21.46207519231184, lon: 108.061230304939 },
              { lat: 21.97004442212597, lon: 106.7490749280251 },
              { lat: 22.89350675523171, lon: 106.8011092388771 },
              { lat: 22.35537984895677, lon: 102.2479392643177 },
              { lat: 21.73056552788767, lon: 102.6890692503913 },
              { lat: 21.70783862229961, lon: 103.028965945836 },
              { lat: 21.24882928808737, lon: 102.852184726764 },
              { lat: 20.72039748034666, lon: 103.7340405097423 },
              { lat: 20.99232074094935, lon: 104.1330449941757 },
              { lat: 20.6778056249263, lon: 104.5901697240808 },
              { lat: 20.47171455416077, lon: 104.4286731616881 },
              { lat: 20.11267657372274, lon: 105.0244547086515 },
              { lat: 19.63479932687267, lon: 104.6802155203955 },
              { lat: 19.69737709616573, lon: 104.0697165802666 },
              { lat: 19.25214103053691, lon: 103.96013682134 },
              { lat: 18.611396124883, lon: 105.159301790441 },
              { lat: 16.01013894806768, lon: 107.482240743824 },
              { lat: 15.70389513134191, lon: 107.2523955744617 },
              { lat: 15.30802382633047, lon: 107.7042423398552 },
              { lat: 14.58710671450183, lon: 107.5640590073766 },
              { lat: 12.26235124586432, lon: 107.4658088935073 },
              { lat: 11.64210548719975, lon: 105.8954944977264 },
              { lat: 10.70975909198935, lon: 106.1873929564507 },
              { lat: 10.97530479735313, lon: 105.7389850218263 },
              { lat: 10.92537488422551, lon: 105.0880949684283 },
              { lat: 10.40421469547161, lon: 104.4594018525239 },
              { lat: 8.507300477015058, lon: 104.8403009093374 },
              { lat: 9.518291642652748, lon: 106.5682800647005 },
            ],
          },
        ],
      });
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
