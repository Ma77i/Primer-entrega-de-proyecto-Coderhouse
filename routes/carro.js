const express = require('express');
const { Router } = express;
const path = require('path');
const Carrito = require('../controller/carrito.js')

const router = Router();





router.get('/', async (req, res) => {
    const cart = await Carrito.getAllCart()
    res.status(200).send(cart)
    console.log("Get Carrito");
})





router.post('/', async (req, res) => {
    await Carrito.saveCart(req.body)
    res.sendStatus(201)
    console.log("Guardado en el carrito");
    
})



router.post('/:id/productos', async(req, res) => {
    const { body } = req
    const { id } = req.params;

    const getId = await Carrito.getById(id)
    console.log(getId)

    if (!getId) {
        res.status(404).send("not found")
        return
    }
    
    try {
        await getId.addToCart(id, body)
        res.status(201)
    } catch (err) {
        if (err.message === "No existe") {
            res.sendStatus(404)
        } else {
            console.log(err);
            res.sendStatus(500)
        }
    }
    res.send(getId)
})





router.get('/:id/productos', (req, res) => res.status(200))


router.delete('/', (req, res) => res.status(200))
router.delete('/', (req, res) => res.status(200))

module.exports = router;
