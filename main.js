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

document.getElementById('container').onclick = cambiarTema; 

function aplicarTemaAlCargar() {
    if (localStorage.getItem('modo') === 'oscuro') {
        document.getElementById('container').classList.add('active');
        document.querySelector('body').classList.add('active');
    }
}

aplicarTemaAlCargar();


// --------Abrir y cerrar la pestaña de login ------------------------------------------------

function abrirModal() {
    const modal = document.getElementById('modal-login');
    modal.style.display = 'flex';
}

function cerrarModal() {
    const modal = document.getElementById('modal-login');
    modal.style.display = 'none';
}

document.getElementById('abrirModal').addEventListener('click', function(event) {
    event.preventDefault(); 
    abrirModal();
});

document.getElementById('btnCerrar').addEventListener('click', cerrarModal);

// Ocultar el modal cuando se hace clic fuera de el
window.addEventListener('click', function(event) {
    const modal = document.getElementById('modal-login');
    if (event.target === modal) {
        cerrarModal();
    }
});

// Cambio de "iniciar sesion" por un saludo -------------------------------------------------------------------

let datosFormularioTemporal = null;

function guardarDatosEnLocalStorage() {
    const usernameInput = document.querySelector('input[name="username"]');
    const passwordInput = document.querySelector('input[name="password"]');
    const recordarmeCheckbox = document.getElementById('recordarmeCheckbox');

    const datosUsuario = {
        username: usernameInput.value,
        password: passwordInput.value
    };

    if (recordarmeCheckbox.checked) {
        localStorage.setItem('datosUsuario', JSON.stringify(datosUsuario));
    } else {
        datosFormularioTemporal = datosUsuario;
    }
}

mostrarSaludoUsuario();

document.getElementById('ingresarButton').addEventListener('click', function(event) {
    event.preventDefault();
    guardarDatosEnLocalStorage();
    mostrarSaludoUsuario();
    abrirModal();
});

document.getElementById('cerrarSesionButton').addEventListener('click', function(event) {
    event.preventDefault();
    localStorage.removeItem('datosUsuario'); // Limpiar datos del LocalStorage
    datosFormularioTemporal = null; // Limpiar datos temporales
    mostrarSaludoUsuario();
    cerrarModal();
});

function mostrarSaludoUsuario() {
    const saludoUsuario = document.getElementById('saludoUsuario');
    const cerrarSesionButton = document.getElementById('cerrarSesionButton');
    const ingresarButton = document.getElementById('ingresarButton');
    const iniciarSesion = document.getElementById('iniciarSesion');
    const pIniciarSesion = document.querySelector('.login-header p');
    const recordarme = document.querySelector('.login-item-otro');
    const olvideContraseña = document.getElementById('olvideContraseña');
    const recordarmeCheckbox = document.getElementById('recordarmeCheckbox');
    const crearCuenta = document.querySelector('.login-footer p');
    const btnCerrar = document.getElementById('btnCerrar');

    const datosUsuarioLocalStorage = JSON.parse(localStorage.getItem('datosUsuario'));

    if (datosUsuarioLocalStorage && datosUsuarioLocalStorage.username) {
        saludoUsuario.textContent = `Hola, ${datosUsuarioLocalStorage.username}.`;
        cerrarSesionButton.style.display = 'inline-block';
        ingresarButton.style.display = 'none';
        iniciarSesion.textContent = `Perfil del usuario`;
        pIniciarSesion.style.display = 'none';
        recordarme.style.display = 'none';
        olvideContraseña.style.display = 'none';
        recordarmeCheckbox.style.display = 'none';
        crearCuenta.style.display = 'none';
        btnCerrar.style.display = 'none';
    } else if (datosFormularioTemporal && datosFormularioTemporal.username) {
        saludoUsuario.textContent = `Hola, ${datosFormularioTemporal.username}.`;
        cerrarSesionButton.style.display = 'inline-block';
        ingresarButton.style.display = 'none';
        iniciarSesion.textContent = `Perfil del usuario`;
        pIniciarSesion.style.display = 'none';
        recordarme.style.display = 'none';
        olvideContraseña.style.display = 'none';
        recordarmeCheckbox.style.display = 'none';
        crearCuenta.style.display = 'none';
        btnCerrar.style.display = 'none';
    } else {
        saludoUsuario.textContent = 'INICIAR SESION';
        cerrarSesionButton.style.display = 'none';
        ingresarButton.style.display = 'inline-block';
        iniciarSesion.textContent = `Iniciar sesión`;
        pIniciarSesion.style.display = 'block';
        recordarme.style.display = 'flex';
        olvideContraseña.style.display = 'block';
        recordarmeCheckbox.style.display = 'inline';
        crearCuenta.style.display = 'block';
        btnCerrar.style.display = 'inline-block';
    }
}

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
    list[element.id].eliminado = true;
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
        tareaEliminada(element);
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