const axios = require('axios');

const API_BASE = 'https://ydfvfdizipanel.ru/public/api';
const API_KEY = '9iQNC5HQwPlaFuJDkhncJ5XTJ8feGXOJatAA';

// Genre ID'leri — EasyPlex TMDB genre ID'lerini kullanıyor
const GENRE_IDS = {
  'Aksiyon':       28,
  'Macera':        12,
  'Animasyon':     16,
  'Komedi':        35,
  'Suç':           80,
  'Belgesel':      99,
  'Drama':         18,
  'Fantastik':     14,
  'Korku':         27,
  'Müzik':         10402,
  'Gizem':         9648,
  'Romantik':      10749,
  'Bilim Kurgu':   878,
  'Gerilim':       53,
  'Savaş':         10752,
  // Dizi özel
  'Aksiyon & Macera':      10759,
  'Bilim Kurgu & Fantazi': 10765,
  'Çocuk':                 10762,
  'Haber':                 10763,
  'Gerçeklik':             10764,
  'Sabun':                 10766,
  'Talk':                  10767,
};

const HEADERS = {
  'Accept': 'application/json',
  'Accept-Encoding': 'gzip',
  'hash256': '711bff4afeb47f07ab08a0b07e85d3835e739295e8a6361db77eebd93d96306b',
  'User-Agent': 'EasyPlex (Android 14; SM-A546B; Samsung Galaxy A54 5G; tr)',
  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
};

const client = axios.create({
  baseURL: API_BASE,
  headers: HEADERS,
  timeout: 15000,
});

// Genre'ye göre film listesi
// Endpoint: /genres/mediaLibrary/show/{genre_id}/movie/{api_key}?page=1
async function getMovies({ page = 1, genre } = {}) {
  const genreId = genre ? (GENRE_IDS[genre] || 28) : 28; // default Aksiyon
  const res = await client.get(`/genres/mediaLibrary/show/${genreId}/movie/${API_KEY}`, {
    params: { page },
  });
  return res.data;
}

// Genre'ye göre dizi listesi
// Endpoint: /genres/mediaLibrary/show/{genre_id}/serie/{api_key}?page=1
async function getSeries({ page = 1, genre } = {}) {
  const genreId = genre ? (GENRE_IDS[genre] || 18) : 18; // default Drama
  const res = await client.get(`/genres/mediaLibrary/show/${genreId}/serie/${API_KEY}`, {
    params: { page },
  });
  return res.data;
}

// Tüm dizi bölümleri (detay + stream içeriyor)
// Endpoint: /media/seriesEpisodesAll/{api_key}?page=1
async function getSeriesAll({ page = 1 } = {}) {
  const res = await client.get(`/media/seriesEpisodesAll/${API_KEY}`, {
    params: { page },
  });
  return res.data;
}

// Tek içerik detayı — response'ta seasons > episodes > videos mevcut
async function getSerieDetail(id) {
  const res = await client.get(`/media/seriesEpisodesAll/${API_KEY}`, {
    params: { page: 1 },
  });
  // Tüm listeden ID'ye göre bul
  const list = res.data?.data || res.data || [];
  return Array.isArray(list) ? list.find(item => String(item.id) === String(id)) : null;
}

module.exports = {
  getMovies,
  getSeries,
  getSeriesAll,
  getSerieDetail,
  GENRE_IDS,
};
