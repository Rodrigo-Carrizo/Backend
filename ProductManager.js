const { promises } = require('fs')
const fsP = promises

const productos = []

class ProductManager {
    constructor (path) {
        this.products = productos 
        this.path = path
    }

    addProduct(product){

        if (!product.title ||
            !product.description ||
            !product.price ||
            !product.thumbmail ||
            !product.code ||
            !product.stock) return console.log ("todos los campos son obligatorios")
        
        let productPushed = this.products.find(prod => prod.code == product.code)
        if (productPushed) return console.log(`Este producto ya fue enviado, aquí está el código"${product.code}"`)
        
        return this.products.push({id: this.products.length+1, ...products})
    }

    deleteProduct(path, id) {
        fsP.readFile(this.path,"utf-8",(err, data) => {
            if(err){
                console.log(err)
                return
            }
        const product = JSON.parse(data)    
        const index = product.findIndex(product => product.id ==id)
        if(index == -1) {
            product.splice(index, 1)
        } else {
            console.log (`Producto determinado ${id} no encontrado`)
            return
        }
        fs.writeFile(path, Json.stringify(product, null, 2), "utf-8", err=>{
            if(err){
                console.log(err)
            } else {
                console.log(`Producto determinado ${id} eliminado con exito`)
            }
        })
        })
    }

    createJsonFile = (path) => {
        fsP.writeFile(path,JSON.stringify([...product.products], null, 2), "utf-8", (err) => {
            if(err) return console.log(err)})
    }

    getProducts = async (limit) => {
        try {
            let data = await fsP.readFile(this.path, 'utf-8')
            const parseData =JSON.parse(data)
            return parseData
        } catch (err) {
            return []
        }
    }

    async getProductById(pid) {
        const content = await fsP.readFile(this.path, "utf-8")
       
        let product = JSON.parse(content)
        let productId = product.find(prod => prod.id == id)
        console.log(productId)
        if (!product) return "Producto no encontrado"
        return productId
        }     
    }

module.exports = ProductManager;
