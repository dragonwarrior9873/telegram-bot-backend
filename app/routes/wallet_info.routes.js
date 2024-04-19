module.exports = app => {
  const wallet_infos = require("../controllers/wallet_info.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", wallet_infos.create);

  // Retrieve all wallet_infos
  router.get("/", wallet_infos.findAll);

  // Retrieve a single Tutorial with id
  router.get("/:id", wallet_infos.findOne);

  // Update a Tutorial with id
  router.put("/:id", wallet_infos.update);

  // Delete a Tutorial with id
  router.delete("/:id", wallet_infos.delete);

  // Create a new Tutorial
  router.delete("/", wallet_infos.deleteAll);

  app.use("/api/wallet_infos", router);
};
