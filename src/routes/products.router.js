const { Router } = require('express')
const { ProductManagerFile } = require('../managerDaos/productManagerFile')

const router = Router()
const productManager = new ProductManagerFile()

router.get('/', async (req, res) => {
    const listaProductos = await productManager.getProducts()

    res.render('products', {
        listaProductos
    })
})

module.exports = router
