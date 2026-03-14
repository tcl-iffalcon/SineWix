const { addonBuilder, serveHTTP } = require('stremio-addon-sdk');
const { manifest } = require('./manifest');
const { catalogHandler } = require('./catalog');
const { metaHandler } = require('./meta');
const { streamHandler } = require('./stream');

const builder = new addonBuilder(manifest);

builder.defineCatalogHandler(catalogHandler);
builder.defineMetaHandler(metaHandler);
builder.defineStreamHandler(streamHandler);

const PORT = process.env.PORT || 7000;

serveHTTP(builder.getInterface(), { port: PORT });

console.log(`✅ Sinewix Addon çalışıyor → http://localhost:${PORT}/manifest.json`);
