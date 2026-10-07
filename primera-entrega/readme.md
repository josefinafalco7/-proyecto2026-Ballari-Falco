# UCC Carpool

**UCC Carpool** es una página web de carpooling pensada para la comunidad de la Universidad Católica de Córdoba. Permite que estudiantes **conductores** publiquen viajes y que estudiantes **pasajeros** los busquen y reserven, cubriendo el trayecto fijo entre la UCC y Nueva Córdoba.

## Índice

1. [Autores](#autores)
2. [Link de gh-pages](#link-de-gh-pages)
3. [Contenido de la página](#contenido-de-la-página)
4. [Tecnologías utilizadas](#tecnologías-utilizadas)

## Autores

- Ballari, Martina
- Falco, Josefina

## Link de gh-pages

La página está publicada en: [UCC Carpool en GitHub Pages](https://josefinafalco7.github.io/-proyecto2026-Ballari-Falco/)

El proyecto se trabajó en tres ramas:

| Rama       | Uso                                                      |
| ---------- | -------------------------------------------------------- |
| `main`     | Rama principal, con la versión publicada en GitHub Pages |
| `josefina` | Rama de trabajo de Josefina Falco                        |
| `martina`  | Rama de trabajo de Martina Ballari                       |

## Contenido de la página

UCC Carpool funciona con dos roles: **pasajero** y **conductor** (o ambos a la vez, según cómo se registre el usuario). Toda la información se guarda en el `localStorage` del navegador.

### Flujo del pasajero

| Página                                      | Descripción                                                                                     |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `index.html`                                | Portada: elegir si vas a entrar como pasajero o conductor                                       |
| `formulario.html`                           | Registro e inicio de sesión                                                                     |
| `pasajero.html`                             | Elegir la dirección del viaje (UCC → Nueva Córdoba o al revés) y ver el panel de "Mis reservas" |
| `viajes-ucc-nc.html` / `viajes-nc-ucc.html` | Listado de viajes disponibles para cada dirección                                               |
| `detalle_viaje.html` (modo pasajero)        | Ver el detalle de un viaje y reservarlo                                                         |

### Flujo del conductor

| Página                                | Descripción                                                                |
| ------------------------------------- | -------------------------------------------------------------------------- |
| `conductor.html`                      | Listado de "Mis viajes publicados", con los pasajeros que reservó cada uno |
| `publicar_viaje.html`                 | Formulario para publicar un viaje nuevo                                    |
| `detalle_viaje.html` (modo conductor) | Editar un viaje ya publicado                                               |

**Nota:** `detalle_viaje.html` es un único archivo que cambia su contenido según los parámetros `id` y `modo` que recibe por la URL.

## Tecnologías utilizadas

- **HTML5**
- **CSS3**
- **JavaScript** (datos persistidos en `localStorage`, sin backend)
- [Google Fonts](https://fonts.google.com/) (Poppins e Inter)
