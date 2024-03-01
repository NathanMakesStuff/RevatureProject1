const ticketDAO = require("../repo/ticketDAO")
const uuid = require('uuid')

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

async function submitTicket(data, username) {
    
    if (parseFloat(data.amount) && data.description.split(' ').join('')) {
        const ticket = {
            ticket_id: uuid.v4(),
            author: username,
            description: data.description,
            type: data.type,
            amount: data.amount,
            status: "pending"
        } 
        console.log(ticket)
        
        const response = await ticketDAO.submitTicket(ticket)
        if(response){

            return {status: 201, message:`Ticket: ${ticket.ticket_id} by ${ticket.author} has been submitted`}
        }
    } else {

        const error = {
            status: 400,
            message: "Failed to post. Must have amount and description" 
        }
        return error
    }
}

module.exports = {
    getAllTickets,
    submitTicket
}