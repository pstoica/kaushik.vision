require("dotenv").config();

const fs = require("fs");
const request = require("request");

const DATO_TOKEN = process.env.DATO_TOKEN;

if (!DATO_TOKEN) {
  console.log(`Missing DATO_TOKEN environment variable.`);
  process.exit();
}

const SiteClient = require("datocms-client").SiteClient;

const client = new SiteClient(DATO_TOKEN);

client.items.all({ "filter[type]": "artwork_type" }).then(function(x) {
  fs.writeFileSync("./data/artwork-types.json", JSON.stringify(x, "", 2));
  console.log(`Imported ${x.length} artwork types.`);
});

client.items.all({ "filter[type]": "artwork" }).then(function(x) {
  fs.writeFileSync("./data/artworks.json", JSON.stringify(x, "", 2));
  console.log(`Imported ${x.length} artworks.`);
});

client.items.all({ "filter[type]": "sound" }).then(function(x) {
  fs.writeFileSync("./data/sound.json", JSON.stringify(x, "", 2));
  console.log(`Imported ${x.length} sounds.`);
});
