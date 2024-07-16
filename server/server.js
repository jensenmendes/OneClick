//Bibliotecas
const express = require('express')
require('dotenv').config()
const cookieParser = require('cookie-parser')

//Instancia do express
const app = express()

//Uso de JSON
app.use(express.json())

app.use(express.urlencoded({
    extended: true
}))

//Uso do cookie
app.use(cookieParser())


//funções
const { atualizarEstadoDesconto } = require('./utils/atualizarEstadoDesconto')

//Rotas
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const categoriaRoutes = require('./routes/categoriaRoutes')
const fornecedorRoutes = require('./routes/fornecedorRoutes')
const produtoRoutes = require('./routes/produtoRoutes')
const metodoPagamentoRoutes = require('./routes/metodoPagamentoRoutes')
const pdvRoutes = require('./routes/pdvRoutes')
const descontoRoutes = require('./routes/descontoRoutes')
const clienteRoutes = require('./routes/clienteRoutes')
const fluxoCaixaRoutes = require('./routes/fluxoCaixaRoutes')


//AUTH ROUTE
app.use('/auth', authRoutes)

//User Route
app.use('/user', userRoutes)

//Categoria Route
app.use('/categoria', categoriaRoutes)

//Fornecedor Route
app.use('/fornecedor', fornecedorRoutes)

//Produto Route
app.use('/produto', produtoRoutes)

//Metodo Pagamento Route
app.use('/metodoPagamento', metodoPagamentoRoutes)

//PDV ROUTES
app.use('/pdv', pdvRoutes)

//Desconto Routes
app.use('/desconto', descontoRoutes)

//Cliente Routes
app.use('/cliente', clienteRoutes)

//Fluxo Caixa Routes
app.use('/fluxoCaixa', fluxoCaixaRoutes)

//Funções automaticas

//Estado desconto atualiza automaticamente se for criado
atualizarEstadoDesconto()

//Port
const port = process.env.PORT || 8080

app.listen({ port }, async() => {
    //await sequelize.sync()
    console.log(`Server is running on http://localhost:${port}`)
    console.log('Database sincronizado')
})