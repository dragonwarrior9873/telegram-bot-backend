module.exports = app => {
  const pair_infos = require("../controllers/pair_info.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", pair_infos.create);

  // Retrieve all pair_infos
  router.get("/", pair_infos.findAll);

  // Retrieve a single Tutorial with id
  router.get("/:id", pair_infos.findOne);

  // Update a Tutorial with id
  router.put("/:id", pair_infos.update);

  // Delete a Tutorial with id
  router.delete("/:id", pair_infos.delete);

  // Create a new Tutorial
  router.delete("/", pair_infos.deleteAll);

  app.use("/api/pair_infos", router);
};
