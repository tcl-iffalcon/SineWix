// ============================================================
// SineWix — Nuvio Provider
// Stremio addon kodundan dönüştürüldü
// Base: https://ydfvfdizipanel.ru/public/api
// ============================================================

var API_BASE = "https://ydfvfdizipanel.ru/public/api";
var API_KEY = "9iQNC5HQwPlaFuJDkhncJ5XTJ8feGXOJatAA";

var HEADERS = {
  "Accept": "application/json",
  "Accept-Encoding": "gzip",
  "Cache-Control": "max-age=0",
  "Connection": "Keep-Alive",
  "hash256": "711bff4afeb47f07ab08a0b07e85d3835e739295e8a6361db77eebd93d96306b",
  "signature": "3082058830820370a00302010202145bbfbba9791db758ad12295636e094ab4b07dc24300d06092a864886f70d01010b05003074310b3009060355040613025553311330110603550408130a43616c69666f726e6961311630140603550407130d4d6f756e7461696e205669657731143012060355040a130b476f6f676c6520496e632e3110300e060355040b1307416e64726f69643110300e06035504031307416e64726f69643020170d3231313231353232303433335a180f32303531313231353232303433335a3074310b3009060355040613025553311330110603550408130a43616c69666f726e6961311630140603550407130d4d6f756e7461696e205669657731143012060355040a130b476f6f676c6520496e632e3110300e060355040b1307416e64726f69643110300e06035504031307416e64726f696430820222300d06092a864886f70d01010105000382020f003082020a0282020100a5106a24bb3f9c0aaf3a2b228f794b5eaf1757ba758b19736a39d1bdc73fc983a7237b8d5ca5156cfa999c1dab3418bbc2be0920e0ee001c8aa4812d1dae75d080f09e91e0abda83ff9a76e8384a4429f4849248069a59505b12ac2c14ba2e4d1a13afcdaf54e508697ff928a9f738e6f4a6fc27409c55329eb149b5ff89c5a2d7c06bf9e62086f955cad17d7be2623ee9d5ec56068eadc23cb0965a13ff97d49fe10ef41afc6eeca36b4ace9582097faff89f590bc831cdb3a69eec5d15b67c3f2cad49e37ed053733e3d2d400c47755b932bdbe15d749fd6ad1dce30ba5e66094dfb6ee6f64cafb807e11b19a990c5d078c6d6701cda0bdeb21e99404ff166074f4c89b04c418f4e7940db5c78647c475bcfb85d4c4e836ee7d7c1d53e9e736b5d96d4b4d8b98209064b729ac6a682d55a6a930e518d849898bb28329ca0aaa133b5e5270a9d5940cac6af4802a57fd971efda91abb602882dd6aa6ce2b236b57b52ee2481498f0cacbcc2c36c238bc84becad7eaaf1125b9a1ca9ded6c79f3f283a52050377809b2a9995d66e1636b0ed426fdd8685c47cb18e82077f4aefcc07887e1dc58b4d64be1632f0e7b4625da6f40c65a8512a6454a4b96963e7f876136e6c0069a519a79ad632078ed965aa12482458060c030ed50db706d854f88cb004630b49285d8af8b471ff8f6070687826412287b50049bcb7d1b6b62ef90203010001a310300e300c0603551d13040530030101ff300d06092a864886f70d01010b0500038202010051c0b7bd793181dc29ca777d3773f928a366c8469ecf2fa3cfb076e8831970d19bb2b96e44e8ccc647cf0696bb824ac61c23d958525d283cab26037b04d58aa79bf92192db843adf5c26a980f081d2f0e14f759fc5ff4c5bb3dce0860299bfe7b349a8155a2efaf731ba25ce796a80c1442c7bf80f8c1a7912ff0b6f6592264315337251a846460194fa594f81f38f9e5233a63201e931ad9cab5bf119f24025613f307194eaa6eb39a83f3c05a49ba34455b1aff7c6839bbb657d9392ffdf397432af6e56ba9534a8b07d7060fe09691c6cf07cb5324f67b3cc0871a8c621d81fe71d71085c55206a4f57e25f774fd4b979b299e8bb076b50fca42fa57da2d519fd35a4a7c0137babaed4345f8031b63b6a71f5e8268f709d658ccd7c2a58849379d25bfa598c3f4a2c3d9b7d89285fefeb7f0ec65137d38b08ce432a15688b624a179e6a4a505ebc3bcdfbc4d4330508ee2d8d0f016924dcec21a6838ef7d834c6f43bde4a5201ed0b3bb4e9bd377b470e36bcf5bc3d56169dbd8e39567aa7dce4d1a8a8a54a5e1aa6fb1a8aab0062669a966f96e15ccce6fe12ea5e6a8b8c8823bdc94988ca39759fd1cc8fd8ae5c3d74db50b174cf7d77655016c075c91d439ed01cc0a9f695c99fad3b5495fb6cb1e01a5fa020cc6022a85c07ec55f9eba89719f86e49d34ab5bd208c5f70cced2b7b7963c014f8404432979b506de29e",
  "User-Agent": "EasyPlex (Android 14; SM-A546B; Samsung Galaxy A54 5G; tr)"
};

// -------------------------------------------------------
// KATALOGLAR
// -------------------------------------------------------
var HOME_CATALOGS = [
  { id: "sinewix-latest-series",   type: "series", name: "SineWix — Son Diziler",           path: "/genres/latestseries/all/" + API_KEY,              source: "paged",    perPage: 12 },
  { id: "sinewix-latest-movies",   type: "movie",  name: "SineWix — Son Filmler",           path: "/genres/latestmovies/all/" + API_KEY,              source: "paged",    perPage: 12 },
  { id: "sinewix-latest-animes",   type: "series", name: "SineWix — Son Animeler",          path: "/genres/latestanimes/all/" + API_KEY,              source: "paged",    itemType: "anime", perPage: 12 },
  { id: "sinewix-crime-series",    type: "series", name: "SineWix — Suç Dizileri",          path: "/genres/mediaLibrary/show/80/serie/" + API_KEY,    source: "paged",    perPage: 12 },
  { id: "sinewix-crime-movies",    type: "movie",  name: "SineWix — Suç Filmleri",          path: "/genres/mediaLibrary/show/80/movie/" + API_KEY,    source: "paged",    perPage: 12 },
  { id: "sinewix-mystery-series",  type: "series", name: "SineWix — Gizem Dizileri",        path: "/genres/mediaLibrary/show/9648/serie/" + API_KEY,  source: "paged",    perPage: 12 },
  { id: "sinewix-mystery-movies",  type: "movie",  name: "SineWix — Gizem Filmleri",        path: "/genres/mediaLibrary/show/9648/movie/" + API_KEY,  source: "paged",    perPage: 12 },
  { id: "sinewix-animation-movies",type: "movie",  name: "SineWix — Animasyon Filmleri",    path: "/genres/mediaLibrary/show/16/movie/" + API_KEY,    source: "paged",    perPage: 12 },
  { id: "sinewix-war-series",      type: "series", name: "SineWix — Savaş Dizileri",        path: "/genres/mediaLibrary/show/10769/serie/" + API_KEY, source: "paged",    perPage: 12 },
  { id: "sinewix-latest-episodes", type: "series", name: "SineWix — Son Bölümler",          path: "/media/seriesEpisodesAll/" + API_KEY,              source: "episodes", perPage: 15 }
];

// -------------------------------------------------------
// MANIFEST
// -------------------------------------------------------
var catalogDefs = HOME_CATALOGS.map(function(c) {
  return { id: c.id, type: c.type, name: c.name };
});
catalogDefs.push({ id: "sinewix-search-series", type: "series", name: "SineWix — Dizi/Anime Ara" });
catalogDefs.push({ id: "sinewix-search-movie",  type: "movie",  name: "SineWix — Film Ara" });

var manifest = {
  id: "community.sinewix.nuvio",
  version: "1.0.0",
  name: "SineWix",
  description: "Türkçe film, dizi ve anime — SineWix",
  logo: "https://sinewix.com/favicon.ico",
  resources: ["catalog", "meta", "stream"],
  types: ["movie", "series"],
  idPrefixes: ["sinewix"],
  catalogs: catalogDefs
};

// -------------------------------------------------------
// YARDIMCI FONKSİYONLAR
// -------------------------------------------------------
function apiGet(path) {
  var url = API_BASE + path;
  return fetch(url, { headers: HEADERS })
    .then(function(res) {
      if (!res.ok) throw new Error("HTTP " + res.status);
      return res.json();
    });
}

function fixHttps(url) {
  if (!url) return undefined;
  return url.replace("http://", "https://");
}

function buildMetaId(id, contentType) {
  var prefix = contentType === "movie" ? "sinewixm" : contentType === "anime" ? "sinewixa" : "sinewixs";
  return prefix + id;
}

function buildVideoId(serieId, seasonNum, episodeNum) {
  return "sinewixs" + serieId + ":" + seasonNum + ":" + episodeNum;
}

function parseAddonId(id) {
  // Format: sinewixs1234:2:5 | sinewixm1234 | sinewixa1234
  var match = /^sinewix([sma])(\d+)(?::(\d+):(\d+))?$/.exec(id);
  if (match) {
    return {
      contentType: match[1] === "m" ? "movie" : match[1] === "a" ? "anime" : "series",
      serieId: match[2],
      seasonNumber: match[3] ? Number(match[3]) : undefined,
      episodeNumber: match[4] ? Number(match[4]) : undefined
    };
  }
  return null;
}

function buildReleaseInfo(firstDate, lastDate) {
  var firstYear = firstDate ? String(firstDate).slice(0, 4) : "";
  var lastYear  = lastDate  ? String(lastDate).slice(0, 4)  : "";
  if (firstYear && lastYear && firstYear !== lastYear) return firstYear + "-" + lastYear;
  return firstYear || lastYear || undefined;
}

function splitGenres(value) {
  if (Array.isArray(value)) return value;
  if (!value || typeof value !== "string") return undefined;
  return value.split(",").map(function(s) { return s.trim(); }).filter(Boolean);
}

function normalizePreview(item, forcedType) {
  var rawType = forcedType || item.type;
  var stremioType = rawType === "movie" ? "movie" : "series";
  var addonType   = rawType === "movie" ? "movie" : rawType === "anime" ? "anime" : "series";
  return {
    id:          buildMetaId(item.id, addonType),
    type:        stremioType,
    name:        item.name || item.title || item.original_name || "",
    poster:      fixHttps(item.poster_path),
    background:  fixHttps(item.backdrop_path_tv || item.backdrop_path),
    description: item.overview || "",
    releaseInfo: buildReleaseInfo(item.release_date, item.release_date),
    genres:      splitGenres(item.genre_name) || item.genreslist,
    imdbRating:  item.vote_average ? String(item.vote_average) : undefined
  };
}

function getCatalogItems(data, source, itemType) {
  if (source === "episodes") {
    var seen = {};
    return (data.data || [])
      .filter(function(item) {
        if (!item.id || seen[item.id]) return false;
        seen[item.id] = true;
        return true;
      })
      .map(function(item) { return normalizePreview(item, "series"); });
  }
  return (data.data || []).map(function(item) { return normalizePreview(item, itemType); });
}

function buildStreams(videos) {
  return (videos || [])
    .filter(function(v) { return v.status === 1 && v.link; })
    .map(function(v) {
      return { url: v.link, name: "SineWix", title: v.lang || "TR" };
    });
}

// -------------------------------------------------------
// CATALOG
// -------------------------------------------------------
function getCatalog(type, id, extra) {
  var search = extra && extra.search;
  var skip   = Number((extra && extra.skip) || 0);

  // Arama
  if (id === "sinewix-search-series" || id === "sinewix-search-movie") {
    if (!search || !search.trim()) return Promise.resolve({ metas: [] });
    return apiGet("/search/" + encodeURIComponent(search) + "/" + API_KEY)
      .then(function(data) {
        var metas = (data.search || [])
          .map(function(item) { return normalizePreview(item); })
          .filter(function(item) {
            return id === "sinewix-search-movie" ? item.type === "movie" : item.type === "series";
          });
        return { metas: metas };
      })
      .catch(function() { return { metas: [] }; });
  }

  // Ana katalog
  var catalog = null;
  for (var i = 0; i < HOME_CATALOGS.length; i++) {
    if (HOME_CATALOGS[i].id === id) { catalog = HOME_CATALOGS[i]; break; }
  }
  if (!catalog || type !== catalog.type) return Promise.resolve({ metas: [] });

  var page = Math.floor(skip / (catalog.perPage || 12)) + 1;
  var path = catalog.path + "?page=" + page;

  return apiGet(path)
    .then(function(data) {
      return { metas: getCatalogItems(data, catalog.source, catalog.itemType) };
    })
    .catch(function() { return { metas: [] }; });
}

// -------------------------------------------------------
// META
// -------------------------------------------------------
function getMeta(type, id) {
  var parsed = parseAddonId(id);
  if (!parsed || !parsed.serieId) return Promise.resolve({ meta: {} });

  var serieId     = parsed.serieId;
  var contentType = parsed.contentType;

  // Film
  if (type === "movie" || contentType === "movie") {
    return apiGet("/media/detail/" + serieId + "/" + API_KEY)
      .then(function(data) {
        return {
          meta: {
            id: id, type: "movie",
            name:        data.title || data.name || data.original_name || "",
            poster:      fixHttps(data.poster_path),
            background:  fixHttps(data.backdrop_path_tv || data.backdrop_path),
            description: data.overview || "",
            releaseInfo: buildReleaseInfo(data.release_date, data.release_date),
            genres:      splitGenres(data.genresname) || data.genres,
            imdbRating:  data.vote_average ? String(data.vote_average) : undefined
          }
        };
      })
      .catch(function() { return { meta: {} }; });
  }

  // Dizi
  return apiGet("/series/show/" + serieId + "/" + API_KEY)
    .then(function(data) {
      var seasons = (data.seasons || []).slice().sort(function(a, b) {
        return Number(a.season_number) - Number(b.season_number);
      });
      var firstSeason = seasons[0];
      var lastSeason  = seasons[seasons.length - 1];

      var videos = [];
      seasons.forEach(function(season) {
        var sNum = Number(season.season_number);
        (season.episodes || []).forEach(function(ep) {
          var eNum = Number(ep.episode_number);
          videos.push({
            id:       buildVideoId(serieId, sNum, eNum),
            title:    ep.name || (eNum + ". Bölüm"),
            season:   sNum,
            episode:  eNum,
            overview: ep.overview || "",
            released: ep.air_date ? ep.air_date + "T00:00:00.000Z" : undefined
          });
        });
      });

      return {
        meta: {
          id: id, type: "series",
          name:        data.name || data.original_name || "",
          poster:      fixHttps(data.poster_path),
          background:  fixHttps(data.backdrop_path_tv || data.backdrop_path),
          description: data.overview || "",
          releaseInfo: buildReleaseInfo(
            data.first_air_date || (firstSeason && firstSeason.air_date),
            (lastSeason && lastSeason.air_date) || data.first_air_date
          ),
          genres:      (data.genreslist && data.genreslist.length) ? data.genreslist
                     : data.genresname ? [data.genresname] : undefined,
          videos: videos
        }
      };
    })
    .catch(function() { return { meta: {} }; });
}

// -------------------------------------------------------
// STREAM
// -------------------------------------------------------
function getStreams(type, id) {
  var parsed = parseAddonId(id);
  if (!parsed || !parsed.serieId) return Promise.resolve({ streams: [] });

  var serieId      = parsed.serieId;
  var contentType  = parsed.contentType;
  var seasonNumber = parsed.seasonNumber;
  var episodeNumber= parsed.episodeNumber;

  // Film
  if (type === "movie" || contentType === "movie") {
    return apiGet("/media/detail/" + serieId + "/" + API_KEY)
      .then(function(data) { return { streams: buildStreams(data.videos) }; })
      .catch(function() { return { streams: [] }; });
  }

  // Anime — stream yok
  if (contentType === "anime") return Promise.resolve({ streams: [] });

  // Dizi
  if (!seasonNumber || !episodeNumber) return Promise.resolve({ streams: [] });

  return apiGet("/series/show/" + serieId + "/" + API_KEY)
    .then(function(data) {
      var season = (data.seasons || []).find(function(s) {
        return Number(s.season_number) === seasonNumber;
      });
      if (!season) return { streams: [] };

      var episode = (season.episodes || []).find(function(e) {
        return Number(e.episode_number) === episodeNumber;
      });
      if (!episode) return { streams: [] };

      return { streams: buildStreams(episode.videos) };
    })
    .catch(function() { return { streams: [] }; });
}

// -------------------------------------------------------
// NUVIO EXPORT
// -------------------------------------------------------
var provider = {
  manifest: manifest,
  getCatalog: getCatalog,
  getMeta: getMeta,
  getStreams: getStreams
};

if (typeof module !== "undefined") module.exports = provider;
