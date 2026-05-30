// ============================================================
// SineWix — WuPlay Addon Server
// ============================================================

var express  = require("express");
var provider = require("./provider");

var app  = express();
var PORT = process.env.PORT || 7000;

// -------------------------------------------------------
// CORS + JSON headers
// -------------------------------------------------------
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin",  "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

// -------------------------------------------------------
// Logging
// -------------------------------------------------------
app.use(function(req, res, next) {
  console.log("[" + new Date().toISOString() + "] " + req.method + " " + req.url);
  next();
});

// -------------------------------------------------------
// ROUTES
// -------------------------------------------------------

app.get("/manifest.json", function(req, res) {
  res.json(provider.manifest);
});

app.get("/catalog/:type/:id.json", function(req, res) {
  var type  = req.params.type;
  var id    = req.params.id;
  var extra = req.query;

  provider.getCatalog(type, id, extra)
    .then(function(result) { res.json(result); })
    .catch(function(err) {
      console.error("[catalog error]", err);
      res.json({ metas: [] });
    });
});

app.get("/meta/:type/:id.json", function(req, res) {
  var type = req.params.type;
  var id   = req.params.id;

  provider.getMeta(type, id)
    .then(function(result) { res.json(result); })
    .catch(function(err) {
      console.error("[meta error]", err);
      res.json({ meta: null });
    });
});

app.get("/stream/:type/:id.json", function(req, res) {
  var type = req.params.type;
  var id   = req.params.id;

  provider.getStreams(type, id)
    .then(function(result) { res.json(result); })
    .catch(function(err) {
      console.error("[stream error]", err);
      res.json({ streams: [] });
    });
});

app.get("/", function(req, res) {
  res.json({ status: "ok", addon: provider.manifest.name, version: provider.manifest.version });
});

app.use(function(req, res) {
  res.status(404).json({ error: "not found" });
});

// -------------------------------------------------------
// START — Vercel için module.exports, lokal için listen
// -------------------------------------------------------
if (require.main === module) {
  app.listen(PORT, function() {
    console.log("Legacy server listening...");
    console.log("SineWix WuPlay Addon çalışıyor");
    console.log("Port    : " + PORT);
    console.log("Manifest: http://localhost:" + PORT + "/manifest.json");
  });
}

module.exports = app;
