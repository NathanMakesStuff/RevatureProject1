const { DynamoDB, DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, QueryCommand, GetCommand, PutCommand, ScanCommand } = require("@aws-sdk/lib-dynamodb");

const logger = require("../util/logger");

const client = new DynamoDBClient({ region: "us-east-1" })

const documentClient = DynamoDBDocumentClient.from(client);


async function getAllTickets() {
    const scanCommand = new ScanCommand({
        TableName: 'Tickets'
    })

    try {
        const data = await documentClient.send(scanCommand);
        return data.Items;

    } catch (error) {
        logger.error(error);
    }
}

async function submitTicket(ticket) {
    const putCommand = new PutCommand({
        TableName: 'Tickets',
        Item: ticket
    })

    try {
        const response = await documentClient.send(putCommand);
        console.log(response)
        return response;
        
    } catch (error) {
        logger.error(error)
        return null
    }
    
}


module.exports = {
    getAllTickets,
    submitTicket
}