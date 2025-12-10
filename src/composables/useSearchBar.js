import { ref, computed } from "vue";
import { db } from "@/main";

const PREFIX_REGEX = /^(Event|Events|Person|People|Term|Terms|Work|Works|Primary|Primary Source|Primary Sources|Primarly Source|Primarly Sources|Primarly):\s*/i;

export function useSearchBar() {
  const query = ref("");
  const open = ref(false);
  const highlighted = ref(0);
  const searchItems = ref([]);

  const grabbingSearch = async () => {
    const colSnap = await db.collection("searchBar").get();
    const all = [];
    colSnap.forEach(d => {
      const data = d.data() || {};
      const items = Array.isArray(data.searchItems) ? data.searchItems : [];
      items.forEach(it => all.push({ ...it, __sourceDoc: d.id }));
    });

    searchItems.value = all.map(it => {
      const rawTopic = it.topicID ?? it.document?.topicID;
      const topicArr = Array.isArray(rawTopic)
        ? rawTopic
        : rawTopic
        ? [rawTopic]
        : undefined;
      const id =
        it.id || it.document?.id || (topicArr && topicArr[0]) || it.title;
      const rawTitle = it.title || it.document?.title || "";
      const displayTitle = rawTitle.replace(PREFIX_REGEX, "");
      return {
        id,
        title: it.title,
        displayTitle,
        collection: (it.collection || "").toString(),
        document: it.document,
        topicID: topicArr,
        timePeriod: it.timePeriod
      };
    });
  };

  const filtered = computed(() => {
    const q = query.value.trim().toLowerCase();
    if (!q) return [];
    return searchItems.value
      .filter(i => (i.displayTitle || i.title || "").toLowerCase().includes(q))
      .slice(0, 8);
  });

  const displayTitle = item =>
    item.displayTitle ||
    (item.title || item.document?.title || "").replace(PREFIX_REGEX, "");

  return {
    query,
    open,
    highlighted,
    grabbingSearch,
    filtered,
    displayTitle,
    // export raw items for diagnostics if needed
    searchItems
  };
}
