import request from "supertest";
import { db } from "../../models/index.js";
import { app } from "../../app.js";

// App is used with supertest to simulate server request
describe("POST,GET,PUT,DELETE /api/astronaut", function () {
  const agent = request.agent(app);

  // Before any tests run, clear the DB and create a user with astronaut
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
    await db.user
      .create({ user_name: "testName", email: "test@gmail.com" })
      .catch((err) => console.error(err));
    await db.astronaut
      .create({ user_id: 1, description: "some text", name: "One name" })
      .catch((err) => console.error(err));
  });

  /**
   * POST
   */
  it("should return 403 when unknown user try to create a comment", async () => {
    await agent
      .post("/api/astronaut")
      .send({ astronaut_id: 1, description: "some texts" })
      .expect(403);
  });
  it("should return 400 when a required field is missing", async () => {
    await agent
      .post("/api/astronaut")
      .set("Authorization", `bearer test@gmail.com`)
      .send({ astronaut_id: 1 })
      .expect(400);

    const comment = await db.comment.findAll();
    expect(comment.length).toEqual(0);
  });
  it("should return 200 when known user creates a comment", async () => {
    const astronautBefore = await db.comment.findAll();
    expect(astronautBefore.length).toEqual(0);

    await agent
      .post("/api/astronaut")
      .set("Authorization", `bearer test@gmail.com`)
      .send({ astronaut_id: 1, description: "some texts" })
      .expect(200);

    const comment = await db.comment.findAll();
    expect(comment.length).toEqual(1);
  });

  /**
   * GET
   */
  it("Should be return 200 with the previously created comment", async () => {
    const response = await agent.get("/api/astronaut/1").expect(200);

    expect(response.body[0]).toEqual(
      expect.objectContaining({ astronaut_id: 1, description: "some texts" })
    );
  });

  /**
   * PUT
   */
  it("should return 403 when unknown user try to update a comment", async () => {
    await agent.put("/api/astronaut/1").expect(403);
  });

  it("should return 200 when known user update a comment", async () => {
    await agent
      .put("/api/astronaut/1")
      .set("Authorization", `bearer test@gmail.com`)
      .send({  description: "new texts" })
      .expect(200);
  });

  /**
   * DELETE
   */
  it("should return 403 when unknown user try to delete a comment", async () => {
    await agent.delete("/api/astronaut/1").expect(403);
  });
  it("should return 403 when a user trying to delete a comment is not author", async () => {
    await agent
      .delete("/api/astronaut/1")
      .set("Authorization", `bearer fake@fake`)
      .expect(403);
  });

  it("should return 200 when known user delete a comment", async () => {
    await agent
      .delete("/api/astronaut/1")
      .set("Authorization", `bearer test@gmail.com`)
      .expect(200);
  });
});
