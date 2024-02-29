const { DynamoDB, DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, QueryCommand, GetCommand, PutCommand } = require("@aws-sdk/lib-dynamodb");

const logger = require("../util/logger");

const client = new DynamoDBClient({ region: "us-east-1" })

const documentClient = DynamoDBDocumentClient.from(client);



// check if name exists by checking it against names in db
async function exists(name) {
    // if name doesn't exist in db return false
    const getCommand = new GetCommand({
        TableName: 'Accounts',
        Key: { 'username': `${name}` }
    })

    try {
        const promise_created = await documentClient.send(getCommand)
        if (promise_created.Item == null) {
            console.info("Username is available")
            return false;
        } else {
            logger.error("Username already exists")
            return true;
        };
        
    } catch (error) {
        logger.error(error);
    }

}


// register an account by taking in username and password from input, then checking if username exists, if it
// doesn't then a new account is created
async function registerAcc(name, password, role) {
    const promise = await exists(name);

    try {
        
        if (!promise) {
            // add account to db
            const putCommand = new PutCommand({
                TableName: 'Accounts',
                Item: {
                    username: name,
                    password: password,
                    role: role
                },
    
            });
            const response = await documentClient.send(putCommand);
            console.log(response)
            return response; // Created
        }else{
            return null; // Error
        }
    } catch (error) {
        logger.error(error);
    }
}



async function login(name, password) {
    // open up db, check if name and password match a name and password in account
    const getCommand = new GetCommand({
        TableName: 'Accounts',
        Key: { 'username': `${name}` }
    })

    try {
        const loginData = await documentClient.send(getCommand);
        if (loginData.Item.username == name && loginData.Item.password == password) {
            console.log("Logged in")
            return loginData.Item;
        } else {
            console.log("Wrong info")
            return null;
        }
        
    } catch (error) {
        logger.error(error);
    }
}
// login("elen", "dog")

module.exports = {
    registerAcc,
    login
}