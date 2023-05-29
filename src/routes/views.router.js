const { Router } = require('express')

const router = Router()

router.get('/login', (req, res) => {
    res.render('login', {
        style: 'index.css'
    })
})

router.get('/register', (req, res) => {
    res.render('registerForm', {
        style: 'index.css'
    })
})

let food = [
  {name: 'Hamburguesa', price: 150},
  {name: 'producto 1', price: 250},
  {name: 'producto 2', price: 350},
  {name: 'producto 3', price: 450},
  {name: 'producto 4', price: 550},
]

const users = [
  {
    nombre: 'Juan',
    apellido: 'Pérez',
    edad: 25,
    correo: 'juanperez@gmail.com',
    telefono: '555-1234',
    role: 'user'
  },
  {
    nombre: 'María',
    apellido: 'García',
    edad: 30,
    correo: 'mariagarcia@gmail.com',
    telefono: '555-5678',
    role: 'admin'
  },
  {
    nombre: 'Pedro',
    apellido: 'López',
    edad: 20,
    correo: 'pedrolopez@gmail.com',
    telefono: '555-9012',
    role: 'user'
  },
  {
    nombre: 'Ana',
    apellido: 'Ramírez',
    edad: 35,
    correo: 'anaramirez@gmail.com',
    telefono: '555-3456',
    role: 'admin'
  },
  {
    nombre: 'Luis',
    apellido: 'Fernández',
    edad: 40,
    correo: 'luisfernandez@gmail.com',
    telefono: '555-7890',
    role: 'user'
  }
];

router.get('/chat', (req, res)=>{
  res.render('chat', {})
})

router.get('/', (req, res)=>{

  let user = users[Math.floor( Math.random() * users.length )]

  let testUser = {
      title: 'Tiendita',
      user,
      isAdmin: user.role === 'admin',
      food,
      style: 'index.css'
  }

  res.render('index', testUser)
})

module.exports = router
