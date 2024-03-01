const express = require("express")
const router = express.Router();

const accountService = require("../service/accountService");
const ticketService = require("../service/ticketService");

router.post("/", accountService.authenticateToken, async (req, res) => {
    // if(parseFloat(req.body.amount) && req.body.description.split(' ').join('')) {

    //     const data = await ticketService.submitTicket(req.body);
    //     if (data) {
    //         res.status(201).json({ message: "Ticket submitted", data });
    //     } else {
    //         res
    //             .status(400)
    //             .json({ message: "Failed to post", receivedData: req.body });
    //     }
    // } else {
    //     res
    //         .status(400)
    //         .json({ message: "Failed to post. Must have amount and description", receivedData: req.body });
    // }
    const user = accountService.loggedInUser(req);
    const data = await ticketService.submitTicket(req.body, user);
    
    if(data) {
        res.status(data.status).json({ message: data.message, receivedData: req.body})
    }
});

router.get("/", accountService.authenticateToken, async (req, res) => {
    const ticketQuery = req.query.ticketID; // get ticket by ID
    const employeeTicketsQuery = req.query.username;
    if(ticketQuery){

    } else {
        const data = await ticketService.getAllTickets();
        res.status(200).json({ message: "Getting all tickets", data })
    }
    
});


module.exports = router;