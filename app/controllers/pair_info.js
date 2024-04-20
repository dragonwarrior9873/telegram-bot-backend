const db = require("../models");
const Pair_Info = db.pair_infos;

// Create and Save a new Pair_Info
exports.create = (req, res) => {
  // Validate request
  if (!req.body.pairContract) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Pair_Info
  const pair_info = new Pair_Info({
    pairContract: req.body.pairContract,
    sell_limit: req.body.sell_limit,
    buy_limit: req.body.buy_limit 
  });

  // Save Pair_Info in the database
  pair_info
    .save(pair_info)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Pair_Info."
      });
    });
};

// Retrieve all Pair_Infos from the database.
exports.findAll = (req, res) => {
  const pairContract = req.query.pairContract;
  var condition = pairContract ? { pairContract: { $regex: new RegExp(pairContract), $options: "i" } } : {};

  Pair_Info.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Pair_Infos."
      });
    });
};

// Find a single Pair_Info with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Pair_Info.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Pair_Info with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Pair_Info with id=" + id });
    });
};

// Update a Pair_Info by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Pair_Info.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Pair_Info with id=${id}. Maybe Pair_Info was not found!`
        });
      } else res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Pair_Info with id=" + id
      });
    });
};

// Delete a Pair_Info with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Pair_Info.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Pair_Info with id=${id}. Maybe Pair_Info was not found!`
        });
      } else {
        res.send({
          message: "Pair_Info was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Pair_Info with id=" + id
      });
    });
};

// Delete all Pair_Infos from the database.
exports.deleteAll = (req, res) => {
  Pair_Info.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Pair_Infos were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Pair_Infos."
      });
    });
};
