const request = require("supertest");
const app = require("../app");
const Cart = require("../models/Cart"); // Asumiendo que el modelo se llama "Cart"
require("../models");

let token;
let cartId;

beforeAll(async () => {
  const credentials = {
    email: "testuser@gmail.com",
    password: "testuser1234",
  };
  const res = await request(app).post("/users/login").send(credentials);
  token = res.body.token;
});

test("POST /carts should create one cart", async () => {
    const cartInstance = new Cart({
      quantity: 3,
    });
  
    await cartInstance.save();
  
    const product = {
      quantity: 5,
      productId: cartInstance.id,
    };
  
    const res = await request(app)
      .post("/carts")
      .send(product)
      .set("Authorization", `Bearer ${token}`);
    cartId = res.body.id;
  
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
  });
  test("GET /carts", async () => {
    const res = await request(app)
      .get("/carts")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
  });
  
  test("PUT /carts/:id", async () => {
    const cartUpdated = {
      quantity: 5,
    };
    const res = await request(app)
      .put(`/carts/${cartId}`)
      .send(cartUpdated)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.quantity).toBe(cartUpdated.quantity);
  });
  
  test("DELETE /carts/:id", async () => {
    const res = await request(app)
      .delete(`/carts/${cartId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(204);
  });
  
  