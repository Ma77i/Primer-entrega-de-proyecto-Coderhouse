const express = require('express');
const { Router } = express;
const Carrito = require('../model/carrito.js')

const router = Router();




// OBTENGO TODOS LOS CARRITOS
router.get('/', async (req, res) => {
    const cart = await Carrito.getAllCart()
    res.status(200).send(cart)
})



// OBTENGO UN CARRITO
router.get('/:id/productos', async (req, res) => {
    const { id } = req.params
    await Carrito.getAllCart()
    const pd = await Carrito.getCart(id)

    res.status(200).send(pd)
})



// CREO CARRITO 
router.post('/', async (req, res) => {
    await Carrito.saveCart(req.body)
    res.sendStatus(201)
})



// CREO UN PRODUCTO
router.post('/:id/productos', async(req, res) => {
    const { body } = req
    const { id } = req.params;

    await Carrito.getAllCart()
    try {
        await Carrito.addToCart(id, body)
        res.sendStatus(201)
    } catch (err) {
        if (err.message === "No existe") {
            res.sendStatus(404)
        } else {
            console.log(err);
            res.sendStatus(500)
        }
    }
})



// BORRO UN CARRITO
router.delete('/:id', async (req, res) => {
    const { id } = req.params
    await Carrito.getAllCart()
    await Carrito.deleteCart(id)
    res.sendStatus(202)
})



// BORRO UN PRODUCTO
router.delete('/:id/productos/:product', async(req, res) => {
    const { id, product } = req.params;
    await Carrito.getAllCart()
    await Carrito.deleteProd(id, product)
    res.sendStatus(202)
})




module.exports = router;
