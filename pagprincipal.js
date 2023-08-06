// -------Boton modo oscuro -------------------

function cambiarTema() {
    let button = document.getElementById('container');
    let body = document.querySelector('body');

    button.classList.toggle('active');
    body.classList.toggle('active');

    if (button.classList.contains('active')) {
        localStorage.setItem('modo', 'oscuro');
    } else {
        localStorage.setItem('modo', 'claro');
    }
}

const container = document.querySelector('#container');
container.addEventListener('click', cambiarTema);


function aplicarTemaAlCargar() {
    if (localStorage.getItem('modo') === 'oscuro') {
        document.getElementById('container').classList.add('active');
        document.querySelector('body').classList.add('active');
    }
}

aplicarTemaAlCargar();



// -----------------------TO DO LIST --------------------------


// lista de variables:
const fecha = document.querySelector('#fecha');
const lista = document.querySelector('#listaTareas');
const input = document.querySelector('#input');
const botonEnter = document.querySelector('#agregar');
const check = 'fa-check-circle';
const uncheck = 'fa-circle';
const tachado = 'tachado';
let id ;
let list ;

// funcion de la fecha:

const date = new Date();
fecha.innerHTML = date.toLocaleDateString('es-AR', {weekday: "long", year: "numeric", month: "long", day: "numeric"}).toUpperCase();



// agregar tarea al apretar +
function agregarTarea (tarea, id, realizado, eliminado){

    if(eliminado){
        return
    }

    const tildado = realizado ? check : uncheck;
    const line = realizado ? tachado : '';

    const plantilla = ` <li id="elemento">
                        <i class="fa-regular ${tildado}" data="realizado" id="${id}"></i>
                        <p class="texto-tarea ${line}">${tarea}</p>
                        <i class="fas fa-trash de" data="eliminado" id="${id}"></i>
                        </li>`;
    lista.insertAdjacentHTML("beforeend", plantilla)
}

// cuando hago click se agrega la tarea, sino salta un toastify de que no se agregó una tarea.
botonEnter.addEventListener('click', () => {
    const tarea = input.value
    if (tarea){
        agregarTarea(tarea, id, false, false);
        list.push({
            nombre : tarea,
            id : id,
            realizado : false,
            eliminado : false,
        })
    }else{
        Toastify({
            text: "No agregaste ninguna tarea",
            duration: 3000,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            close: true,
            className: "t-tarea",
            style: {
                background: "#FF4545",
            },
        }).showToast();
    }
    localStorage.setItem('toDo', JSON.stringify(list));
    input.value = '';
    id +=1;
});

// agregar tarea si hago enter con el teclado
document.addEventListener('keyup', function(event){
    if (event.key == 'Enter'){
        const tarea = input.value
        if (tarea){
            agregarTarea(tarea, id, false, false);
            list.push({
                nombre : tarea,
                id : id,
                realizado : false,
                eliminado : false,
            })
        }else if (document.activeElement === input) {
            Toastify({
                text: "No agregaste ninguna tarea",
                duration: 3000,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                close: true,
                className: "t-tarea",
                style: {
                background: "#FF4545",
                },
            }).showToast();
        }
        localStorage.setItem('toDo', JSON.stringify(list));
        input.value = '';
        id +=1;
    }
})

// funcion de eliminar el bloque de la tarea agregada
function tareaEliminada(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    list[element.id].eliminado = true; //linea 136
    Toastify({
        text: "Tarea eliminada",
        duration: 3000,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        close: true,
        className: "t-tarea",
        style: {
            background: "#FF4545",
        },
    }).showToast();
}

// funcion de tilde para cuando se realiza una tarea
function tareaRealizada(element){
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    element.parentNode.querySelector('.texto-tarea').classList.toggle(tachado);
    list[element.id].realizado = list[element.id].realizado ? false : true;
}

// agregarle funcionalidad a los íconos de check y el tachito
lista.addEventListener('click', function(event){
    const element = event.target;
    const elementData = element.attributes.data.value;

    if(elementData === 'realizado'){
        tareaRealizada(element);
    }else if(elementData === 'eliminado'){
        tareaEliminada(element); //linea 167
    }
    localStorage.setItem('toDo', JSON.stringify(list));
})


let data = localStorage.getItem('toDo');
if (data){
    list = JSON.parse(data);
    id = list.length;
    cargarLista(list);
}else{
    list = [];
    id = 0;
}

function cargarLista(data){
    data.forEach(function(i){
        agregarTarea(i.nombre, i.id, i.realizado, i.eliminado);
    })
}