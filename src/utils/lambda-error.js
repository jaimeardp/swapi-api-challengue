//import * as yup from "yup";
//import { errorResponse } from "./lambda-response.js";

const yup = require("yup")

const { errorResponse } = require("./lambda-response.js")

class HttpError extends Error {
  constructor(statusCode, body = {}) {
    super(JSON.stringify(body));
  }
}

 function handleError(e) {
  if (e instanceof yup.ValidationError) {
    return errorResponse({ errors: e.errors });
  }

  if (e instanceof SyntaxError) {
    return errorResponse({ error: `invalid request body format : "${e.message}"` });
  }

  if (e instanceof HttpError) {
    return {
      statusCode: e.statusCode,
      headers: {
        "content-type": "application/json",
      },
      body: e.message,
    };
  }

  throw e;
}

module.exports = {
  handleError
}
