// ==========================================
// UCC CARPOOL - JAVASCRIPT
// ==========================================


// ==========================================
// FUNCIONES PARA LOCALSTORAGE
// ==========================================

function obtenerUsuarios() {
    return JSON.parse(localStorage.getItem("usuarios")) || [];
}

function guardarUsuarios(usuarios) {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function obtenerViajes() {
    return JSON.parse(localStorage.getItem("viajes")) || [];
}

function guardarViajes(viajes) {
    localStorage.setItem("viajes", JSON.stringify(viajes));
}

function obtenerUsuarioActual() {
    return JSON.parse(localStorage.getItem("usuarioActual"));
}


// ==========================================
// CERRAR SESIÓN
// ==========================================

function cerrarSesion() {

    localStorage.removeItem("usuarioActual");

    window.location.href = "index.html";
}


// ==========================================
// FORMULARIOS
// ==========================================

const formularios = document.querySelectorAll("form");

formularios.forEach(function(formulario) {

    formulario.addEventListener("submit", function(evento) {

        evento.preventDefault();


        // ==================================
        // REGISTRO
        // ==================================

        const campoNombre =
            formulario.querySelector("#registro-nombre");


        if (campoNombre) {

            const nombre =
                formulario.querySelector("#registro-nombre").value.trim();

            const apellido =
                formulario.querySelector("#registro-apellido").value.trim();

            const email =
                formulario.querySelector("#registro-email").value.trim().toLowerCase();

            const password =
                formulario.querySelector("#registro-password").value;

            const tipoCuentaSeleccionada =
                formulario.querySelector(
                    'input[name="tipo-cuenta"]:checked'
                );


            if (!tipoCuentaSeleccionada) {

                alert("Seleccioná el tipo de cuenta.");

                return;
            }


            const tipoCuenta =
                tipoCuentaSeleccionada.value;


            const usuarios =
                obtenerUsuarios();


            const existe =
                usuarios.some(function(usuario) {

                    return usuario.email === email;

                });


            if (existe) {

                alert("Ya existe una cuenta con ese email.");

                return;
            }


            const nuevoUsuario = {

                id: Date.now(),

                nombre: nombre,

                apellido: apellido,

                email: email,

                password: password,

                tipoCuenta: tipoCuenta

            };


            usuarios.push(nuevoUsuario);

            guardarUsuarios(usuarios);


            alert(
                "Cuenta creada correctamente. Ahora podés iniciar sesión."
            );


            formulario.reset();

            return;
        }


        // ==================================
        // INICIO DE SESIÓN
        // ==================================

        const campoLogin =
            formulario.querySelector("#login-email");


        if (campoLogin) {

            const email =
                formulario.querySelector("#login-email").value.trim().toLowerCase();

            const password =
                formulario.querySelector("#login-password").value;


            const usuarios =
                obtenerUsuarios();


            const usuario =
                usuarios.find(function(usuario) {

                    return usuario.email === email &&
                           usuario.password === password;

                });


            if (!usuario) {

                alert("Email o contraseña incorrectos.");

                return;
            }


            localStorage.setItem(
                "usuarioActual",
                JSON.stringify(usuario)
            );


            alert("Inicio de sesión exitoso.");


            if (usuario.tipoCuenta === "conductor") {

                window.location.href = "conductor.html";

            }

            else {

                // pasajero o ambos
                window.location.href = "pasajero.html";

            }


            return;
        }


        // ==================================
        // PUBLICAR VIAJE
        // ==================================

        const campoDireccion =
            formulario.querySelector("#direccion");


        if (campoDireccion) {

            const usuarioActual =
                obtenerUsuarioActual();


            if (!usuarioActual) {

                alert(
                    "Tenés que iniciar sesión para publicar un viaje."
                );

                window.location.href = "formulario.html";

                return;
            }


            if (
                usuarioActual.tipoCuenta !== "conductor" &&
                usuarioActual.tipoCuenta !== "ambos"
            ) {

                alert(
                    "Tu cuenta es de pasajero y no puede publicar viajes."
                );

                window.location.href = "pasajero.html";

                return;
            }


            const hora =
                formulario.querySelector("#hora").value;

            const fecha =
                formulario.querySelector("#fecha").value;

            const asientos =
                formulario.querySelector("#asientos").value;

            const precio =
                formulario.querySelector("#precio").value;

            const puntoEncuentro =
                formulario.querySelector("#punto-encuentro").value.trim();


            const viajes =
                obtenerViajes();


            const nuevoViaje = {

                id: Date.now(),

                conductorId: usuarioActual.id,

                conductorNombre:
                    usuarioActual.nombre +
                    " " +
                    usuarioActual.apellido,

                direccion:
                    campoDireccion.value,

                hora: hora,

                fecha: fecha,

                asientos: Number(asientos),

                precio: Number(precio),

                puntoEncuentro: puntoEncuentro

            };


            viajes.push(nuevoViaje);

            guardarViajes(viajes);


            alert("Viaje publicado correctamente.");

            window.location.href = "conductor.html";

        }

    });

});


// ==========================================
// MOSTRAR MIS VIAJES - CONDUCTOR
// ==========================================

const listaMisViajes =
    document.getElementById("lista-mis-viajes");


if (listaMisViajes) {

    const usuarioActual =
        obtenerUsuarioActual();


    // No está logueado
    if (!usuarioActual) {

        window.location.href = "formulario.html";

    }

    // Está logueado pero es pasajero
    else if (
        usuarioActual.tipoCuenta !== "conductor" &&
        usuarioActual.tipoCuenta !== "ambos"
    ) {

        alert(
            "Esta sección es solamente para conductores."
        );

        window.location.href = "pasajero.html";

    }

    // Es conductor
    else {

        const viajes =
            obtenerViajes();


        const misViajes =
            viajes.filter(function(viaje) {

                return viaje.conductorId === usuarioActual.id;

            });


        const mensajeVacio =
            document.getElementById(
                "sin-viajes-publicados"
            );


        if (misViajes.length === 0) {

            mensajeVacio.style.display = "block";

        }

        else {

            mensajeVacio.style.display = "none";


            misViajes.forEach(function(viaje) {

                const li =
                    document.createElement("li");


                const fieldset =
                    document.createElement("fieldset");

                fieldset.className =
                    "recuadro-viaje";


                const legend =
                    document.createElement("legend");

                legend.textContent =
                    viaje.hora +
                    " · " +
                    formatearFecha(viaje.fecha);


                const pDireccion =
                    document.createElement("p");


                pDireccion.textContent =
                    viaje.direccion === "nc-ucc"
                    ? "Nueva Córdoba → UCC"
                    : "UCC → Nueva Córdoba";


                const pDatos =
                    document.createElement("p");


                pDatos.textContent =
                    viaje.asientos +
                    " asientos disponibles · $" +
                    viaje.precio +
                    " por asiento";


                const pEncuentro =
                    document.createElement("p");


                pEncuentro.textContent =
                    "Punto de encuentro: " +
                    viaje.puntoEncuentro;


                // Botón editar
                const botonEditar =
                    document.createElement("a");


                botonEditar.href =
                    "detalle_viaje.html?id=" +
                    viaje.id +
                    "&modo=conductor";


                botonEditar.className =
                    "boton boton-secundario";


                botonEditar.textContent =
                    "Editar";


                // Botón cancelar
                const botonCancelar =
                    document.createElement("button");


                botonCancelar.type =
                    "button";


                botonCancelar.className =
                    "boton boton-fantasma";


                botonCancelar.textContent =
                    "Cancelar viaje";


                botonCancelar.addEventListener(
                    "click",
                    function() {

                        const confirmar =
                            confirm(
                                "¿Seguro que querés cancelar este viaje?"
                            );


                        if (confirmar) {

                            eliminarViaje(viaje.id);

                        }

                    }
                );


                fieldset.appendChild(legend);

                fieldset.appendChild(pDireccion);

                fieldset.appendChild(pDatos);

                fieldset.appendChild(pEncuentro);

                fieldset.appendChild(botonEditar);

                fieldset.appendChild(botonCancelar);

                li.appendChild(fieldset);

                listaMisViajes.appendChild(li);

            });

        }

    }

}


// ==========================================
// MOSTRAR VIAJES AL PASAJERO
// ==========================================

const listaViajes =
    document.getElementById("lista-viajes");


if (listaViajes) {

    // IMPORTANTE:
    // Acá NO hacemos ninguna redirección
    // a formulario.html.
    //
    // El pasajero simplemente consulta
    // los viajes guardados.

    const viajes =
        obtenerViajes();


    // Detectar qué dirección estamos viendo

    const esNcUcc =
        window.location.pathname.includes(
            "viajes-nc-ucc"
        );


    const direccionBuscada =
        esNcUcc
        ? "nc-ucc"
        : "ucc-nc";


    // Filtrar por dirección

    const viajesDisponibles =
        viajes.filter(function(viaje) {

            return viaje.direccion === direccionBuscada;

        });


    const cantidadViajes =
        document.getElementById(
            "cantidad-viajes"
        );


    const mensajeVacio =
        document.getElementById(
            "sin-viajes"
        );


    // Mostrar cantidad

    cantidadViajes.textContent =
        viajesDisponibles.length +
        (
            viajesDisponibles.length === 1
            ? " viaje encontrado"
            : " viajes encontrados"
        );


    // ----------------------------------
    // NO HAY VIAJES
    // ----------------------------------

    if (viajesDisponibles.length === 0) {

        mensajeVacio.style.display =
            "block";

    }


    // ----------------------------------
    // HAY VIAJES
    // ----------------------------------

    else {

        mensajeVacio.style.display =
            "none";


        viajesDisponibles.forEach(function(viaje) {

            const li =
                document.createElement("li");


            const fieldset =
                document.createElement("fieldset");

            fieldset.className =
                "recuadro-viaje";


            const legend =
                document.createElement("legend");


            legend.textContent =
                viaje.hora +
                " · " +
                formatearFecha(viaje.fecha);


            const pConductor =
                document.createElement("p");


            pConductor.textContent =
                "Conductor: " +
                viaje.conductorNombre;


            const pDatos =
                document.createElement("p");


            pDatos.textContent =
                viaje.asientos +
                " asientos disponibles · " +
                "Punto de encuentro: " +
                viaje.puntoEncuentro;


            const pPrecio =
                document.createElement("p");


            pPrecio.textContent =
                "Precio: $" +
                viaje.precio +
                " por asiento";


            const botonDetalle =
                document.createElement("a");


            botonDetalle.href =
                "detalle_viaje.html?id=" +
                viaje.id +
                "&modo=pasajero";


            botonDetalle.className =
                "boton boton-secundario";


            botonDetalle.textContent =
                "Ver detalle →";


            fieldset.appendChild(legend);

            fieldset.appendChild(pConductor);

            fieldset.appendChild(pDatos);

            fieldset.appendChild(pPrecio);

            fieldset.appendChild(botonDetalle);

            li.appendChild(fieldset);

            listaViajes.appendChild(li);

        });

    }

}


// ==========================================
// ELIMINAR VIAJE
// ==========================================

function eliminarViaje(id) {

    let viajes =
        obtenerViajes();


    viajes =
        viajes.filter(function(viaje) {

            return viaje.id !== id;

        });

    guardarViajes(viajes);


    window.location.reload();

}


// ==========================================
// FORMATEAR FECHA
// ==========================================

function formatearFecha(fecha) {

    if (!fecha) {
        return "";
    }


    const partes =
        fecha.split("-");


    return partes[2] +
           "/" +
           partes[1] +
           "/" +
           partes[0];
}


// ==========================================
// BOTÓN SALIR
// ==========================================

const botonesSalir =
    document.querySelectorAll(
        'a[href="index.html"]'
    );


botonesSalir.forEach(function(boton) {

    if (
        boton.textContent.trim() === "Salir"
    ) {

        boton.addEventListener(
            "click",
            function(evento) {

                evento.preventDefault();

                cerrarSesion();

            }
        );

    }

});


// ==========================================
// DETALLE DE VIAJE (ver como pasajero / editar como conductor)
// ==========================================
// Esta sección faltaba por completo: es la que conecta
// detalle_viaje.html con los datos guardados en localStorage.

const formularioEditarViaje =
    document.getElementById("formulario-editar-viaje");


if (formularioEditarViaje) {

    const parametros =
        new URLSearchParams(window.location.search);

    const idViaje =
        Number(parametros.get("id"));

    const modo =
        parametros.get("modo") || "pasajero";


    const viajes =
        obtenerViajes();

    const viaje =
        viajes.find(function(v) {

            return v.id === idViaje;

        });


    const vistaPasajero =
        document.getElementById("vista-pasajero");

    const vistaConductor =
        document.getElementById("vista-conductor");


    if (!viaje) {

        document.getElementById("titulo-detalle").textContent =
            "Viaje no encontrado";

        vistaPasajero.style.display = "none";
        vistaConductor.style.display = "none";

    }

    else if (modo === "conductor") {

        vistaPasajero.style.display = "none";


        // Precargar el formulario con los datos actuales del viaje
        document.getElementById("editar-direccion").value = viaje.direccion;
        document.getElementById("editar-hora").value = viaje.hora;
        document.getElementById("editar-fecha").value = viaje.fecha;
        document.getElementById("editar-asientos").value = viaje.asientos;
        document.getElementById("editar-precio").value = viaje.precio;
        document.getElementById("editar-punto-encuentro").value = viaje.puntoEncuentro;


        formularioEditarViaje.addEventListener("submit", function(evento) {

            evento.preventDefault();

            viaje.direccion = document.getElementById("editar-direccion").value;
            viaje.hora = document.getElementById("editar-hora").value;
            viaje.fecha = document.getElementById("editar-fecha").value;
            viaje.asientos = Number(document.getElementById("editar-asientos").value);
            viaje.precio = Number(document.getElementById("editar-precio").value);
            viaje.puntoEncuentro = document.getElementById("editar-punto-encuentro").value.trim();

            guardarViajes(viajes);

            alert("Cambios guardados correctamente.");

            window.location.href = "conductor.html";

        });

    }

    else {

        // modo === "pasajero"
        vistaConductor.style.display = "none";

        document.getElementById("titulo-detalle").textContent =
            viaje.direccion === "nc-ucc"
            ? "Nueva Córdoba → UCC"
            : "UCC → Nueva Córdoba";

        document.getElementById("detalle-direccion").textContent =
            viaje.direccion === "nc-ucc"
            ? "Nueva Córdoba → UCC"
            : "UCC → Nueva Córdoba";

        document.getElementById("detalle-conductor").textContent = viaje.conductorNombre;
        document.getElementById("detalle-hora").textContent = viaje.hora;
        document.getElementById("detalle-fecha").textContent = formatearFecha(viaje.fecha);
        document.getElementById("detalle-asientos").textContent = viaje.asientos;
        document.getElementById("detalle-punto").textContent = viaje.puntoEncuentro;
        document.getElementById("detalle-precio").textContent = "$" + viaje.precio;


        const botonReservar =
            document.getElementById("boton-reservar");


        if (Number(viaje.asientos) < 1) {

            botonReservar.disabled = true;
            botonReservar.textContent = "Sin asientos disponibles";

        }

        else {

            botonReservar.addEventListener("click", function() {

                viaje.asientos = Number(viaje.asientos) - 1;

                guardarViajes(viajes);

                alert("¡Viaje reservado!");

                window.location.href = "pasajero.html";

            });

        }

    }

}


// ==========================================
// FORMULARIO: alternar entre "Registrarme" y "Ya tengo cuenta"
// ==========================================

const botonMostrarRegistro =
    document.getElementById("boton-mostrar-registro");

const botonMostrarLogin =
    document.getElementById("boton-mostrar-login");


if (botonMostrarRegistro && botonMostrarLogin) {

    const vistaRegistro =
        document.getElementById("vista-registro");

    const vistaLogin =
        document.getElementById("vista-login");


    botonMostrarRegistro.addEventListener("click", function() {

        vistaRegistro.style.display = "block";
        vistaLogin.style.display = "none";

        botonMostrarRegistro.classList.add("activo");
        botonMostrarLogin.classList.remove("activo");

    });


    botonMostrarLogin.addEventListener("click", function() {

        vistaLogin.style.display = "block";
        vistaRegistro.style.display = "none";

        botonMostrarLogin.classList.add("activo");
        botonMostrarRegistro.classList.remove("activo");

    });

}