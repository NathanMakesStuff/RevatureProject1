const { DynamoDB, DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, QueryCommand, GetCommand, PutCommand } = require("@aws-sdk/lib-dynamodb");

// const logger = require("../util/logger");

const client = new DynamoDBClient({ region: "us-east-1" })

const documentClient = DynamoDBDocumentClient.from(client);