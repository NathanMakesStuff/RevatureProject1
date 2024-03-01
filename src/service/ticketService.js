const ticketDAO = require("../repo/ticketDAO")
const uuid = require('uuid')

async function getMyTickets(username) {
    const items = await ticketDAO.getMyTickets(username);
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

async function processTicket(status, ticketID) {
    const ticket = await ticketDAO.getByID(ticketID)
    let currentStatus = `${ticket.Items[0].status}`
    if(currentStatus != "pending"){
        return null
    }
    const statusID = {
        status: status,
        ticketID: ticketID
    }
    const updatedTicket = await ticketDAO.updateTicket(statusID);
    return updatedTicket.Attributes;
}

async function getPending() {
    const items = await ticketDAO.getPending()
    return items
}

module.exports = {
    getMyTickets,
    submitTicket,
    processTicket,
    getPending
}