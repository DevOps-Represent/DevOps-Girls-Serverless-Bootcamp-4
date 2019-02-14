'use strict';

const TABLE_NAME = process.env.TABLE_NAME;

const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB();

async function handler(event) {
  const response = await handleRequest(event);

  response.headers = response.headers || {};
  response.headers['Access-Control-Allow-Origin'] = '*';
  response.headers['Access-Control-Allow-Credentials'] = true;

  return response;
}

function handleRequest(event) {
  const body = event.body;
  const method = event.httpMethod.toUpperCase();
  const path = event.path.toLowerCase();

  console.log('handling request', method, path);

  if (path.match(/^\/todo\/?$/) && method === 'GET') {
    return readTodos();
  }

  const idMatch = path.match(/^\/todo\/([^/]+)\/?$/);

  if (!idMatch) {
    return { statusCode: 404 };
  }

  const id = idMatch[1];

  if (method === 'DELETE') {
    return deleteTodo(id);
  }

  if (method === 'PUT') {
    return writeTodo(id, body);
  }

  return { statusCode: 404 };
}

async function deleteTodo(id) {
  console.log('deleting todo', id);

  const parameters = {
    Key: AWS.DynamoDB.Converter.marshall({ id }),
    TableName: TABLE_NAME
  };

  // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#deleteItem-property
  await dynamoDb.deleteItem(parameters).promise();

  console.log('deleted todo', id);

  return { statusCode: 204 };
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

  return { body: JSON.stringify(todos), statusCode: 200 };
}

async function writeTodo(id, description) {
  console.log('writing todo', id);

  const parameters = {
    Item: AWS.DynamoDB.Converter.marshall({ id, description }),
    TableName: TABLE_NAME
  };

  // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#putItem-property
  await dynamoDb.putItem(parameters).promise();

  console.log('wrote todo', id);

  return { statusCode: 204 };
}

module.exports = {
  handler
};
