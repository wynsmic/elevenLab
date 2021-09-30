import astronautCtrl from "../controllers/astronaut.controller.js";
import { Router } from "express";
import { ensureAuthenticated } from "../utils/authMiddleware.js";

export const astronautRoutes = (app) => {
  const router = Router();

  router.post("/", ensureAuthenticated, astronautCtrl.create);
  router.get("/:ticket_id", astronautCtrl.findAll);
  router.put("/:id", ensureAuthenticated, astronautCtrl.update);
  router.delete("/:id", ensureAuthenticated, astronautCtrl.delete);

  /**
   * @swagger
   * /api/astronaut/{ticketId}:
   *  get:
   *    tags:
   *      - astronaut
   *    description: Use to request all astronaut for a given ticketId
   *    parameters:
   *      - in: path
   *        name: ticketId
   *        schema:
   *          type: integer
   *        required: true
   *        description: Numeric ID of the ticket for which the astronaut are retrieved
   *    responses:
   *      '200':
   *        description: Success
   *      '500':
   *         description: Internal server error
   *
   * /api/astronaut:
   *  post:
   *    tags:
   *      - astronaut
   *    description: Use to create a comment
   *    parameters:
   *      - in: body
   *        name: comment
   *        description: The comment to create.
   *        schema:
   *          type: object
   *          required:
   *            - ticket_id
   *            - description
   *          properties:
   *              ticket_id:
   *                type: integer
   *              description:
   *                type: string
   *    responses:
   *      '200':
   *        description: Success
   *
   *      '400':
   *         description: Bad request
   *
   *      '401':
   *         description: Unauthorized
   *
   *      '500':
   *         description: Internal server error
   *
   * /api/astronaut/{commentId}:
   *  put:
   *    tags:
   *      - astronaut
   *    description: Use to update a comment by ID
   *    parameters:
   *      - in: body
   *        name: comment
   *        description: The comment to create.
   *        schema:
   *          type: object
   *          properties:
   *              description:
   *                type: string
   *    responses:
   *      '200':
   *        description: Success
   *
   *      '400':
   *         description: Bad request
   *
   *      '403':
   *         description: Forbidden.
   *
   *      '401':
   *         description: Unauthorized
   *
   *      '500':
   *         description: Internal server error
   *
   *
   *  delete:
   *    tags:
   *      - astronaut
   *    description: Use to delete a comment by ID
   *    parameters:
   *      - in: path
   *        name: commentID
   *        schema:
   *          type: integer
   *        required: true
   *        description: Numeric ID of the comment to delete
   *    responses:
   *      '200':
   *        description: Success
   *
   *      '400':
   *         description: Bad request
   *
   *      '401':
   *         description: Unauthorized
   *
   *      '500':
   *         description: Internal server error   *
   */
  app.use("/api/astronaut", router);
};
