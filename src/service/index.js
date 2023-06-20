const UserDaoMongo    = require("../managerDaos/mongo/user.mongo");
const ProductDaoMongo = require('../managerDaos/mongo/product.mongo.js')

const userService = new UserDaoMongo()
const productService = new ProductDaoMongo()

module.exports = {
    userService,
    productService
}
