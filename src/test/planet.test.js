const myLambdaDetail = require("../modules/planet/detail")
const myLambdaCreate = require("../modules/planet/create")

describe("index", () => {
  beforeEach(() => {

  });

it("Deberia obtener Planeta creado mediante la funcion people/detail ", async () => {

    var planet1 = {
        "name": "jupiter",
        "diameter": "100000000",
        "orbital_period": "2342423423",
        "population": "1243243242",
        "climate": "calor extremo",
        "terrain": "volcan",
        "skin_color": "blanco"
    }

    let payload = JSON.stringify(planet1)

    let peopleCreated = await myLambdaCreate.handler({body: payload});

    let id = JSON.parse(peopleCreated.body).planetId

    const peopleObtenied = await myLambdaDetail.handler({pathParameters: { id: id}});
    
    expect([JSON.parse(peopleObtenied.body).Item.nombre]).toStrictEqual(["jupiter"]);
})

it("No deberia poder crear un Planeta sin nombre mediante la funcion people/create ", async () => {

    var planet2 = {
        "diameter": "100000000",
        "orbital_period": "2342423423",
        "population": "1243243242",
        "climate": "calor extremo",
        "terrain": "volcan",
        "skin_color": "blanco"
    }

    let payload = JSON.stringify(planet2)

    let peopleCreated = await myLambdaCreate.handler({body: payload});

    let tpeopleCreated = JSON.parse(peopleCreated.body)

    let id = tpeopleCreated.planetId

    console.log(id)
    
    expect(peopleCreated.statusCode).toEqual(500)
})

});