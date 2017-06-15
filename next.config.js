// next.config.js
const artworks = require("./data/artworks");

module.exports = {
  exportPathMap: function() {
    const workPaths = {};
    console.log(artworks);
    artworks.forEach(work => {
      workPaths[`/work/${work.slug}`] = {
        page: "/work",
        query: { id: work.slug },
      };
    });

    return Object.assign(
      {
        "/": { page: "/" },
      },
      workPaths,
    );
  },
  pagesDirectory: "/pages",
};
