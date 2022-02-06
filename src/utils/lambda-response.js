function lambdaResponse({ json, statusCode, allowCORS = true }) {
    const response = {
      statusCode,
      body: JSON.stringify(json),
      headers: {},
    };
  
    if (allowCORS) {
      response.headers = { "Access-Control-Allow-Origin": "*" };
    }
  
    response.headers = { "content-type": "application/json" };
  
    return response;
  }
  
function successResponse(json) {
    return lambdaResponse({
      json,
      statusCode: 200,
    });
  }
  
  function errorResponse(json) {
    return lambdaResponse({
      json,
      statusCode: 500,
    });
  }


  module.exports = {
    successResponse,
    errorResponse
  }