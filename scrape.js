require("dotenv").config();

const scResolve = require("soundcloud-lookup");
const fs = require("fs");
const request = require("request");

const DATO_TOKEN = process.env.DATO_TOKEN;
const SC_ID = process.env.SOUNDCLOUD_ID;

if (!DATO_TOKEN) {
  console.log(`Missing DATO_TOKEN environment variable.`);
  process.exit();
}

const SiteClient = require("datocms-client").SiteClient;

const client = new SiteClient(DATO_TOKEN);

client.items.all({ "filter[type]": "artwork_type" }).then(x => {
  fs.writeFileSync("./data/artwork-types.json", JSON.stringify(x, "", 2));
  console.log(`Imported ${x.length} artwork types.`);
});

client.items.all({ "filter[type]": "artwork" }).then(x => {
  fs.writeFileSync("./data/artworks.json", JSON.stringify(x, "", 2));
  console.log(`Imported ${x.length} artworks.`);
});

return client.items
  .all({ "filter[type]": "sound" })
  .then(sounds =>
    Promise.all(
      sounds.map(
        sound =>
          new Promise(resolve => {
            scResolve(sound.soundcloudUrl, SC_ID, (err, result) => {
              if (result.uri) {
                console.log(result.uri);
                sound.uri = result.uri;
                sound.kind = result.kind;
                return resolve(sound);
              }

              return resolve(false);
            });
          })
      )
    )
  )
  .then(sounds => sounds.filter(x => !!x))
  .then(sounds => {
    fs.writeFileSync("./data/sounds.json", JSON.stringify(sounds, "", 2));
    console.log(`Imported ${sounds.length} sounds.`);
  })
  .catch(console.error.bind(console));
