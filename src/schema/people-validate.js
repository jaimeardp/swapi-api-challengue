//import * as yup from "yup";
const yup = require("yup")

const peopleValidator = yup.object().shape({
    name: yup.string().required(),
    birth_year: yup.string().required(),
    eye_color: yup.string(),
    gender: yup.string().required(),
    hair_color: yup.string(),
    height: yup.string().required(),
    mass: yup.string().required(),
    skin_color: yup.string().required(),
    homeworld: yup.string(),
    films: yup.array().default([]),
    species: yup.array().default([]),
    starships: yup.array().default([]),
    vehicles: yup.array().default([]),
    url: yup.string().default('').url(),
    created: yup.string(),
    edited: yup.string(),
});
 

module.exports = {
    peopleValidator
}
