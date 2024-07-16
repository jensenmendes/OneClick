//conexão internet
async function checkInternet() {
    return new Promise((resolve) => {
        require('dns').lookup('google.com', (err) => {
            if (err && err.code == "ENOTFOUND") {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}

module.exports = { checkInternet };
/*async function checkInternet(cb) {
    require('dns').lookup('google.com', async function(err) {
        if (err && err.code == "ENOTFOUND") {
            cb(false);
        } else {
            cb(true);
        }
    })
}


module.exports = { checkInternet }*/