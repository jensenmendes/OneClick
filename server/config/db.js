require('dotenv').config()

const dbconfig = {
    server: 'localhost',
    database: 'OneClick',
    user: 'Mendes', // Adicione seu user SQL Server
    password: 'Jensen4321', // Adicione sua senha SQL Server
    options: {
        encrypt: true, // Se você estiver usando SSL, ajuste conforme necessário
        trustServerCertificate: true, // Somente para desenvolvimento
        enableArithAbort: true,
        instanceName: 'SQLEXPRESS', // Se você estiver usando uma instância nomeada
        trustedConnection: true, // Para autenticação do Windows
        port: 57805
    },

};

module.exports = dbconfig;