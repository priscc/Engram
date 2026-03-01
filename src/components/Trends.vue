<template>
  <div id="Trends">
    <b-container fluid>
      <b-row>
        <div class="title">Trends</div>
      </b-row>

      <div v-if="hasTrends">
        <!-- Change and Continuity section (only if structured trends exist) -->
        <b-row v-if="hasStructuredTrends" class="ccot_stack">
          <b-col cols="12">
            <div class="subtitle">Continuity and Change Over Time (CCOT)</div>
          </b-col>

          <b-col
            cols="12"
            class="ccot_panel"
            :class="{ 'is-open': isPanelOpen('change') }"
          >
            <button
              type="button"
              class="ccot_panel_header"
              :aria-expanded="isPanelOpen('change')"
              @click="togglePanel('change')"
            >
              <span class="trend_header" style="color: #000000">Change</span>
              <span class="ccot_toggle" aria-hidden="true">
                {{ isPanelOpen("change") ? "−" : "+" }}
              </span>
            </button>
            <transition name="ccot-collapse">
              <div v-show="isPanelOpen('change')" class="ccot_panel_body">
            <!-- Social -->
            <b-row v-if="social_change.length > 0">
              <b-col>
                <div class="trend_header" style="color: #FF9800">Society</div>
                <p
                  v-for="(trend, index) in social_change"
                  :key="index"
                  class="trend_text"
                >
                  {{ index + 1 }}) {{ trend.trend }}
                </p>
              </b-col>
            </b-row>
            <!-- Economic -->
            <b-row v-if="economic_change.length > 0">
              <b-col>
                <div class="trend_header" style="color: #16a175">Economic</div>
                <p
                  v-for="(trend, index) in economic_change"
                  :key="index"
                  class="trend_text"
                >
                  {{ index + 1 }}) {{ trend.trend }}
                </p>
              </b-col>
            </b-row>
            <!-- Technology -->
            <b-row v-if="technology_change.length > 0">
              <b-col>
                <div class="trend_header" style="color: #009688">
                  Technology
                </div>
                <p
                  v-for="(trend, index) in technology_change"
                  :key="index"
                  class="trend_text"
                >
                  {{ index + 1 }}) {{ trend.trend }}
                </p>
              </b-col>
            </b-row>
            <!-- Government -->
            <b-row v-if="politics_change.length > 0">
              <b-col>
                <div class="trend_header" style="color: #673AB7">Political</div>
                <p
                  v-for="(trend, index) in politics_change"
                  :key="index"
                  class="trend_text"
                >
                  {{ index + 1 }}) {{ trend.trend }}
                </p>
              </b-col>
            </b-row>
            <!-- Culture -->
            <b-row v-if="culture_change.length > 0">
              <b-col>
                <div class="trend_header" style="color: #3b4da6">Culture</div>
                <p
                  v-for="(trend, index) in culture_change"
                  :key="index"
                  class="trend_text"
                >
                  {{ index + 1 }}) {{ trend.trend }}
                </p>
              </b-col>
            </b-row>
            <!-- Environment -->
            <b-row v-if="environment_change.length > 0">
              <b-col>
                <div class="trend_header" style="color: #b377ff">
                  Environment
                </div>
                <p
                  v-for="(trend, index) in environment_change"
                  :key="index"
                  class="trend_text"
                >
                  {{ index + 1 }}) {{ trend.trend }}
                </p>
              </b-col>
            </b-row>
              </div>
            </transition>
          </b-col>

          <b-col
            cols="12"
            class="ccot_panel"
            :class="{ 'is-open': isPanelOpen('continuity') }"
          >
            <button
              type="button"
              class="ccot_panel_header"
              :aria-expanded="isPanelOpen('continuity')"
              @click="togglePanel('continuity')"
            >
              <span class="trend_header" style="color: #000000">
                Continuity
              </span>
              <span class="ccot_toggle" aria-hidden="true">
                {{ isPanelOpen("continuity") ? "−" : "+" }}
              </span>
            </button>
            <transition name="ccot-collapse">
              <div v-show="isPanelOpen('continuity')" class="ccot_panel_body">
            <!-- Social -->
            <b-row v-if="social_continuity.length > 0">
              <b-col>
                <div class="trend_header" style="color: #FF9800">Society</div>
                <p
                  v-for="(trend, index) in social_continuity"
                  :key="index"
                  class="trend_text"
                >
                  {{ index + 1 }}) {{ trend.trend }}
                </p>
              </b-col>
            </b-row>
            <!-- Economic -->
            <b-row v-if="economic_continuity.length > 0">
              <b-col>
                <div class="trend_header" style="color: #16a175">Economic</div>
                <p
                  v-for="(trend, index) in economic_continuity"
                  :key="index"
                  class="trend_text"
                >
                  {{ index + 1 }}) {{ trend.trend }}
                </p>
              </b-col>
            </b-row>
            <!-- Technology -->
            <b-row v-if="technology_continuity.length > 0">
              <b-col>
                <div class="trend_header" style="color: #009688">
                  Technology
                </div>
                <p
                  v-for="(trend, index) in technology_continuity"
                  :key="index"
                  class="trend_text"
                >
                  {{ index + 1 }}) {{ trend.trend }}
                </p>
              </b-col>
            </b-row>
            <!-- Government -->
            <b-row v-if="politics_continuity.length > 0">
              <b-col>
                <div class="trend_header" style="color: #673AB7">Political</div>
                <p
                  v-for="(trend, index) in politics_continuity"
                  :key="index"
                  class="trend_text"
                >
                  {{ index + 1 }}) {{ trend.trend }}
                </p>
              </b-col>
            </b-row>
            <!-- Culture -->
            <b-row v-if="culture_continuity.length > 0">
              <b-col>
                <div class="trend_header" style="color: #3b4da6">Culture</div>
                <p
                  v-for="(trend, index) in culture_continuity"
                  :key="index"
                  class="trend_text"
                >
                  {{ index + 1 }}) {{ trend.trend }}
                </p>
              </b-col>
            </b-row>
            <!-- Environment -->
            <b-row v-if="environment_continuity.length > 0">
              <b-col>
                <div class="trend_header" style="color: #b377ff">
                  Environment
                </div>
                <p
                  v-for="(trend, index) in environment_continuity"
                  :key="index"
                  class="trend_text"
                >
                  {{ index + 1 }}) {{ trend.trend }}
                </p>
              </b-col>
            </b-row>
              </div>
            </transition>
          </b-col>
        </b-row>

        <!-- Unstructured Trends section (simple list if no trendName field) -->
        <b-row v-if="unstructuredTrends.length > 0" class="pt-4">
          <b-col>
            <div class="title">Trends</div>
            <div
              v-for="(trend, index) in unstructuredTrendsByType"
              :key="'unstructured-' + index"
            >
              <div
                class="trend_header"
                :style="{ color: typeColors[trend.type] || '#000000' }"
              >
                {{ capitalizeType(trend.type) }}
              </div>
              <p v-for="(item, i) in trend.items" :key="i" class="trend_text">
                {{ i + 1 }}) {{ item.trend }}
              </p>
            </div>
          </b-col>
        </b-row>
      </div>
      <comingsoon v-else></comingsoon>
    </b-container>
  </div>
</template>

<script>
import storeTopic from "@/store/topic.js";
import comingsoon from "./ComingSoon.vue";

export default {
  name: "Trends",
  components: { comingsoon },
  data() {
    return {
      openPanels: {
        change: false,
        continuity: false
      }
    };
  },
  computed: {
    typeColors() {
      return {
        social: "#FF9800",
        economic: "#16a175",
        technology: "#009688",
        politics: "#673AB7",
        culture: "#3b4da6",
        environment: "#b377ff"
      };
    },
    border: function() {
      let width = window.screen.width;
      if (width < 720) {
        return "border-0";
      } else {
        return "border-end";
      }
    },
    // Structured trends (have trendName field)
    structuredTrends() {
      const trends =
        storeTopic && Array.isArray(storeTopic.state.trends)
          ? storeTopic.state.trends
          : [];
      return trends.filter(t => t && typeof t.trendName === "string");
    },
    // Unstructured trends (missing trendName field)
    unstructuredTrends() {
      const trends =
        storeTopic && Array.isArray(storeTopic.state.trends)
          ? storeTopic.state.trends
          : [];
      return trends.filter(t => t && !t.trendName);
    },
    // Group unstructured trends by type
    unstructuredTrendsByType() {
      const grouped = {};
      this.unstructuredTrends.forEach(trend => {
        const type = trend.type || "other";
        if (!grouped[type]) {
          grouped[type] = { type, items: [] };
        }
        grouped[type].items.push(trend);
      });
      return Object.values(grouped);
    },
    hasStructuredTrends() {
      return this.structuredTrends.length > 0;
    },
    // Structured trend filters (Change/Continuity layout)
    social_change() {
      return this.structuredTrends.filter(
        i => i.type === "social" && i.trendName === "change"
      );
    },
    economic_change() {
      return this.structuredTrends.filter(
        i => i.type == "economic" && i.trendName === "change"
      );
    },
    technology_change() {
      return this.structuredTrends.filter(
        i => i.type == "technology" && i.trendName === "change"
      );
    },
    politics_change() {
      return this.structuredTrends.filter(
        i => i.type == "politics" && i.trendName === "change"
      );
    },
    culture_change() {
      return this.structuredTrends.filter(
        i => i.type == "culture" && i.trendName === "change"
      );
    },
    environment_change() {
      return this.structuredTrends.filter(
        i => i.type == "environment" && i.trendName === "change"
      );
    },
    social_continuity() {
      return this.structuredTrends.filter(
        i => i.type === "social" && i.trendName === "continuity"
      );
    },
    economic_continuity() {
      return this.structuredTrends.filter(
        i => i.type == "economic" && i.trendName === "continuity"
      );
    },
    technology_continuity() {
      return this.structuredTrends.filter(
        i => i.type == "technology" && i.trendName === "continuity"
      );
    },
    politics_continuity() {
      return this.structuredTrends.filter(
        i => i.type == "politics" && i.trendName === "continuity"
      );
    },
    culture_continuity() {
      return this.structuredTrends.filter(
        i => i.type == "culture" && i.trendName === "continuity"
      );
    },
    environment_continuity() {
      return this.structuredTrends.filter(
        i => i.type == "environment" && i.trendName === "continuity"
      );
    },
    hasTrends() {
      console.log("checking trends", storeTopic);
      console.log(storeTopic.state.trends);
      return (
        storeTopic &&
        Array.isArray(storeTopic.state.trends) &&
        storeTopic.state.trends.length > 0
      );
    }
  },
  methods: {
    togglePanel(panelName) {
      this.openPanels = {
        ...this.openPanels,
        [panelName]: !this.openPanels[panelName]
      };
    },
    isPanelOpen(panelName) {
      return Boolean(this.openPanels[panelName]);
    },
    capitalizeType(type) {
      return type ? type.charAt(0).toUpperCase() + type.slice(1) : "Other";
    }
  },
  mounted() {
    storeTopic.dispatch("setTopicTrends", this.$route.params.topic);
  }
};
</script>

<style lang="sass" scoped src="@/assets/css/topicContent.sass"></style>

<style lang="sass" scoped>

.subtitle
  font-size: 20px
  margin-bottom: 16px

.ccot_stack
  width: 100%

.ccot_panel
  width: 100%
  margin-bottom: 12px
  border: 1px solid rgba(91, 33, 182, 0.16)
  border-radius: 14px
  background: #ffffff
  box-shadow: 0 3px 10px rgba(15, 23, 42, 0.06)
  transition: box-shadow 0.2s ease, border-color 0.2s ease, transform 0.2s ease

.ccot_panel:hover
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.09)

.ccot_panel.is-open
  border-color: rgba(91, 33, 182, 0.42)
  box-shadow: 0 10px 24px rgba(91, 33, 182, 0.12)

.ccot_panel_header
  width: 100%
  display: flex
  align-items: center
  justify-content: space-between
  background: transparent
  border: none
  padding: 14px 18px
  text-align: left
  cursor: pointer

.ccot_panel_header:focus-visible
  outline: 2px solid rgba(91, 33, 182, 0.35)
  outline-offset: 2px
  border-radius: 10px

.ccot_toggle
  display: inline-flex
  align-items: center
  justify-content: center
  min-width: 28px
  height: 28px
  border-radius: 999px
  background: rgba(91, 33, 182, 0.1)
  font-size: 24px
  line-height: 1
  color: #5b21b6
  margin-left: 10px
  font-weight: 600
  transition: background 0.2s ease, color 0.2s ease

.ccot_panel.is-open .ccot_toggle
  background: rgba(91, 33, 182, 0.18)
  color: #4b1d96

.ccot_panel_body
  overflow: hidden
  padding: 0 18px 12px 18px

.ccot_panel_body :deep(.trend_header)
  margin-top: 10px

.ccot_panel_body :deep(.trend_text)
  margin-bottom: 10px

@media (max-width: 768px)
  .ccot_panel_header
    padding: 12px 14px

  .ccot_panel_body
    padding: 0 14px 10px 14px

.ccot-collapse-enter-active,
.ccot-collapse-leave-active
  transition: max-height 0.28s ease, opacity 0.22s ease

.ccot-collapse-enter-from,
.ccot-collapse-leave-to
  max-height: 0
  opacity: 0

.ccot-collapse-enter-to,
.ccot-collapse-leave-from
  max-height: 2200px
  opacity: 1
</style>
