//import {TABLES} from "../../constant/tables.js";
const {TABLES} = require("../../constant/tables.js")
//import dynamo from "../../utils/dynamo.js";
const dynamo = require("../../utils/dynamo.js")
const {getEntities} = require("../../utils/swapi.js")
//import { successResponse } from "../../utils/lambda-response.js";
const {successResponse} = require("../../utils/lambda-response.js")
//import { handleError } from "../../utils/lambda-error.js";
const {handleError} = require("../../utils/lambda-error.js")



const tableName = TABLES.planet;
const endpointName = ENDPOINTS.planet

console.log(TABLES)
console.log(ENDPOINTS)

const handler  = async (event) => {
  try {

    const planets = await getEntities(endpointName)

    let response = await dynamo.getItems(tableName);

    planets.forEach(planet => {
      response.Items.push(planet)
    });

    return successResponse(response);
  } catch (err) {
    console.log(err)
    return handleError(err);
  }
};

//handler()

module.exports = {handler}
