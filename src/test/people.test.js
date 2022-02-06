const myLambdaDetail = require("../modules/people/detail")
const myLambdaCreate = require("../modules/people/create")

describe("index", () => {
  beforeEach(() => {

  });

it("Deberia obtener Persona creado mediante la funcion people/detail ", async () => {

    var people1 =     {
        "name": "mariana",
        "birth_year": "22051999",
        "eye_color": "celeste",
        "gender": "F",
        "height": "150",
        "mass": "45",
        "skin_color": "blanco"
    }

    let payload = JSON.stringify(people1)

    let peopleCreated = await myLambdaCreate.handler({body: payload});

    let id = JSON.parse(peopleCreated.body).peopleId

    const peopleObtenied = await myLambdaDetail.handler({pathParameters: { id: id}});
    
    expect([JSON.parse(peopleObtenied.body).Item.nombre]).toStrictEqual(["mariana"]);
})

it("No deberia poder crear una Persona sin nombre mediante la funcion people/create ", async () => {

    var people2 = {
        "birth_year": "22051999",
        "eye_color": "celeste",
        "gender": "F",
        "height": "150",
        "mass": "45",
        "skin_color": "blanco"
    }

    let payload = JSON.stringify(people2)

    let peopleCreated = await myLambdaCreate.handler({body: payload});

    let tpeopleCreated = JSON.parse(peopleCreated.body)

    let id = tpeopleCreated.planetId

    console.log(id)
    
    expect(peopleCreated.statusCode).toEqual(500)
})

});