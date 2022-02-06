class PeopleEntity {
    peopleId;
    name;
    birth_year;
    eye_color;
    gender;
    hair_color;
    height;
    mass;
    skin_color;
    homeworld;
    films;
    species;
    starships;
    vehicles;
    url;
    created;
    edited;
    constructor(data) {
        Object.assign(this, data);
    }

    to_translate(){
        return {
            "peopleId": this.peopleId,
            "nombre": this.name,
            "anio_cumpleanios": this.birth_year,
            "color_ojos": this.eye_color? this.eye_color: "",
            "genero": this.gender,
            "color_cabello": this.hair_color? this.hair_color: "",
            "altura": this.height,
            "peso": this.mass,
            "color_piel": this.skin_color,
            "planeta_origen": this.homeworld? this.homeworld: "",
            "filmaciones": this.films? this.films: [],
            "especies": this.species? this.species: [],
            "naves_estelares": this.starships? this.starships: [],
            "vehiculos": this.vehicles? this.vehicles: [],
            "url": this.url? this.url: "",
            "creado": this.created? this.created: "",
            "editado": this.edited? this.edited: ""
        }
    }
}

module.exports = {PeopleEntity}