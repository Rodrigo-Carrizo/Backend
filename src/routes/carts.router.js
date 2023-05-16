const { Router } = require("express")
const { cartModel } = require("../models/carts.model")

const router = Router()

router.get("/", async (req,res) => {
    let carts = await cartModel.find({})
    res.send(carts)
})
router.get("/:cid", async (req,res) => {
    let { cid } = req.params
    let cart = await cartModel.findOne({_id: cid})
    if (!cart) {
        return res.status(404).send({status: "error" , menssage: "No se ecuentra el carrito"})
    }
    res.send(cart)
})

router.post("/", async (req,res) => {
    try {
        let cart ={
            products:[],
        }
        let respuesta = await cartModel.create({})
        res.send("carrito creado")

    } catch (error) {
        console.log(error)
    }
})

router.post("/:cid/product/:pid", async (req,res) => {
    try {
        const {cid, pid} = req.params
        const {quantity} = req.body
        //const product = {
        //    id: pid,
        //    quantity

        const respUpdate = await cartModel.findOneAndUpdate(
            {_id: cid, "products.product": pid},
            {$inc: {"products.$.quantity": quantity}},
            {new: true}
        )
        if (respUpdate) {
            //res.send("producto añadido")
        }

        await cartModel.findByIdAndUpdate(
            {_id: cid},
            {$push : {products: {product: pid, quantity}}},
            {new: true, upsert: true}

        )
        res.send("producto añadido")
    } catch (error) {
        console.log(error)
    }
})

router.delete("/:cid/product/:pid", async (req, resp) => {
    try{
        let respuesta = await cartModel.findOneAndUpdate(
            {_id: cid},
            {$set: {products: []}},
            {new: true}
        )
        if (respuesta) {

        }
        res.send("carrito vacio")
    } catch (error) {
        console.log(error)
    }
})

router.delete("/:cid", async (req, resp) => {
    let respuesta = await cartModel.findOneAndUpdate(
        {_id: cid},
        {$set: {products: []}},
        {new: true}
    )
    res.send("carrito vacio")
})

module.exports = router