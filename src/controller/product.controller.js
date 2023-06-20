const { productService } = require("../service")

class ProductController {
    getProducts = async (req, res) =>{
        const products = await productService.get()
        res.send({status: "success", payload: products})
    }
}

module.exports = {
    ProductController
}