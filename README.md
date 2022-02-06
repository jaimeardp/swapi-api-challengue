# Getting Started

Para dar inicio a las pruebas descarga el proyecto en tu local

```bash
git clone 

```

Realiza una carga de variables de entorno

```bash
bash local.sh

```

Instala las dependencias del proyecto

```bash
npm install

```

Para validar el funcionamiento correcto ejecuta las pruebas unitarias

```bash
npm test

```

# Definition

Resources used:

1. Planet:

    Se implementaron 3 metodos:

        - POST /planet/
        - GET /planet/
        - GET /planet/:id
    
2. People

    Se implementaron 3 metodos:

        - POST /people/
        - GET /people/
        - GET /people/:id

# Execution

Se adjunta Coleccion de Postman para probar los endpoins de la API:
    - Swapi-API.consumer.json


# Authorization

Para consumir la API se tiene que agregar un header Authorization

```bash
curl -X GET -H "Authorization: <Token>" \
    https://<endpoint>/planet/1
```