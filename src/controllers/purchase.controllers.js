const catchError = require("../utils/catchError");
const Purchase = require("../models/Purchase");
const Cart = require("../models/Cart");

const getAll = catchError(async (req, res) => {
  const purchases = await Purchase.findAll({
    where: { userId: req.user.id },
  });
  return res.json(purchases);
});

const buyCart = catchError(async (req, res) => {
  const userId = req.user.id;

  const cartProducts = await Cart.findAll({
    where: { userId },
    attributes: ["userId", "productId", "quantity"],
    raw: true,
  });

  await Purchase.bulkCreate(cartProducts);
  await Cart.destroy({ where: { userId: userId } });

  return res.json(cartProducts);
});

module.exports = {
  getAll,
  buyCart,
};
