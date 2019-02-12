'use strict';

function healthCheck() {
  console.log('hello world');

  return {
    body: 'hello world',
    statusCode: 200
  };
}

module.exports = {
  healthCheck
};
