/*** Variables. ***/
const rowPopulares = document.querySelector('#rowPopulares');
const rowSecundarios = document.querySelector('#rowSecundarios');
let perPopulares = [1, 2, 3, 4, 5];
let perSecundarios = [6, 7, 8, 9, 10, 11];
let perSignificativos = [12, 13, 14, 15, 16, 18];
let genPersonajesSection1 = generadorSeccion1();
let indexSection1 = perPopulares[0];
let genPersonajesSection2 = generadorSeccion2();
let indexSection2 = perSecundarios[0];
console.log(indexSection2)


/*** Eventos. ***/
$('#cardPersonajesPopulares').mouseenter(() => {

    if (perPopulares.find((popular) => popular == indexSection1)) {
        let personaje = genPersonajesSection1.next().value;
        obtenerDataApi(personaje, "red");
        indexSection1++;
        // console.log("personaje: " + personaje);
        // console.log("contador: " + indexSection1);
    }
});

$('#cardPersonajesSecundarios').mouseenter(() => {

    if (perSecundarios.find((secundario) => secundario == indexSection2)) {
        let personaje = genPersonajesSection2.next().value;
        obtenerDataApi(personaje, "green");
        indexSection2++;
        console.log("personaje: " + personaje);
        console.log("contador: " + indexSection2);
    }
});

/*** Funciones. ***/
const obtenerDataApi = (id, color) => {
    let promesa = fetch(`https://swapi.dev/api/people/${id}`);

    promesa 
        .then(respuesta => respuesta.json())
        .then((datos) => {
            // console.log(datos)
            imprimirCard(datos, color);
        })
        .catch(error => {
            console.log(error)
        })
};

const imprimirCard = (datos, color) => {
    const {name, height, mass} = datos;

    // console.log(color)
    // console.log("El nombre es: "+ name);
    // console.log("altura " + height);
    // console.log("peso " + mass);

    const div1 = document.createElement('div');
    div1.setAttribute("class", "col-12 col-md-6 col-lg-4");
    
    const div2 = document.createElement('div');
    div2.setAttribute("class", "single-timeline-content d-flex background-show");
    
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
    }
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

function* generadorSeccion2() {
    let i = 0;
    yield perSecundarios[i];
    i++;
    yield perSecundarios[i];
    i++;
    yield perSecundarios[i];
    i++;
    yield perSecundarios[i];
    i++;
    yield perSecundarios[i];
    i++;
    yield perSecundarios[i];
    i++;
}
