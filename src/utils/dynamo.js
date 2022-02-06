//import { DocumentClient } from "aws-sdk/clients/dynamodb";
const {DocumentClient} = require("aws-sdk/clients/dynamodb")

const AWS = require('aws-sdk');
//import AWS from 'aws-sdk';
/*
try{
  var credentials = new AWS.SharedIniFileCredentials({profile: 'tt'});
  AWS.config.credentials = credentials;
  console.log("Running enviroment local")
}catch (e) {
  console.log("Running enviroment cloud")
}*/

AWS.config.update({ region: process.env.REGION });
const documentClient = new AWS.DynamoDB.DocumentClient();


 const getItems = async (table) => {
    return await documentClient.scan({ TableName: table }).promise();
  }

const getItem = async (table, key) => {
    const params = {
      ConsistentRead: true,
      Key: key,
      TableName: table,
    };

    console.log(`Dynamo: getItem : params: ${JSON.stringify(params)}`);

    return await documentClient.get(params).promise();
  }

 const saveItem = async (data, table) => {
    const params = {
      Item: data,
      TableName: table,
    };

    console.log(`Dynamo: saveItem : params: ${JSON.stringify(params)}`);

    return await documentClient.put(params).promise();
  }

module.exports = {
    getItems,
    saveItem,
    getItem
}
