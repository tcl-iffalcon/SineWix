const { getMovies, getSeries, getSerieDetail } = require('./api');

function toFullMeta(item, type) {
  const meta = {
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
    cast: (item.casterslist || []).map(c => c.name),
    trailerStreams: item.preview_path
      ? [{ title: 'Fragman', ytId: item.preview_path }]
      : [],
  };

  // Dizi → videos (bölümler)
  if (type === 'series' && item.seasons) {
    const videos = [];
    for (const season of item.seasons) {
      for (const ep of season.episodes || []) {
        if (!ep.enable_stream) continue;
        videos.push({
          id: `sinewix:series:${item.id}:${season.season_number}:${ep.episode_number}`,
          title: ep.name || `Bölüm ${ep.episode_number}`,
          season: season.season_number,
          episode: ep.episode_number,
          thumbnail: ep.still_path || null,
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
  // id formatı: sinewix:movie:123 veya sinewix:series:123
  const parts = id.split(':');
  const sinewixId = parts[2];

  try {
    if (type === 'series') {
      const item = await getSerieDetail(sinewixId);
      if (!item) return { meta: null };
      return { meta: toFullMeta(item, type) };
    } else {
      // Film için katalogdan bul (genre 28 = Aksiyon, ilk sayfada olmayabilir)
      // Şimdilik temel meta dön, ileride dedicated endpoint eklenebilir
      return { meta: null };
    }
  } catch (err) {
    console.error('[meta] Hata:', err.message);
    return { meta: null };
  }
}

module.exports = { metaHandler };
