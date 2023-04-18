const { ProductManagerFile } = require("../managerDaos/productManagerFile")

const productManager = new ProductManagerFile()

const products = []
const socketProduct = async (io) => {
    const products = await productManager.getProducts()
    io.on("connection", socket => {
        console.log("cliente conectado")

        socket.emit("productos", products)

        socket.on("addProduct", data => {
            console.log(data)
            productManager.addProduct(data)
        })


    })
}

module.exports = {
    socketProduct
}