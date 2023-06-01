const { Router } = require('express')
const { ProductManagerFile } = require('../managerDaos/productManagerFile')
const { authToken } = require('../utils/jwt')

const router = Router()
const productManager = new ProductManagerFile()

router.get('/', authToken,async (req, res) => {
    const products = await productManager.getProducts()

    res.send({status: 'success', payload: products})
})

module.exports = router
