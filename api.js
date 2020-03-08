const app = require("express").Router();
const db = require("./db");

const { Product, Company, Offering } = db.models;

app.get("/products", async (req, res, next) => {
  try {
    res.send(await Product.findAll());
  } catch (ex) {
    next(ex);
  }
});

app.get("/companies", async (req, res, next) => {
  try {
    res.send(await Company.findAll());
  } catch (ex) {
    next(ex);
  }
});

app.get("/offerings", async (req, res, next) => {
  try {
    res.send(await Offering.findAll());
  } catch (ex) {
    next(ex);
  }
});

module.exports = app;
