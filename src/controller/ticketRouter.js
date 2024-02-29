const express = require("express")
const router = express.Router();

const accountService = require("../service/accountService");
const ticketService = require("../service/ticketService");

router.post("/submit", accountService.authenticateToken, async (req, res) => {
    const data = await ticketService.submit(req.body);
    if (data) {
        res.status(201).json({ message: "Ticket submitted", data });
    } else {
        res
            .status(400)
            .json({ message: "Failed to post", receivedData: req.body });
    }
});

router.get("/", accountService.authenticateToken, async (req, res) => {
    const ticketQuery = req.query.ticketID; // get ticket by ID
    const employeeTicketsQuery = req.query.username;
    if(ticketQuery){

    }
    const data = await ticketService.getAllTickets();
    res.status(200).json({ message: "Getting all tickets", data})
});


module.exports = router;