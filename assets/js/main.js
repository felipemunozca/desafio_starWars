/*** Variables. ***/
const rowPopulares = document.querySelector('#rowPopulares');
const rowSecundarios = document.querySelector('#rowSecundarios');
const rowSignificativos = document.querySelector('#rowSignificativos');

let personajesPopulares = [1, 2, 3, 4, 5];
let personajesSecundarios = [6, 7, 8, 9, 10];
let personajesSignificativos = [12, 13, 14, 15, 16];
let genPersonajesSection1 = generadorSeccion1();
let indexSection1 = personajesPopulares[0];
let genPersonajesSection2 = generadorSeccion2();
let indexSection2 = personajesSecundarios[0];
let genPersonajesSection3 = generadorSeccion3();
let indexSection3 = personajesSignificativos[0];


/*** Eventos. ***/
$('#cardPersonajesPopulares').mouseenter(() => {
    if (personajesPopulares.find((popular) => popular == indexSection1)) {
        let personaje = genPersonajesSection1.next().value;
        obtenerDataApi(personaje, "red");
        indexSection1++;
    }
});

$('#cardPersonajesSecundarios').mouseenter(() => {
    if (personajesSecundarios.find((secundario) => secundario == indexSection2)) {
        let personaje = genPersonajesSection2.next().value;
        obtenerDataApi(personaje, "green");
        indexSection2++;
    }
});

$('#cardPersonajesSignificativos').mouseenter(() => {
    if (personajesSignificativos.find((significativo) => significativo == indexSection3)) {
        let personaje = genPersonajesSection3.next().value;
        obtenerDataApi(personaje, "blue");
        indexSection3++;
    }
});


/*** Funciones. ***/
const obtenerDataApi = (id, color) => {
    let promesa = fetch(`https://swapi.dev/api/people/${id}`);

    promesa 
        .then(respuesta => respuesta.json())
        .then((datos) => {
            imprimirCard(datos, color);
        })
        .catch(error => {
            console.log(error)
        })
};

const imprimirCard = (datos, color) => {
    const {name, height, mass} = datos;

    const div1 = document.createElement('div');
    div1.setAttribute("class", "col-12 col-md-6 col-lg-4");
    const div2 = document.createElement('div');
    div2.setAttribute("class", "single-timeline-content d-flex scale-up-top");
    const icon = document.createElement('i');
    icon.setAttribute("class", `timeline-icon timeline-icon-${color} bi bi-circle-fill`);
    const div3 = document.createElement('div');
    div3.setAttribute("class", "timeline-text");
    const h6 = document.createElement('h6');
    h6.innerHTML = `${name}`;
    const p = document.createElement('p');
    p.innerHTML = `Altura: ${height} cm. Peso: ${mass} kg.`;

    if (color === "red") {
        rowPopulares.appendChild(div1);
        div1.appendChild(div2);
        div2.append(icon, div3);
        div3.append(h6, p);
    } else if (color === "green") {
        rowSecundarios.appendChild(div1);
        div1.appendChild(div2);
        div2.append(icon, div3);
        div3.append(h6, p);
    } else if (color === "blue") {
        rowSignificativos.appendChild(div1);
        div1.appendChild(div2);
        div2.append(icon, div3);
        div3.append(h6, p);
    }
}

/* Funciones generadoras. */
function* generadorSeccion1() {
    let i = 0;
    yield personajesPopulares[i];
    i++;
    yield personajesPopulares[i];
    i++;
    yield personajesPopulares[i];
    i++;
    yield personajesPopulares[i];
    i++;
    yield personajesPopulares[i];
    i++;
}

function* generadorSeccion2() {
    let i = 0;
    yield personajesSecundarios[i];
    i++;
    yield personajesSecundarios[i];
    i++;
    yield personajesSecundarios[i];
    i++;
    yield personajesSecundarios[i];
    i++;
    yield personajesSecundarios[i];
    i++;
}

function* generadorSeccion3() {
    let i = 0;
    yield personajesSignificativos[i];
    i++;
    yield personajesSignificativos[i];
    i++;
    yield personajesSignificativos[i];
    i++;
    yield personajesSignificativos[i];
    i++;
    yield personajesSignificativos[i];
    i++;
}
