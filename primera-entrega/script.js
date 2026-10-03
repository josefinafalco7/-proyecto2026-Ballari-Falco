// FUNCIONES PARA LOCALSTORAGE

/**
 * Lee la lista de usuarios registrados desde localStorage.
 * @method obtenerUsuarios
 * @return {Array} Lista de usuarios, o un array vacío si no hay ninguno.
 */
const obtenerUsuarios = () => {
    return JSON.parse(localStorage.getItem("usuarios")) || [];
};

/**
 * Guarda la lista completa de usuarios en localStorage.
 * @method guardarUsuarios
 * @param {Array} usuarios - Lista de usuarios a guardar.
 * @return No retorna nada.
 */
const guardarUsuarios = (usuarios) => {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
};

/**
 * Lee la lista de viajes publicados desde localStorage.
 * @method obtenerViajes
 * @return {Array} Lista de viajes, o un array vacío si no hay ninguno.
 */
const obtenerViajes = () => {
    return JSON.parse(localStorage.getItem("viajes")) || [];
};

/**
 * Guarda la lista completa de viajes en localStorage.
 * @method guardarViajes
 * @param {Array} viajes - Lista de viajes a guardar.
 * @return No retorna nada.
 */
const guardarViajes = (viajes) => {
    localStorage.setItem("viajes", JSON.stringify(viajes));
};

/**
 * Lee el usuario que inició sesión actualmente.
 * @method obtenerUsuarioActual
 * @return {Object|null} El usuario logueado, o null si nadie inició sesión.
 */
const obtenerUsuarioActual = () => {
    return JSON.parse(localStorage.getItem("usuarioActual"));
};
// SESIÓN

/**
 * Cierra la sesión del usuario actual y vuelve al inicio.
 * @method cerrarSesion
 * @return No retorna nada.
 */
const cerrarSesion = () => {
    localStorage.removeItem("usuarioActual");
    window.location.href = "index.html";
};

/**
 * Comprueba que haya una sesión iniciada. Si no la hay,
 * avisa y redirige a formulario.html.
 * @method exigirSesion
 * @return {Object|null} El usuario logueado si existe, o null si no había sesión (y ya redirigió).
 */
const exigirSesion = () => {
    const usuarioActual = obtenerUsuarioActual();

    if (!usuarioActual) {
        alert("Tenés que iniciar sesión primero.");
        window.location.href = "formulario.html";
        return null;
    }

    return usuarioActual;
};

// VALIDACIONES
/**
 * Comprueba que un texto no esté vacío ni sea solo espacios.
 * Si está mal, avisa con alert y vacía el campo.
 * @method validarTextoObligatorio
 * @param {HTMLInputElement} campo - El input a validar.
 * @param {string} nombreCampo - Nombre del campo, para el mensaje de error.
 * @return {boolean} true si el valor es válido, false si no lo es.
 */
const validarTextoObligatorio = (campo, nombreCampo) => {
    if (campo.value.trim() === "") {
        alert("El campo " + nombreCampo + " no puede quedar vacío.");
        campo.value = "";
        campo.focus();
        return false;
    }

    return true;
};

/**
 * Comprueba que el email sea una dirección @ucc.edu.ar.
 * Si está mal, avisa con alert y vacía el campo.
 * @method validarEmailUniversitario
 * @param {HTMLInputElement} campo - El input de email a validar.
 * @return {boolean} true si el email es válido, false si no lo es.
 */
const validarEmailUniversitario = (campo) => {
    const email = campo.value.trim().toLowerCase();

    if (!email.endsWith("@ucc.edu.ar")) {
        alert("Usá tu email universitario (tiene que terminar en @ucc.edu.ar).");
        campo.value = "";
        campo.focus();
        return false;
    }

    return true;
};

/**
 * Comprueba que la contraseña tenga al menos 4 caracteres.
 * Si está mal, avisa con alert y vacía el campo.
 * @method validarContrasena
 * @param {HTMLInputElement} campo - El input de contraseña a validar.
 * @return {boolean} true si la contraseña es válida, false si no lo es.
 */
const validarContrasena = (campo) => {
    if (campo.value.length < 4) {
        alert("La contraseña tiene que tener al menos 4 caracteres.");
        campo.value = "";
        campo.focus();
        return false;
    }

    return true;
};

/**
 * Comprueba que una fecha no sea anterior al día de hoy.
 * Si está mal, avisa con alert y vacía el campo.
 * @method validarFechaFutura
 * @param {HTMLInputElement} campo - El input de fecha a validar.
 * @return {boolean} true si la fecha es hoy o futura, false si ya pasó.
 */
const validarFechaFutura = (campo) => {
    const hoy = new Date().toISOString().split("T")[0];

    if (campo.value < hoy) {
        alert("La fecha no puede ser anterior a hoy.");
        campo.value = "";
        campo.focus();
        return false;
    }

    return true;
};

/**
 * Comprueba que la cantidad de asientos esté entre 1 y 4.
 * Si está mal, avisa con alert y vacía el campo.
 * @method validarAsientos
 * @param {HTMLInputElement} campo - El input de asientos a validar.
 * @return {boolean} true si el valor es válido, false si no lo es.
 */
const validarAsientos = (campo) => {
    const asientos = Number(campo.value);

    if (!asientos || asientos < 1 || asientos > 4) {
        alert("La cantidad de asientos tiene que ser entre 1 y 4.");
        campo.value = "";
        campo.focus();
        return false;
    }

    return true;
};

/**
 * Comprueba que el precio no sea negativo.
 * Si está mal, avisa con alert y vacía el campo.
 * @method validarPrecio
 * @param {HTMLInputElement} campo - El input de precio a validar.
 * @return {boolean} true si el valor es válido, false si no lo es.
 */
const validarPrecio = (campo) => {
    if (campo.value === "" || Number(campo.value) < 0) {
        alert("El precio no puede ser negativo.");
        campo.value = "";
        campo.focus();
        return false;
    }

    return true;
};

// FORMULARIO.HTML: alternar Registrarme / Ya tengo cuenta

/**
 * Muestra la vista "registro" o "login" dentro de formulario.html
 * y oculta la otra, marcando como activo el botón correspondiente.
 * Se llama desde el onclick de los dos botones del selector.
 * @method mostrarVista
 * @param {string} vista - "registro" o "login".
 * @return No retorna nada.
 */
const mostrarVista = (vista) => {
    const vistaRegistro = document.getElementById("vista-registro");
    const vistaLogin = document.getElementById("vista-login");
    const botonRegistro = document.getElementById("boton-mostrar-registro");
    const botonLogin = document.getElementById("boton-mostrar-login");

    if (vista === "login") {
        vistaLogin.classList.remove("oculto");
        vistaRegistro.classList.add("oculto");
        botonLogin.classList.add("activo");
        botonRegistro.classList.remove("activo");
    } else {
        vistaRegistro.classList.remove("oculto");
        vistaLogin.classList.add("oculto");
        botonRegistro.classList.add("activo");
        botonLogin.classList.remove("activo");
    }
};

// REGISTRO

/**
 * Valida y guarda un usuario nuevo. Se llama desde el
 * onsubmit del formulario de registro.
 * @method registrarUsuario
 * @param {Event} evento - Evento submit del formulario.
 * @return No retorna nada.
 */
const registrarUsuario = (evento) => {
    evento.preventDefault();

    const campoNombre = document.getElementById("registro-nombre");
    const campoApellido = document.getElementById("registro-apellido");
    const campoEmail = document.getElementById("registro-email");
    const campoPassword = document.getElementById("registro-password");

    if (!validarTextoObligatorio(campoNombre, "Nombre")) return;
    if (!validarTextoObligatorio(campoApellido, "Apellido")) return;
    if (!validarEmailUniversitario(campoEmail)) return;
    if (!validarContrasena(campoPassword)) return;

    const tipoCuentaSeleccionada = document.querySelector('input[name="tipo-cuenta"]:checked');

    if (!tipoCuentaSeleccionada) {
        alert("Seleccioná el tipo de cuenta.");
        return;
    }

    const email = campoEmail.value.trim().toLowerCase();
    const usuarios = obtenerUsuarios();

    const existe = usuarios.some((usuario) => usuario.email === email);

    if (existe) {
        alert("Ya existe una cuenta con ese email.");
        campoEmail.value = "";
        campoEmail.focus();
        return;
    }

    const nuevoUsuario = {
        id: Date.now(),
        nombre: campoNombre.value.trim(),
        apellido: campoApellido.value.trim(),
        email: email,
        password: campoPassword.value,
        tipoCuenta: tipoCuentaSeleccionada.value
    };

    usuarios.push(nuevoUsuario);
    guardarUsuarios(usuarios);

    alert("Cuenta creada correctamente. Ahora podés iniciar sesión.");

    document.getElementById("formulario-registro").reset();
    mostrarVista("login");
};

// INICIO DE SESIÓN

/**
 * Valida las credenciales y, si son correctas, inicia sesión
 * y redirige según el tipo de cuenta. 
 * @method iniciarSesion
 * @param {Event} evento - Evento submit del formulario.
 * @return No retorna nada.
 */
const iniciarSesion = (evento) => {
    evento.preventDefault();

    const campoEmail = document.getElementById("login-email");
    const campoPassword = document.getElementById("login-password");

    if (!validarTextoObligatorio(campoEmail, "Email")) return;
    if (!validarTextoObligatorio(campoPassword, "Contraseña")) return;

    const email = campoEmail.value.trim().toLowerCase();
    const password = campoPassword.value;

    const usuarios = obtenerUsuarios();

    const usuario = usuarios.find((u) => u.email === email && u.password === password);

    if (!usuario) {
        alert("Email o contraseña incorrectos.");
        campoPassword.value = "";
        campoPassword.focus();
        return;
    }

    localStorage.setItem("usuarioActual", JSON.stringify(usuario));

    if (usuario.tipoCuenta === "conductor") {
        window.location.href = "conductor.html";
    } else {
        window.location.href = "pasajero.html";
    }
};

// PASAJERO.HTML: mostrar u ocultar el link a "Mis viajes"

/**
 * Exige sesión iniciada y muestra el link "Mis viajes" (conductor)
 * solo si el usuario tiene ese rol. Se llama en el onload de pasajero.html.
 * @method prepararPaginaPasajero
 * @return No retorna nada.
 */
const prepararPaginaPasajero = () => {
    const usuarioActual = exigirSesion();

    if (!usuarioActual) return;

    const linkMisViajesConductor = document.getElementById("link-mis-viajes-conductor");

    if (usuarioActual.tipoCuenta === "conductor" || usuarioActual.tipoCuenta === "ambos") {
        linkMisViajesConductor.classList.remove("oculto");
    }
};

// PUBLICAR VIAJE

/**
 * Exige sesión de conductor/ambos al entrar a publicar_viaje.html.
 * Si no corresponde, avisa y redirige. Se llama en el onload de la página.
 * @method prepararPaginaPublicar
 * @return No retorna nada.
 */
const prepararPaginaPublicar = () => {
    const usuarioActual = exigirSesion();
    if (!usuarioActual) return;

    if (usuarioActual.tipoCuenta !== "conductor" && usuarioActual.tipoCuenta !== "ambos") {
        alert("Tu cuenta es de pasajero y no puede publicar viajes.");
        window.location.href = "pasajero.html";
    }
};

/**
 * Valida y guarda un viaje nuevo publicado por el conductor logueado.
 * Se llama desde el onsubmit del formulario de publicar_viaje.html.
 * @method publicarViaje
 * @param {Event} evento - Evento submit del formulario.
 * @return No retorna nada.
 */
const publicarViaje = (evento) => {
    evento.preventDefault();

    const usuarioActual = exigirSesion();
    if (!usuarioActual) return;

    if (usuarioActual.tipoCuenta !== "conductor" && usuarioActual.tipoCuenta !== "ambos") {
        alert("Tu cuenta es de pasajero y no puede publicar viajes.");
        window.location.href = "pasajero.html";
        return;
    }

    const campoDireccion = document.getElementById("direccion");
    const campoHora = document.getElementById("hora");
    const campoFecha = document.getElementById("fecha");
    const campoAsientos = document.getElementById("asientos");
    const campoPrecio = document.getElementById("precio");
    const campoPunto = document.getElementById("punto-encuentro");

    if (!validarFechaFutura(campoFecha)) return;
    if (!validarAsientos(campoAsientos)) return;
    if (!validarPrecio(campoPrecio)) return;
    if (!validarTextoObligatorio(campoPunto, "Punto de encuentro")) return;

    const viajes = obtenerViajes();

    const nuevoViaje = {
        id: Date.now(),
        conductorId: usuarioActual.id,
        conductorNombre: usuarioActual.nombre + " " + usuarioActual.apellido,
        direccion: campoDireccion.value,
        hora: campoHora.value,
        fecha: campoFecha.value,
        asientos: Number(campoAsientos.value),
        precio: Number(campoPrecio.value),
        puntoEncuentro: campoPunto.value.trim()
    };

    viajes.push(nuevoViaje);
    guardarViajes(viajes);

    alert("Viaje publicado correctamente.");
    window.location.href = "conductor.html";
};

// CONDUCTOR.HTML: mostrar mis viajes publicados

/**
 * Crea el <li> con los datos de un viaje publicado por el conductor,
 * con botones para editarlo o cancelarlo.
 * @method crearFilaViajeConductor
 * @param {Object} viaje - El viaje a mostrar.
 * @return {HTMLLIElement} El elemento <li> ya armado.
 */
const crearFilaViajeConductor = (viaje) => {
    const li = document.createElement("li");
    const fieldset = document.createElement("fieldset");
    fieldset.className = "recuadro-viaje";

    const legend = document.createElement("legend");
    legend.textContent = viaje.hora + " · " + formatearFecha(viaje.fecha);

    const pDireccion = document.createElement("p");
    pDireccion.textContent = viaje.direccion === "nc-ucc" ? "Nueva Córdoba → UCC" : "UCC → Nueva Córdoba";

    const pDatos = document.createElement("p");
    pDatos.textContent = viaje.asientos + " asientos disponibles · $" + viaje.precio + " por asiento";

    const pEncuentro = document.createElement("p");
    pEncuentro.textContent = "Punto de encuentro: " + viaje.puntoEncuentro;

    const divAcciones = document.createElement("div");
    divAcciones.className = "acciones-viaje";

    const botonEditar = document.createElement("a");
    botonEditar.href = "detalle_viaje.html?id=" + viaje.id + "&modo=conductor";
    botonEditar.className = "boton boton-secundario";
    botonEditar.textContent = "Editar";

    const botonCancelar = document.createElement("button");
    botonCancelar.type = "button";
    botonCancelar.className = "boton boton-peligro";
    botonCancelar.textContent = "Cancelar viaje";
    botonCancelar.onclick = () => abrirDialogCancelar(viaje.id);

    divAcciones.appendChild(botonEditar);
    divAcciones.appendChild(botonCancelar);

    fieldset.appendChild(legend);
    fieldset.appendChild(pDireccion);
    fieldset.appendChild(pDatos);
    fieldset.appendChild(pEncuentro);
    fieldset.appendChild(divAcciones);
    li.appendChild(fieldset);

    return li;
};

/**
 * Carga y muestra los viajes publicados por el conductor logueado.
 * Exige sesión y rol de conductor/ambos. Se llama en el onload de conductor.html.
 * @method mostrarMisViajes
 * @return No retorna nada.
 */
const mostrarMisViajes = () => {
    const usuarioActual = exigirSesion();
    if (!usuarioActual) return;

    if (usuarioActual.tipoCuenta !== "conductor" && usuarioActual.tipoCuenta !== "ambos") {
        alert("Esta sección es solamente para conductores.");
        window.location.href = "pasajero.html";
        return;
    }

    const listaMisViajes = document.getElementById("lista-mis-viajes");
    const mensajeVacio = document.getElementById("sin-viajes-publicados");

    const viajes = obtenerViajes();
    const misViajes = viajes.filter((viaje) => viaje.conductorId === usuarioActual.id);

    if (misViajes.length === 0) {
        mensajeVacio.classList.remove("oculto");
        return;
    }

    mensajeVacio.classList.add("oculto");

    misViajes.forEach((viaje) => {
        listaMisViajes.appendChild(crearFilaViajeConductor(viaje));
    });
};

// DIALOG: confirmar cancelación de un viaje

let idViajeACancelar = null;

/**
 * Abre el dialog de confirmación para cancelar un viaje puntual.
 * @method abrirDialogCancelar
 * @param {number} id - Id del viaje a cancelar.
 * @return No retorna nada.
 */
const abrirDialogCancelar = (id) => {
    idViajeACancelar = id;
    document.getElementById("dialog-cancelar").showModal();
};

/**
 * Cierra el dialog de cancelación sin eliminar el viaje.
 * @method cerrarDialogCancelar
 * @return No retorna nada.
 */
const cerrarDialogCancelar = () => {
    document.getElementById("dialog-cancelar").close();
};

/**
 * Confirma la cancelación: elimina el viaje guardado y recarga la página.
 * @method confirmarCancelacion
 * @return No retorna nada.
 */
const confirmarCancelacion = () => {
    eliminarViaje(idViajeACancelar);
    document.getElementById("dialog-cancelar").close();
};

/**
 * Elimina un viaje de localStorage por su id y recarga la página.
 * @method eliminarViaje
 * @param {number} id - Id del viaje a eliminar.
 * @return No retorna nada.
 */
const eliminarViaje = (id) => {
    const viajes = obtenerViajes().filter((viaje) => viaje.id !== id);
    guardarViajes(viajes);
    window.location.reload();
};

// FORMATEAR FECHA

/**
 * Convierte una fecha "AAAA-MM-DD" (la que entrega un input date)
 * al formato "DD/MM/AAAA" para mostrar en pantalla.
 * @method formatearFecha
 * @param {string} fecha - Fecha en formato AAAA-MM-DD.
 * @return {string} Fecha en formato DD/MM/AAAA, o cadena vacía si no hay fecha.
 */
const formatearFecha = (fecha) => {
    if (!fecha) return "";

    const partes = fecha.split("-");
    return partes[2] + "/" + partes[1] + "/" + partes[0];
};

// VIAJES-UCC-NC.HTML / VIAJES-NC-UCC.HTML: listado para el pasajero

/**
 * Crea el <li> con los datos de un viaje disponible para el pasajero,
 * con el link para ver el detalle y reservar.
 * @method crearFilaViajeListado
 * @param {Object} viaje - El viaje a mostrar.
 * @return {HTMLLIElement} El elemento <li> ya armado.
 */
const crearFilaViajeListado = (viaje) => {
    const li = document.createElement("li");
    const fieldset = document.createElement("fieldset");
    fieldset.className = "recuadro-viaje";

    const legend = document.createElement("legend");
    legend.textContent = viaje.hora + " · " + formatearFecha(viaje.fecha);

    const pConductor = document.createElement("p");
    pConductor.textContent = "Conductor: " + viaje.conductorNombre;

    const pDatos = document.createElement("p");
    pDatos.textContent = viaje.asientos + " asientos disponibles · Punto de encuentro: " + viaje.puntoEncuentro;

    const pPrecio = document.createElement("p");
    pPrecio.textContent = "Precio: $" + viaje.precio + " por asiento";

    const botonDetalle = document.createElement("a");
    botonDetalle.href = "detalle_viaje.html?id=" + viaje.id + "&modo=pasajero";
    botonDetalle.className = "boton boton-secundario";
    botonDetalle.textContent = "Ver detalle →";

    fieldset.appendChild(legend);
    fieldset.appendChild(pConductor);
    fieldset.appendChild(pDatos);
    fieldset.appendChild(pPrecio);
    fieldset.appendChild(botonDetalle);
    li.appendChild(fieldset);

    return li;
};

/**
 * Carga y muestra los viajes disponibles para el pasajero: filtra por
 * dirección (según el nombre del archivo), que tengan asientos libres,
 * que no hayan pasado, y que no los haya publicado el propio usuario.
 * También calcula el total de asientos disponibles entre todos los viajes.
 * Exige sesión iniciada. Se llama en el onload de los listados.
 * @method mostrarViajesPasajero
 * @return No retorna nada.
 */
const mostrarViajesPasajero = () => {
    const usuarioActual = exigirSesion();
    if (!usuarioActual) return;

    const listaViajes = document.getElementById("lista-viajes");
    const cantidadViajes = document.getElementById("cantidad-viajes");
    const totalAsientos = document.getElementById("total-asientos");
    const mensajeVacio = document.getElementById("sin-viajes");

    const viajes = obtenerViajes();

    const esNcUcc = window.location.pathname.includes("viajes-nc-ucc");
    const direccionBuscada = esNcUcc ? "nc-ucc" : "ucc-nc";

    const hoy = new Date().toISOString().split("T")[0];

    const viajesDisponibles = viajes.filter((viaje) => {
        return viaje.direccion === direccionBuscada &&
               viaje.asientos > 0 &&
               viaje.fecha >= hoy &&
               viaje.conductorId !== usuarioActual.id;
    });

    cantidadViajes.textContent = viajesDisponibles.length + (viajesDisponibles.length === 1 ? " viaje encontrado" : " viajes encontrados");

    const sumaAsientos = viajesDisponibles.reduce((total, viaje) => total + viaje.asientos, 0);
    totalAsientos.textContent = sumaAsientos + (sumaAsientos === 1 ? " asiento libre en total" : " asientos libres en total");

    if (viajesDisponibles.length === 0) {
        mensajeVacio.classList.remove("oculto");
        return;
    }

    mensajeVacio.classList.add("oculto");

    viajesDisponibles.forEach((viaje) => {
        listaViajes.appendChild(crearFilaViajeListado(viaje));
    });
};

// DETALLE_VIAJE.HTML: ver (pasajero) o editar (conductor)

/**
 * Carga el viaje indicado por "id" en la URL y muestra la vista que
 * corresponda según "modo": solo lectura con botón Reservar para el
 * pasajero, o el formulario de edición para el conductor dueño del viaje.
 * Exige sesión iniciada en los dos modos, y que el conductor sea el
 * dueño del viaje para poder editarlo. Se llama en el onload de la página.
 * @method cargarDetalleViaje
 * @return No retorna nada.
 */
const cargarDetalleViaje = () => {
    const usuarioActual = exigirSesion();
    if (!usuarioActual) return;

    const parametros = new URLSearchParams(window.location.search);
    const idViaje = Number(parametros.get("id"));
    const modo = parametros.get("modo") || "pasajero";

    const viajes = obtenerViajes();
    const viaje = viajes.find((v) => v.id === idViaje);

    const vistaPasajero = document.getElementById("vista-pasajero");
    const vistaConductor = document.getElementById("vista-conductor");

    if (!viaje) {
        document.getElementById("titulo-detalle").textContent = "Viaje no encontrado";
        vistaPasajero.classList.add("oculto");
        vistaConductor.classList.add("oculto");
        return;
    }

    if (modo === "conductor") {
        if (viaje.conductorId !== usuarioActual.id) {
            alert("No podés editar un viaje que no publicaste vos.");
            window.location.href = "conductor.html";
            return;
        }

        vistaPasajero.classList.add("oculto");

        document.getElementById("editar-direccion").value = viaje.direccion;
        document.getElementById("editar-hora").value = viaje.hora;
        document.getElementById("editar-fecha").value = viaje.fecha;
        document.getElementById("editar-asientos").value = viaje.asientos;
        document.getElementById("editar-precio").value = viaje.precio;
        document.getElementById("editar-punto-encuentro").value = viaje.puntoEncuentro;

        return;
    }

    vistaConductor.classList.add("oculto");

    document.getElementById("titulo-detalle").textContent = viaje.direccion === "nc-ucc" ? "Nueva Córdoba → UCC" : "UCC → Nueva Córdoba";
    document.getElementById("detalle-direccion").textContent = viaje.direccion === "nc-ucc" ? "Nueva Córdoba → UCC" : "UCC → Nueva Córdoba";
    document.getElementById("detalle-conductor").textContent = viaje.conductorNombre;
    document.getElementById("detalle-hora").textContent = viaje.hora;
    document.getElementById("detalle-fecha").textContent = formatearFecha(viaje.fecha);
    document.getElementById("detalle-asientos").textContent = viaje.asientos;
    document.getElementById("detalle-punto").textContent = viaje.puntoEncuentro;
    document.getElementById("detalle-precio").textContent = "$" + viaje.precio;

    const botonReservar = document.getElementById("boton-reservar");

    if (viaje.asientos < 1) {
        botonReservar.disabled = true;
        botonReservar.textContent = "Sin asientos disponibles";
    }
};

/**
 * Reserva el viaje que se está mostrando: resta un asiento y vuelve
 * a la lista del pasajero. Se llama desde el onclick del botón Reservar.
 * @method reservarViaje
 * @return No retorna nada.
 */
const reservarViaje = () => {
    const parametros = new URLSearchParams(window.location.search);
    const idViaje = Number(parametros.get("id"));

    const viajes = obtenerViajes();
    const viaje = viajes.find((v) => v.id === idViaje);

    if (!viaje || viaje.asientos < 1) return;

    viaje.asientos = viaje.asientos - 1;
    guardarViajes(viajes);

    alert("¡Viaje reservado!");
    window.location.href = "pasajero.html";
};

/**
 * Valida y guarda los cambios del formulario de edición de un viaje.
 * Se llama desde el onsubmit del formulario en modo conductor.
 * @method guardarEdicionViaje
 * @param {Event} evento - Evento submit del formulario.
 * @return No retorna nada.
 */
const guardarEdicionViaje = (evento) => {
    evento.preventDefault();

    const campoFecha = document.getElementById("editar-fecha");
    const campoAsientos = document.getElementById("editar-asientos");
    const campoPrecio = document.getElementById("editar-precio");
    const campoPunto = document.getElementById("editar-punto-encuentro");

    if (!validarFechaFutura(campoFecha)) return;
    if (!validarAsientos(campoAsientos)) return;
    if (!validarPrecio(campoPrecio)) return;
    if (!validarTextoObligatorio(campoPunto, "Punto de encuentro")) return;

    const parametros = new URLSearchParams(window.location.search);
    const idViaje = Number(parametros.get("id"));

    const viajes = obtenerViajes();
    const viaje = viajes.find((v) => v.id === idViaje);

    if (!viaje) return;

    viaje.direccion = document.getElementById("editar-direccion").value;
    viaje.hora = document.getElementById("editar-hora").value;
    viaje.fecha = campoFecha.value;
    viaje.asientos = Number(campoAsientos.value);
    viaje.precio = Number(campoPrecio.value);
    viaje.puntoEncuentro = campoPunto.value.trim();

    guardarViajes(viajes);

    alert("Cambios guardados correctamente.");
    window.location.href = "conductor.html";
};
