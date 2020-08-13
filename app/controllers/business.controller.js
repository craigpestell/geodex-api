const db = require("../models");
const Business = db.businesses;

// Create and Save a new Business
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Business
  const business = new Business({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  });

  // Save Business in the database
  business
    .save(business)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Business."
      });
    });
};

// Retrieve all Businesses from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Business.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving businesses."
      });
    });
};

// Find a single Business with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Business.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Business with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Business with id=" + id });
    });
};

// Update a Business by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Business.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Business with id=${id}. Maybe Business was not found!`
        });
      } else res.send({ message: "Business was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Business with id=" + id
      });
    });
};

// Delete a Business with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Business.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Business with id=${id}. Maybe Business was not found!`
        });
      } else {
        res.send({
          message: "Business was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Business with id=" + id
      });
    });
};

// Delete all Businesses from the database.
exports.deleteAll = (req, res) => {
  Business.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Businesses were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all businesses."
      });
    });
};

// Find all published Businesses
exports.findAllPublished = (req, res) => {
  Business.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving businesses."
      });
    });
};
