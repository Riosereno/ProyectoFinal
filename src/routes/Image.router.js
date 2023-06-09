const { getAll, create, remove } = require("../controllers/Image.controllers");
const express = require("express");
const upload = require("../utils/multer");
const verifyJWT = require("../utils/verifyJWT");

const ImageRouter = express.Router();

ImageRouter.route("/")
  .get(verifyJWT, getAll)
  .post(verifyJWT, upload.single("image"), create);

ImageRouter.route("/:id").delete(verifyJWT, remove);

module.exports = ImageRouter;
