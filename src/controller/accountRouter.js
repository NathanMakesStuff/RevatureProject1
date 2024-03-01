const express = require("express")
const router = express.Router();

const accountService = require("../service/accountService");

router.post("/register", async (req, res) => {
    if(req.body.password && req.body.username.split(' ').join('')) {
        const data = await accountService.register(req.body);
        if (data) {
            res.status(201).json({ message: `Created Account: ${req.body.username}`, data });
        } else {
            res
                .status(400)
                .json({ message: "Account was not created. Username in use", receivedData: req.body });
        }
    } else {
        res
            .status(400)
            .json({ message: "Account was not created. There must be a password and username", receivedData: req.body });
    }
    
});

router.post("/login", async (req, res) => {
    const data = await accountService.login(req.body);
    if (data) {
        res.status(201).json({ message: "Login Successful", data });
    } else {
        res
            .status(400)
            .json({ message: "Invalid Login", receivedData: req.body });
    }
});



module.exports = router;