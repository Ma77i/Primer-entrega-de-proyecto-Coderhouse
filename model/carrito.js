const fs = require('fs/promises');
const path = require('path');




class Carrito {
    constructor(){
        this.path = path.join(__dirname, '../database/carrito.json')
        this.carro = []
    }



// CREAR CARRITO
    async saveCart(prods) {
        const txt = await fs.readFile(this.path, 'utf-8');
        const data = JSON.parse(txt);
        
        const last = data[data.length - 1]
        data.push({
            id: last.id +1,
            timestamp: Date.now(),
            producto: [prods]
        })
        await fs.writeFile(this.path, JSON.stringify(data, null, 2), "utf8")
    }



//OBTENER TODOS LOS PRODUCTOS
    async getAllCart() {
        const cart = await fs.readFile(this.path, 'utf-8')
        const allProds = JSON.parse(cart)
        this.carro = allProds
        return this.carro
    }



// OBTENER CARRITO 
    async getCart(id){
        const pd = await this.getAllCart()
        const rs = pd.find(i => i.id == id);
        if (!rs) {
            throw new Error("NO existe")

        }
        return rs
    }



// AGREGAR PRODUCTO AL CARRITO
    async addToCart(id, prod) {
        const rs = await this.getCart(id)

        rs.producto.push(prod)
        
        await fs.writeFile(this.path, JSON.stringify(this.carro, null, 2))
        return rs
    }



// BORRAR PRODUCTO DEL CARRITO
    async deleteProd(id, idProd) {
        const rs = await this.getCart(id)
        rs.producto = rs.producto.filter(i => i.id != idProd);
        await fs.writeFile(this.path, JSON.stringify(this.carro, null, 2))
        return rs
    }



// BORRAR CARRITO
    async deleteCart(id) {
        const pd = await this.getAllCart()
        const rs = pd.filter(i => i.id != id)
        await fs.writeFile(this.path, JSON.stringify(rs, null, 2))
        return rs
    }



//BORRAR TODOS LOS CARRITOS
    async deleteAll(){
        const rs = []
        await fs.writeFile(this.path, JSON.stringify(this.carro, null, 2))
        return rs
    }
    
    
    
    
    
    
    
    
    
    

}


module.exports = new Carrito()