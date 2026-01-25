<template>
  <div id="Trends">
    <b-container fluid>
      <b-row>
        <div class="title">Trends</div>
      </b-row>

      <div v-if="hasTrends">
        <!-- Change and Continuity section (only if structured trends exist) -->
        <b-row lg="6" md="6" sm="12" xs="12" v-if="hasStructuredTrends">
          <div class="title">Continuity and Change Over Time (CCOT)</div>
          <b-col :class="border">
            <div class="trend_header" style="color: #000000">Change</div>
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
          </b-col>
          <b-col lg="6" md="6" sm="12" xs="12">
            <div class="trend_header" style="color: #000000">Continuity</div>
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
