const { getMovies, getSeries, search } = require('./api');

// Sinewix item → Stremio meta (katalog kartı)
function toMetaPreview(item, type) {
  return {
    id: `sinewix:${item.id}`,
    type,
    name: item.title || item.name || 'Bilinmiyor',
    poster: item.poster || item.image || null,
    background: item.backdrop || item.background || null,
    description: item.overview || item.description || '',
    genres: item.genres || [],
    year: item.year || item.release_year || null,
    imdbRating: item.imdb_rating || item.rating || null,
  };
}

async function catalogHandler({ type, id, extra }) {
  const { genre, sort, skip } = extra || {};
  const page = skip ? Math.floor(parseInt(skip) / 20) + 1 : 1;

  try {
    let raw;

    if (type === 'movie') {
      raw = await getMovies({ page, genre, sort });
    } else {
      raw = await getSeries({ page, genre, sort });
    }

    // API'den gelen liste (data veya results veya dizi direkt)
    const items = raw?.data || raw?.results || raw || [];

    const metas = Array.isArray(items)
      ? items.map(item => toMetaPreview(item, type))
      : [];

    return { metas };
  } catch (err) {
    console.error('[catalog] Hata:', err.message);
    return { metas: [] };
  }
}

module.exports = { catalogHandler, toMetaPreview };
