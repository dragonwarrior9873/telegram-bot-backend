const db = require("../models");
const Wallet_Info = db.wallet_infos;

// Create and Save a new Wallet_Info
exports.create = (req, res) => {
  // Validate request
  if (!req.body.wallet_address) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Wallet_Info
  const Wallet_Info = new Wallet_Info({
    wallet_address: req.body.wallet_address,
    mnemonics: req.body.mnemonics,
  });

  // Save Wallet_Info in the database
  Wallet_Info
    .save(Wallet_Info)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Wallet_Info."
      });
    });
};

// Retrieve all Wallet_Infos from the database.
exports.findAll = (req, res) => {
  const wallet_address = req.query.wallet_address;
  var condition = wallet_address ? { wallet_address: { $regex: new RegExp(wallet_address), $options: "i" } } : {};

  Wallet_Info.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Wallet_Infos."
      });
    });
};

// Find a single Wallet_Info with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Wallet_Info.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Wallet_Info with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Wallet_Info with id=" + id });
    });
};

// Update a Wallet_Info by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Wallet_Info.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Wallet_Info with id=${id}. Maybe Wallet_Info was not found!`
        });
      } else res.send({ message: "Wallet_Info was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Wallet_Info with id=" + id
      });
    });
};

// Delete a Wallet_Info with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Wallet_Info.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Wallet_Info with id=${id}. Maybe Wallet_Info was not found!`
        });
      } else {
        res.send({
          message: "Wallet_Info was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Wallet_Info with id=" + id
      });
    });
};

// Delete all Wallet_Infos from the database.
exports.deleteAll = (req, res) => {
  Wallet_Info.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Wallet_Infos were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Wallet_Infos."
      });
    });
};
