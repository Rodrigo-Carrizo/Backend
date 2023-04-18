const express = require('express')
const cookieParser = require('cookie-parser')

const { uploader } = require('./utils/multer')
const userRouter = require('./routes/users.router')
const productRouter = require('./routes/products.router')
const viewsRouter = require('./routes/views.router')

const { Server } = require('socket.io')

const app = express()
const PORT = 8080

const httpServer = app.listen(PORT,()=>{
    console.log(`Escuchando en el puerto: ${PORT}`)
})

const io = new Server(httpServer)


const handlebars = require('express-handlebars')
const { socketChat } = require('./utils/socketChat')
const { socketProduct } = require('./utils/socketProduct')

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')


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

socketChat(io)
socketProduct(io)

app.get('/chat', (req, res)=>{
    res.render('chat', {})
})

io.on('connection', socket => {
    console.log('Nuevo cliente conectado')
    console.log(socket.id)

    let logs = []
    socket.on("message1",data=>{
        io.emit('log',data)
    })

    socket.on("message2",data=>{
        
        logs.push({socketid:socket.id,message:data})

        io.emit('log',{logs});
    })
})

app.use((err, req, res, next)=>{
    console.log(err)
    res.status(500).send('Todo mal')
})

