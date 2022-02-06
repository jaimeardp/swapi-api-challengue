const {TABLES} = require("../../constant/tables.js")
const {ENDPOINTS} = require("../../constant/endpoints.js")
const dynamo = require("../../utils/dynamo.js")
const {getEntity} = require("../../utils/swapi.js")
const {successResponse} = require("../../utils/lambda-response.js")
const {handleError} = require("../../utils/lambda-error.js")

const tableName = TABLES.people;
const endpointName = ENDPOINTS.people

console.log(TABLES)
console.log(ENDPOINTS)

const handler  = async (event) => {
  try {

    let { id } = event.pathParameters
    //let id = 1
    
    let cendpoint = `${endpointName}${id}`

    const people = await getEntity(cendpoint)

    if(people){

        console.log("SWAPI API - Query")

        let response = {Item: people}

        console.log(response)

        return successResponse(response);

    }else{

        console.log("DynamoDB - Query")

        let response = await dynamo.getItem(tableName, {peopleId: id});

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
