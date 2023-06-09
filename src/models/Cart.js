const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const Cart = sequelize.define("cart", {
  // userId
  // ProductId
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Cart;
