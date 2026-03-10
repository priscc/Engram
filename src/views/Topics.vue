<template>
  <div id="Topics">
    <b-container fluid>
      <b-row
        class="background background_filter page_header_row"
        :style="{ 'background-image': `url(${headerBackgroundImage})` }"
      >
        <b-col cols="12" class="u-non-blurred">
          <div class="page_header_inner">
            <div class="header_back_button" @click="back">
              <b-icon-chevron-left aria-hidden="true" /> Back
            </div>
            <div class="header_breadcrumb" role="heading" aria-level="1">
              <span class="crumb_item">AP World History</span>
              <span class="crumb_sep" aria-hidden="true">→</span>
              <span class="crumb_item">{{ timePeriodHeaders.header }} ({{ timePeriodHeaders.subheader }})</span>
              <span v-if="headerUnitTitle" class="crumb_sep" aria-hidden="true">→</span>
              <span v-if="headerUnitTitle" class="crumb_item crumb_current">{{ headerUnitTitle }}</span>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
    <b-container class="topics_container">
      <b-row
        v-for="unit in visibleUnits"
        :key="unit.unitHeader"
        class="topics_unit_row"
      >
        <b-col cols="12">
          <div class="topics_content_layout">
            <section class="topics_left_panel">
              <p class="unit_header">
                {{ unit.unitHeader }}
              </p>

              <div
                class="topic_cards_grid"
                role="list"
                :aria-label="`${unit.unitHeader} topics`"
              >
                <button
                  v-for="region in mapRegionsForUnit(unit)"
                  :key="`card-${unit.unitHeader}-${region.topic.id}`"
                  type="button"
                  class="topic_card_tile"
                  :class="{ hovered: hoveredTopicId === region.topic.id }"
                  :style="topicCardStyle(region.topic)"
                  @mouseenter="setHoveredTopic(region.topic.id)"
                  @mouseleave="clearHoveredTopic"
                  @focus="setHoveredTopic(region.topic.id)"
                  @blur="clearHoveredTopic"
                  @click="next(region.topic)"
                  :aria-label="`Open topic ${region.topic.title}`"
                >
                  <span
                    class="topic_card_accent"
                    :style="{ backgroundColor: getTopicColor(region.topic.id) }"
                    aria-hidden="true"
                  ></span>
                  <span class="topic_card_body">
                    <span class="topic_card_title">{{ region.topic.title }}</span>
                    <span v-if="region.topic.timespan" class="topic_card_time">
                      ({{ region.topic.timespan }})
                    </span>
                  </span>
                </button>
              </div>
            </section>

            <section class="topics_right_panel">
              <div
                class="topics_map"
                role="region"
                :aria-label="`${unit.unitHeader} topic map`"
              >
                <svg class="world_svg" viewBox="0 0 1000 520" aria-hidden="true">
                  <rect
                    x="0"
                    y="0"
                    width="1000"
                    height="520"
                    class="ocean"
                  ></rect>
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
            </section>
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
    headerBackgroundImage() {
      try {
        return this.timePeriodHeaders?.img
          ? require(`@/assets/${this.timePeriodHeaders.img}`)
          : "";
      } catch (e) {
        return "";
      }
    },
    timePeriodHeaders() {
      return store.state.timePeriodHeaders[store.state.currentTimePeriod];
    },
    units() {
      return store.state.units;
    },
    selectedUnitHeader() {
      const selectedUnitRaw = this.$route?.query?.unit;
      const selectedUnit = Array.isArray(selectedUnitRaw)
        ? selectedUnitRaw[0]
        : selectedUnitRaw;

      if (typeof selectedUnit !== "string") {
        return "";
      }

      try {
        return decodeURIComponent(selectedUnit).replace(/\+/g, " ");
      } catch (e) {
        return selectedUnit.replace(/\+/g, " ");
      }
    },
    unitsArray() {
      return Array.isArray(this.units)
        ? this.units
        : Object.values(this.units || {});
    },
    visibleUnits() {
      if (!this.unitsArray.length) {
        return [];
      }

      const normalizedSelected = this.selectedUnitHeader.trim().toLowerCase();
      if (!normalizedSelected) {
        return [this.unitsArray[0]];
      }

      const matchedUnit = this.unitsArray.find(unit =>
        String(unit?.unitHeader || "")
          .trim()
          .toLowerCase()
          .replace(/\s+/g, " ")
          .startsWith(normalizedSelected)
      );

      return [matchedUnit || this.unitsArray[0]];
    },
    headerUnitTitle() {
      const visibleUnit = this.visibleUnits[0];
      const visibleHeader = String(visibleUnit?.unitHeader || "").trim();
      if (visibleHeader) {
        return visibleHeader;
      }

      return this.selectedUnitHeader.trim();
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
    resolveTopicImage(topic) {
      const imageCandidates = [
        topic?.topic_thumbURL,
        topic?.intro_thumbURL,
        topic?.topic_thumbFile,
        topic?.intro_thumbFile
      ];

      const imagePath = imageCandidates.find(
        value => typeof value === "string" && value.trim().length > 0
      );

      return imagePath ? imagePath.trim() : "";
    },
    topicCardStyle(topic) {
      const color = this.getTopicColor(topic?.id);
      const topicImage = this.resolveTopicImage(topic);

      const overlayGradient =
        "linear-gradient(180deg, rgba(6, 6, 9, 0.3) 0%, rgba(6, 6, 9, 0.55) 52%, rgba(6, 6, 9, 0.78) 100%)";

      return {
        borderColor: this.hexToRgba(color, 0.72),
        backgroundImage: topicImage
          ? `${overlayGradient}, url("${topicImage}")`
          : `linear-gradient(180deg, ${this.hexToRgba(
              color,
              0.66
            )} 0%, rgba(6, 6, 9, 0.9) 100%)`
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

.page_header_row
  min-height: 132px
  padding: 16px 22px

.page_header_inner
  min-height: 100px
  width: 100%
  display: flex
  align-items: center
  gap: 14px

.header_back_button
  display: inline-flex
  align-items: center
  gap: 6px
  padding: 6px 14px
  font-family: "Montserrat", sans-serif
  font-weight: 700
  font-size: 14px
  color: #fff
  background: rgba(91, 33, 182, 0.4)
  border: 1px solid rgba(91, 33, 182, 1)
  border-radius: 10px
  backdrop-filter: blur(6px)
  text-decoration: none
  cursor: pointer
  transition: all 0.25s ease

.header_back_button:hover
  background: #5B21B6
  transform: translateY(-1px)

.header_back_button:active
  transform: translateY(0)

.header_breadcrumb
  display: flex
  align-items: center
  flex-wrap: wrap
  gap: 6px
  min-width: 0
  color: #ffffff
  font-family: "Montserrat", sans-serif
  letter-spacing: -0.4px
  font-size: 22px
  line-height: 1.2
  font-weight: 500

.crumb_item
  max-width: 100%
  word-break: break-word

.crumb_current
  font-weight: 700

.crumb_sep
  color: rgba(255, 255, 255, 0.82)
  font-size: 20px
  line-height: 1

.topics_container
  max-width: 1360px
  margin: 0 auto
  padding: 32px 20px 44px

.topics_unit_row
  margin: 0

.topics_content_layout
  display: grid
  grid-template-columns: minmax(260px, 336px) minmax(0, 1fr)
  align-items: start
  gap: 24px

.topics_left_panel
  display: flex
  flex-direction: column
  gap: 18px

.unit_header
  margin: 0
  color: #1f2937
  font-family: "Montserrat", sans-serif
  letter-spacing: -0.6px
  line-height: 1.1
  font-weight: 500
  font-size: clamp(34px, 2.8vw, 48px)

.topic_cards_grid
  display: grid
  grid-template-columns: repeat(2, minmax(0, 1fr))
  gap: 14px

.topic_card_tile
  position: relative
  width: 100%
  aspect-ratio: 1 / 1
  border: 1px solid rgba(255, 255, 255, 0.2)
  border-radius: 24px
  overflow: hidden
  padding: 16px 12px 15px
  background-color: #111827
  background-size: cover
  background-repeat: no-repeat
  background-position: center
  color: #ffffff
  text-align: center
  display: flex
  align-items: flex-end
  justify-content: center
  cursor: pointer
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.24)
  transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease, border-color 0.2s ease

.topic_card_tile::before
  content: ""
  position: absolute
  inset: 0
  background: rgba(8, 8, 12, 0.2)
  pointer-events: none

.topic_card_tile:hover,
.topic_card_tile.hovered,
.topic_card_tile:focus-visible
  transform: translateY(-2px)
  filter: brightness(1.06)
  box-shadow: 0 14px 30px rgba(15, 23, 42, 0.36)
  outline: none

.topic_card_tile:focus-visible
  border-color: #ffffff

.topic_card_accent
  position: absolute
  z-index: 1
  top: 16px
  left: 20px
  right: 20px
  height: 14px
  border-radius: 999px
  opacity: 0.95
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.2), 0 6px 18px rgba(0, 0, 0, 0.35)

.topic_card_body
  position: relative
  z-index: 1
  width: 100%
  display: flex
  flex-direction: column
  align-items: center
  justify-content: flex-end
  gap: 6px
  color: #ffffff
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.82)

.topic_card_title
  margin: 0
  font-family: "Montserrat", sans-serif
  letter-spacing: -0.25px
  line-height: 1.12
  font-size: clamp(16px, 1.2vw, 24px)
  font-weight: 700
  max-width: 94%
  overflow-wrap: anywhere

.topic_card_time
  margin: 0
  font-family: "Montserrat", sans-serif
  letter-spacing: -0.2px
  line-height: 1.16
  font-size: clamp(12px, 0.92vw, 17px)
  font-weight: 500
  max-width: 94%
  opacity: 0.98

.topics_right_panel
  min-width: 0

.topics_map
  position: relative
  width: 100%
  aspect-ratio: 1000 / 520
  border-radius: 24px
  overflow: hidden
  border: 1px solid rgba(24, 24, 27, 0.62)
  background: #050507
  box-shadow: 0 18px 38px rgba(0, 0, 0, 0.3)

.world_svg
  width: 100%
  height: 100%
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
  transition: filter 0.2s ease

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
  .page_header_row
    min-height: 124px
    padding: 14px 14px

  .page_header_inner
    gap: 10px

  .header_breadcrumb
    font-size: 18px

  .topics_container
    padding: 26px 14px 36px

  .topics_content_layout
    grid-template-columns: minmax(220px, 280px) minmax(0, 1fr)
    gap: 16px

  .unit_header
    font-size: clamp(28px, 4vw, 36px)

  .topic_cards_grid
    gap: 10px

  .topic_card_tile
    border-radius: 20px
    padding: 14px 10px 12px

  .topic_card_accent
    top: 12px
    left: 14px
    right: 14px
    height: 12px

  .topic_card_title
    font-size: clamp(15px, 1.55vw, 20px)

  .topic_card_time
    font-size: clamp(11px, 1.1vw, 14px)

@media (max-width: 760px)
  .topics_content_layout
    grid-template-columns: 1fr

  .topics_right_panel
    margin-top: 4px

@media (max-width: 576px)
  .page_header_inner
    align-items: flex-start
    flex-direction: column
    justify-content: center

  .header_back_button
    padding: 5px 10px
    font-size: 13px

  .header_breadcrumb
    font-size: 16px
    gap: 4px

  .topics_container
    padding: 20px 10px 28px

  .unit_header
    font-size: clamp(24px, 8vw, 32px)

  .topic_cards_grid
    gap: 9px

  .topic_card_tile
    border-radius: 18px
    padding: 11px 8px 10px

  .topic_card_accent
    top: 10px
    left: 12px
    right: 12px
    height: 10px

  .topic_card_title
    font-size: clamp(15px, 4.1vw, 19px)

  .topic_card_time
    font-size: clamp(11px, 2.8vw, 14px)
</style>