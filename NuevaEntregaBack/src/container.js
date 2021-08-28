
const fs = require('fs');
//generar Productos

 const p1 ={
    marca: "Nero",
    precio: 620,
    imagen: "../imagenes/nero.JPG"
            
 }

const p2 ={
   marca: "Myrica",
   precio: 1400,
   imagen: "../imagenes/myrica.JPG"
           
   }

//implementar programa con clase contenedor y generar archivo de productos

class Contenedor { 
  constructor(archivo) {
    this.archivo = archivo
    this.id = 0
    this.data = []
  }
  
//save object recibe objeto, lo guarda y lo devuelve por ID

async save(objeto) {
  await this.getAll()
  this.id++
  this.data.push({
    id: this.id,
    product: objeto
    })

    try {
      await fs.promises.writeFile(this.archivo, JSON.stringify(this.data))
    } catch (error) {
      console.log(error)
      
    }
    
  } 

//getByID Number, objeto recibe ID deuelve objet o null si no est[a en la lista

  async getById(id) {
  const items = await fs.promises.this.getAll();
  return JSON.parse(items).find(item => item.id === id);
}

//getAll, devuelve Array con todos los productos

async getAll() {
  try {
    const data = await fs.promises.readFile(this.archivo, 'utf-8')
    if (data) {
      this.data = JSON.parse(data)
      this.data.map((productos) => {
        if(this.id < productos.id) this.id = productos.id
      })
     
    }
  } catch (error) {
    return
  }
 }

//deletebyI, number elimina del archivo por ID buscado

  async deleteById(id) {
  const file = await fs.promises.this.readFile(this.filename)
  .catch(async (error) => {
    if (error.code == 'ENOENT') {
      console.log('file not found')
    }
    throw error
  })
  
  const updatedItems = JSON.parse(file).filter(item => item.id !== id)

  await this.writeFile(this.filename, JSON.stringify(updatedItems)).catch(err => console.log(err));
  await this.readFile(this.filename).catch(err=>console.log(err));    
}

//deleteAll, elimina todos los archivos

  deleteAll() {
  try {
    fs.unlinkSync(this.filename)
    return null
  } catch(error) {
    if (error?.code === 'ENOENT') {
      console.log('file not found');
      return null
    }
    return error
  }

}

 async updateById (id, newProduct) {
  let lista = await this.getAll()

  const index =lista.findIndex(productos => productos.id == id)
  let producto = lista[index]
}

}
const listaProductos = new Contenedor('archivo.txt')

async function correrAsin() {

await listaProductos.save(p1)
await listaProductos.save(p2)
}

correrAsin()

module.exports = Contenedor
/*
const products = requiere('./productos.js')
let pro = new Contenedor ('./productos.json')

const saveAll = async (products) => {
  for (product of products)
      try {
          await pro.saveNewProduct(product)
          } catch (error) {
            console.log(error)
          }
}
saveAll(products)
  .then(() => pro.getAll())
  .then( data => console.log(data))
  .catch( error = console.log(error))
*/

