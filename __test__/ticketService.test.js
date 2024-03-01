const ticketService = require("../src/service/ticketService")
const ticketDAO = require("../src/repo/ticketDAO")

jest.mock('../src/repo/ticketDAO')

describe('Ticket Submit', () => {


    let daoOutput = `{
            "httpStatusCode": 200,
            "requestId": "GSD6C77QA99KAO6EGT6ORJD0ORVV4KQNSO5AEMVJF66Q9ASUAAJG",
            "attempts": 1,
            "totalRetryDelay": 0
        }`

    beforeEach(() => ticketDAO.submitTicket.mockClear())

    test(`ticketService.submitTicket() should use ticketDAO.submitTicket to create a ticket
        using req.body and username from ticketRouter`, async () => {
        let data = ({
            description: "Travel Expenses",
            type: "Travel",
            amount: 2245.67
        })
        ticketDAO.submitTicket.mockReturnValue(daoOutput)

        const result = await ticketService.submitTicket(data, "username")

        expect(ticketDAO.submitTicket).toHaveBeenCalled();
        expect(ticketDAO.submitTicket).toHaveReturned();
        expect(result.status).toBe(201)
    })

    test(`ticketService.submitTicket() should return status 400 if description is empty`, async () => {
        let data = ({
            description: "",
            type: "Travel",
            amount: 2245.67
        })
        ticketDAO.submitTicket.mockReturnValue(daoOutput)

        const result = await ticketService.submitTicket(data, "username")

        expect(ticketDAO.submitTicket).not.toHaveBeenCalled();
        expect(result.status).toBe(400)
    })

    test(`ticketService.submitTicket() should return status 400 if amount is empty`, async () => {
        let data = ({
            description: "Travel Expenses",
            type: "Travel",
            amount: ""
        })
        ticketDAO.submitTicket.mockReturnValue(daoOutput)

        const result = await ticketService.submitTicket(data, "username")

        expect(ticketDAO.submitTicket).not.toHaveBeenCalled();
        expect(result.status).toBe(400)
    })


    
    
})