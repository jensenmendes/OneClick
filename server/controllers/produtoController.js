//IMPORTAÇÃO
const { createProduct, getOneProduct, getProducts, updateProduct, deleteProduct, checkProduct } = require('../dbModels/produtoModel')
const { checkSupplier } = require('../dbModels/fornecedorModel')
const { checkCategoria } = require('../dbModels/categoriaModel')
const { getRole } = require('../dbModels/userModel')
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const path = require('path');

//Import caminho de imagem
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './img');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Nome do arquivo com timestamp
    }
});

const upload = multer({ storage: storage });

//Create Product
newProduto = [upload.single('imagem'), async(req, res) => {
    //get token
    const accessToken = req.cookies.token

    if (!accessToken) return res.status(401).json('Token não encontrado')

    //Insert produtos data
    const { nomeProduto, quantidade, preco, custo, estado, fornecedor, categoria } = req.body

    const imagem = req.file ? req.file.path : null

    console.log('Caminho: ', imagem)

    //verificar campos
    if (!nomeProduto || !quantidade || !preco || !custo || !estado || !fornecedor || !categoria) return res.status(422).json({ msg: 'Preencha os campos.' })


    try {

        //verify token
        const decodedToken = jwt.verify(accessToken, process.env.SECRET);

        const id = decodedToken.id;

        //get funcao user logged
        const userFuncao = await getRole(id)

        //verifica se user exist
        if (!userFuncao) {
            logger.error('Utilizador não encontrado!')
            return res.status(422).json({ msg: 'Utilizador não encontrado!' })
        }

        //Verificar se user tem permissao para criar
        if (userFuncao !== 'Gerente') {
            logger.error('Não tem permissão para criar fornecedores!')
            return res.status(422).json({ msg: 'Não tem permissão para criar fornecedores!' })
        }

        //Check if exist Fornecedor
        const idFornecedor = await checkSupplier(fornecedor)

        //Check if exist Categoria
        const idCategoria = await checkCategoria(categoria)

        if (!idFornecedor || !idCategoria) {
            logger.error('Categoria ou Fornecedor não encontrado!')
            return res.status(422).json({ msg: 'Categoria ou Fornecedor não encontrado!' })
        }

        //check if exist produto
        const existeProduto = await checkProduct(nomeProduto)

        if (existeProduto) {
            const getId = existeProduto
            const uptProduto = await updateProduct(getId, nomeProduto, quantidade, preco, custo, estado, idFornecedor, idCategoria)
            if (!uptProduto) {
                logger.error('Erro ao atualizar dados do produto!')
                return res.status(422).json({ msg: 'Erro ao atualizar dados do produto!' })
            }

            logger.info('Produto atualizado com sucesso!')
            return res.status(201).json({ msg: `Produto atualizado com sucesso!` })
        }

        //add produto
        const result = await createProduct(nomeProduto, quantidade, preco, custo, estado, imagem, idFornecedor, idCategoria)

        //check produto is insert in db
        if (!result) {
            logger.error('Erro ao adicionar novo produto!')
            return res.status(422).json({ msg: 'Erro ao adicionar novo produto!' })
        }

        //Sucesso na adição de novo Produto
        logger.info('Produto adicionado com sucesso!')
        res.status(201).json({ msg: `Produto adicionado com sucesso!` })

    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}]

//Listar Produto
listProdutos = async(req, res) => {
    //get token
    const accessToken = req.cookies.token

    if (!accessToken) return res.status(401).json('Token não encontrado')

    try {

        //verify token
        const decodedToken = jwt.verify(accessToken, process.env.SECRET);

        const id = decodedToken.id;


        //get funcao user logged
        const userFuncao = await getRole(id)

        //verifica se user exist
        if (!userFuncao) {
            logger.error('Utilizador não encontrado!')
            return res.status(422).json({ msg: 'Utilizador não encontrado!' })
        }

        //Verificar se user tem permissao para listar
        if (userFuncao !== 'Gerente') {
            logger.error('Não tem permissão para listar produtos!')
            return res.status(422).json({ msg: 'Não tem permissão para listar produtos!' })
        }

        //get produtos
        const result = await getProducts()

        //check if is correctly
        if (!result) {
            logger.error('Erro ao listar produtos!')
            return res.status(422).json({ msg: 'Erro ao listar produtos!' })
        }

        //IS OKAY
        return res.status(200).json(result)

    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

//Listar One Produto
listaOneProduto = async(req, res) => {
    //Get id by params
    const { getId } = req.params

    //get token
    const accessToken = req.cookies.token

    if (!accessToken) return res.status(401).json('Token não encontrado')

    try {

        //verify token
        const decodedToken = jwt.verify(accessToken, process.env.SECRET);

        const id = decodedToken.id;


        //get funcao user logged
        const userFuncao = await getRole(id)

        //verifica se user exist
        if (!userFuncao) {
            logger.error('Utilizador não encontrado!')
            return res.status(422).json({ msg: 'Utilizador não encontrado!' })
        }

        //Verificar se user tem permissao para listar
        if (userFuncao !== 'Gerente') {
            logger.error('Não tem permissão para listar produto!')
            return res.status(422).json({ msg: 'Não tem permissão para listar produto!' })
        }

        //get produto
        const result = await getOneProduct(getId)

        //check if is correctly
        if (!result) {
            logger.error('Erro ao listar produto!')
            return res.status(422).json({ msg: 'Erro ao listar produto!' })
        }

        //IS OKAY
        return res.status(200).json(result)

    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

//Update Product
atualizarProduto = async(req, res) => {
    const { getId } = req.params
    const { nomeProduto, quantidade, preco, custo, estado, fornecedor, categoria } = req.body

    if (!nomeProduto || !quantidade || !preco || !custo || !estado || !fornecedor || !categoria) return res.status(422).json({ msg: 'Preencha os campos.' })

    //get token
    const accessToken = req.cookies.token

    if (!accessToken) return res.status(401).json('Token não encontrado')

    try {

        //verify token
        const decodedToken = jwt.verify(accessToken, process.env.SECRET);

        const id = decodedToken.id;

        //get funcao user logged
        const userFuncao = await getRole(id)

        //verifica se user exist
        if (!userFuncao) {
            logger.error('Utilizador não encontrado!')
            return res.status(422).json({ msg: 'Utilizador não encontrado!' })
        }


        //Verificar se user tem permissao para listar
        if (userFuncao !== 'Gerente') {
            logger.error('Não tem permissão para atualizar produto!')
            return res.status(422).json({ msg: 'Não tem permissão para atualizar produto!' })
        }

        //Check if exist Fornecedor
        const idFornecedor = await checkSupplier(fornecedor)

        //Check if exist Categoria
        const idCategoria = await checkCategoria(categoria)

        if (!idFornecedor || !idCategoria) {
            logger.error('Categoria ou Fornecedor não encontrado!')
            return res.status(422).json({ msg: 'Categoria ou Fornecedor não encontrado!' })
        }

        //Atualizar produto
        const result = await updateProduct(getId, nomeProduto, quantidade, preco, custo, estado, idFornecedor, idCategoria)

        //check if is okay
        if (!result) {
            logger.error('Erro ao atualizar o produto!')
            return res.status(422).json({ msg: 'Erro ao atualizar o produto!' })
        }

        //Okay
        logger.info('Produto atualizado com sucesso')
        return res.status(200).json({ msg: 'Produto atualizado com sucesso' })

    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

//Eliminar Produto
eliminarProduto = async(req, res) => {
    //Get id by params
    const { getId } = req.params

    //get token
    const accessToken = req.cookies.token

    console.log('Token access: ', accessToken)

    if (!accessToken) return res.status(401).json('Token não encontrado')

    try {

        //verify token
        const decodedToken = jwt.verify(accessToken, process.env.SECRET);

        const id = decodedToken.id;


        //get funcao user logged
        const userFuncao = await getRole(id)

        //verifica se user exist
        if (!userFuncao) {
            logger.error('Utilizador não encontrado!')
            return res.status(422).json({ msg: 'Utilizador não encontrado!' })
        }

        //Verificar se user tem permissao para eliminar
        if (userFuncao !== 'Gerente') {
            logger.error('Não tem permissão para eliminar produto!')
            return res.status(422).json({ msg: 'Não tem permissão para eliminar produto!' })
        }

        //delete Produto
        const result = await deleteProduct(getId)

        //check if is correctly
        if (!result) {
            logger.error('Erro ao eliminar produto!')
            return res.status(422).json({ msg: 'Erro ao eliminar produto!' })
        }

        //IS OKAY
        logger.info('Produto eliminado com sucesso!')
        return res.status(200).json({ msg: 'Produto eliminado com sucesso!' })

    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

module.exports = {
    newProduto,
    listProdutos,
    listaOneProduto,
    atualizarProduto,
    eliminarProduto
}