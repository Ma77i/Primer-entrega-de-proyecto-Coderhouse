const express = require('express');
const app = express();
const path = require('path')
const PORT = process.env.PORT || 3000


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/static", express.static(path.join(__dirname, "public")))


const productRouter = require("./routes/productos")
const tiendaRouter = require("./routes/tienda")
const homeRouter = require('./routes/home')
const addProdRouter = require('./routes/addProd');
const carroRouter = require('./routes/carro');

app.use("/", homeRouter)
app.use("/add", addProdRouter)
app.use("/productos", tiendaRouter)
app.use("/api/productos", productRouter)
app.use("/api/carrito", carroRouter)


const server = app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
server.on('err', (err) => {
    console.log(`Error: ${err}`);
})