const express = require("express");
const exphbs = require("express-handlebars");
const PORT = 3333;
const conn = require('./db/conn')

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars")

app.use(express.static('public'));

// Importar as rotas 
const productRouter = require('./routers/productRouter')
// usar as rotas -> http://localhost:3333/product

// Usar as rotas 
app.use('/product', productRouter)

app.listen(PORT, () => {
  console.log(`Servidor batendo na port: ${PORT}`);
});
