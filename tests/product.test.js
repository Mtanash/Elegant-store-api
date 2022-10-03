const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const Product = require("../models/product.model");
const Review = require("../models/review.model");
const Rate = require("../models/rate.model");
const { setupDatabase } = require("./fixtures/db");
const {
  productOneId,
  productOneData,
  productTwoData,
  productThreeData,
} = require("./fixtures/products");
const { userOneData, userOneId, adminUserData } = require("./fixtures/users");

let accessToken;
describe("/products endpoint", () => {
  beforeEach(async () => {
    await setupDatabase();

    const accessTokenResponse = await request(app)
      .get("/users/refresh")
      .set("Cookie", `jwt=${userOneData.refreshToken}`)
      .send()
      .expect(200);

    accessToken = accessTokenResponse.body.accessToken;
  }, 10000);

  it("should fetch all products correctly", async () => {
    const response = await request(app).get("/products").send().expect(200);

    const { products, totalPages, itemsCount } = response.body;
    const productsLength = await Product.countDocuments();
    expect(products.length).toBe(productsLength);
    expect(totalPages).toBe(1);
    expect(itemsCount).toBe(productsLength);
  });

  it("should fetch products by search correctly", async () => {
    const response = await request(app)
      .get("/products?search=three")
      .send()
      .expect(200);
    expect(response.body.products[0].description).toBe(
      productThreeData.description
    );
  });

  it("should fetch featured products correctly", async () => {
    const response = await request(app)
      .get("/products?featured=true")
      .send()
      .expect(200);

    expect(response.body.products[0].description).toBe(
      productOneData.description
    );
  });

  it("should fetch products sorted correctly", async () => {
    const response = await request(app)
      .get("/products?sort=description")
      .send()
      .expect(200);

    expect(response.body.products[0].description).toBe(
      productOneData.description
    );
  });

  it("should fetch products with the selected fields correctly", async () => {
    const response = await request(app)
      .get("/products?fields=description,price")
      .send()
      .expect(200);

    expect(response.body.products[0].description).toBeDefined();
    expect(response.body.products[0].price).toBeDefined();
    expect(response.body.products[0].featured).toBeUndefined();
    expect(response.body.products[0].imageUrl).toBeUndefined();
    expect(response.body.products[0].stock).toBeUndefined();
  });

  it("should fetch product by id correctly", async () => {
    const response = await request(app)
      .get(`/products/${productOneId}`)
      .send()
      .expect(200);

    expect(response.body).toMatchObject(productOneData);
  });

  // admin user
  it("should delete product correctly", async () => {
    const adminAccessTokenResponse = await request(app)
      .get("/users/refresh")
      .set("Cookie", `jwt=${adminUserData.refreshToken}`)
      .send()
      .expect(200);

    await request(app)
      .delete(`/products/${productOneId}`)
      .set(
        "Authorization",
        `Bearer ${adminAccessTokenResponse.body.accessToken}`
      )
      .send()
      .expect(200);

    const product = await Product.findById(productOneId);

    expect(product).toBeNull();
  });

  describe("/users endpoint with accessToken", () => {
    // let accessToken;
    // beforeEach(async () => {
    //   const accessTokenResponse = await request(app)
    //     .get("/users/refresh")
    //     .set("Cookie", `jwt=${userOneData.refreshToken}`)
    //     .send()
    //     .expect(200);

    //   accessToken = accessTokenResponse.body.accessToken;
    // });

    it("should create new product correctly", async () => {
      // generate accessToken for admin user
      const adminAccessTokenResponse = await request(app)
        .get("/users/refresh")
        .set("Cookie", `jwt=${adminUserData.refreshToken}`)
        .send()
        .expect(200);
      console.log(adminAccessTokenResponse.body);

      const productData = {
        description: "description",
        price: "50",
        stock: "5",
        type: "Men Clothes",
      };

      const response = await request(app)
        .post("/products")
        .set(
          "Authorization",
          `Bearer ${adminAccessTokenResponse.body.accessToken}`
        )
        .set("Content-Type", "multipart/form-data")
        .send(productData)
        .expect(201);

      const createdProduct = await Product.findById(response.body._id);

      expect(createdProduct).toMatchObject(productData);
    });

    it("should add review on a product correctly", async () => {
      const reviewData = {
        text: "this is a review text",
        rate: 4,
        productId: productOneId,
      };
      await request(app)
        .post("/products/reviews")
        .set("Authorization", `Bearer ${accessToken}`)
        .send(reviewData)
        .expect(201);

      const review = await Review.findOne({ owner: userOneId });
      const rate = await Rate.findOne({ owner: userOneId });

      expect(review).toBeDefined();
      expect(rate).toBeDefined();
      expect(review.text).toBe(reviewData.text);
      expect(rate.value).toBe(reviewData.rate);
    });
  });
});
