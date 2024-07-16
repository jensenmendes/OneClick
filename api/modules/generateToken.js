require('dotenv').config
const jwt = require('jsonwebtoken')

function generateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ msg: 'Acesso não permitido' });
    }

    try {
        const secret = process.env.ACCESS_TOKEN_SECRET

        jwt.verify(token, secret);
        next();
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'SERVER ERROR' })
    }
}

module.exports = { generateToken }