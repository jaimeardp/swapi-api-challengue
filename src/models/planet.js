class PlanetEntity {
    planetId;
    name;
    diameter;
    rotation_period;
    orbital_period;
    gravity;
    population;
    climate;
    terrain;
    surface_water;
    residents;
    films;
    url;
    created;
    edited;
    constructor(data) {
        Object.assign(this, data);
    }

    to_translate(){
        return {
            "planetId": this.planetId,
            "nombre": this.name,
            "diametro": this.diameter,
            "periodo_rotacion": this.periodo_rotacion? this.periodo_rotacion : "",
            "periodo_orbital": this.periodo_orbital,
            "gravedad": this.gravity?this.gravity: "",
            "poblacion": this.population,
            "clima": this.climate,
            "tierra": this.terrain,
            "superficie_agua": this.surface_water?this.surface_water: "",
            "residentes": this.residents?this.residents: [],
            "filmes": this.films? this.films: [],
            "url": this.url? this.url: "",
            "creado": this.created? this.created: "",
            "editado": this.edited? this.edited: ""
        }
    }
}

module.exports = {PlanetEntity}
