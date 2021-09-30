import request from "supertest";
import { db } from "../../models/index.js";
import { app } from "../../app.js";

// App is used with supertest to simulate server request
describe("GET /api/usersession/JWT", function () {
  const agent = request.agent(app);

  // Before any tests run, clear the DB and create a user
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
    await db.user
      .create({ user_name: "testName", email: "test@gmail.com" })
      .catch((err) => console.error(err));
  });


  /**
   * GET
   */
  it("should prevent unknown user from getting a JWT", async () => {
    await agent
      .get("/api/usersession/jwt/ww@gmail.com")
      .expect(403);
  });
  it("should return a JWT", async () => {
    await agent
      .get("/api/usersession/jwt/test@gmail.com")
      .expect(200);
  });

});
