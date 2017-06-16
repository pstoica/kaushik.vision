// next.config.js
const artworkTypes = require("./data/artworks");
const artworkTypes = require("./data/artwork-types");

module.exports = {
  exportPathMap: function() {
    const extraPaths = {};
    artworks.forEach(work => {
      extraPaths[`/work/${work.slug}`] = {
        page: "/work",
        query: { id: work.slug },
      };
    });

    artworkTypes.forEach(workType => {
      extraPaths[`/category/${workType.slug}`] = {
        page: "/",
        query: { category: workType.slug },
      };
    });

    return Object.assign(
      {
        "/": { page: "/" },
        "/sounds": { page: "/sounds" },
        "/contact": { page: "/contact" },
      },
      extraPaths
    );
  },
  pagesDirectory: "/pages",
};
