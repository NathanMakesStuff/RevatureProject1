const accountDAO = require("../repo/accountDAO");

async function register(body) {
    // if(body.role){
    //     const account = await accountDAO.registerAcc(body.username, body.password, body.role);
    //     if (account) {
    //         return account;
    //     } 
    // } else {
    //     const account = await accountDAO.registerAcc(body.username, body.password, "Employee");
        
    //         return account;
        
    // }

    const account = await accountDAO.registerAcc(body.username, body.password, 
        body.role = body.role || "Employee");
    if (account) {
        return account;
    }
}

async function login(body) {
    let account = await accountDAO.login(body.username, body.password);
    if (account) {
        return account;
    } else return null;
}

module.exports = {
    register,
    login
}