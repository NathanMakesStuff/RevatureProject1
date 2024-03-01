const { DynamoDB, DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, QueryCommand, GetCommand, UpdateCommand, PutCommand, ScanCommand } = require("@aws-sdk/lib-dynamodb");

const logger = require("../util/logger");

const client = new DynamoDBClient({ region: "us-east-1" })

const documentClient = DynamoDBDocumentClient.from(client);


async function getMyTickets(username) {
    const scanCommand = new ScanCommand({
        TableName: 'Tickets',
        FilterExpression: "#author = :author",
        ExpressionAttributeNames: {
            "#author": "author",
        },
        ExpressionAttributeValues: {
            ":author": username,
        },

    })

    try {
        const data = await documentClient.send(scanCommand);
        console.log(data)
        return data.Items;

    } catch (error) {
        logger.error(error);
    }
}
async function getPending() {
    const scanCommand = new ScanCommand({
        TableName: 'Tickets',
        FilterExpression: "#ticketStatus = :ticketStatus",
        ExpressionAttributeNames: {
            "#ticketStatus": "status",
        },
        ExpressionAttributeValues: {
            ":ticketStatus": "pending",
        },
        
    })

    try {
        const data = await documentClient.send(scanCommand);
        console.log(data)
        return data.Items;

    } catch (error) {
        logger.error(error);
    }
}

async function getByID(ticketID) {
    const command = new QueryCommand({
        TableName: "Tickets",
        KeyConditionExpression:
            "ticket_id = :ticketID",
        ExpressionAttributeValues: {
            ":ticketID": ticketID
        },
        ConsistentRead: true,
    });

    try {
        const response = await documentClient.send(command);
        return response;
        
    } catch (error) {
        logger.error(error)
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

async function updateTicket(statusID){
    const updateCommand = new UpdateCommand({
        TableName: 'Tickets',
        Key: {
            ticket_id: statusID.ticketID
        },
        ExpressionAttributeNames: {
            "#ticketStatus": "status"
        },
        UpdateExpression:"set #ticketStatus = :ticketStatus",
        ExpressionAttributeValues: {
            ":ticketStatus": statusID.status,
        },
        ReturnValues:"ALL_NEW"
    })

    try {
        
        const response = await documentClient.send(updateCommand)
        return response;
    } catch (error) {
        logger.error(error)
    }
}


module.exports = {
    getMyTickets,
    submitTicket,
    updateTicket,
    getPending,
    getByID
}