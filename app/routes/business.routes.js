module.exports = app => {
  const businesses = require("../controllers/business.controller.js");

  var router = require("express").Router();

  // Create a new Business
  router.post("/", businesses.create);

  // Retrieve all Businesses
  router.get("/", businesses.findAll);

  // Retrieve all published Businesses
  router.get("/published", businesses.findAllPublished);

  // Retrieve a single Business with id
  router.get("/:id", businesses.findOne);

  // Update a Business with id
  router.put("/:id", businesses.update);

  // Delete a Business with id
  router.delete("/:id", businesses.delete);

  // Create a new Business
  router.delete("/", businesses.deleteAll);

  app.use("/api/businesses", router);
};
