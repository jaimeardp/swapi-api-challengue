const {TABLES} = require("../../constant/tables.js")
const dynamo = require("../../utils/dynamo.js")

const {successResponse} = require("../../utils/lambda-response.js")
const {handleError} = require("../../utils/lambda-error.js")


const {peopleValidator} = require("../../schema/people-validate")
const {PeopleEntity} = require("../../models/people")

const { 
  v4: uuidv4,
} = require('uuid');

const tableName = TABLES.people;

console.log(TABLES)

const handler = async(event) => {

    try {

        const body = event.body;

        console.log(typeof(body))
        console.log(body)

        const payload = JSON.parse(body)

        console.log(typeof(payload))
        console.log(payload)

        await peopleValidator.validate(payload, { abortEarly: false })

        // Generar la data a guardar
        const data = {
            peopleId: uuidv4(),
            ...payload,
        }

        const people = new PeopleEntity( data );

        console.log(people.to_translate())
        // Guardar DB
        await dynamo.saveItem(people.to_translate(), tableName);
    
        return successResponse(data);
      } catch (err) {
        return handleError(err);
      }

}


module.exports = {handler}
