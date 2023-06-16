/*** Variables. ***/
let perPopulares = [1, 2, 3, 4, 5];
let perSecundarios = [6, 7, 8, 9, 10, 11];
let perSignificativos = [12, 13, 14, 15, 16, 18];
let genPersonajesSection1 = generadorSeccion1();
let indexSection1 = perPopulares[0];


/*** Eventos. ***/
$('#cardPersonajesPopulares').mouseenter(() => {
    if (perPopulares.find((popular) => popular == indexSection1)) {
        let personaje = genPersonajesSection1.next().value;
        obtenerDataApi(personaje);
        indexSection1++;
        console.log("personaje: " + personaje);
        console.log("contador: " + indexSection1);
    }
});

/*** Funciones. ***/
const obtenerDataApi = (id) => {
    let promesa = fetch(`https://swapi.dev/api/people/${id}`);

    promesa 
        .then(respuesta => respuesta.json())
        .then((datos) => {
            console.log(datos)
        })
        .catch(error => {
            console.log(error)
        })
};

//obtenerDataApi();


/* Funciones generadoras. */
function* generadorSeccion1() {
    let i = 0;
    yield perPopulares[i];
    i++;
    yield perPopulares[i];
    i++;
    yield perPopulares[i];
    i++;
    yield perPopulares[i];
    i++;
    yield perPopulares[i];
    i++;
}
