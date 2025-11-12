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
                <img :src="require('@/assets/writing_feature/chevron-down.svg')" alt="Icon" />
              </span>
            </template>
            <b-dropdown-item @click="next('Units')" class="drop-item">All</b-dropdown-item>
            <b-dropdown-item @click="timePeriod(1, 'Regional Interactions')" class="drop-item">
              Time Period: 1) Regional Interactions
            </b-dropdown-item>
            <b-dropdown-item @click="timePeriod(2, 'First Global Age')" class="drop-item">
              Time Period: 2) First Global Age
            </b-dropdown-item>
            <b-dropdown-item @click="timePeriod(3, 'Revolutions & Industrialization')" class="drop-item">
              Time Period: 3) Revolutions & Industrialization
            </b-dropdown-item>
            <b-dropdown-item @click="timePeriod(4, 'Modern Times')" class="drop-item">
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
                <img :src="require('@/assets/writing_feature/chevron-down.svg')" alt="Icon" />
              </span>
            </template>
            <b-dropdown-item @click="next('001')" class="drop-item">LEQ Workshop</b-dropdown-item>
            <b-dropdown-item @click="next('001')" class="drop-item" disabled>DBQ Workshop</b-dropdown-item>
            <b-dropdown-item @click="next('001')" class="drop-item" disabled>SAQ Workshop</b-dropdown-item>
          </b-nav-item-dropdown>

          <!-- SEARCH -->
          <b-row class="mb-3 mb-xl-0 mt-2 mt-xl-0 position-relative">
            <b-nav-form class="me-sm-0 me-md-3 me-lg-4">
              <b-input-group class="search-bar border" @keydown.down.prevent="move(1)" @keydown.up.prevent="move(-1)"
                @keydown.enter.prevent="enterSelected">
                <b-form-input v-model="query" placeholder="What do you need to study?"
                  class="border-0 search-input shadow-none" @focus="open = true" @blur="closeLater"
                  @input="open = true" />
                <b-button type="button" class="search-button border-0" :pressed="false" @mousedown.prevent
                  @click="enterSelected">
                  <b-icon-search></b-icon-search>
                </b-button>
              </b-input-group>

              <!-- Suggestions dropdown -->
              <div v-show="open && filtered.length" class="typeahead shadow" @mousedown.prevent>
                <button v-for="(item, i) in filtered" :key="item.id + '-' + i" type="button" class="typeahead-item"
                  :class="{ active: i === highlighted }" @click="select(item)">
                  <span class="badge me-2" :class="badgeClass(item.collection)">{{ prettyType(item.collection) }}</span>
                  <span class="truncate">{{ item.title }}</span>
                </button>
              </div>
            </b-nav-form>
          </b-row>

          <b-nav-form>
            <b-button id="purples" class="border-0 navbar-purple">Login</b-button>
            <b-button id="purples" class="border-0 navbar-purple ms-3">Sign up</b-button>
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import store from "@/store";
import storeTopic from "@/store/topic.js";
import { db } from "@/main"; // <- adjust if your Firebase export lives elsewhere

export default {
  name: "NavBar",
  setup() {
    const router = useRouter();

    // --- nav actions ---
    const home = () => {
      store.dispatch("setTopicCategory", 0);
      router.push("/");
    };

    const next = (name) => router.push({ name });

    const timePeriod = (timePeriod, timePeriodTitle) => {
      store.dispatch("setTimePeriod", timePeriod);
      router.push({
        name: "Period",
        params: { periodName: timePeriodTitle, period: timePeriod },
      });
    };

    // --- search state ---
    const query = ref("");
    const open = ref(false);
    const highlighted = ref(0);
    const searchItems = ref([]); // unified shape: { id, title, collection, document, topicID?, timePeriod? }

    // load search items (keeps your original Firestore source)
    const grabbingSearch = async () => {
      const snap = await db.collection("searchBar").doc("bESicXCl5B8APjFo5TAI").get();
      const items = snap.data()?.searchItems || [];
      // normalize: ensure an id exists and keep consistent structure
      searchItems.value = items.map((it) => {
        const id = it.id || it.document?.id || it.topicID || it.title;
        return {
          id,
          title: it.title,
          collection: it.collection,
          document: it.document,
          topicID: it.topicID,
          timePeriod: it.timePeriod,
        };
      });
    };

    // Helpers for type badges
    const prettyType = (c) =>
      c === "topics" ? "Topic" :
        c === "events" ? "Event" :
          c === "people" ? "Person" :
            c === "works" ? "Primary" :
              c === "terminology" ? "Term" : c;

    const badgeClass = (c) =>
      c === "topics" ? "bg-secondary" :
        c === "events" ? "bg-info" :
          c === "people" ? "bg-dark" :
            c === "works" ? "bg-primary" :
              c === "terminology" ? "bg-success" : "bg-light";

    // filter items locally (title contains query)
    const filtered = computed(() => {
      const q = query.value.trim().toLowerCase();
      if (!q) return [];
      return searchItems.value
        .filter((i) => i.title?.toLowerCase().includes(q))
        .slice(0, 8);
    });

    const closeLater = () => {
      // let click handlers on dropdown fire before closing
      setTimeout(() => (open.value = false), 120);
    };

    const move = (dir) => {
      if (!filtered.value.length) return;
      const n = filtered.value.length;
      highlighted.value = (highlighted.value + dir + n) % n;
    };

    const enterSelected = () => {
      console.log("enter pressed")
      if (filtered.value.length === 0) return;
      const item = filtered.value[highlighted.value] || filtered.value[0];
      select(item);
    };

    // fetch helper
    // const grabbingTopicById = async (topicID) => {
    //   const doc = await db.collection("topics").doc(topicID).get();
    //   return { id: doc.id, ...doc.data() };
    // };

    // same routing logic as your old component
    // const select = async (val) => {
    //   query.value = "";
    //   open.value = false;
    //   highlighted.value = 0;

    //   switch (val.collection) {
    //     case "topics": {
    //       const period = val.timePeriod ?? (val.document?.timePeriod || 1) - 1;
    //       store.dispatch("setTimePeriod", period);
    //       store.dispatch("setTopicButton", 0);
    //       store.dispatch("setTopicCategory", 0);
    //       // if you keep a namespaced store for topic:
    //       // storeTopic.dispatch("topicContent", val.document);
    //       router.push({
    //         name: "Topic",
    //         params: { period, topic: val.document.id, category: 0 },
    //       });
    //       break;
    //     }
    //     case "events": {
    //       const topic = await grabbingTopicById(val.topicID);
    //       const timePeriod = (topic.timePeriod || 1) - 1;
    //       store.dispatch("setTimePeriod", timePeriod);
    //       store.dispatch("setTopicButton", 2);
    //       // storeTopic.dispatch("topicContent", topic);
    //       // storeTopic.dispatch("eventContent", val.document);
    //       router.push({
    //         name: "Event",
    //         params: {
    //           period: timePeriod,
    //           topic: topic.id,
    //           category: 2,
    //           event: val.document.id,
    //         },
    //       });
    //       break;
    //     }
    //     case "people": {
    //       const topic = await grabbingTopicById(val.topicID);
    //       const timePeriod = (topic.timePeriod || 1) - 1;
    //       store.dispatch("setTimePeriod", timePeriod);
    //       store.dispatch("setTopicButton", 3);
    //       // storeTopic.dispatch("topicContent", topic);
    //       // storeTopic.dispatch("personContent", val.document);
    //       router.push({
    //         name: "Person",
    //         params: {
    //           period: timePeriod,
    //           topic: topic.id,
    //           category: 3,
    //           person: val.document.id,
    //         },
    //       });
    //       break;
    //     }
    //     case "works": {
    //       // primary sources route under Topic w/ category 4 in your original
    //       const topic = await grabbingTopicById(val.topicID);
    //       const timePeriod = (topic.timePeriod || 1) - 1;
    //       store.dispatch("setTimePeriod", timePeriod);
    //       store.dispatch("setTopicButton", 4);
    //       // storeTopic.dispatch("topicContent", topic);
    //       router.push({
    //         name: "Topic",
    //         params: { period: timePeriod, topic: topic.id, category: 4 },
    //       });
    //       break;
    //     }
    //     case "terminology": {
    //       const topic = await grabbingTopicById(val.topicID);
    //       const timePeriod = (topic.timePeriod || 1) - 1;
    //       store.dispatch("setTimePeriod", timePeriod);
    //       store.dispatch("setTopicButton", 5);
    //       // storeTopic.dispatch("topicContent", topic);
    //       router.push({
    //         name: "Topic",
    //         params: { period: timePeriod, topic: topic.id, category: 5 },
    //       });
    //       break;
    //     }
    //     default:
    //       // no-op
    //       break;
    //   }
    // };

    const select = async (item) => {
      console.log("in select",item)
      query.value = "";
      open.value = false;
      highlighted.value = 0;

      // Helper to fetch topic if needed
      const getTopic = async (id) => {
        const doc = await db.collection("topics").doc(id).get();
        console.log("getTopic",doc, doc.data())
        return { id: doc.id, ...doc.data() };
      };
      

      // Route by collection type
      switch (item.collection) {
        case "topics": {
          // Ensure the function containing this switch is declared: async function ... () { ... }

          // SAFER period parsing (handles "0", undefined, null, strings)
          const periodRaw =
            item.timePeriod ?? item.document?.timePeriod ?? 1;
          const period = Number.isFinite(+periodRaw) && +periodRaw > 0 ? +periodRaw : 1;

          const topicID = item.document?.id;
          const topicName = item.title;

          const periodTitles = {
            1: "Regional Interactions",
            2: "First Global Age",
            3: "Revolutions & Industrialization",
            4: "Modern Times",
          };
          const timePeriodTitle = periodTitles[period] ?? "Period";

          // Update store first (if your Period page reads it on enter)
          await store.dispatch("setTimePeriod", period);

          console.log("case: topic periodName", timePeriodTitle);
          console.log("case: topic period #", period);
          console.log("case: topic title", topicName);
          console.log("case: topic id", topicID);

          // 1) Navigate to Period and await it
          try {
            await router.push({
              name: "Period",
              params: { periodName: timePeriodTitle, period },
            });
          } catch (err) {
            // ignore duplicate-navigation errors
            if (!err || err.name !== "NavigationDuplicated") throw err;
          }

          // 2) Update topic content after Period route is active
          await storeTopic.dispatch("setTopicContent", item);

          // 3) Then navigate to Topic
          try {
            await router.push({
              name: "Topic",
              params: { topicName, topic: topicID, category: "Introduction" },
            });
          } catch (err) {
            if (!err || err.name !== "NavigationDuplicated") throw err;
          }

          break;
        }


        case "events": {
          const topic = await getTopic(item.topicID);
          const period = (topic.timePeriod || 1) - 1;
          console.log("case: event topic", topic)
          console.log("case:: event period", period)
          console.log("case: event item", item.document?.id)

          store.dispatch("setTimePeriod", period);
          store.dispatch("setTopicButton", 2);

          router.push({
            name: "Event",
            params: {
              period,
              topic: topic.id,
              category: 2,
              event: item.document?.id,
            },
          });
          break;
        }

        case "people": {
          const topic = await getTopic(item.topicID);
          const period = (topic.timePeriod || 1) - 1;
          store.dispatch("setTimePeriod", period);
          store.dispatch("setTopicButton", 3);

          router.push({
            name: "Person",
            params: {
              period,
              topic: topic.id,
              category: 3,
              person: item.document?.id,
            },
          });
          break;
        }

        case "works": {
          const topic = await getTopic(item.topicID);
          const period = (topic.timePeriod || 1) - 1;
          store.dispatch("setTimePeriod", period);
          store.dispatch("setTopicButton", 4);

          router.push({
            name: "Topic",
            params: {
              period,
              topic: topic.id,
              category: 4,
            },
          });
          break;
        }

        case "terminology": {
          const topic = await getTopic(item.topicID);
          const period = (topic.timePeriod || 1) - 1;
          store.dispatch("setTimePeriod", period);
          store.dispatch("setTopicButton", 5);

          router.push({
            name: "Topic",
            params: {
              period,
              topic: topic.id,
              category: 5,
            },
          });
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
      closeLater,
    };
  },
};
</script>

<style scoped lang="sass" src="@/assets/css/essayWriting.sass"></style>
<style scoped>
/* Keep your existing styles */
.navbar-purple {
  border-radius: 8px;
  font-family: "Manrope", sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
}

#purples {
  background: var(--brand-purple, #8c30f5);
  padding: 10px 28px;
}

#purples:hover {
  background: #f1e4ff;
  color: var(--brand-purple, #8c30f5);
}

.navbar_tab_section {
  white-space: nowrap;
}

/* Search bar container */
.search-bar {
  height: 40px;
  width: 292px;
  border-radius: 8px;
  border: 1px solid #dfdfdf;
  background: #fff;
  position: relative;
}

.search-input {
  padding-right: 0;
}

.search-button {
  background: white;
  color: black;
}

.search-button:focus:not(:disabled):not(.disabled),
.search-button:focus,
.search-button:active,
.search-button:hover {
  box-shadow: none !important;
  outline: 0;
  background: white;
  color: black;
}

/* Typeahead dropdown */
.typeahead {
  position: absolute;
  top: 44px;
  /* just below the input group */
  left: 0;
  width: 292px;
  max-height: 320px;
  overflow-y: auto;
  background: #fff;
  border: 1px solid #dfdfdf;
  border-radius: 8px;
  z-index: 1050;
}

.typeahead-item {
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  padding: 10px 12px;
  background: transparent;
  border: none;
  text-align: left;
  font-size: 14px;
}

.typeahead-item:hover,
.typeahead-item.active {
  background: #f6f6f6;
}

.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Dropdown look & feel (kept) */
.nav-dropdown {
  color: var(--text-gray-900, #18191f);
  font-feature-settings: "clig" off, "liga" off;
  font-family: Manrope;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
  outline: 0;
  box-shadow: none !important;
  outline: none !important;
  text-decoration: none !important;
  border: none !important;
  opacity: 1;
  border-radius: 0px;
  margin-top: 2px;
}

.nav-dropdown :deep(.dropdown-menu) {
  background: #eee;
  border: none !important;
  border-radius: 0 !important;
  padding: 0;
  margin-top: 13px;
}

.nav-dropdown :deep(.dropdown-menu .dropdown-item) {
  border: none !important;
  border-radius: 0 !important;
  height: 65px;
  padding-top: 22px;
}

.nav-dropdown :deep(.dropdown-menu .dropdown-item:hover) {
  background: #8c30f5;
  color: white;
}

.dd-link {
  color: black;
  opacity: 1;
}
</style>
