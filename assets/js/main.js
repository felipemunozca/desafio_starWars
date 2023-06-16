/*** Variables. ***/
const rowPopulares = document.querySelector('#rowPopulares');
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
            // console.log(datos)
            imprimirCard(datos);
        })
        .catch(error => {
            console.log(error)
        })
};

const imprimirCard = (datos) => {
    const {name, height, mass} = datos;

    // console.log("El nombre es: "+ name);
    // console.log("altura " + height);
    // console.log("peso " + mass);

    const div1 = document.createElement('div');
    div1.setAttribute("class", "col-12 col-md-6 col-lg-4");
    
    const div2 = document.createElement('div');
    div2.setAttribute("class", "single-timeline-content d-flex background-show");
    
    const icon = document.createElement('i');
    icon.setAttribute("class", "timeline-icon timeline-icon-red bi bi-circle-fill");
    
    const div3 = document.createElement('div');
    div3.setAttribute("class", "timeline-text");

    const h6 = document.createElement('h6');
    h6.innerHTML = `${name}`;

    const p = document.createElement('p');
    p.innerHTML = `Altura: ${height} cm. Peso: ${mass} kg.`;

    rowPopulares.appendChild(div1);
    div1.appendChild(div2);
    div2.append(icon, div3);
    div3.append(h6, p);
}

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
