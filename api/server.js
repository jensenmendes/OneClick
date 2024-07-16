require('dotenv').config()

//Dependencies
const express = require('express')

//Sequelize
const {
    sequelize,
    Utilizador,
    UserRole,
    Pagamento,
    Funcionario,
    Cliente,
    Venda,
    Caixa,
    Fornecedor,
    Produto,
    CategoriaProduto,
    TipoUtilizador,
    TransacaoVenda,
    Devolucao,
    UserLogin
} = require('./models')

//Instancia do express
const app = express()

//Uso de JSON
app.use(express.json())

app.use(express.urlencoded({
    extended: true
}))

//Rotas

//AUTHENTICATION
const authRoute = require('./routes/auth')

//Utilizador
const userRoute = require('./routes/userRoutes')

//Funcionario
const funcionarioRoute = require('./routes/funcionarioRoutes')

//Produto
const produtoRoute = require('./routes/produtoRoutes')

//Venda
const vendaRoute = require('./routes/vendaRoutes')

//Categoria
const categoriaRoute = require('./routes/categoriaRoutes')

//TVenda
const tVendaRoute = require('./routes/transacaoVendaRoute')

//Caixa
const caixaRoute = require('./routes/caixaRoute')

//Pagamento
const pagamentoRoute = require('./routes/pagamentoRoutes')

//Fornecedor
const fornecedorRoute = require('./routes/fornecedorRoute')

//Devolucao
const devolucaoRoute = require('./routes/devolucaoRoutes')

//FUNÇÕES
const generateToken = require('./modules/sendEmail')

//Uso das rotas

//AUTHENTICATION
app.use('/auth', authRoute)

//Utilizador
app.use('/utilizador', userRoute)

//Funcionario

app.use('/funcionario', funcionarioRoute)

//Produto

app.use('/produto', produtoRoute)

//Venda

app.use('/venda', vendaRoute)

//Categoria

app.use('/categoria', categoriaRoute)

//TvENDA

app.use('/transacaoVenda', tVendaRoute)

//Caixa

app.use('/caixa', caixaRoute)

//Pagamento
app.use('/pagamento', pagamentoRoute)

//Fornecedor
app.use('/fornecedor', fornecedorRoute)

//Devolução
app.use('/devolucao', devolucaoRoute)



app.delete('/truncateALL', async(req, res) => {
    try {
        const userRole = await UserRole.truncate()

        const user = await Utilizador.truncate()

        const funcionar = await Funcionario.truncate()

        const caixa = await Caixa.truncate()

        const venda = await Venda.truncate()

        const categoria = await CategoriaProduto.truncate()

        const fornecedor = await Fornecedor.truncate()

        const cliente = await Cliente.truncate()

        const transacao = await TransacaoVenda.truncate()

        const pagamento = await Pagamento.truncate()

        const produto = await Produto.truncate()

        const tipoUtilizador = await TipoUtilizador.truncate()

        const devolucao = await Devolucao.truncate()

        const userLogin = await UserLogin.truncate()

        //if (userRole & user & funcionar & caixa & venda & categoria & transacao & pagamento) return res.status(200).json({ msg: 'Linhas eliminadas' })

        //if (tipoUtilizador) return res.status(200).json({ msg: 'Linhas eliminadas' })

        res.status(422).json({ msg: 'Erro ao eliminar dados da tabela' })
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Erro interno do servidor' });
    }
})

//Port
const port = process.env.PORT || 8080

app.listen({ port }, async() => {
        await sequelize.sync()
        console.log(`Server is running on http://localhost:${port}`)
        console.log('Database sincronizado')
    }) //