const { addonBuilder, serveHTTP } = require("stremio-addon-sdk");

// node-fetch v2 ile global fetch tanımla
global.fetch = require("node-fetch");

const provider = require("./provider");

const builder = new addonBuilder(provider.manifest);

builder.defineCatalogHandler(function({ type, id, extra }) {
  return provider.getCatalog(type, id, extra);
});

builder.defineMetaHandler(function({ type, id }) {
  return provider.getMeta(type, id);
});

builder.defineStreamHandler(function({ type, id }) {
  return provider.getStreams(type, id);
});

var port = process.env.PORT || 7000;
serveHTTP(builder.getInterface(), { port: port });
console.log("SineWix addon çalışıyor — port:", port);
