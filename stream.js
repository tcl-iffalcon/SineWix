const { getStreams, getEpisodeStreams } = require('./api');

function toStremioStream(stream) {
  // Stream objesi API'ye göre uyarlanmalı
  // Olası alanlar: url, title, quality, lang
  return {
    url: stream.url || stream.link || stream.src,
    title: buildTitle(stream),
    behaviorHints: {
      notWebReady: false,
    },
  };
}

function buildTitle(stream) {
  const parts = [];
  if (stream.quality) parts.push(stream.quality);
  if (stream.lang || stream.language) parts.push(stream.lang || stream.language);
  if (stream.source || stream.server) parts.push(`[${stream.source || stream.server}]`);
  return parts.length ? parts.join(' · ') : 'İzle';
}

async function streamHandler({ type, id }) {
  // Film:  sinewix:12345
  // Dizi:  sinewix:12345:2:5  (id:sezon:bölüm)
  const parts = id.split(':');
  const sinewixId = parts[1];

  try {
    let raw;

    if (type === 'movie') {
      raw = await getStreams(sinewixId, 'movie');
    } else {
      // series → sinewix:ID:SEASON:EPISODE
      const season = parts[2] || '1';
      const episode = parts[3] || '1';
      raw = await getEpisodeStreams(sinewixId, season, episode);
    }

    const list = raw?.data || raw?.streams || raw || [];

    const streams = Array.isArray(list)
      ? list.map(toStremioStream).filter(s => s.url)
      : [];

    return { streams };
  } catch (err) {
    console.error('[stream] Hata:', err.message);
    return { streams: [] };
  }
}

module.exports = { streamHandler };
