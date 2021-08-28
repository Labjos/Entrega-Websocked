const express= require( "express")
const { Server:HttpServer } = require("http")
const handlebars = require('express-handlebars')
const { Server:IOServer } = require('socket.io')
const app= express()
const httpServer=new HttpServer(app)
const io= new IOServer(httpServer, {
    cors: {
        origin:'http://localhost:3000'
    }
})
const emoji = require('node-emoji')

io.on('connection', async socket => {

    const products = await contProductos.getAll()
    socket.emit('productos, products')

    socket.on('update', async producto => {
        await contProductos.saveNewProduct(producto)
        io.socket.emit('productos', products)
    })
    
})

setTimeout(() => {
    io.sockets.emit('connectionMessage', 'Recuerde comportarse correctamente') 
}, 2000)


const Contenedor = require('./container')
//const productos = require('../src/productos')

const { Router } = express

//const { SocketAddress } = require("net")

app.engine('hbs', handlebars({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
})
)

app.set('views', './src/views')
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
    res.render('main', {})
})

app.use(express.json())
app.use(express.urlencoded({entended: true }))
app.use(express.static('public'))

const routerProducto = new Router()

let contenedor = new Contenedor('./src/productos.json')

routerProducto.get('/', async (req, res) => {
    const lista = await contenedor.getAll()
    res.send(lista)
        
    })

routerProducto.get('/:id:', async (req, res) => {
        const { id } = req.params
        const productById = await contenedor.getBYId(id)
        if(productById) {
            res.send(productById)
        } else {
            res.send(`No existe un Producto con ID ${id} `)
        }
            
        })
    
routerProducto.post('/',async (req, res) => {

    const { body } = req
    await contenedor.saveNewProduct(body);
    res.send(body)
    })

app.use('api/productos', routerProducto)
httpServer.listen(8080, () => console.log(emoji.get('computer'),'Server started on 8080'))
