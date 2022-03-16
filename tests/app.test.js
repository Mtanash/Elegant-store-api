const request = require("supertest");
const app = require("../app");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const {
  userOneId,
  userOnePassword,
  userOneData,
  productOneId,
  productOneData,
  setupDatabase,
} = require("./fixtures/db");

describe("/users", () => {
  beforeEach(async () => {
    await setupDatabase();
  });

  it("should create user with right credentials", async () => {
    const user = { name: "Name", email: "name@email.com", password: "name123" };

    // server response
    const response = await request(app).post("/users").send(user);
    expect(response.statusCode).toBe(201);
    expect(response.body).toMatchObject({
      user: {
        _id: expect.anything(),
        name: user.name,
        email: user.email,
        role: "user",
        favoriteProducts: [],
        boughtProducts: [],
      },
      accessToken: expect.anything(),
    });

    // jwt refresh token created
    expect(response.header["set-cookie"][0]).toBeDefined();

    // user created in database
    const createdUser = await User.findOne({
      name: user.name,
      email: user.email,
    });
    expect(createdUser).toBeDefined();

    // password is hashed correctly
    const passwordCheck = await bcrypt.compare(
      user.password,
      createdUser.password
    );
    expect(passwordCheck).toBe(true);
  });

  it("should create user with wrong credentials", async () => {
    // existing email
    request(app)
      .post("/users")
      .send({ name: "user", email: userOneData.email, password: "superPass" })
      .expect(400);
    // empty email
    request(app)
      .post("/users")
      .send({ name: "user", email: "", password: "superPass" })
      .expect(500);
    // wrong email
    request(app)
      .post("/users")
      .send({ name: "user", email: "email.com", password: "superPass" })
      .expect(500);
    // empty name
    request(app)
      .post("/users")
      .send({ name: "", email: "email@email.com", password: "superPass" })
      .expect(500);
    // empty password
    request(app)
      .post("/users")
      .send({ name: "", email: "email@email.com", password: "" })
      .expect(500);
  });

  it("should login user successfully", async () => {
    const response = await request(app)
      .post("/users/login")
      .send({ email: userOneData.email, password: userOnePassword });

    // response
    expect(response.statusCode).toBe(200);
    const {
      name,
      email,
      favoriteProducts,
      boughtProducts,
      role,
      avatar,
      refreshToken,
    } = userOneData;
    expect(response.body).toMatchObject({
      user: {
        _id: userOneId,
        name,
        email: email.toLowerCase(),
        favoriteProducts: [productOneId],
        boughtProducts,
        role,
        avatar,
      },
      accessToken: expect.any(String),
    });

    // jwt refresh token created
    expect(response.header["set-cookie"][0]).toBeDefined();
  });
});
