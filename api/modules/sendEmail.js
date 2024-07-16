const randomstring = require('randomstring');
//Generate Token
function generateToken(email) {
    const token = randomstring.generate({
        length: 20, // Comprimento do token desejado
        charset: 'alphanumeric' // Caracteres permitidos no token (letras maiúsculas, minúsculas e números)
    });
    return token;
}

module.exports = generateToken