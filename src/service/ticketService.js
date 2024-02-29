const ticketDAO = require("../repo/ticketDAO")

async function getAllTickets() {
    // if (ticketQuery) { // should return single ticket if requested by that user/manager
    //     const ticket = await ticketService.getTicketByID(ticketQuery);
    //     res.status(200).json({ message: `Retrieved ticket by ticketID ${ticketQuery}`, ticket })
    // } else if (employeeTicketsQuery) { //should return all tickets from specific username if requested by user/manager
    //     const tickets = await ticketService.getTicketByUName(employeeTicketsQuery);
    //     res.status(200).json({ message: `Retrieved tickets by username ${employeeTicketsQuery}`, tickets })
    // }
    // // should return all tickets that specific account has access to. Reverts back to TicketByUName if not manager
    const items = await ticketDAO.getAllTickets();
    return items
}

module.exports = {
    getAllTickets
}