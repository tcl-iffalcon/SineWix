const axios = require('axios');

const API_BASE = 'https://ydfvfdizipanel.ru/public/api';
const API_KEY = '9iQNC5HQwPlaFuJDkhncJ5XTJ8feGXOJatAA';

const client = axios.create({
  baseURL: API_BASE,
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Tüm filmleri getir
async function getMovies({ page = 1, genre, year, sort = 'latest' } = {}) {
  const params = { page, type: 'movie' };
  if (genre) params.genre = genre;
  if (year) params.year = year;
  if (sort) params.sort = sort;

  const res = await client.get('/movies', { params });
  return res.data;
}

// Tüm dizileri getir
async function getSeries({ page = 1, genre, year, sort = 'latest' } = {}) {
  const params = { page, type: 'series' };
  if (genre) params.genre = genre;
  if (year) params.year = year;
  if (sort) params.sort = sort;

  const res = await client.get('/series', { params });
  return res.data;
}

// Tek içerik detayı (film veya dizi)
async function getDetail(id, type) {
  const endpoint = type === 'movie' ? `/movies/${id}` : `/series/${id}`;
  const res = await client.get(endpoint);
  return res.data;
}

// Stream linkleri
async function getStreams(id, type) {
  const endpoint = type === 'movie' ? `/movies/${id}/streams` : `/series/${id}/streams`;
  const res = await client.get(endpoint);
  return res.data;
}

// Dizi bölüm stream'i
async function getEpisodeStreams(seriesId, season, episode) {
  const res = await client.get(`/series/${seriesId}/season/${season}/episode/${episode}/streams`);
  return res.data;
}

// Arama
async function search(query, type) {
  const params = { query };
  if (type) params.type = type;
  const res = await client.get('/search', { params });
  return res.data;
}

module.exports = {
  getMovies,
  getSeries,
  getDetail,
  getStreams,
  getEpisodeStreams,
  search,
};
