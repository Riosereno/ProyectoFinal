const Category = require("./Category");
const Cart = require("./Cart");
const Product = require("./Product");
const Image = require("./Image");
const User = require("./User");
const Purchase = require("./Purchase");

Category.hasMany(Product);
Product.belongsTo(Category);

Product.hasMany(Image);
Image.belongsTo(Product);

Cart.hasMany(Product);
Product.belongsTo(Cart);

Cart.belongsTo(User);
User.hasMany(Cart);

Purchase.belongsTo(User);
User.hasMany(Purchase);

Purchase.belongsTo(Product);
Product.hasMany(Purchase);

module.exports = {
  Category,
  Cart,
  Product,
  Image,
  User,
  Purchase,
};
