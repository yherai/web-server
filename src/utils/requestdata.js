const request = require('postman-request');

const doRequest = async (url) => {
  return new Promise((resolve) => {
    request(url, { json: true }, (error, response) => {
      if (error) {
        resolve({ error });
      }

      resolve({ response });
    });
  });
};

module.exports = doRequest;
