const yup = require("yup")

const planetValidator = yup.object().shape({
    name: yup.string().required(),
    diameter: yup.string().required(),
    rotation_period: yup.string(),
    orbital_period: yup.string().required(),
    gravity: yup.string(),
    population: yup.string().required(),
    climate: yup.string().required(),
    terrain: yup.string().required(),
    surface_water: yup.string(),
    
    residents: yup.array().default([]),
    films: yup.array().default([]),

    url: yup.string().default('').url(),
    created: yup.string(),
    edited: yup.string(),
});

module.exports = {
    planetValidator
}
