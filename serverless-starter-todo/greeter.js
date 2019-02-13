'use strict';

async function handleRequest() {
  console.log('hello world');

  return {
    body: 'hello world',
    statusCode: 200
  };
}

module.exports = {
  handleRequest
};
