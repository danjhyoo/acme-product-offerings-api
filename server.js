const db = require("./db");
const express = require("express");
const app = express();
const api = require("./api");
const path = require("path");

app.use("/api", api);

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const port = process.env.PORT || 3000;
db.syncAndSeed().then(() => app.listen(port, () => console.log("listening")));
