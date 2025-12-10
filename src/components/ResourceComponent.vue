<template>
  <div id="ResourceComp">
    <!-- VIDEOS HEADER -->
    <b-row class="pt-4">
      <b-col>
        <div class="resource_header">Videos:</div>
      </b-col>
      <b-col v-if="visibleVideos.length >= 2" class="text-right">
        <!-- button is clearer, but your div works too -->
        <div class="view_all" v-b-modal="'modal-1'">
          View all ({{ visibleVideos.length }})<b-icon-chevron-right
            aria-hidden="true"
          />
        </div>
      </b-col>
    </b-row>

    <!-- TOP 3 (unchanged) -->
    <b-col
      v-for="(v, i) in visibleVideos.slice(0, 2)"
      :key="v._key"
      class="pt-1"
    >
      <div class="video-box">
        <div class="ratio">
          <div :id="playerId(i)"></div>
        </div>
      </div>
    </b-col>

    <!-- REAL BOOTSTRAPVUE MODAL -->
    <b-modal
      id="modal-1"
      size="xl"
      title="All videos"
      hide-footer
      @shown="onModalShown"
    >
      <b-row>
        <b-col
          v-for="(v, i) in visibleVideos"
          :key="'modal-' + v._key"
          lg="6"
          md="6"
          sm="12"
          class="p-3"
        >
          <div class="video-box in-modal">
            <div class="ratio">
              <div :id="playerIdModal(i)"></div>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-modal>

    <!-- ARTICLES -->
    <b-row v-if="articles.length" class="pt-4">
      <b-col>
        <div class="resource_header">Articles:</div>
      </b-col>
    </b-row>
    <b-row v-for="(article, index) in articles" :key="'art-' + index">
      <b-col>
        <articlecomp :article="article"></articlecomp>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import articlecomp from "./ArticleComponent.vue";

let ytScriptLoading = null;

function loadYouTubeIframeAPIOnce() {
  if (window.YT && window.YT.Player) return Promise.resolve();
  if (!ytScriptLoading) {
    ytScriptLoading = new Promise(resolve => {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
      window.onYouTubeIframeAPIReady = () => resolve();
    });
  }
  return ytScriptLoading;
}

function getYouTubeId(maybeUrlOrId) {
  if (/^[A-Za-z0-9_-]{11}$/.test(maybeUrlOrId)) return maybeUrlOrId;
  const re = /(?:youtu\.be\/|youtube\.com\/(?:watch\?.*v=|embed\/|v\/))([A-Za-z0-9_-]{11})/;
  const m = String(maybeUrlOrId).match(re);
  return m ? m[1] : null;
}

async function isYouTubeEmbeddable(videoId) {
  if (!videoId) return false;
  const url = `https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(
    `https://www.youtube.com/watch?v=${videoId}`
  )}`;
  try {
    const resp = await fetch(url, { method: "GET" });
    return resp.ok;
  } catch {
    return false;
  }
}

export default {
  name: "ResourceComponent",
  components: { articlecomp },
  props: {
    type: String,
    resourcetype: { type: Array, default: () => [] }
  },
  data() {
    return {
      processedVideos: [],
      playersTop: [],
      playersModal: [],
      modalBuilt: false
    };
  },
  computed: {
    rawVideos() {
      return this.resourcetype.filter(
        video =>
          video.resourceType === "video" && video.parentType === this.type
      );
    },
    visibleVideos() {
      return this.processedVideos.filter(v => !v._hidden);
    },
    articles() {
      return this.resourcetype.filter(
        a => a.resourceType === "article" && a.parentType === this.type
      );
    }
  },
  methods: {
    playerId(i) {
      return `yt-player-top-${i}`;
    },
    playerIdModal(i) {
      return `yt-player-modal-${i}`;
    },
    async prepareVideos() {
      const listRaw = this.rawVideos.map((v, idx) => {
        const id = getYouTubeId(v.url);
        return {
          ...v,
          _id: id,
          _hidden: !id,
          _key: (v.id || v._id || `${idx}`) + "-" + idx
        };
      });

      // Deduplicate by _id (keep first occurrence)
      const seen = new Set();
      const list = listRaw.filter(v => {
        if (!v._id || seen.has(v._id)) return false;
        seen.add(v._id);
        return true;
      });

      // oEmbed pre-checks
      await Promise.all(
        list.map(async v => {
          if (v._hidden) return;
          const ok = await isYouTubeEmbeddable(v._id);
          if (!ok) v._hidden = true;
        })
      );

      this.processedVideos = list;
    },
    buildTopPlayers() {
      this.playersTop.forEach(p => p?.destroy?.());
      this.playersTop = [];

      this.visibleVideos.slice(0, 3).forEach((item, i) => {
        const player = new window.YT.Player(this.playerId(i), {
          videoId: item._id,
          playerVars: {
            rel: 0,
            modestbranding: 1,
            origin: window.location.origin
          },
          events: {
            onReady: event => {
              const iframe = event.target.getIframe();
              iframe.id = `yt-iframe-top-${i}`;
              iframe.classList.add("yt-embedded");
              iframe.style.width = "100%";
              iframe.style.height = "100%"; // <-- not "auto"
              iframe.style.border = "0";
            },

            onError: () => {
              item._hidden = true;
              this.$forceUpdate();
            }
          }
        });
        this.playersTop.push(player);
      });
    },
    buildModalPlayers() {
      this.playersModal.forEach(p => p?.destroy?.());
      this.playersModal = [];

      this.visibleVideos.forEach((item, i) => {
        const player = new window.YT.Player(this.playerIdModal(i), {
          videoId: item._id,
          playerVars: {
            rel: 0,
            modestbranding: 1,
            origin: window.location.origin
          },
          events: {
            onReady: event => {
              const iframe = event.target.getIframe();
              iframe.id = `yt-iframe-modal-${i}`;
              iframe.classList.add("yt-embedded");
              iframe.style.width = "100%";
              iframe.style.height = "100%"; // <-- not "auto"
              iframe.style.border = "0";
            },
            onError: () => {
              item._hidden = true;
              this.$forceUpdate();
            }
          }
        });
        this.playersModal.push(player);
      });
    },
    onModalShown() {
      if (!this.modalBuilt) {
        this.modalBuilt = true;
        this.$nextTick(() => this.buildModalPlayers());
      }
    }
  },
  async mounted() {
    await this.prepareVideos();
    await loadYouTubeIframeAPIOnce();
    this.$nextTick(() => {
      this.buildTopPlayers();
    });
  },
  watch: {
    resourcetype: {
      deep: true,
      async handler() {
        await this.prepareVideos();
        if (window.YT && window.YT.Player) {
          this.$nextTick(() => {
            this.buildTopPlayers();
            if (this.modalBuilt) this.buildModalPlayers();
          });
        }
      }
    }
  },
  beforeDestroy() {
    this.playersTop.forEach(p => p?.destroy?.());
    this.playersModal.forEach(p => p?.destroy?.());
  }
};
</script>

<style lang="sass" scoped src="@/assets/css/resources.sass"></style>
<style lang="sass" scoped src="@/assets/css/loading.sass"></style>
