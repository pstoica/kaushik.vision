const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const pathMatch = require("path-match");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const route = pathMatch();

app.prepare().then(() => {
  createServer((req, res) => {
    const { pathname, query } = parse(req.url, true);
    const workParams = route("/work/:id")(pathname);
    const categoryParams = route("/category/:category")(pathname);

    if (pathname === "/") {
      app.render(req, res, "/", {});
    } else if (workParams) {
      app.render(req, res, "/work", workParams);
    } else if (categoryParams) {
      app.render(req, res, "/", categoryParams);
    } else {
      handle(req, res);
    }
  }).listen(3000, err => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
