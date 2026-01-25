/**
 * YouTube Embed Error Detection (framework-agnostic, plain JS)
 *
 * Exposes two helpers:
 * - extractVideoId(input: string): string | null
 * - checkYouTubeEmbed(input: string, options?): Promise<
 *     'playable' |
 *     'deleted_or_private' |
 *     'embedding_disabled_or_restricted' |
 *     'invalid_video_id' |
 *     'unknown_error'
 *   >
 *
 * Usage:
 *   import { extractVideoId, checkYouTubeEmbed } from '@/services/youtubeEmbedCheck';
 *   const id = extractVideoId(urlOrId);
 *   const status = await checkYouTubeEmbed(id);
 */

/**
 * Best-effort extraction of a YouTube video ID from common URL formats, or returns the input if it looks like an ID.
 */
export function extractVideoId(input) {
  if (!input || typeof input !== 'string') return null;

  const trimmed = input.trim();

  // Already looks like a raw video ID
  if (/^[A-Za-z0-9_-]{11}$/.test(trimmed)) return trimmed;

  try {
    const url = new URL(trimmed);

    // youtu.be/<id>
    if (url.hostname === 'youtu.be') {
      const id = url.pathname.split('/').filter(Boolean)[0];
      return /^[A-Za-z0-9_-]{11}$/.test(id) ? id : null;
    }

    // youtube.com/watch?v=<id>
    if (url.searchParams && url.searchParams.get('v')) {
      const id = url.searchParams.get('v');
      return /^[A-Za-z0-9_-]{11}$/.test(id) ? id : null;
    }

    // youtube.com/embed/<id>, /shorts/<id>, /v/<id>
    const pathParts = url.pathname.split('/').filter(Boolean);
    const candidates = ['embed', 'shorts', 'v'];
    if (pathParts.length >= 2 && candidates.includes(pathParts[0])) {
      const id = pathParts[1];
      return /^[A-Za-z0-9_-]{11}$/.test(id) ? id : null;
    }
  } catch (e) {
    // Not a URL, fall through
    void e; // noop to satisfy eslint no-empty
  }

  return null;
}

function isValidVideoId(id) {
  return typeof id === 'string' && /^[A-Za-z0-9_-]{11}$/.test(id);
}

// Singleton promise to avoid loading the API multiple times
let ytApiPromise = null;

function loadYouTubeIframeAPI() {
  // Already loaded
  if (window.YT && window.YT.Player) {
    return Promise.resolve(window.YT);
  }

  if (ytApiPromise) return ytApiPromise;

  ytApiPromise = new Promise((resolve, reject) => {
    const scriptId = 'youtube-iframe-api';
    if (!document.getElementById(scriptId)) {
      const tag = document.createElement('script');
      tag.id = scriptId;
      tag.src = 'https://www.youtube.com/iframe_api';
      tag.async = true;
      const firstScriptTag = document.getElementsByTagName('script')[0];
      (firstScriptTag && firstScriptTag.parentNode
        ? firstScriptTag.parentNode
        : document.head || document.body
      ).insertBefore(tag, firstScriptTag || null);
    }

    const prevReady = window.onYouTubeIframeAPIReady;
    let settled = false;
    window.onYouTubeIframeAPIReady = function () {
      settled = true;
      if (typeof prevReady === 'function') {
        try { prevReady(); } catch (err) { void err; }
      }
      resolve(window.YT);
    };

    // Fallback timeout
    setTimeout(() => {
      if (!settled) {
        if (window.YT && window.YT.Player) {
          resolve(window.YT);
        } else {
          reject(new Error('YouTube IFrame API load timeout'));
        }
      }
    }, 8000);
  });

  return ytApiPromise;
}

function createHiddenContainer() {
  const id = `yt-embed-check-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const el = document.createElement('div');
  el.id = id;
  el.style.position = 'absolute';
  el.style.width = '0';
  el.style.height = '0';
  el.style.overflow = 'hidden';
  el.style.left = '-9999px';
  el.style.top = '-9999px';
  document.body.appendChild(el);
  return { id, el };
}

function cleanupPlayer(player, container) {
  try {
    if (player && typeof player.destroy === 'function') player.destroy();
  } catch (err) { void err; }
  try {
    if (container && container.parentNode) container.parentNode.removeChild(container);
  } catch (err) { void err; }
}

/**
 * Check if a YouTube video is embeddable/playable by creating a hidden player and inspecting events.
 * Returns one of:
 *   'playable' |
 *   'deleted_or_private' |
 *   'embedding_disabled_or_restricted' |
 *   'invalid_video_id' |
 *   'unknown_error'
 */
export async function checkYouTubeEmbed(input, options = {}) {
  const timeoutMs = typeof options.timeoutMs === 'number' ? options.timeoutMs : 6000;

  const videoId = extractVideoId(input) || input; // allow raw IDs

  // Fast pre-check: validate ID format
  if (!isValidVideoId(videoId)) {
    return 'invalid_video_id';
  }

  let yt;
  try {
    yt = await loadYouTubeIframeAPI();
  } catch (_) {
    // If API fails to load, we cannot classify reliably
    return 'unknown_error';
  }

  const { id, el } = createHiddenContainer();

  return new Promise((resolve) => {
    let resolved = false;
    let playerInstance = null;

    const finish = (result) => {
      if (resolved) return;
      resolved = true;
      cleanupPlayer(playerInstance, el);
      resolve(result);
    };

    try {
      playerInstance = new yt.Player(id, {
        videoId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          enablejsapi: 1,
          origin: window.location.origin,
          playsinline: 1
        },
        events: {
          onReady: () => {
            // Per requirements: treat as playable if player loads.
            // To catch age/embedding restrictions (101/150), attempt a quick muted play
            // and allow a short window for onError to fire, else confirm playable.
            try { playerInstance.mute(); } catch (err) { void err; }
            try { playerInstance.playVideo(); } catch (err) { void err; }

            setTimeout(() => {
              if (!resolved) finish('playable');
            }, 1200);
          },
          onError: (event) => {
            const code = event && typeof event.data === 'number' ? event.data : null;
            if (code === 100) {
              finish('deleted_or_private');
            } else if (code === 101 || code === 150) {
              finish('embedding_disabled_or_restricted');
            } else {
              finish('unknown_error');
            }
          }
        }
      });
    } catch (_) {
      finish('unknown_error');
      return;
    }

    // Safety timeout
    setTimeout(() => {
      if (!resolved) finish('unknown_error');
    }, timeoutMs);
  });
}
