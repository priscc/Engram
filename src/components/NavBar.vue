<!-- src/components/NavBar.vue -->
<template>
  <div class="navbar_styling fontist">
    <b-navbar toggleable="xl" type="light" class="navbar_style">
      <b-navbar-brand @click="home" class="logo">
        <img class="logo_img mb-1" src="@/assets/EngramLogo.png" />
        <span class="logo_btn ms-3">Engram</span>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse" type="light"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="navbar_tab_section">
          <b-nav-item-dropdown right class="nav-dropdown me-3" no-caret>
            <template #button-content>
              <span class="dd-link">
                APWH Time Periods
                <img
                  :src="require('@/assets/writing_feature/chevron-down.svg')"
                  alt="Icon"
                />
              </span>
            </template>
            <b-dropdown-item @click="next('All_Periods')" class="drop-item"
              >All</b-dropdown-item
            >
            <b-dropdown-item
              @click="timePeriod(1, 'Regional Interactions')"
              class="drop-item"
            >
              Time Period: 1) Regional Interactions
            </b-dropdown-item>
            <b-dropdown-item
              @click="timePeriod(2, 'First Global Age')"
              class="drop-item"
            >
              Time Period: 2) First Global Age
            </b-dropdown-item>
            <b-dropdown-item
              @click="timePeriod(3, 'Revolutions & Industrialization')"
              class="drop-item"
            >
              Time Period: 3) Revolutions & Industrialization
            </b-dropdown-item>
            <b-dropdown-item
              @click="timePeriod(4, 'Modern Times')"
              class="drop-item"
            >
              Time Period: 4) Modern Times
            </b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item @click="next('Quiz')">
            <span class="nav-dropdown">Quiz Questions</span>
          </b-nav-item>

          <b-nav-item-dropdown right class="nav-dropdown me-3" no-caret>
            <template #button-content>
              <span class="dd-link">
                Essay Writing
                <img
                  :src="require('@/assets/writing_feature/chevron-down.svg')"
                  alt="Icon"
                />
              </span>
            </template>
            <b-dropdown-item @click="next('001')" class="drop-item"
              >LEQ Workshop</b-dropdown-item
            >
            <b-dropdown-item @click="next('001')" class="drop-item" disabled
              >DBQ Workshop</b-dropdown-item
            >
            <b-dropdown-item @click="next('001')" class="drop-item" disabled
              >SAQ Workshop</b-dropdown-item
            >
          </b-nav-item-dropdown>

          <!-- SEARCH -->
          <b-row class="mb-3 mb-xl-0 mt-2 mt-xl-0 position-relative">
            <b-nav-form class="me-sm-0 me-md-3 me-lg-4">
              <b-input-group
                class="search-bar border"
                @keydown.down.prevent="move(1)"
                @keydown.up.prevent="move(-1)"
                @keydown.enter.prevent="enterSelected"
              >
                <b-form-input
                  v-model="query"
                  placeholder="What do you need to study?"
                  class="border-0 search-input shadow-none"
                  @focus="open = true"
                  @blur="closeLater"
                  @input="open = true"
                />
                <b-button
                  type="button"
                  class="search-button border-0"
                  :pressed="false"
                  @mousedown.prevent
                  @click="enterSelected"
                >
                  <b-icon-search></b-icon-search>
                </b-button>
              </b-input-group>

              <!-- Suggestions dropdown -->
              <div
                v-show="open && filtered.length"
                class="typeahead shadow"
                @mousedown.prevent
              >
                <button
                  v-for="(item, i) in filtered"
                  :key="item.id + '-' + i"
                  type="button"
                  class="typeahead-item"
                  :class="{ active: i === highlighted }"
                  @click="select(item)"
                >
                  <span
                    class="badge me-2"
                    :class="badgeClass(item.collection)"
                    >{{ prettyType(item.collection) }}</span
                  >
                  <span class="truncate">{{ displayTitle(item) }}</span>
                </button>
              </div>
            </b-nav-form>
          </b-row>

          <b-nav-form>
            <b-button id="purples" class="border-0 navbar-purple"
              >Login</b-button
            >
            <b-button id="purples" class="border-0 navbar-purple ms-3"
              >Sign up</b-button
            >
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { onMounted } from "vue";
import {
  goToHome,
  goToPeriod,
  goToTopic,
  goToEvent,
  goToPerson,
  pushRoute
} from "@/router/navigation";
import router from "@/router/index";
import store from "@/store";
import storeTopic from "@/store/topic.js";
import { db } from "@/main";
import { useSearchBar } from "@/composables/useSearchBar";

export default {
  name: "NavBar",
  setup() {
    // --- nav actions ---
    const home = () => {
      store.dispatch("setTopicCategory", 0);
      // keep store update, then navigate via centralized helper
      goToHome();
    };

    const next = name => pushRoute(name);

    const timePeriod = (timePeriod, timePeriodTitle) => {
      store.dispatch("setTimePeriod", timePeriod);
      goToPeriod(timePeriodTitle, timePeriod);
    };

    // --- search state (moved to composable) ---
    const {
      query,
      open,
      highlighted,
      grabbingSearch,
      filtered,
      displayTitle
    } = useSearchBar();

    // Helpers for type badges
    const prettyType = c =>
      c === "topics"
        ? "Topic"
        : c === "events"
        ? "Event"
        : c === "people"
        ? "Person"
        : c === "works"
        ? "Primary"
        : c === "terminology"
        ? "Term"
        : c;

    const badgeClass = c =>
      c === "topics"
        ? "bg-secondary"
        : c === "events"
        ? "bg-info"
        : c === "people"
        ? "bg-dark"
        : c === "works"
        ? "bg-primary"
        : c === "terminology"
        ? "bg-success"
        : "bg-light";

    // `filtered` and `displayTitle` now come from the composable

    const closeLater = () => {
      // let click handlers on dropdown fire before closing
      setTimeout(() => (open.value = false), 120);
    };

    const move = dir => {
      if (!filtered.value.length) return;
      const n = filtered.value.length;
      highlighted.value = (highlighted.value + dir + n) % n;
    };

    const enterSelected = () => {
      console.log("enter pressed");
      if (filtered.value.length === 0) return;
      const item = filtered.value[highlighted.value] || filtered.value[0];
      select(item);
    };

    const select = async item => {
      console.log("in select", item);
      query.value = "";
      open.value = false;
      highlighted.value = 0;

      // Helper to fetch topic if needed. Accepts id string or an array.
      const getTopic = async idOrArray => {
        const id = Array.isArray(idOrArray) ? idOrArray[0] : idOrArray;
        if (!id) return null;
        const doc = await db
          .collection("topics")
          .doc(id)
          .get();
        if (!doc.exists) return null;
        return { id: doc.id, ...doc.data() };
      };

      // Small helper to fetch a document from any collection by id.
      const fetchDoc = async (collection, id) => {
        if (!collection || !id) return null;
        try {
          const d = await db
            .collection(collection)
            .doc(id)
            .get();
          if (!d.exists) return null;
          return { id: d.id, ...d.data() };
        } catch (err) {
          console.error(`fetchDoc failed for ${collection}/${id}:`, err);
          return null;
        }
      };

      // Consolidated handler: resolve topic, period, topicId/name, fetch doc,
      // update store and navigate. This reduces duplicated code across cases.
      const handleCollectionNavigation = async item => {
        const collection = item.collection;
        const buttonIndex = { events: 2, people: 3, works: 4, terminology: 5 }[
          collection
        ];
        const docCollectionMap = {
          events: "events",
          people: "people",
          works: "works",
          terminology: "terminology"
        };

        try {
          const topic = await getTopic(item.topicID ?? item.document?.topicID);
          const periodValue =
            topic?.timePeriod || item.document?.timePeriod || 1;
          const period =
            Number.isFinite(+periodValue) && +periodValue > 0
              ? +periodValue
              : 1;
          const topicId =
            topic?.id ||
            (Array.isArray(item.topicID) ? item.topicID[0] : item.topicID) ||
            item.document?.topicID ||
            item.document?.id;
          const topicName =
            topic?.title ||
            item.document?.topicName ||
            item.document?.title ||
            "";

          store.dispatch("setTimePeriod", period);
          if (buttonIndex) store.dispatch("setTopicButton", buttonIndex);

          if (topic) await storeTopic.dispatch("setTopicContent", topic);

          const docId = item.id || item.document?.id;
          const doc =
            item.document && item.document.id === docId
              ? item.document
              : await fetchDoc(docCollectionMap[collection], docId);

          // Navigation per collection
          if (collection === "events") {
            try {
              await goToEvent(
                {
                  1: "Regional Interactions",
                  2: "First Global Age",
                  3: "Revolutions & Industrialization",
                  4: "Modern Times"
                }[periodValue] || String(periodValue),
                period,
                topicName,
                topicId,
                "Events",
                docId,
                doc?.title || item.document?.title || item.title
              );
            } catch (err) {
              console.error("goToEvent failed:", err, { item });
              pushRoute("Event", {
                period,
                topic: topicId,
                category: "Events",
                event: docId
              });
            }
            return;
          }

          if (collection === "people") {
            try {
              await goToPerson(
                {
                  1: "Regional Interactions",
                  2: "First Global Age",
                  3: "Revolutions & Industrialization",
                  4: "Modern Times"
                }[periodValue] || String(periodValue),
                period,
                topicName,
                topicId,
                "People",
                docId,
                doc?.title || item.document?.title || item.title
              );
            } catch (err) {
              console.error("goToPerson failed:", err, { item });
              pushRoute("Person", {
                period,
                topic: topicId,
                category: "People",
                person: docId
              });
            }
            return;
          }

          if (collection === "works") {
            try {
              await goToTopic(
                {
                  1: "Regional Interactions",
                  2: "First Global Age",
                  3: "Revolutions & Industrialization",
                  4: "Modern Times"
                }[periodValue] || String(periodValue),
                period,
                topic?.title || item.document?.topicName || "",
                topicId,
                "Sources",
                doc?.title || item.document?.title || item.title
              );
              // ensure URL includes scrollTo so the Topic page can scroll to the work
              try {
                const current = router.currentRoute.value;
                await router.replace({
                  name: "Topic",
                  params: current.params,
                  query: { scrollTo: docId }
                });
              } catch (e) {
                /* ignore */
              }
            } catch (err) {
              console.error("goToTopic (works) failed:", err, { item });
              pushRoute("Topic", {
                period,
                topic: topicId,
                category: "Sources"
              });
            }
            return;
          }

          if (collection === "terminology") {
            try {
              await goToTopic(
                {
                  1: "Regional Interactions",
                  2: "First Global Age",
                  3: "Revolutions & Industrialization",
                  4: "Modern Times"
                }[periodValue] || String(periodValue),
                period,
                topic?.title || item.document?.topicName || "",
                topicId,
                "Terms",
                doc?.title || item.document?.title || item.title
              );
              // ensure URL includes scrollTo so the Topic page can scroll to the term
              try {
                const current = router.currentRoute.value;
                await router.replace({
                  name: "Topic",
                  params: current.params,
                  query: { scrollTo: docId }
                });
              } catch (e) {
                /* ignore */
              }
            } catch (err) {
              console.error("goToTopic (terminology) failed:", err, { item });
              pushRoute("Topic", { period, topic: topicId, category: "Terms" });
            }
            return;
          }
        } catch (err) {
          console.error("Search navigation (collection) failed:", err, {
            item
          });
        }
      };

      // Route by collection type
      switch (item.collection) {
        case "topics": {
          // Ensure the function containing this switch is declared: async function ... () { ... }

          // SAFER period parsing (handles "0", undefined, null, strings)
          const periodRaw = item.timePeriod ?? item.document?.timePeriod ?? 1;
          const period =
            Number.isFinite(+periodRaw) && +periodRaw > 0 ? +periodRaw : 1;
          const topicID = item.document?.id;
          const topicName = item.title;

          const periodTitles = {
            1: "Regional Interactions",
            2: "First Global Age",
            3: "Revolutions & Industrialization",
            4: "Modern Times"
          };
          const timePeriodTitle = periodTitles[period] ?? "Period";

          // Update store first (if your Period page reads it on enter)
          await store.dispatch("setTimePeriod", period);

          // 1) Navigate to Period and await it
          try {
            await goToPeriod(timePeriodTitle, period);
          } catch (err) {
            if (!err || err.name !== "NavigationDuplicated") throw err;
          }

          // 2) Ensure we have a fresh topic doc and update topic content in store
          const topicDoc =
            (item.document && item.document.id === topicID) || item.document
              ? item.document
              : await getTopic(topicID);
          if (topicDoc) await storeTopic.dispatch("setTopicContent", topicDoc);

          // 3) Then navigate to Topic
          try {
            await goToTopic(
              timePeriodTitle,
              period,
              topicName,
              topicID,
              "Introduction"
            );
          } catch (err) {
            if (!err || err.name !== "NavigationDuplicated") throw err;
          }

          break;
        }

        case "events": {
          await handleCollectionNavigation(item);
          break;
        }

        case "people": {
          await handleCollectionNavigation(item);
          break;
        }

        case "works": {
          await handleCollectionNavigation(item);
          break;
        }

        case "terminology": {
          await handleCollectionNavigation(item);
          break;
        }

        default:
          // optional: handle unknown collection gracefully
          console.warn("Unhandled search type:", item.collection);
      }
    };

    onMounted(() => {
      grabbingSearch();
    });

    return {
      // nav
      home,
      timePeriod,
      next,
      // search
      query,
      open,
      filtered,
      highlighted,
      move,
      enterSelected,
      select,
      prettyType,
      badgeClass,
      displayTitle,
      closeLater
    };
  }
};
</script>

<style scoped lang="sass" src="@/assets/css/essayWriting.sass"></style>
<style scoped lang="sass" src="@/assets/css/navbar.sass"></style>
