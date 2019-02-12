'use strict';

const TABLE_NAME = process.env.TABLE_NAME;

const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB();

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true
};

async function deleteTodo(event) {
  const id = event.pathParameters.id;

  console.log('deleting todo', id);

  const parameters = {
    Key: AWS.DynamoDB.Converter.marshall({ id }),
    TableName: TABLE_NAME
  };

  // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#deleteItem-property
  await dynamoDb.deleteItem(parameters).promise();

  console.log('deleted todo', id);

  return {
    headers,
    statusCode: 204
  };
}

async function readTodos() {
  console.log('reading todo(s)');

  const parameters = {
    TableName: TABLE_NAME
  };

  // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#scan-property
  const response = await dynamoDb.scan(parameters).promise();

  const rows = response.Items;

  const todos = rows.map(row => AWS.DynamoDB.Converter.unmarshall(row));

  console.log('read', todos.length, 'todo(s)');

  return {
    body: JSON.stringify(todos),
    headers,
    statusCode: 200
  };
}

async function writeTodo(event) {
  const id = event.pathParameters.id;
  const description = event.body;

  console.log('writing todo', id);

  const parameters = {
    Item: AWS.DynamoDB.Converter.marshall({ id, description }),
    TableName: TABLE_NAME
  };

  // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#putItem-property
  await dynamoDb.putItem(parameters).promise();

  console.log('wrote todo', id);

  return {
    headers,
    statusCode: 204
  };
}

module.exports = {
  deleteTodo,
  readTodos,
  writeTodo
};
