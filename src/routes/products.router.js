const {Router} =require('express')
const productManager = require('../managerDaos/mongo/product.mongo')
const { authenticate } = require('passport')
const { passportAuth } = require('../passport-jwt/passportAuth.js')
const { authorizaton } = require('../passport-jwt/authorizarionJwtRole.js')
const { productService } = require("../service")
const { ProductsController } = require("../controller/product.controller")

const router =  Router()
const {getProducts} = new ProductsController()

router.get('/', getProducts)

router.get('/', passportAuth('jwt'), authorizaton('user'),async (req,res)=>{
    try {
        const products = await productManager.getProducts()
        res.status(200).send({
            status: 'success',
            payload: products
        })
        
    } catch (error) {
        cconsole.log(error)
    }
})
router.get('/:pid', async (req,res)=>{
    try {
        const {pid} = req.params
        let product = await productManager.getProductById(pid)
        res.status(200).send({
            status: 'success',
            payload: product
        })
    } catch (error) {
        console.log(error)
    }
})
router.post('/', async (req,res)=>{
    try {
        const newProduct = req.body

        let result = await productManager.addProduct(newProduct)


        res.status(200).send({
            status: 'success',
            payload: result
        })
    } catch (error) {
        console.log(error)
    }
})
router.put('/:pid', (req,res)=>{
    res.status(200).send('Actualizar productos')
})
router.delete('/:pid', (req,res)=>{
    res.status(200).send('Borrar productos')
})

module.exports = router
