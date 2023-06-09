const User = require("../models/User");
const sequelize = require("../utils/connection");
require("../models/User");
require("../models/Category");
require("../models/Product");
require("../models/Purchase");
require("../models/Cart");
require("../models");

const main = async () => {
  try {
    await sequelize.sync({ force: true });

    await User.create({
      firstName: "testuser",
      lastName: "testuser",
      email: "testuser@gmail.com",
      password: "testuser1234",
      phone: "1234567890",
    });

    process.exit();
  } catch (error) {
    console.log(error);
  }
};

main();
