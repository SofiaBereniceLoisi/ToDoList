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

document.getElementById('ingresarButton').addEventListener('click', function(event) {
    event.preventDefault();
    guardarDatosEnLocalStorage();
});

document.getElementById('ingresarButton').addEventListener('submit', function(event) {
    event.preventDefault();
    guardarDatosEnLocalStorage();
    mostrarSaludoUsuario();
    cerrarModal();
});

mostrarSaludoUsuario();

document.getElementById('ingresarButton').addEventListener('click', function(event) {
    event.preventDefault();
    guardarDatosEnLocalStorage();
    mostrarSaludoUsuario();
    abrirModal();
});

document.getElementById('cerrarSesionButton').addEventListener('click', function(event) {
    event.preventDefault();
    localStorage.removeItem('datosUsuario');
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

