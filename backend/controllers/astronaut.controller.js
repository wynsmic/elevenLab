import { db } from "../models/index.js";
import { responseHelper } from "../utils/responseHelper.js";

const controller = {};
const model = db.comment;

controller.create = (req, res) => {
  const response = new responseHelper(res);

   // Validate request
   let stop=false;
   ["ticket_id", "description"].forEach((element) => {
     if (!req.body[element]) {
       response.badRequest(`Please provide a ${element}`);
       strop =true;
     }
   });
   if (stop) return;

  // Create a comment
  const comment = {
    user_id: req.user_id, // rely on user credential instead of not req.boby
    ticket_id: req.body.ticket_id,
    description: req.body.description,
  };

  // Save comment in the database
  model
    .create(comment)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      response.internalError(
        err.message || "Some error occurred while creating the comment."
      );
    });
};

controller.findAll = (req, res) => {
  model
    .findAll({
      where: {
        ticket_id: parseInt(req.params.ticket_id),
      },
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      new responseHelper(res).internalError(
        "Server has failed retrieving astronaut for ticket id " +
          req.params.ticket_id
      );
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

  // Forbiden fields
  if (req.body.user_id) {
    response.forbiddenRequest(`Author can't be changed`);
    return;
  }
  model
    .update(req.body, {
      where: { id: id, user_id: user_id },
    })
    .then((num) => {
      if (num == 1) res.send({ message: "Comment was updated successfully." });
      else
        response.badRequest(
          `No comment found with id=${id} written by user id=${user_id}.`
        );
    })
    .catch((err) => {
      response.internalError("Error updating Comment with id=" + id);
      console.log(err);
    });
};

controller.delete = (req, res) => {
  const id = req.params.id;
  const user_id = req.user_id;
  const response = new responseHelper(res);

  model
    .destroy({
      where: { id: id, user_id: user_id },
    })
    .then((num) => {
      if (num == 1) res.send({ message: "Comment was deleted successfully!" });
      else
        response.badRequest(
          `No comment found with id=${id} written by user id=${user_id}.`
        );
    })
    .catch((err) => {
      response.internalError("Error deleting Comment with id=" + id);
      console.log(err);
    });
};

export default controller;
