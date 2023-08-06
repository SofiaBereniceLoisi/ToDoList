
// // -------- Iniciar sesión y Registrarse ------------------------------------------------

const btnIngresar = document.querySelector('#btnIngresar');
const btnVolver = document.querySelector('#btnVolver');
const btnRegistrar = document.querySelector('#btnRegistrar');

document.addEventListener('DOMContentLoaded', function() {
    if (btnRegistrar) {
        btnRegistrar.addEventListener('click', registrarse);
    }
    if (btnIngresar) {
        btnIngresar.addEventListener('click', iniciarSesion);
    }

    if (btnVolver) {
        btnVolver.addEventListener('click', (event) => {
            event.preventDefault();
            location.href = './index.html';
        });
    }
});

function mostrarMensajeSinDatos(mensaje) {
    mensaje = Swal.fire({
        icon: 'error',
        title: 'No se ingresaron datos',
        text: "Por favor ingrese los datos solicitados para continuar",
        confirmButtonColor: '#C62727',
        confirmButtonText: 'VOLVER A INTENTAR'
    });
}

function mostrarMensajeDatosIncorrectos(mensaje) {
    mensaje = Swal.fire({
        icon: 'error',
        title: 'Datos incorrectos',
        text: "La contraseña es incorrecta.",
        confirmButtonColor: '#C62727',
        confirmButtonText: 'VOLVER A INTENTAR',
        
    });
}

function mostrarMensajeDatosInexistentes(mensaje) {
    mensaje = Swal.fire({
        icon: 'error',
        title: 'Error',
        text: "El usuario no existe, por favor regístrese.",

        confirmButtonColor: '#C62727',
        confirmButtonText: 'REGISTRARME'
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = './pages/registro.html';
        }
    })
}

function mostrarMensajeUsuarioExistente(){
    Swal.fire({
        icon: 'warning',
        title: 'Usuario existente',
        text: 'El nombre de usuario ya está registrado.',
        confirmButtonColor: '#C62727',
        confirmButtonText: 'IR A INICIAR SESION'
    }).then((result) => {
        if (result.isConfirmed) {
            location.href = './index.html';
        }
    })
}

function mostrarMensajeRegistroCompleto(){
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
    })
    Toast.fire({
        icon: 'success',
        title: 'Registro exitoso!'
    })
}

function mostrarMensajeBienvenido(nombreUsuario) {
    Swal.fire({
        icon: 'success',
        title: 'Bienvenido!',
        text: 'Ahora vas a poder utilizar la lista de tareas. Que la disfrutes, ' + nombreUsuario + '.',
        confirmButtonColor: '#C62727',
        confirmButtonText: 'Gracias!'
    }).then((result) => {
        if (result.isConfirmed) {
            location.href = './pages/pagprincipal.html';
        }
    })
}

class crearUsuario {
    constructor(usuario) {
        this.id = usuario.id
        this.username = usuario.username;
        this.mail = usuario.mail;
        this.password = usuario.password;
    }
}

// función para obtener los datos existentes tanto en localStorage como en el archivo usuarios.json-----------

async function getUsuarios() {
    const respuesta = await fetch('./data/usuarios.json');
    const infoUsuario = await respuesta.json() || [];
    const infoUsuarioLS = await JSON.parse(localStorage.getItem('usuarios')) || [];
    return infoUsuarioLS.length > 0 ? infoUsuarioLS : infoUsuario;
}

// función para registrarse----------------------------------------------------------------------------------

async function registrarse(event) {
    event.preventDefault();

    // Obtener los datos ingresados por el usuario en el formulario de registro
    const nombreUsuario = document.querySelector('#regUsuario').value;
    const regEmail = document.querySelector('#regEmail').value;
    const regPassword = document.querySelector('#regPassword').value;

    // Verificar que los campos no estén vacíos
    if (!nombreUsuario || !regEmail || !regPassword) {
        mostrarMensajeSinDatos();
        return;
    }

    // Obtener la lista de usuarios utilizando la función getUsuarios()
    const listaUsuarios = await getUsuarios();

    // Verificar si el nombre de usuario ya está registrado (opcional)
    const usuarioExistente = listaUsuarios.find((usuario) => usuario.username === nombreUsuario);
    if (usuarioExistente) {
        mostrarMensajeUsuarioExistente();
        return;
    }

    // Crear un nuevo objeto de usuario con la clase crearUsuario
    const nuevoUsuario = new crearUsuario({
        id: listaUsuarios.length, 
        username: nombreUsuario,
        mail: regEmail,
        password: regPassword,
    });

    // Agregar el nuevo objeto de usuario a la lista
    listaUsuarios.push(nuevoUsuario);

    // Guardar la lista actualizada de usuarios en el LocalStorage
    localStorage.setItem('usuarios', JSON.stringify(listaUsuarios));

    mostrarMensajeRegistroCompleto();
}

// función para iniciar sesión------------------------------------------------------------------------------------


async function iniciarSesion(event) {
    event.preventDefault();

    const nombreUsuario = document.querySelector('#logUsuario').value;
    const contraUsuario = document.querySelector('#logPassword').value;

    if (!nombreUsuario || !contraUsuario) {
        mostrarMensajeSinDatos();;
        return;
    }
    const listaUsuarios = await getUsuarios();
    const usuarioEncontrado = listaUsuarios.find(
        (usuario) => usuario.username === nombreUsuario
    );

    if (usuarioEncontrado) {
        // Verificar la contraseña
        if (usuarioEncontrado.password === contraUsuario) {
            // Si la contraseña es correcta, mostrar mensaje de bienvenida
            mostrarMensajeBienvenido(nombreUsuario);
        } else {
            // Si la contraseña es incorrecta, mostrar mensaje de datos incorrectos
            mostrarMensajeDatosIncorrectos();
        }
    } else {
        // Si el usuario no es encontrado, mostrar mensaje de datos inexistentes
        mostrarMensajeDatosInexistentes();
    }
}