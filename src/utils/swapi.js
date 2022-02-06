const axios = require('axios');


const getEntity = async (endpointName) => {
    var  entity = undefined
    await axios.get(endpointName)
        .then(function (response) {
            // handle success
            let data = response.data;
            entity = data
        }).catch(error => {
            console.log(`EXCEPTION: getEntity - ${error}`)
            entity = undefined
        })
    return entity
  }

const getEntities = async (endpointName) => {
    var entities = []
    await axios.get(endpointName)
        .then(function (response) {
            // handle success
            let data = response.data.results;
            data.map( (d) => {
                entities.push(d)
            })
        })
    return entities
  }

module.exports = {
    getEntities,
    getEntity
}