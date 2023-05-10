const { userModel } = require("../../models/user.model")

class ProductManagerMongo {
    
    async getProducts(){
        try{
            return await userModel.find({})
        }catch(err){
            return new Error(err)
        }
    }
    async getProductById(pid){
        try {            
            return await userModel.findOne({_id: pid})
        } catch (error) {
            return new Error(error)
        }

    }
    async addProduct(newProduct){
        try {
            
            return await userModel.create(newProduct)
        } catch (error) {
            return new Error(error)
        }
    }
    async updateProduct(pid){}
    async deleteProduct(pid){}
}

module.exports = new ProductManagerMongo
