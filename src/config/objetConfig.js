const {connect} = require('mongoose')

let url = 'mongodb+srv://rodrigocarrizo210:*****@cluster0.9hj86fl.mongodb.net/test'

module.exports = {
    connectDB: () => {
        connect(url)
        console.log('Base de datos conectadas')
    }
}

