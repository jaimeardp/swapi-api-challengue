const {TABLES} = require("../../constant/tables.js")
const {ENDPOINTS} = require("../../constant/endpoints.js")
const dynamo = require("../../utils/dynamo.js")
const {getEntity} = require("../../utils/swapi.js")
const {successResponse} = require("../../utils/lambda-response.js")
const {handleError} = require("../../utils/lambda-error.js")

const tableName = TABLES.planet;
const endpointName = ENDPOINTS.planet

console.log(TABLES)
console.log(ENDPOINTS)

const handler  = async (event) => {
  try {

    let { id } = event.pathParameters
    //let id = 1

    console.log(`${endpointName}${id}`)
    
    let cendpoint = `${endpointName}${id}`

    const planet = await getEntity(cendpoint)

    if(planet){

        console.log("SWAPI API - Query")

        let response = {Item: planet}

        console.log(response)

        return successResponse(response);

    }else{

        console.log("DynamoDB - Query")

        let response = await dynamo.getItem(tableName, {planetId: id});

        console.log(response)

        return successResponse(response);
    }


  } catch (err) {
    console.log(err)
    return handleError(err);
  }
};

//handler()

module.exports = {handler}
