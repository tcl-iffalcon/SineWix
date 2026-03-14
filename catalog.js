const { getMovies, getSeries } = require('./api');

// EasyPlex response → Stremio meta kartı
function toMetaPreview(item, type) {
  return {
    id: `sinewix:${type}:${item.id}`,
    type,
    name: item.title || item.name || item.original_name || 'Bilinmiyor',
    poster: item.poster_path || null,
    background: item.backdrop_path_tv || item.backdrop_path || null,
    description: item.overview || '',
    genres: item.genreslist || [],
    year: item.release_date
      ? parseInt(item.release_date.substring(0, 4))
      : item.first_air_date
        ? parseInt(item.first_air_date.substring(0, 4))
        : null,
    imdbRating: item.vote_average ? String(item.vote_average.toFixed(1)) : null,
  };
}

async function catalogHandler({ type, id, extra }) {
  const { genre, skip } = extra || {};
  const page = skip ? Math.floor(parseInt(skip) / 20) + 1 : 1;

  try {
    let raw;
    if (type === 'movie') {
      raw = await getMovies({ page, genre });
    } else {
      raw = await getSeries({ page, genre });
    }

    // EasyPlex: { data: [...], current_page, last_page } veya direkt dizi
    const items = raw?.data || raw?.results || (Array.isArray(raw) ? raw : []);

    const metas = items.map(item => toMetaPreview(item, type));
    return { metas };
  } catch (err) {
    console.error('[catalog] Hata:', err.message);
    return { metas: [] };
  }
}

module.exports = { catalogHandler, toMetaPreview };
