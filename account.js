const { DynamoDB, DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, QueryCommand, GetCommand, PutCommand } = require("@aws-sdk/lib-dynamodb");
const http = require('http')
const PORT = 3000;

const server = http.createServer((req, res) => {
    if (req.method === "POST" && req.url === "/register") {
        // POST ENDPOINT
        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", async () => {
            const data = JSON.parse(body);
            const notAvailable = await exists(data.username);
            if(notAvailable){
                res.writeHead(201, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ message: "Username already exists" }));
            } else {
                registerAcc(data.username, data.password);
                // this is where you would save the data
                console.log(data);
                res.writeHead(201, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ message: "Account Created Successfully!" }));
            }
        })
    }
})

const client = new DynamoDBClient({ region: "us-east-1" })

const documentClient = DynamoDBDocumentClient.from(client);



// check if name exists by checking it against names in db
async function exists(name) {
    // if name doesn't exist in db return false
    const getCommand = new GetCommand({
        TableName: 'Accounts',
        Key: { 'username': `${name}` }
    })

    const promise_created = await documentClient.send(getCommand)
    if (promise_created.Item == null) {
        console.log(promise_created.Item, " Item = null")
        return false;
    } else {
        console.log(promise_created.Item, "Item found")
        return true
    };

}


// register an account by taking in username and password from input, then checking if username exists, if it
// doesn't then a new account is created
async function registerAcc(name, password) {
    const promise = await exists(name);
    if (!promise) {
        // add account to db
        console.log("before putcommand")
        const putCommand = new PutCommand({
            TableName: 'Accounts',
            Item: {
                username: name,
                password: password
            },

        });
        console.log("before response")
        const response = await documentClient.send(putCommand);
        console.log(response)
        return response;
    }
}

// registerAcc("elen", "dog")


async function login(name, password) {
    // open up db, check if name and password match a name and password in account
    const getCommand = new GetCommand({
        TableName: 'Accounts',
        Key: { 'username': `${name}` }
    })

    const promise_created = await documentClient.send(getCommand);
    if (promise_created.Item.username == name && promise_created.Item.password == password) {
        console.log("Logged in")
    } else {
        console.log("Wrong info")
    }
}
// login("elen", "dog")

server.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
})