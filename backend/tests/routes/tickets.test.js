import request from "supertest";
import { db } from "../../models/index.js";
import { app } from "../../app.js";

// App is used with supertest to simulate server request
describe("POST,GET,PUT,DELETE /api/tickets", function () {
  const agent = request.agent(app);

  // Before any tests run, clear the DB and create a user
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
    await db.user
      .create({ user_name: "testName", email: "test@gmail.com" })
      .catch((err) => console.error(err));
  });


  /**
   * POST
   */
  it("should return 403 when unknown user try to create a ticket", async () => {
    await agent
      .post("/api/tickets")
      .send({ tittle: "one tittle", description: "some texts" })
      .expect(403);
  });
  it("should return 400 when a required field is missing", async () => {
    await agent
      .post("/api/tickets")
      .set("Authorization", `bearer test@gmail.com`)
      .send({ tittle: "one tittle", description: "some texts" })
      .expect(400);

    const ticket = await db.ticket.findAll();
    expect(ticket.length).toEqual(0);
  });
  it("should return 200 when known user creates a ticket", async () => {
    const ticketBefore = await db.ticket.findAll();
    expect(ticketBefore.length).toEqual(0);

    await agent
      .post("/api/tickets")
      .set("Authorization", `bearer test@gmail.com`)
      .send({ tittle: "one tittle", description: "some texts", status: "todo" })
      .expect(200);

    const ticket = await db.ticket.findAll();
    expect(ticket.length).toEqual(1);
  });

  /**
   * GET
   */
  it("Should be return 200 with the previously created ticket", async () => {
    const response = await agent.get("/api/tickets").expect(200);

    expect(response.body[0]).toEqual(
      expect.objectContaining({
        description: "some texts",
        tittle: "one tittle",
      })
    );
  });

  /**
   * PUT
   */
  it("should return 403 when unknown user try to update a ticket", async () => {
    await agent.put("/api/tickets/1").expect(403);
  });

  it("should return 200 when known user update a ticket", async () => {
    await agent
      .put("/api/tickets/1")
      .set("Authorization", `bearer test@gmail.com`)
      .send({ tittle: "new tittle", description: "new texts", status: "wip" })
      .expect(200);
  });

  /**
   * DELETE
   */
  it("should return 403 when unknown user try to delete a ticket", async () => {
    await agent.delete("/api/tickets/1").expect(403);
  });
  it("should return 403 when a user trying to delete a ticket is not author", async () => {
    await agent
      .delete("/api/tickets/1")
      .set("Authorization", `bearer fake@fake`)
      .expect(403);
  });

  it("should return 200 when known user delete a ticket", async () => {
    await agent
      .delete("/api/tickets/1")
      .set("Authorization", `bearer test@gmail.com`)
      .expect(200);
  });
});
