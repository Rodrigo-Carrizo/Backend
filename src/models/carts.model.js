const { Schema, model } = require('mongoose')

const collection = 'carritos'

const cartSchema = new Schema({
    products: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'products'
        }
    }]
})

cartSchema.pre('findOne', function(){
    this.populate('products.product')
})

const cartModel = model(collection, cartSchema)

module.exports = {
    cartModel
}

