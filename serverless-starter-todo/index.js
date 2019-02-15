'use strict';

const TABLE_NAME = process.env.TABLE_NAME.trim();

const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB();

async function handler(event) {
  let response;

  try {
    response = await handleRequest(event);
  } catch (error) {
    console.error('error handling request:', error);

    response = {
      body: JSON.stringify({
        error: error.toString(),
        message: 'error handling request'
      }),
      statusCode: 500
    };
  }

  response.headers = response.headers || {};
  response.headers['Access-Control-Allow-Origin'] = '*';
  response.headers['Access-Control-Allow-Credentials'] = true;

  return response;
}

function handleRequest(event) {
  if (TABLE_NAME === '') {
    throw Error(
      `I don't have a TABLE_NAME environment variable, so I don't know where to read and write your todos.`
    );
  }

  const method = event.httpMethod.toUpperCase();
  const path = event.path.toLowerCase();

  console.log('handling request', method, path);

  const baseMatch = path.match(/^\/todos\/?$/);
  const idMatch = path.match(/^\/todo\/([^/]+)\/?$/);

  if (method === 'DELETE' && idMatch) {
    return deleteTodo(idMatch[1]);
  }

  if (method === 'GET' && baseMatch) {
    return readTodos();
  }

  if (method === 'PUT' && idMatch) {
    if (!event.body) {
      return {
        body: 'Your request is missing a body.',
        statusCode: 400
      };
    }

    const { completed, title } = JSON.parse(event.body);

    return writeTodo({ completed, id: idMatch[1], title });
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

  const todos = rows
    .map(row => AWS.DynamoDB.Converter.unmarshall(row))
    .sort((a, b) => b.created - a.created);

  console.log('read', todos.length, 'todo(s)');

  return { body: JSON.stringify(todos), statusCode: 200 };
}

async function writeTodo({ completed, id, title }) {
  console.log('writing todo', id);

  const created = Date.now();

  const parameters = {
    Item: AWS.DynamoDB.Converter.marshall({ completed, created, id, title }),
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
