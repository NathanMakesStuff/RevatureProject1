const accountDAO = require("../repo/accountDAO");
const jwt = require("jsonwebtoken")

const secretKey = "asdjsahdsajkdashj"

async function register(body) {

    const account = await accountDAO.registerAcc(body.username, body.password,
        body.role = body.role || "Employee"); //Optional assignment of role. Default role Employee

    return account;
}

async function login(body) {
    let account = await accountDAO.login(body.username, body.password);
    if (account) {
        const token = jwt.sign(
            {
                username: `${account.username}`,
                role: `${account.role}`
            },
            secretKey,
            {
                expiresIn: "15m",
            }
        )
        return token;
    }
    return null;
}


function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        res.status(401).json({ message: "Unauthorized Access" });
        return;
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            res.status(403).json({ message: "Forbidden Access" });
            return;
        }
        req.username = user;
        next();
    });
}

function loggedInUser(req) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    let user = jwt.verify(token, secretKey);
    return user;
}

module.exports = {
    register,
    login,
    authenticateToken,
    loggedInUser
}