const fs = require('fs/promises');
const path = require('path');




class Carrito {
    constructor(){
        this.path = path.join(__dirname, '../database/carrito.json')
        this.carro = []
    }



    async saveCart(prods) {
        const txt = await fs.readFile(this.path, 'utf-8');
        const data = JSON.parse(txt);
        
        const last = data[data.length - 1]
        data.push({
            id: last.id +1,
            timestamp: Date.now(),
            producto: prods
        })

        await fs.writeFile(this.path, JSON.stringify(data, null, 2), "utf8")
    }


    async getAllCart() {
        const cart = await fs.readFile(this.path, 'utf-8')
        const allProds = JSON.parse(cart)
        this.carro.push(allProds)
        return this.carro[0]
    }


    async addToCart(id, prod) {
        const p = await this.getAllCart()
        const r = p.find(i => i.id == id);
        //r.push({producto: prod})
        r.producto.push(prod)
        await fs.writeFile(this.path, JSON.stringify(r, null, 2))
        return r
    }


    async getById(id) {
        const cart = await this.getAllCart()
        const result = cart.find(i=>i.id == id)
        //console.log(result);
        return result
    }


    
}

module.exports = new Carrito()