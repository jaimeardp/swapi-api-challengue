const {TABLES} = require("../../constant/tables.js")
const dynamo = require("../../utils/dynamo.js")
const {successResponse} = require("../../utils/lambda-response.js")
const {handleError} = require("../../utils/lambda-error.js")

const {planetValidator} = require("../../schema/planet-validate")
const {PlanetEntity} = require("../../models/planet")


const { 
  v4: uuidv4,
} = require('uuid');


const tableName = TABLES.planet;

console.log(TABLES)


const handler = async(event) => {

  try {

      const body = event.body;

      console.log(typeof(body))
      console.log(body)

      const payload = JSON.parse(body)

      console.log(typeof(payload))
      console.log(payload)

      await planetValidator.validate(payload, { abortEarly: false })

      // Generar la data a guardar
      const data = {
          planetId: uuidv4(),
          ...payload,
      }

      const planet = new PlanetEntity( data );

      console.log(planet.to_translate())

      // Guardar DB
      await dynamo.saveItem(planet.to_translate(), tableName);
  
      return successResponse(data);
    } catch (err) {
      return handleError(err);
    }

}


module.exports = {handler}
