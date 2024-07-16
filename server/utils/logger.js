const winston = require('winston');
const path = require('path');

// Crie uma instância do logger com configuração personalizada
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level.toUpperCase()}] - ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console(), // Logar no console
        new winston.transports.File({ filename: path.join(__dirname, 'combined.log') }), // Logar em um arquivo combinado
        new winston.transports.File({ filename: path.join(__dirname, 'error.log'), level: 'error' }) // Logar apenas erros em um arquivo separado
    ],
});

// Exportar o logger para ser usado em outros arquivos
module.exports = logger;