//Gerar Username
function generateUsername(firstName, lastName) {
    var num = Math.floor(Math.random() * 900) + 100;
    const username = firstName.toLowerCase() + '' + lastName.toLowerCase() + '' + num
    return username
}

//Gerar random password
function generateRandomPassword() {
    const length = 8; // Tamanho da senha
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters.charAt(randomIndex);
    }

    return password;
}

module.exports = {
    generateRandomPassword,
    generateUsername
}