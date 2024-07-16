const { checkInternet } = require('./internet')
const axios = require('axios');

async function internetRequired(req, res, next) {
    const isConnected = await checkInternet();
    if (!isConnected) {
        return res.status(503).json({ msg: 'Sem conexão à internet. Tente novamente mais tarde.' });
    }
    next();
}

async function checkInternetStatus() {
    try {
        await axios.get('https://www.google.com');
        return true;
    } catch (error) {
        return false;
    }
}

module.exports = { internetRequired, checkInternetStatus };