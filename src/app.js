const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser')

const objectConfig = require('./config/objetConfig.js')
const appRouter = require('./routes')

const FileStore  = require('session-file-store')
const {create} = require('connect-mongo') 

const handlebars = require('express-handlebars')
const { connect } = require('mongoose')

const { initPassport, initPassortGithub } = require('./config/passport.config.js')
const passport = require('passport')

const { Server } = require('socket.io')

const app = express()
const PORT = 8080 

const httpServer = app.listen(PORT,()=>{
    console.log(`Escuchando en el puerto: ${PORT}`)
})

const io = new Server(httpServer)

objectConfig.connectDB()

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')

app.use(express.json()) 
app.use(express.urlencoded({extended: true}))

app.use('/static', express.static(__dirname+'/public'))
app.use(cookieParser('P@l@braS3cr3t0'))

app.use(session({
        store: create({
            mongoUrl: 'mongodb://localhost:27017/comision39750',
            mongoOptions: {
                useNewUrlParser: true,
                useUnifiedTopology: true
            },
            ttl: 1000000*6000
        }),
        secret: 'secretCoder',
        resave: false,
        saveUninitialized: false
})) 

initPassortGithub()
passport.use(passport.initialize())
passport.use(passport.session())

app.use(appRouter)

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
