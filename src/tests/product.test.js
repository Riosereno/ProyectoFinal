const request = require("supertest");
const app = require("../app");
const Category = require("../models/Category");
const Product = require("../models/Product");
const Cart = require("../models/Cart");
require("../models");

let token;
let productId;


beforeAll(async () => {
  const credentials = {
    email: "testuser@gmail.com",
    password: "testuser1234",
  };
  const res = await request(app).post("/users/login").send(credentials);
  token = res.body.token;
});

test("POST /products should create one product", async () => {
  const categoryInstance = new Category({
    name: "tecnologia",
  });

  await categoryInstance.save();

  const product = {
    title: "Cocina Industrial",
    description: "Versátil, autolimpiante",
    brand: "Mabe",
    price: "200",
    categoryId: categoryInstance.id,
  };

  const res = await request(app)
    .post("/products")
    .send(product)
    .set("Authorization", `Bearer ${token}`);
  productId = res.body.id;

  await categoryInstance.destroy();

  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
});
test("GET /products", async () => {
  const res = await request(app)
    .get("/products")
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("PUT /products/:id", async () => {
  const productUpdated = {
    title: "Tv updated",
  };
  const res = await request(app)
    .put(`/products/${productId}`)
    .send(productUpdated)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body.title).toBe(productUpdated.title);
});


test("DELETE /products/:id", async () => {
  const res = await request(app)
    .delete(`/products/${productId}`)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(204);
});
