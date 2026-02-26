<template>
  <div class="map-panel">
    <div class="map-content">
      <div ref="mapElement" class="map-container"></div>
      <div v-if="activeRegions.length === 0" class="map-fallback">
        <p class="fallback-text">No location data available for this event</p>
      </div>
    </div>
  </div>
</template>

<script setup>
/* global defineProps */
import { watch, onMounted, onBeforeUnmount, nextTick, ref } from "vue";
import * as d3 from "d3";
import * as topojson from "topojson";
import countries from "@/countries.json";

const mapElement = ref(null);

const props = defineProps({
  activeRegions: {
    type: Array,
    default: () => []
  },
  activeCoordinates: {
    type: Object,
    default: () => ({})
  },
  secondaryRegions: {
    type: Array,
    default: () => []
  },
  highlightColor: {
    type: String,
    default: "#BDFF00"
  },
  baseMapStyle: {
    type: String,
    default: "dark"
  }
});

/**
 * Map regions to display categories
 */
const regionCategories = {
  "Central Europe": [
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
  ],
  "Northern Europe": ["DNK", "FRO", "FIN", "GRL", "ISL", "NOR", "SWE"],
  "North America": ["CAN", "MEX", "USA"],
  Caribbean: [
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
  ],
  "South America": [
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
  ],
  Africa: [
    "AGO",
    "BDI",
    "BEN",
    "BFA",
    "BWA",
    "CAF",
    "CIV",
    "CMR",
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
    "SLE",
    "SOM",
    "SOL",
    "SSD",
    "STP",
    "SWZ",
    "SYC",
    "TCD",
    "TGO",
    "TUN",
    "TZA",
    "UGA",
    "ZAF",
    "ZMB",
    "ZWE"
  ],
  "South Pacific": ["AUS", "NZL"],
  India: ["IND", "BGD", "LKA"],
  Orient: [
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
  ],
  Russia: ["RUS", "KAZ", "UZB", "TKM", "KGZ", "TJK"],
  China: ["CHN"],
  Asia: [
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
  ]
};

/**
 * Initialize and render the map
 */
const initMap = () => {
  if (!mapElement.value) {
    return;
  }

  const bounds = mapElement.value.getBoundingClientRect();
  if (!bounds.width || !bounds.height) {
    requestAnimationFrame(initMap);
    return;
  }

  // Clear existing map
  while (mapElement.value.hasChildNodes()) {
    mapElement.value.removeChild(mapElement.value.firstChild);
  }

  // Map configuration
  const width = 1400;
  const height = 800;

  const projection = d3.geo
    .mercator()
    .center([0, 9])
    .scale(width / 1.5 / Math.PI)
    .rotate([-11, 0])
    .translate([width / 1.5, (height * 1.35) / 2])
    .precision(0.5);

  const path = d3.geo.path().projection(projection);

  const svg = d3
    .select(mapElement.value)
    .append("div")
    .classed("svg-container", true)
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("preserveAspectRatio", "xMidYMid meet")
    .attr("viewBox", "0 0 2000 1200")
    .classed("svg-content-responsive", true)
    .append("g");
  const w = countries;

  // Base map
  svg
    .append("path")
    .datum(
      topojson.merge(
        w,
        w.objects.units.geometries.filter(function(d) {
          return d.id !== "ATA";
        })
      )
    )
    .attr("class", "border")
    .attr("d", path)
    .attr("fill", "#d9edf7");

  // Render region categories
  Object.entries(regionCategories).forEach(([categoryName, regionCodes]) => {
    const isActiveByName = props.activeRegions.includes(categoryName);
    const isActiveByCode = regionCodes.some(code =>
      props.activeRegions.includes(code)
    );
    const isActive = isActiveByName || isActiveByCode;
    const isSecondary = regionCodes.some(code =>
      props.secondaryRegions.includes(code)
    );

    svg
      .append("path")
      .datum(
        topojson.merge(
          w,
          w.objects.units.geometries.filter(function(d) {
            return regionCodes.includes(d.id);
          })
        )
      )
      .attr(
        "class",
        `regions ${isActive ? "active" : ""} ${isSecondary ? "secondary" : ""}`
      )
      .attr("d", path)
      .attr("data-name", categoryName)
      .attr("fill", isActive ? props.highlightColor : "#464646")
      .attr("opacity", isSecondary ? 0.5 : 1)
      .style("transition", "fill 300ms ease, opacity 300ms ease");
  });

  // Render active event routes/points (legacy behavior from EventMapComponent)
  const lineFunction = d3.svg
    .line()
    .x(function(d) {
      const point = projection([d.lon, d.lat]);
      return point[0];
    })
    .y(function(d) {
      const point = projection([d.lon, d.lat]);
      return point[1];
    })
    .interpolate("linear");

  const coordinates = props.activeCoordinates || {};
  Object.keys(coordinates).forEach(regionKey => {
    const points = coordinates[regionKey] || [];

    if (points.length > 1) {
      svg
        .append("path")
        .attr("d", lineFunction(points))
        .attr("stroke", "#ff3b30")
        .attr("stroke-width", 2)
        .attr("fill", props.highlightColor)
        .attr("opacity", 0.95);
    } else if (points.length === 1) {
      svg
        .append("circle")
        .attr("cx", projection([points[0].lon, points[0].lat])[0])
        .attr("cy", projection([points[0].lon, points[0].lat])[1])
        .attr("r", 10)
        .style("fill", props.highlightColor)
        .attr("stroke", "#ff3b30")
        .attr("stroke-width", 4);
    }
  });
};

const handleResize = () => {
  initMap();
};

onMounted(async () => {
  await nextTick();
  initMap();
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});

watch(
  () => [props.activeRegions, props.activeCoordinates, props.highlightColor],
  () => {
    initMap();
  },
  { deep: true }
);
</script>

<style scoped lang="sass">
.map-panel
  width: 100%
  height: 100%
  min-height: 0
  display: flex
  align-items: center
  justify-content: center
  background: var(--bg, #1a1a1a)
  border-radius: 8px
  overflow: hidden

.map-content
  width: 100%
  height: 100%
  min-height: 0
  position: relative
  display: flex
  align-items: stretch
  justify-content: center

.map-fallback
  position: absolute
  bottom: 12px
  right: 12px
  background: rgba(0, 0, 0, 0.45)
  padding: 6px 10px
  border-radius: 6px
  backdrop-filter: blur(4px)

.fallback-text
  color: var(--text-secondary, #999)
  font-size: 12px
  text-align: center

.map-container
  flex: 1
  width: 100%
  height: 100%
  min-height: 0
  position: relative
  display: flex
  align-items: stretch
  justify-content: center

:deep(.svg-container)
  position: relative
  width: 100%
  height: 100%
  min-height: 0
  display: flex
  align-items: stretch
  justify-content: center

:deep(.svg-content-responsive)
  display: block
  position: relative
  width: 100%
  height: 100%

:deep(.border)
  stroke: #999
  stroke-width: 0.5px

:deep(.regions)
  stroke: #333
  stroke-width: 0.25px
  cursor: pointer

:deep(.regions.active)
  fill: var(--highlight-color, #BDFF00) !important
  opacity: 1 !important
  filter: drop-shadow(0 0 4px rgba(189, 255, 0, 0.5))

:deep(.regions.secondary)
  opacity: 0.5

:deep(.regions:hover)
  filter: brightness(1.1)
</style>
