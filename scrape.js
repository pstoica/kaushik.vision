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

// client.itemTypes.all().then(models => console.log(models));

client.items.all({ "filter[type]": "artwork" }).then(function(artworks) {
  fs.writeFileSync("./data/artworks.json", JSON.stringify(artworks, "", 2));
  console.log(`Imported ${artworks.length} artworks.`);
});
