const curlRequest = require('request');

async function makeRequest(options) {
  try {
    const data = await new Promise((resolve) => {
      curlRequest(options, (error, response) => {
        resolve(JSON.parse(response.body));
      });
    });

    return {
      hasError: false,
      data: data,
    }
  } catch (error) {
    console.log(error);
    return {
      hasError: true,
      message: 'Unable to Fetch',
    };
  }
}

function convertToArray(data) {
  try {
    const dataArray = [];
    for (const field in data) {
      dataArray.push(data[field]);
    }

    return {
      hasError: false,
      data: dataArray,
    }
  } catch (error) {
    console.log(error);
    return {
      hasError: true,
      message: 'Unable to Convert Data',
    };
  }
}

module.exports = {
  makeRequest,
  convertToArray,
}