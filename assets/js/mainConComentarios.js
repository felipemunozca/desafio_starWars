/*** Variables. ***/
/* Variables globales que se obtienen desde el index.html. */
const rowPopulares = document.querySelector('#rowPopulares');
const rowSecundarios = document.querySelector('#rowSecundarios');
const rowSignificativos = document.querySelector('#rowSignificativos');

/* Variables locales generadas para este documento JS. */
/* Arreglos con los personajes que deben ser agregados a las card. */
let personajesPopulares = [1, 2, 3, 4, 5];
let personajesSecundarios = [6, 7, 8, 9, 10, 11];
let personajesSignificativos = [12, 13, 14, 15, 16];
/* Se crea una variable, la cual sera igual a iniciar la función generadora. */
let genPersonajesSection1 = generadorSeccion1();
/* Se crea una variable, la cual sera igual al valor que esta en la posición cero del arreglo y desde donde se comenzara
 a contar con el método find(). */
let indexSection1 = personajesPopulares[0];
let genPersonajesSection2 = generadorSeccion2();
let indexSection2 = personajesSecundarios[0];
let genPersonajesSection3 = generadorSeccion3();
let indexSection3 = personajesSignificativos[0];


/*** Eventos. ***/
/* Evento JQuery que se activa al colocar el mouse sobre el elemento con el id cardPersonajesPopulares. */
$('#cardPersonajesPopulares').mouseenter(() => {
    /**
     * Se utiliza un método find() para buscar dentro del arreglo si dentro del arreglo existe un valor que sea igual al que
     *      se obtiene de la posición [0] del arreglo.
     * Si "popular" existe, se crea una variable la cual sera igual a la función generadora junto al método next() y su valor.
     * Se inicia la función para obtener la información de la API, y se pasa como argumentos, el numero del personaje, y el color
     *      el cual luego sera utilizado como una clase CSS.
     * Finalmente, se aumenta en 1 el contador, para volver a recorrer el ciclo y repetir el proceso.
     */
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
    /**
     * Se crea una función para obtener la información de cada personaje que existe en la API de Star Wars.
     * Se crea una promesa para conectarse con la API. Para no tener que traer toda la información de golpe, se pasa el id 
     *      que se obtiene del evento mouseenter como parámetro para filtrar la respuesta.
     * Al utilizar la función fetch() con una promesa, SIEMPRE hay que esperar la respuesta utilizando la función json().
     */
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

/**
 * Otra forma de declarar y utilizar la misma función obtenerDataApi() es utilizando async/await y un try-catch.
 */
// async function obtenerDataApi(id, color) {
//     try {
//         let respuesta  = await fetch(`https://swapi.dev/api/people/${id}`);
//         let datos = await respuesta.json();

//         imprimirCard(datos, color);
//     } catch (err) {
//         console.log(err)
//     }
// }

const imprimirCard = (datos, color) => {
    /* Se utiliza un destructuring para dividir los datos y solo utilizar los que son necesarios para el desafió. */
    const {name, height, mass} = datos;

    // rowPopulares.innerHTML += `
    //     <div class="col-12 col-md-6 col-lg-4">
    //         <div class="single-timeline-content d-flex">
    //             <i class="timeline-icon timeline-icon-red bi bi-circle-fill"></i>
    //             <div class="timeline-text">
    //                 <h6>${name}</h6>
    //                 <p>Altura: ${height} cm. Peso: ${mass} kg.</p>
    //             </div>
    //         </div>
    //     </div>
    // `;

    /**
     * En primera instancia, se intenta imprimir la card utilizando un innerHTML += pero se produce un error ya que el <div>
     *      donde se intentaba imprimir la nueva card esta arriba del <div> donde se ejecuta el evento mouseenter, asi que al
     *      agregar una card, se borrara la primera y se detenía la ejecución.
     * Es por ese motivo que se utiliza el método createElement() para crear la estructura de la card.
     * Se comienza por el <div> que esta mas afuera hacia adentro, ademas utilizando setAttribute() se agregan las clases de 
     *      cada elemento.
     * Utilizando la interpolación, se agregan los datos que se reciben en el lugar donde corresponden. 
     */
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

    /**
     * Se crea una validación multiple para saber que card se debe imprimir en que sección.
     * Se utiliza el método appendChild() para agregar que elementos son hijos del contenedor padre <div class="row">
     * Se utiliza el método append() para agregar que elementos van al mismo nivel y que son hijos del elemento anterior.
     */

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
