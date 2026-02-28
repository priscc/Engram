<template>
  <div id="Topics">
    <b-container class="topics_container">
      <div class="topics_back_button" @click="back">
        <b-icon-caret-left aria-hidden="true" /> Back
      </div>
      <b-row>
        <b-col sm="12" md="6" lg="6" class="period_header">
          {{ timePeriodHeaders.header }}
        </b-col>
        <b-col sm="12" md="6" lg="6" class="period_subheader">
          {{ timePeriodHeaders.subheader }}
        </b-col>
      </b-row>
      <b-row v-for="unit in units" :key="unit.id" class="unit">
        <b-col>
          <p class="unit_header">
            {{ unit.unitHeader }}
          </p>
          <div
            class="topics_legend"
            role="list"
            :aria-label="`${unit.unitHeader} topics`"
          >
            <button
              v-for="region in mapRegionsForUnit(unit)"
              :key="`legend-${unit.unitHeader}-${region.topic.id}`"
              type="button"
              class="legend_topic"
              :class="{ hovered: hoveredTopicId === region.topic.id }"
              :style="topicLabelStyle(region.topic.id)"
              @mouseenter="setHoveredTopic(region.topic.id)"
              @mouseleave="clearHoveredTopic"
              @focus="setHoveredTopic(region.topic.id)"
              @blur="clearHoveredTopic"
              @click="next(region.topic)"
            >
              <span
                class="legend_dot"
                :style="{ backgroundColor: getTopicColor(region.topic.id) }"
                aria-hidden="true"
              ></span>
              <span class="legend_title">{{ region.topic.title }}</span>
              <span v-if="region.topic.timespan" class="legend_time">
                ({{ region.topic.timespan }})
              </span>
            </button>
          </div>

          <div
            class="topics_map"
            role="region"
            :aria-label="`${unit.unitHeader} topic map`"
          >
            <svg class="world_svg" viewBox="0 0 1000 520" aria-hidden="true">
              <rect x="0" y="0" width="1000" height="520" class="ocean"></rect>
              <path
                v-if="worldLandPath"
                class="world_land"
                :d="worldLandPath"
              />
              <path
                v-if="worldBorderPath"
                class="world_borders"
                :d="worldBorderPath"
              />

              <path
                v-for="region in mapRegionsForUnit(unit)"
                :key="`${unit.unitHeader}-${region.topic.id}`"
                class="map_highlight"
                :class="{ hovered: hoveredTopicId === region.topic.id }"
                :style="regionStyle(region.topic.id)"
                :d="region.path"
                tabindex="0"
                role="button"
                @mouseenter="setHoveredRegion(region, $event)"
                @mousemove="moveTooltip($event)"
                @mouseleave="clearHoveredTopic"
                @focus="setHoveredRegion(region, $event)"
                @blur="clearHoveredTopic"
                @click="next(region.topic)"
                @keydown.enter.prevent="next(region.topic)"
                @keydown.space.prevent="next(region.topic)"
                :aria-label="`Open topic ${region.topic.title}`"
              >
                <title>
                  {{ region.topic.title }}
                  {{
                    region.topic.timespan ? `(${region.topic.timespan})` : ""
                  }}
                </title>
              </path>
            </svg>

            <div
              v-if="hoverTooltip.visible"
              class="map_tooltip"
              :style="{
                left: `${hoverTooltip.x}px`,
                top: `${hoverTooltip.y}px`,
                borderColor: hoverTooltip.color
              }"
            >
              <p class="tooltip_title">{{ hoverTooltip.title }}</p>
              <p v-if="hoverTooltip.timespan" class="tooltip_time">
                {{ hoverTooltip.timespan }}
              </p>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import * as d3 from "d3";
import * as topojson from "topojson";
import store from "@/store";
import countries from "@/countries.json";
import storeTopic from "@/store/topic.js";
import { pushRoute, goToTopic } from "@/router/navigation";

export default {
  name: "Topics",
  data() {
    return {
      hoveredTopicId: null,
      unitRegionCache: {},
      hoverTooltip: {
        visible: false,
        x: 0,
        y: 0,
        title: "",
        timespan: "",
        color: "#f59e0b"
      },
      tooltipRafId: null,
      pendingTooltipPosition: null,
      activeMapRect: null,
      topicColors: [
        "#4f46e5",
        "#0ea5e9",
        "#16a34a",
        "#f59e0b",
        "#ef4444",
        "#a855f7",
        "#14b8a6",
        "#f97316",
        "#3b82f6",
        "#22c55e"
      ],
      worldLandPath: "",
      worldBorderPath: "",
      geoPath: null,
      countryGeometries: [],
      geometryById: new Map(),
      regionCountryMap: {
        europe: [
          "GBR",
          "IRL",
          "PRT",
          "ESP",
          "FRA",
          "BEL",
          "NLD",
          "DEU",
          "CHE",
          "AUT",
          "ITA",
          "DNK",
          "NOR",
          "SWE",
          "FIN",
          "POL",
          "CZE",
          "SVK",
          "HUN",
          "ROU",
          "BGR",
          "GRC",
          "HRV",
          "SVN",
          "BIH",
          "SRB",
          "ALB",
          "MKD",
          "MNE",
          "UKR",
          "BLR",
          "EST",
          "LVA",
          "LTU",
          "ISL",
          "MDA",
          "TUR"
        ],
        china: ["CHN"],
        africa: [
          "MAR",
          "DZA",
          "TUN",
          "LBY",
          "EGY",
          "MRT",
          "MLI",
          "NER",
          "TCD",
          "SDN",
          "SEN",
          "GMB",
          "GIN",
          "GNB",
          "SLE",
          "LBR",
          "CIV",
          "GHA",
          "TGO",
          "BEN",
          "NGA",
          "CMR",
          "CAF",
          "GNQ",
          "GAB",
          "COG",
          "COD",
          "ETH",
          "ERI",
          "DJI",
          "SOM",
          "KEN",
          "UGA",
          "RWA",
          "BDI",
          "TZA",
          "AGO",
          "ZMB",
          "MWI",
          "MOZ",
          "ZWE",
          "BWA",
          "NAM",
          "ZAF",
          "LSO",
          "SWZ",
          "MDG"
        ],
        mesoamerica: ["MEX", "GTM", "BLZ", "SLV", "HND", "NIC", "CRI", "PAN"],
        southSoutheastAsia: [
          "IND",
          "PAK",
          "BGD",
          "LKA",
          "NPL",
          "BTN",
          "AFG",
          "MMR",
          "THA",
          "KHM",
          "LAO",
          "VNM",
          "MYS",
          "SGP",
          "IDN",
          "BRN",
          "PHL",
          "TLS"
        ],
        darAlIslam: [
          "TUR",
          "SYR",
          "IRQ",
          "JOR",
          "LBN",
          "ISR",
          "SAU",
          "YEM",
          "OMN",
          "ARE",
          "QAT",
          "BHR",
          "KWT",
          "IRN",
          "AFG",
          "PAK",
          "EGY",
          "LBY",
          "TUN",
          "DZA",
          "MAR"
        ],
        eastAsia: ["CHN", "JPN", "KOR", "PRK", "MNG", "TWN"],
        americas: [
          "CAN",
          "USA",
          "MEX",
          "GTM",
          "BLZ",
          "SLV",
          "HND",
          "NIC",
          "CRI",
          "PAN",
          "CUB",
          "DOM",
          "HTI",
          "JAM",
          "BRA",
          "ARG",
          "CHL",
          "PER",
          "COL",
          "VEN",
          "ECU",
          "BOL",
          "PRY",
          "URY",
          "GUY",
          "SUR"
        ],
        southAmerica: [
          "ARG",
          "BOL",
          "BRA",
          "CHL",
          "COL",
          "ECU",
          "GUY",
          "PRY",
          "PER",
          "SUR",
          "URY",
          "VEN"
        ],
        russiaCentralAsia: [
          "RUS",
          "KAZ",
          "UZB",
          "TKM",
          "KGZ",
          "TJK",
          "AZE",
          "ARM",
          "GEO"
        ],
        oceania: ["AUS", "NZL", "PNG", "FJI", "SLB", "VUT"]
      }
    };
  },
  computed: {
    timePeriodHeaders() {
      return store.state.timePeriodHeaders[store.state.currentTimePeriod];
    },
    units() {
      return store.state.units;
    }
  },
  watch: {
    units: {
      handler() {
        this.rebuildUnitRegionCache();
      },
      deep: true,
      immediate: true
    },
    geoPath(newPath) {
      if (newPath) {
        this.rebuildUnitRegionCache();
      }
    },
    "$route.params.period"() {
      this.rebuildUnitRegionCache();
    }
  },
  methods: {
    getUnitCacheKey(unit) {
      return String(unit?.id || unit?.unitHeader || "unknown-unit");
    },
    setActiveMapRect(event) {
      const mapContainer =
        event?.currentTarget?.closest?.(".topics_map") ||
        event?.target?.closest?.(".topics_map");
      if (!mapContainer) {
        return;
      }
      this.activeMapRect = mapContainer.getBoundingClientRect();
    },
    hashTopicId(topicId) {
      const value = String(topicId || "");
      let hash = 0;
      for (let index = 0; index < value.length; index += 1) {
        hash = (hash << 5) - hash + value.charCodeAt(index);
        hash |= 0;
      }
      return Math.abs(hash);
    },
    getTopicColor(topicId) {
      const hash = this.hashTopicId(topicId);
      return this.topicColors[hash % this.topicColors.length];
    },
    hexToRgba(hex, alpha) {
      const clean = String(hex || "")
        .replace("#", "")
        .trim();
      if (clean.length !== 6) {
        return `rgba(245, 158, 11, ${alpha})`;
      }
      const red = parseInt(clean.slice(0, 2), 16);
      const green = parseInt(clean.slice(2, 4), 16);
      const blue = parseInt(clean.slice(4, 6), 16);
      return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
    },
    regionStyle(topicId) {
      const color = this.getTopicColor(topicId);
      const isHovered = this.hoveredTopicId === topicId;

      return {
        fill: this.hexToRgba(color, isHovered ? 0.72 : 0.5),
        stroke: isHovered ? "#ffffff" : this.hexToRgba(color, 0.95),
        strokeWidth: isHovered ? 2 : 1.25
      };
    },
    topicLabelStyle(topicId) {
      const color = this.getTopicColor(topicId);
      const isHovered = this.hoveredTopicId === topicId;

      return {
        borderColor: color,
        backgroundColor: this.hexToRgba(color, isHovered ? 0.32 : 0.18)
      };
    },
    positionTooltip(event) {
      if (!event) {
        return;
      }
      if (!this.activeMapRect) {
        this.setActiveMapRect(event);
      }
      const rect = this.activeMapRect;
      if (!rect) {
        return;
      }

      const clientX =
        typeof event.clientX === "number"
          ? event.clientX
          : rect.left + rect.width / 2;
      const clientY =
        typeof event.clientY === "number"
          ? event.clientY
          : rect.top + rect.height / 2;

      const desiredX = clientX - rect.left + 14;
      const desiredY = clientY - rect.top - 18;

      this.hoverTooltip.x = Math.max(14, Math.min(rect.width - 230, desiredX));
      this.hoverTooltip.y = Math.max(14, Math.min(rect.height - 80, desiredY));
    },
    setHoveredRegion(region, event) {
      this.hoveredTopicId = region.topic.id;
      this.hoverTooltip.visible = true;
      this.hoverTooltip.title = region.topic.title;
      this.hoverTooltip.timespan = region.topic.timespan || "";
      this.hoverTooltip.color = this.getTopicColor(region.topic.id);
      this.setActiveMapRect(event);
      this.positionTooltip(event);
    },
    moveTooltip(event) {
      if (!this.hoverTooltip.visible) {
        return;
      }
      this.pendingTooltipPosition = {
        clientX: event.clientX,
        clientY: event.clientY,
        currentTarget: event.currentTarget,
        target: event.target
      };

      if (this.tooltipRafId !== null) {
        return;
      }

      this.tooltipRafId = window.requestAnimationFrame(() => {
        if (this.pendingTooltipPosition) {
          this.positionTooltip(this.pendingTooltipPosition);
        }
        this.pendingTooltipPosition = null;
        this.tooltipRafId = null;
      });
    },
    buildWorldMapPaths() {
      const width = 1000;
      const height = 520;

      const projection = d3.geo
        .equirectangular()
        .scale(159)
        .translate([width / 2, height / 2]);
      const path = d3.geo.path().projection(projection);

      const world = countries;
      const geometries = world?.objects?.units?.geometries || [];

      const land = topojson.merge(
        world,
        geometries.filter(geometry => geometry.id !== "ATA")
      );

      const borders = topojson.mesh(
        world,
        world.objects.units,
        (a, b) => a !== b && a.id !== "ATA" && b.id !== "ATA"
      );

      this.worldLandPath = path(land) || "";
      this.worldBorderPath = path(borders) || "";
      this.geoPath = path;
      this.countryGeometries = geometries;
      this.geometryById = new Map(
        geometries
          .filter(geometry => geometry?.id)
          .map(geometry => [geometry.id, geometry])
      );
      this.rebuildUnitRegionCache();
    },
    enabledTopics(unit) {
      if (!unit || !Array.isArray(unit.topics)) {
        return [];
      }
      return unit.topics.filter(topic => topic.enabled === true);
    },
    normalizedTitle(topic) {
      return String(topic?.title || "")
        .toLowerCase()
        .trim();
    },
    getRegionKeyForTopic(topic) {
      const title = this.normalizedTitle(topic);
      const regionMatchers = [
        {
          region: "darAlIslam",
          keywords: [
            "dar al-islam",
            "dar al islam",
            "middle east",
            "islamic",
            "ottoman",
            "safavid",
            "abbasid"
          ]
        },
        {
          region: "southSoutheastAsia",
          keywords: [
            "south and southeast asia",
            "south asia",
            "southeast asia",
            "india",
            "mughal",
            "indian ocean"
          ]
        },
        {
          region: "mesoamerica",
          keywords: ["mesoamerica", "aztec", "maya", "olmec"]
        },
        {
          region: "southAmerica",
          keywords: [
            "latin and south america",
            "south america",
            "anti-colonialism in latin and south america"
          ]
        },
        {
          region: "americas",
          keywords: [
            "americas",
            "latin america",
            "south america",
            "north america",
            "caribbean",
            "inca"
          ]
        },
        {
          region: "eastAsia",
          keywords: ["east asia", "japan", "korea", "mongol", "yuan", "qing"]
        },
        {
          region: "china",
          keywords: ["china", "song", "ming"]
        },
        {
          region: "europe",
          keywords: [
            "europe",
            "western europe",
            "eastern europe",
            "renaissance",
            "enlightenment",
            "industrial",
            "atlantic"
          ]
        },
        {
          region: "africa",
          keywords: [
            "africa",
            "sub-saharan",
            "west africa",
            "east africa",
            "north africa",
            "sahel"
          ]
        },
        {
          region: "russiaCentralAsia",
          keywords: ["russia", "siberia", "central asia", "steppe"]
        },
        {
          region: "oceania",
          keywords: ["oceania", "australia", "pacific", "polynesia"]
        }
      ];

      const matched = regionMatchers.find(entry =>
        entry.keywords.some(keyword => title.includes(keyword))
      );

      if (matched) {
        return matched.region;
      }

      const fallbackRegions = [
        "europe",
        "africa",
        "eastAsia",
        "southSoutheastAsia",
        "americas",
        "darAlIslam",
        "russiaCentralAsia",
        "oceania"
      ];
      const fallbackIndex =
        this.hashTopicId(topic?.id || topic?.title) % fallbackRegions.length;
      return fallbackRegions[fallbackIndex];
    },
    rebuildUnitRegionCache() {
      if (!this.geoPath || !this.countryGeometries.length) {
        this.unitRegionCache = {};
        return [];
      }

      const unitsArray = Array.isArray(this.units)
        ? this.units
        : Object.values(this.units || {});

      const nextCache = {};

      unitsArray.forEach(unit => {
        const key = this.getUnitCacheKey(unit);
        const topics = this.enabledTopics(unit);

        nextCache[key] = topics
          .map(topic => {
            const regionKey = this.getRegionKeyForTopic(topic);
            if (!regionKey) {
              return null;
            }

            const countryIds = this.regionCountryMap[regionKey] || [];
            if (!countryIds.length) {
              return null;
            }

            const matchedGeometries = countryIds
              .map(countryId => this.geometryById.get(countryId))
              .filter(Boolean);

            if (!matchedGeometries.length) {
              return null;
            }

            const mergedShape = topojson.merge(countries, matchedGeometries);
            const regionPath = this.geoPath(mergedShape) || "";
            if (!regionPath) {
              return null;
            }

            return {
              topic,
              regionKey,
              path: regionPath
            };
          })
          .filter(Boolean);
      });

      this.unitRegionCache = nextCache;
      return nextCache;
    },
    mapRegionsForUnit(unit) {
      const key = this.getUnitCacheKey(unit);
      return this.unitRegionCache[key] || [];
    },
    setHoveredTopic(topicId) {
      this.hoveredTopicId = topicId;
    },
    clearHoveredTopic() {
      this.hoveredTopicId = null;
      this.hoverTooltip.visible = false;
      this.activeMapRect = null;
      this.pendingTooltipPosition = null;
      if (this.tooltipRafId !== null) {
        window.cancelAnimationFrame(this.tooltipRafId);
        this.tooltipRafId = null;
      }
    },
    back() {
      pushRoute("All_Periods");
    },
    next(topic) {
      storeTopic.dispatch("setTopicContent", topic);
      // Use goToTopic to ensure topicName and periodName are slugified for SEO-friendly URLs
      const periodName =
        this.timePeriodHeaders && this.timePeriodHeaders.header;
      const periodId =
        this.$route.params.period ||
        this.$store?.state?.currentTimePeriod ||
        null;
      goToTopic(
        periodName,
        periodId,
        topic.title,
        topic.id,
        "Introduction",
        topic.title
      );
    }
  },
  mounted() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    this.buildWorldMapPaths();
    if (this.units.length == 0) {
      console.log("this.$route.params.period", this.$route.params.period);
      store.dispatch("setTimePeriod", this.$route.params.period);
    }
  },
  beforeUnmount() {
    if (this.tooltipRafId !== null) {
      window.cancelAnimationFrame(this.tooltipRafId);
      this.tooltipRafId = null;
    }
  }
};
</script>

<!-- <style lang="sass" scoped src="@/assets/css/topics.sass"></style> -->

<style lang="sass" scoped>
@import "@/assets/css/topics.sass"

.unit
  text-align: left

.topics_legend
  display: flex
  flex-wrap: wrap
  gap: 10px
  margin-bottom: 14px

.legend_topic
  border: 1px solid
  border-radius: 999px
  background: rgba(255, 255, 255, 0.12)
  padding: 7px 12px
  display: inline-flex
  align-items: center
  gap: 8px
  font-family: "Montserrat", sans-serif
  font-size: 13px
  cursor: pointer
  transition: transform 0.15s ease, background 0.15s ease

.legend_topic:hover,
.legend_topic:focus,
.legend_topic.hovered
  transform: translateY(-1px)
  background: rgba(255, 255, 255, 0.18)
  outline: none

.legend_dot
  width: 10px
  height: 10px
  border-radius: 50%
  flex-shrink: 0

.legend_title
  font-weight: 600

.legend_time
  opacity: 0.9

.topics_map
  position: relative
  width: 100%
  min-height: 400px
  border-radius: 20px
  overflow: hidden
  border: 1px solid rgba(0, 0, 0, 0.15)
  background: #050507

.world_svg
  width: 100%
  height: 100%
  min-height: 400px
  display: block

.ocean
  fill: #050507

.world_land
  fill: #4a4b50
  stroke: #2f3035
  stroke-width: 1

.world_borders
  fill: none
  stroke: #27282d
  stroke-width: 0.55
  opacity: 0.85

.map_highlight
  cursor: pointer
  transition: all 0.2s ease

.map_highlight.hovered
  filter: brightness(1.15)

.map_highlight:focus
  outline: none
  filter: brightness(1.18)

.map_tooltip
  position: absolute
  z-index: 2
  min-width: 190px
  max-width: 230px
  background: rgba(8, 8, 10, 0.95)
  color: #ffffff
  border: 2px solid
  border-radius: 10px
  padding: 10px 12px
  pointer-events: none
  box-shadow: 0 12px 26px rgba(0, 0, 0, 0.45)

.tooltip_title
  margin: 0
  font-family: "Montserrat", sans-serif
  font-size: 14px
  font-weight: 700
  line-height: 1.25

.tooltip_time
  margin: 3px 0 0 0
  font-family: "Montserrat", sans-serif
  font-size: 13px
  line-height: 1.2
  color: #e2e8f0

@media (max-width: 920px)
  .topics_map
    min-height: 460px

  .world_svg
    min-height: 460px

  .topics_legend
    gap: 8px

  .legend_topic
    font-size: 12px
    padding: 6px 10px
</style>
