const express = require("express")
const router = express.Router();

const ticketService = require("../service/ticketService");

router.post("/submit", async (req, res) => {
    const data = await ticketService.submit(req.body);
    if (data) {
        res.status(201).json({ message: "Ticket submitted", data });
    } else {
        res
            .status(400)
            .json({ message: "Failed to post", receivedData: req.body });
    }
});

router.get("/tickets", async (req, res) => {
    const ticketQuery = req.query.ticketID; // get ticket by ID
    const employeeTicketsQuery = req.query.username;
    if (ticketQuery) { // should return single ticket if requested by that user/manager
        const ticket = await ticketService.getTicketByID(ticketQuery);
        res.status(200).json({ message: `Retrieved ticket by ticketID ${ticketQuery}`, ticket})
    } else if (employeeTicketsQuery) { //should return all tickets from specific username if requested by user/manager
        const tickets = await ticketService.getTicketByUName(employeeTicketsQuery);
        res.status(200).json({message: `Retrieved tickets by username ${employeeTicketsQuery}`, tickets})
    }
    // should return all tickets that specific account has access to. Reverts back to TicketByUName if not manager
    const data = await ticketService.getAllTickets(req.body); 
    if (data) {
        res.status(201).json({ message: "Ticket Data Retrieved", data });
    } else {
        res
            .status(400)
            .json({ message: "Failed to retrieve data", receivedData: req.body });
    }
});


module.exports = router;