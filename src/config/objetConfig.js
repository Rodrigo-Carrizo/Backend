const {connect} = require('mongoose')
const { productModel } = require('../models/product.model')
const { cartModel } = require('../models/carts.model')

// let url = 'mongodb+srv://rodrigocarrizo210:*****@cluster0.9hj86fl.mongodb.net/test'
let url = 'mongodb://localhost:27017/RodrigoCarrizo'

module.exports = {
    connectDB: async () => {
        try {
            connect(url)
            console.log('Base de datos conectadas')
            
            const cart = await cartModel.findOne({_id: '6452fbefc7ddcec328f8f962'})                 
          
            console.log(cart.products[2])
                    
        } catch (err) {
            console.log(err)
        }
    }
}






