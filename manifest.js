const { addonBuilder } = require('stremio-addon-sdk');

const GENRES = [
  'Aksiyon', 'Macera', 'Animasyon', 'Komedi', 'Suç',
  'Belgesel', 'Drama', 'Fantastik', 'Korku', 'Müzik',
  'Gizem', 'Romantik', 'Bilim Kurgu', 'Gerilim', 'Savaş',
];

const SORT_OPTIONS = [
  { value: 'latest',  label: 'En Yeni' },
  { value: 'popular', label: 'En Popüler' },
  { value: 'rating',  label: 'En Yüksek Puan' },
  { value: 'oldest',  label: 'En Eski' },
];

const YEAR_OPTIONS = [];
const currentYear = new Date().getFullYear();
for (let y = currentYear; y >= 1980; y--) {
  YEAR_OPTIONS.push({ value: String(y), label: String(y) });
}

const manifest = {
  id: 'com.sinewix.nuvio',
  version: '1.0.0',
  name: 'Sinewix',
  description: 'Sinewix üzerinden film ve dizi içerikleri. Tür, yıl ve sıralama filtreleri desteklenir.',
  logo: 'https://sinewix.com/favicon.ico',
  resources: ['catalog', 'meta', 'stream'],
  types: ['movie', 'series'],
  idPrefixes: ['sinewix:'],
  catalogs: [
    {
      type: 'movie',
      id: 'sinewix-movies',
      name: 'Sinewix Filmler',
      extra: [
        {
          name: 'genre',
          options: GENRES,
          isRequired: false,
        },
        {
          name: 'sort',
          options: SORT_OPTIONS.map(s => s.value),
          isRequired: false,
        },
        {
          name: 'skip',
          isRequired: false,
        },
      ],
      extraSupported: ['genre', 'sort', 'skip'],
    },
    {
      type: 'series',
      id: 'sinewix-series',
      name: 'Sinewix Diziler',
      extra: [
        {
          name: 'genre',
          options: GENRES,
          isRequired: false,
        },
        {
          name: 'sort',
          options: SORT_OPTIONS.map(s => s.value),
          isRequired: false,
        },
        {
          name: 'skip',
          isRequired: false,
        },
      ],
      extraSupported: ['genre', 'sort', 'skip'],
    },
  ],
};

module.exports = { manifest, GENRES, SORT_OPTIONS };
