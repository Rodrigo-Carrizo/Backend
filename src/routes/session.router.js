const {Router} = require('express')
const { auth } = require('../middlewares/autenticacion.middleware')
const { userModel } = require('../models/user.model')
const { createHash, isValidPassword } = require('../utils/bcryptHash')
const passport = require('passport')
const { generateToken } = require('../utils/jwt')
const { passportCall } = require('../passport-jwt/passportCall')
const { authorizaton } = require('../passport-jwt/authorizarionJwtRole')

const router = Router()

router.post('/login', async (req, res)=> {
    const {email, password} = req.body

    const access_token = generateToken({
        first_name: 'rodrigo',
        last_name: 'carrizo',
        email: 'rc@gmail.com',
        role: 'user'
    })
    
    res
    .cookie('coderCookieToken', access_token,{
        maxAge: 60*60*100,
        httpOnly: true
    })
    .send({
        status: 'success',
        message: 'login success'
    })
})

router.get('/current', passportCall('jwt'), authorizaton('user'), (req, res)=>{
    res.send(req.user)
})


router.post('/register', async (req, res) => {
    try {
        const {username,first_name, last_name, email, password} = req.body 
       
        let token = generateToken({
            first_name: 'rodrigo',
            last_name: 'Osandon',
            email: 'rc@gmail.com'
        })
    
    
        res.status(200).send({
            status: 'success',
            message: 'Usuario creado correctamente',
            token
        })
    } catch (error) {
        console.log(error)
    }
   
})

router.get('/logout', (req, res)=>{
    req.session.destroy(err=>{
        if (err) {
            return res.send({status: 'error', error: err})
        }
        res.send('logout ok')
    })
})

router.post('/restaurarpass', async (req, res) => {
    const { email, password } = req.body;
  
    const userDB = await userModel.findOne({ email });
  
    if (!userDB) {
      return res.status(401).send({status: 'error', message: 'El usuario no existe'})
    }    
  
    userDB.password = createHash(password)
    await userDB.save()
  
    res.status(200).json({status: 'success', message:'Contraseña actualizada correctamente'});
  })

router.get('/counter', (req, res)=> {
    if (req.session.counter) {
        req.session.counter ++
        res.send(`se ha visitado el sitio ${req.session.counter} veces.`)
    } else {
        req.session.counter = 1
        res.send('Bienvenido')
    }
})

router.get('/privada', auth,(req,res) => {

    res.send('Todo lo que esta acá solo lo puede ver un admin loagueado')
})

module.exports = router
