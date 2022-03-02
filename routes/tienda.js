const express = require('express')
const path = require('path')
const { Router } = express

const router = Router()

const Contenedor = require(path.join(__dirname, "../model/contenedor.js"));

const products = new Contenedor(path.join(__dirname, "../database/data.json"))


router.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, "../public/productos.html"))})


module.exports = router