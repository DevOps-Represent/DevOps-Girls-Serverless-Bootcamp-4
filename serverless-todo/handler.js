'use strict';

const AWS_REGION = process.env.AWS_REGION;
const TABLE_NAME = process.env.TABLE_NAME;

const aws = require('aws-sdk');

const dynamoDb = new aws.DynamoDB({ region: AWS_REGION });

async function deleteTodo(event) {
  const id = event.pathParameters.id;

  console.log('deleting todo', id);

  const parameters = {
    Key: aws.DynamoDB.Converter.marshall({ id }),
    TableName: TABLE_NAME
  };

  // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#deleteItem-property
  await dynamoDb.deleteItem(parameters).promise();

  console.log('deleted todo', id);

  return {
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

  const todos = rows.map(row => aws.DynamoDB.Converter.unmarshall(row));

  console.log('read', todos.length, 'todo(s)');

  return {
    statusCode: 200,
    body: JSON.stringify(todos)
  };
}

async function writeTodo(event) {
  const id = event.pathParameters.id;
  const description = event.body;

  console.log('writing todo', id);

  const parameters = {
    Item: aws.DynamoDB.Converter.marshall({ id, description }),
    TableName: TABLE_NAME
  };

  // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#putItem-property
  await dynamoDb.putItem(parameters).promise();

  console.log('wrote todo', id);

  return {
    statusCode: 204
  };
}

module.exports = {
  deleteTodo,
  readTodos,
  writeTodo
};
