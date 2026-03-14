const { getDetail } = require('./api');

function toFullMeta(item, type) {
  const meta = {
    id: `sinewix:${item.id}`,
    type,
    name: item.title || item.name || 'Bilinmiyor',
    poster: item.poster || item.image || null,
    background: item.backdrop || item.background || null,
    description: item.overview || item.description || '',
    genres: item.genres || [],
    year: item.year || item.release_year || null,
    imdbRating: item.imdb_rating || item.rating || null,
    runtime: item.runtime ? `${item.runtime} dk` : null,
    country: item.country || null,
    language: item.language || null,
    director: item.director ? [item.director] : [],
    cast: item.cast || item.actors || [],
  };

  // Dizi ise bölümleri ekle
  if (type === 'series' && item.seasons) {
    const videos = [];
    for (const season of item.seasons) {
      for (const ep of season.episodes || []) {
        videos.push({
          id: `sinewix:${item.id}:${season.number}:${ep.number}`,
          title: ep.title || `Bölüm ${ep.number}`,
          season: season.number,
          episode: ep.number,
          thumbnail: ep.thumbnail || null,
          overview: ep.overview || '',
          released: ep.air_date ? new Date(ep.air_date) : null,
        });
      }
    }
    meta.videos = videos;
  }

  return meta;
}

async function metaHandler({ type, id }) {
  // id formatı: sinewix:12345
  const sinewixId = id.replace('sinewix:', '');

  try {
    const raw = await getDetail(sinewixId, type);
    const item = raw?.data || raw;
    return { meta: toFullMeta(item, type) };
  } catch (err) {
    console.error('[meta] Hata:', err.message);
    return { meta: null };
  }
}

module.exports = { metaHandler };
