const { getSeries, getSerieDetail } = require('./api');

// EasyPlex video objesi → Stremio stream
function toStremioStream(video) {
  if (!video.link || !video.status) return null;

  const title = [
    video.lang ? `🌐 ${video.lang}` : null,
    video.server || null,
    video.hls ? 'HLS' : null,
  ].filter(Boolean).join(' · ') || 'İzle';

  return {
    url: video.link,
    title,
    behaviorHints: {
      notWebReady: video.supported_hosts === 1,
    },
  };
}

async function streamHandler({ type, id }) {
  // Film:  sinewix:movie:123
  // Dizi:  sinewix:series:123:2:5
  const parts = id.split(':');
  // parts: ['sinewix', 'movie'|'series', id, season?, episode?]
  const sinewixId = parts[2];
  const season = parseInt(parts[3] || '1');
  const episode = parseInt(parts[4] || '1');

  try {
    if (type === 'series') {
      const item = await getSerieDetail(sinewixId);
      if (!item) return { streams: [] };

      const seasonObj = (item.seasons || []).find(s => s.season_number === season);
      if (!seasonObj) return { streams: [] };

      const epObj = (seasonObj.episodes || []).find(e => e.episode_number === episode);
      if (!epObj) return { streams: [] };

      const streams = (epObj.videos || [])
        .map(toStremioStream)
        .filter(Boolean);

      return { streams };
    } else {
      // Film stream'i — ileride film detay endpoint'i bulununca eklenecek
      return { streams: [] };
    }
  } catch (err) {
    console.error('[stream] Hata:', err.message);
    return { streams: [] };
  }
}

module.exports = { streamHandler };
