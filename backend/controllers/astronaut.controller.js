import { db } from "../models/index.js";
import { responseHelper } from "../utils/responseHelper.js";

const controller = {};
const model = db.astronaut;

controller.create = (req, res) => {
  console.log("creating an astronaut...")
  console.log(req.body)
  const response = new responseHelper(res);

   // Validate request
   let stop=false;
   ["name", "age", "picture_url"].forEach((element) => {
     if (!req.body[element]) {
       response.badRequest(`Please provide a ${element}`);
       stop =true;
     }
   });
   if (!Number.isInteger(parseInt(req.body.age))) {
    response.badRequest(`Please provide a round number for age `);
    stop =true;
  }

   if (stop) return;

  // Create a astronaut
  const astronaut = {
    name: req.body.name,
    age: parseInt(req.body.age),
    picture_url: req.body.picture_url,
  };

  // Save astronaut in the database
  model
    .create(astronaut)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      response.internalError(
        err.message || "Some error occurred while creating the astronaut."
      );
    });
};

controller.findAll = (req, res) => {
  model
    .findAll({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      new responseHelper(res).internalError("Server has failed retrieving astronauts " );
      console.error(err);
    });
};

controller.findOne = (req, res) => {
  const id = req.params.id;

  model
    .findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving astronaut with id=" + id,
      });
      console.error(err);
    });
};

controller.update = (req, res) => {
  const id = req.params.id;
  const user_id = req.user_id;
  const response = new responseHelper(res);

  // Validate request
  if (!req.body || req.body === {}) {
    response.badRequest(`No element to update`);
    return;
  }

  model
    .update(req.body, {where: { id: id}})
    .then((num) => {
      if (num == 1) res.send({ message: "astronaut was updated successfully." });
      else
        response.badRequest(
          `No astronaut found with id=${id}`
        );
    })
    .catch((err) => {
      response.internalError("Error updating astrona with id=" + id);
      console.log(err);
    });
};

controller.delete = (req, res) => {
  const id = req.params.id;
  const response = new responseHelper(res);

  model
    .destroy({
      where: { id: id },
    })
    .then((num) => {
      if (num == 1) res.send({ message: "astronaut was deleted successfully!" });
      else
        response.badRequest(
          `No astronaut found with id=${id} `
        );
    })
    .catch((err) => {
      response.internalError("Error deleting astronaut with id=" + id);
      console.log(err);
    });
};

export default controller;
