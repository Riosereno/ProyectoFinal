const catchError = require("../utils/catchError");
const Product = require("../models/Product");
const Category = require("../models/Category");
const Image = require("../models/Image");
const { Op } = require("sequelize");

const getAll = catchError(async (req, res) => {
  const { title, categoryId } = req.query;
  const where = {};
  if (title) where.title = { [Op.iLike]: `%${title}%` };
  if (categoryId) where.categoryId = categoryId;
  
  const results = await Product.findAll({
    include: [Category, Image],
    where: where
  });
  
  return res.json(results);
});


const create = catchError(async (req, res) => {
  const { title, description, brand, price, categoryId } = req.body;
  const result = await Product.create({
    title,
    description,
    brand,
    price,
    categoryId,
    userId: req.user.id
  });

  return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Product.findByPk(id);
  if (!result) return res.sendStatus(404);
  return res.json(result);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  await Product.destroy({ where: { id } });
  return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Product.update(req.body, {
    where: { id },
    returning: true,
  });
  if (result[0] === 0) return res.sendStatus(404);
  return res.json(result[1][0]);
});

const setImages = catchError(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  await product.setImages(req.body);
  const images = await product.getImages();
  return res.json(images);
});

module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update,
  setImages,
};
