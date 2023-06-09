const express = require("express");
const userRouter = require("./user.router");
const categoryRouter = require("./category.router");
const productRouter = require("./product.router");
const ImageRouter = require("./Image.router");
const cartRouter = require("./cart.router");
const purchaseRouter = require("./purchase.router");

const router = express.Router();

// colocar las rutas aquí
router.use("/users", userRouter);
router.use("/categories", categoryRouter);
router.use("/products", productRouter);
router.use("/Images", ImageRouter);
router.use("/carts", cartRouter);
router.use("/purchases", purchaseRouter);
module.exports = router;
