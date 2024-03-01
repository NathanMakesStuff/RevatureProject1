const express = require("express")
const router = express.Router();

const accountService = require("../service/accountService");
const ticketService = require("../service/ticketService");

router.post("/", accountService.authenticateToken, async (req, res) => {
    
    const user = accountService.loggedInUser(req);
    const data = await ticketService.submitTicket(req.body, user.username);
    
    if(data) {
        res.status(data.status).json({ message: data.message, receivedData: req.body})
    }
});

router.get("/", accountService.authenticateToken, async (req, res) => {
    // const ticketQuery = req.query.ticketID; // get ticket by ID
    const pending = req.query.status === 'pending'
    const employeeTicketsQuery = req.query.username;
    if(pending){
        const data = await ticketService.getPending();
        res.status(200).json({ message: "Getting all pending tickets", data })
    } else {
        // const data = await ticketService.getAllTickets();
        res.status(400).json({ message: "Bad Request" })
    }
    
});

router.put("/:ticketID", accountService.authenticateToken, async (req, res) => {
    const user = accountService.loggedInUser(req);
    const data = req.body;
    console.log(req.params.ticketID)
    if ((data.status == "Approved" || data.status == "Denied") && user.role == "Manager"){
        const updatedTicket = await ticketService.processTicket(data.status, req.params.ticketID);
        if(updatedTicket){
            res.status(202).json({message: "Success", updatedTicket})
        } else {
            res.status(400).json({ message: "Already processed" })
        }
    } else {
        res.status(400).json({message: "Invalid role or Input"})
    }
})

router.get("/mytickets", accountService.authenticateToken, async (req, res) => {
    const user = accountService.loggedInUser(req);
    
    const data = await ticketService.getMyTickets(user.username);
    if(data) {
        res.status(200).json({ message: "Getting all submitted tickets", data })
    } else {
        res.status(200).json({ message: "No submitted tickets" })
    }
})


module.exports = router;