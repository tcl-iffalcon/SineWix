# Sinewix Addon

Sinewix API tabanlı Nuvio/Stremio addon. Film ve dizi içerikleri, tür/sıralama filtreleri destekler.

## Özellikler

- 🎬 Film ve dizi katalogları
- 🎭 Tür filtresi (Aksiyon, Komedi, Drama vb.)
- 📊 Sıralama (En Yeni, En Popüler, En Yüksek Puan)
- ♾️ Sayfalama (skip desteği)

## Kurulum

```bash
npm install
npm start
```

## Railway Deploy

1. GitHub'a push et
2. Railway'de "New Project → Deploy from GitHub" seç
3. Repo'yu seç, otomatik deploy olur
4. `PORT` environment variable Railway tarafından otomatik set edilir

## Nuvio'ya Ekleme

Deploy sonrası alacağın URL:
```
https://sinewix-addon.up.railway.app/manifest.json
```

Bu URL'yi Nuvio'nun addon sayfasına yapıştır.

## Dosya Yapısı

```
sinewix-addon/
├── server.js      # Ana giriş noktası
├── manifest.js    # Addon tanımı ve katalog yapısı
├── api.js         # Sinewix API wrapper
├── catalog.js     # Katalog handler
├── meta.js        # İçerik detay handler
├── stream.js      # Stream handler
├── railway.toml   # Railway konfigürasyonu
└── package.json
```

## API Uyarlama

Sinewix API'sinin döndürdüğü response yapısına göre `catalog.js`, `meta.js` ve `stream.js` içindeki
field mapping'leri güncellemen gerekebilir. Örneğin API `data.results` yerine `data.items` dönüyorsa
ilgili satırı düzenle.
