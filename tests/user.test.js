const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const User = require("../models/User");
const Order = require("../models/Order");
const bcrypt = require("bcrypt");
const { setupDatabase } = require("./fixtures/db");
const { userOneData, userOneId, userOnePassword } = require("./fixtures/users");
const { orderOneData } = require("./fixtures/orders");
const {
  productOneData,
  productOneId,
  productTwoData,
  productTwoId,
  productThreeData,
  productThreeId,
} = require("./fixtures/products");

describe("/users endpoint", () => {
  beforeEach(async () => {
    await setupDatabase();
  }, 10000);

  it("should create user with right credentials", async () => {
    const user = { name: "Name", email: "name@email.com", password: "name123" };

    // server response
    const response = await request(app).post("/users").send(user).expect(201);
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

  describe("/users endpoint with accessToken", () => {
    let accessToken;
    beforeEach(async () => {
      const accessTokenResponse = await request(app)
        .get("/users/refresh")
        .set("Cookie", `jwt=${userOneData.refreshToken}`)
        .send()
        .expect(200);

      accessToken = accessTokenResponse.body.accessToken;
    });

    it("should get user favorite products correctly", async () => {
      const response = await request(app)
        .get("/users/me/favoriteProducts")
        .set("Authorization", `Bearer ${accessToken}`)
        .send()
        .expect(200);
      expect(response.body[0]).toMatchObject(productOneData);
    });

    it("should get user orders correctly", async () => {
      const response = await request(app)
        .get("/users/me/orders")
        .set("Authorization", `Bearer ${accessToken}`)
        .send()
        .expect(200);

      expect(response.body[0]).toMatchObject(orderOneData);
    });

    it("should logout user successfully", async () => {
      await request(app)
        .post("/users/logout")
        .set("Authorization", `Bearer ${accessToken}`)
        .set("Cookie", `jwt=${userOneData.refreshToken}`)
        .send()
        .expect(200);

      const user = await User.findById(userOneId);
      expect(user.refreshToken).toBe("");
    });

    it("should delete user", async () => {
      await request(app)
        .delete("/users")
        .set("Authorization", `Bearer ${accessToken}`)
        .expect(200);

      const user = await User.findById(userOneId);
      expect(user).toBeNull();
      const orders = await Order.find({ orderOwner: userOneId });
      expect(orders).toStrictEqual([]);
    });

    it("should add product to user favorite products correctly", async () => {
      await request(app)
        .post("/users/addToFavorite")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({ _id: productTwoId })
        .expect(200);

      const user = await User.findById(userOneId);
      expect(user.favoriteProducts.length).toBe(2);
      expect(user.favoriteProducts).toStrictEqual([productOneId, productTwoId]);
    });

    it("should not add already exist product in user favorite products to favorite products", async () => {
      await request(app)
        .post("/users/addToFavorite")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({ _id: productOneId })
        .expect(400);
    });

    it("should not add product to user favorite products with invalid product id", async () => {
      await request(app)
        .post("/users/addToFavorite")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({ _id: `x${new mongoose.Types.ObjectId()}` })
        .expect(404);
    });

    it("should not add product to user favorite products with non exist product id", async () => {
      await request(app)
        .post("/users/addToFavorite")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({ _id: new mongoose.Types.ObjectId() })
        .expect(404);
    });

    it("should remove product from user favorite products", async () => {
      await request(app)
        .post("/users/removeFromFavorite")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({ _id: productOneId })
        .expect(200);

      const user = await User.findById(userOneId);
      expect(user.favoriteProducts.length).toBe(0);
    });

    it("should not remove product from user favorite products if it does not exist", async () => {
      await request(app)
        .post("/users/removeFromFavorite")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({ _id: productThreeId })
        .expect(400);
    });

    it("should not remove product from user favorite products with invalid product id", async () => {
      await request(app)
        .post("/users/removeFromFavorite")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({ _id: `x${new mongoose.Types.ObjectId()}` })
        .expect(404);
    });
  });
});
