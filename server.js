const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const pathMatch = require("path-match");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const route = pathMatch();
const match = route("/work/:id");

app.prepare().then(() => {
  createServer((req, res) => {
    const { pathname, query } = parse(req.url, true);
    const workParams = match(pathname);

    if (pathname === "/") {
      app.render(req, res, "/", {});
    } else if (workParams) {
      app.render(req, res, "/work", workParams);
    } else {
      handle(req, res);
    }
  }).listen(3000, err => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
