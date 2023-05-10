const express = require('express')
const cookieParser = require('cookie-parser')
const objectConfig = require('./config/objetConfig.js')
const { uploader } = require('./utils/multer')
const userRouter = require('./routes/users.router')
const productRouter = require('./routes/products.router')
const viewsRouter = require('./routes/views.router')
//__________________________________________________________________________
const { Server } = require('socket.io')

const app = express()
const PORT = 8080 

const httpServer = app.listen(PORT,()=>{
    console.log(`Escuchando en el puerto: ${PORT}`)
})

const io = new Server(httpServer)

objectConfig.connectDB()

//__________________________________________________________________
const handlebars = require('express-handlebars')

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')
//__________________________________________


app.use(express.json()) 
app.use(express.urlencoded({extended: true}))

app.use('/static', express.static(__dirname+'/public'))

app.use(cookieParser())

app.use('/', viewsRouter)

app.use('/api/usuarios',  userRouter)

app.use('/api/productos', productRouter)

app.post('/single', uploader.single('myfile'), (req, res)=>{
    res.status(200).send({
        status: 'success',
        message: 'se subió correctamente'
    })
})

let messages = []

io.on('connection', socket => {
    console.log('Nuevo cliente conectado')
    socket.on('message', data => {
        messages.push(data)
        io.emit('messageLogs', messages)
    })

    socket.on('authenticated', data => {
        socket.broadcast.emit('newUserConnected', data)
    })

})

app.use((err, req, res, next)=>{
    console.log(err)
    res.status(500).send('Todo mal')
})
