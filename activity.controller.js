const Activity = require("./activity.model.js");

exports.findAll = (req, res) => {
  Activity.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving."
      });
    else res.send(data);
  });
};

exports.findBySupply = (req, res) => {
  Activity.getBySupply(req.params.supply, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found with supply ${req.params.supply}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving " + req.params.supply
        });
      }
    } else res.send(data);
  });
};

exports.findTagsById = (req, res) => {
  Activity.getTagsById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found with supply ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving " + req.params.id
        });
      }
    } else res.send(data);
  });
};
