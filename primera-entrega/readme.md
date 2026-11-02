# UCC Carpool

**UCC Carpool** es una página web de carpooling pensada para la comunidad de la Universidad Católica de Córdoba. Permite que estudiantes **conductores** publiquen viajes y que estudiantes **pasajeros** los busquen y reserven, cubriendo el trayecto fijo entre la UCC y Nueva Córdoba.

El proyecto tiene dos entregas: la **primera** (HTML, CSS y JavaScript, en la carpeta `primera-entrega`) y la **segunda** (la misma aplicación hecha con React, en la carpeta `segunda-entrega`).

## Índice

1. [Autores](#autores)
2. [Link de gh-pages](#link-de-gh-pages)
3. [Contenido de la página](#contenido-de-la-página)
4. [Segunda entrega: cómo ejecutar el proyecto](#segunda-entrega-cómo-ejecutar-el-proyecto)
5. [Segunda entrega: estructura y funcionamiento](#segunda-entrega-estructura-y-funcionamiento)
6. [Tecnologías utilizadas](#tecnologías-utilizadas)
7. [Dependencias y vulnerabilidades](#dependencias-y-vulnerabilidades)

## Autores

- Ballari, Martina
- Falco, Josefina

## Link de gh-pages

La primera entrega está publicada en: [UCC Carpool en GitHub Pages](https://josefinafalco7.github.io/-proyecto2026-Ballari-Falco/primera-entrega/index.html)

El proyecto se trabajó en tres ramas:

| Rama       | Uso                                                      |
| ---------- | -------------------------------------------------------- |
| `main`     | Rama principal, con la versión publicada en GitHub Pages |
| `josefina` | Rama de trabajo de Josefina Falco                        |
| `martina`  | Rama de trabajo de Martina Ballari                       |

## Contenido de la página

Esta sección describe las páginas de la primera entrega. UCC Carpool funciona con dos roles: **pasajero** y **conductor** (o ambos a la vez, según cómo se registre el usuario). Toda la información se guarda en el `localStorage` del navegador.

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

## Segunda entrega: cómo ejecutar el proyecto

La segunda entrega es la misma aplicación hecha con **React**. Los datos (usuarios, viajes y reservas) ya no están en el `localStorage`: viven en un servicio simulado (**json-server**) que se consulta con `fetch` y `async/await`. En el `localStorage` solo queda la sesión del usuario.

### Requisitos

- [Node.js](https://nodejs.org/) 22.12 o superior (se verifica con `node -v`)
- npm (se instala junto con Node.js)

### Pasos

1. Abrir una terminal y entrar a la carpeta del proyecto:

   ```bash
   cd segunda-entrega
   ```

2. Instalar las dependencias (solo la primera vez):

   ```bash
   npm ci
   ```

3. En una terminal, levantar el servicio simulado de datos:

   ```bash
   npm run mock
   ```

4. En **otra terminal**, también dentro de `segunda-entrega`, levantar la aplicación:

   ```bash
   npm run dev
   ```

5. Abrir [http://localhost:5173](http://localhost:5173) en el navegador. Las dos terminales tienen que quedar abiertas mientras se usa la aplicación (se detienen con `Ctrl + C`).

Si aparece el mensaje "No se pudo conectar con el servidor", falta levantar el paso 3.

### Scripts disponibles

| Comando           | Qué hace                                                    |
| ----------------- | ----------------------------------------------------------- |
| `npm run dev`     | Levanta la aplicación en modo desarrollo (puerto 5173)      |
| `npm run mock`    | Levanta el servicio simulado con json-server (puerto 4000)  |
| `npm run build`   | Genera la versión final para publicar, en la carpeta `dist` |
| `npm run preview` | Muestra la versión generada por `build`                     |
| `npm run lint`    | Revisa el código con ESLint                                 |
| `npm run format`  | Da formato al código con Prettier                           |

### Usuarios de prueba

| Email           | Contraseña | Tipo de cuenta |
| --------------- | ---------- | -------------- |
| juan@ucc.edu.ar | 1234       | Conductor      |
| ana@ucc.edu.ar  | abcd       | Pasajero       |
| luis@ucc.edu.ar | pass       | Ambos          |

También se puede crear una cuenta nueva desde la página de acceso (el email tiene que terminar en `@ucc.edu.ar`).

**Nota:** al usar la aplicación, json-server guarda los cambios en `segunda-entrega/src/data/db.json`. Para volver a los datos originales alcanza con ejecutar `git checkout src/data/db.json`.

## Segunda entrega: estructura y funcionamiento

### Carpetas de `segunda-entrega`

```text
segunda-entrega/
├── public/              Imagen servida tal cual (favicon y logo del encabezado)
├── src/
│   ├── api/             Funciones que consultan el servicio simulado con fetch y async/await
│   ├── assets/          Imagen importada desde el código (logo de la portada)
│   ├── components/      Componentes reutilizables (Button, Card, Input, Select, Layout, Header...)
│   ├── context/         Sesión del usuario (guardada en localStorage)
│   ├── data/            db.json: los datos del servicio simulado
│   ├── hooks/           useFormulario: formularios con validación en tiempo real
│   ├── pages/           Una página por ruta
│   ├── styles/          Estilos en archivos .scss
│   ├── utils/           Formatos, validaciones y funciones de sesión
│   ├── App.jsx          Rutas de la aplicación
│   └── main.jsx         Punto de entrada
├── eslint.config.mjs    Configuración de ESLint
├── vite.config.js       Configuración de Vite (incluye los alias de imports)
└── package.json         Dependencias y scripts
```

Los imports se hacen con alias (`@components`, `@pages`, `@api`, `@styles`, `@utils`, `@hooks`, `@context`, `@assets` y `@` para `src`), definidos en `vite.config.js`.

### Rutas

| Página de la primera entrega                | Ruta en React                                         | Quién puede entrar           |
| ------------------------------------------- | ----------------------------------------------------- | ---------------------------- |
| `index.html`                                | `/`                                                   | Todos                        |
| `formulario.html`                           | `/acceso`                                             | Todos (con sesión, redirige) |
| `pasajero.html`                             | `/pasajero`                                           | Usuarios con sesión          |
| `viajes-ucc-nc.html` / `viajes-nc-ucc.html` | `/pasajero/viajes/ucc-nc` y `/pasajero/viajes/nc-ucc` | Usuarios con sesión          |
| `detalle_viaje.html` (modo pasajero)        | `/pasajero/viaje/:id`                                 | Usuarios con sesión          |
| `conductor.html`                            | `/conductor`                                          | Conductores                  |
| `publicar_viaje.html`                       | `/conductor/publicar`                                 | Conductores                  |
| `detalle_viaje.html` (modo conductor)       | `/conductor/editar/:id`                               | Dueño del viaje              |

Todas las rutas comparten el componente `Layout` (encabezado, contenido y pie), que dibuja la página de cada ruta con un `Outlet`.

### Datos

El archivo `db.json` tiene tres colecciones: `usuarios`, `viajes` y `reservas`. Se usan las cuatro acciones del servicio: leer (GET), crear (POST), modificar (PATCH) y borrar (DELETE).

### Validaciones

Los formularios validan mientras se escribe (`onChange`) y muestran el error debajo del campo, de forma accesible (`role="alert"`, `aria-invalid` y `aria-describedby`). Al enviar, si algún dato sigue mal, se avisa con un mensaje y se vacía ese campo.

## Tecnologías utilizadas

**Primera entrega**

- **HTML5**
- **CSS3**
- **JavaScript** (datos persistidos en `localStorage`, sin backend)
- [Google Fonts](https://fonts.google.com/) (Poppins e Inter)

**Segunda entrega**

- [React](https://react.dev/) 19, con los Hooks `useState`, `useEffect`, `useContext`, `useRef`, `useNavigate` y `useParams`
- [Vite](https://vite.dev/) como herramienta de desarrollo y compilación
- [react-router-dom](https://reactrouter.com/) para el enrutamiento (con `Outlet` para las rutas hijas)
- [Sass](https://sass-lang.com/) (archivos `.scss` con variables, mixins y `@use`)
- [json-server](https://github.com/typicode/json-server) como servicio simulado de datos
- `fetch` con `async/await` para consultar el servicio
- `localStorage` para guardar la sesión
- [prop-types](https://www.npmjs.com/package/prop-types) para validar las propiedades de los componentes
- [ESLint](https://eslint.org/) y [Prettier](https://prettier.io/) para revisar y dar formato al código
- [Node.js](https://nodejs.org/) 22.12 o superior
- [Google Fonts](https://fonts.google.com/) (Poppins e Inter)

## Dependencias y vulnerabilidades

Resultado de `npm audit` dentro de `segunda-entrega` (verificado el 31 de octubre de 2026): **0 vulnerabilidades**. No hay ninguna crítica, alta, moderada ni baja.

Para llegar a ese resultado hubo que tomar estas decisiones, que quedan aclaradas acá:

- **`overrides` de `minimatch`.** Al instalar las herramientas de desarrollo, `npm audit` informaba 9 vulnerabilidades de gravedad **moderada** (ninguna crítica ni alta), todas por el mismo aviso: [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249), una posible negación de servicio en `minimatch`, que afecta a todas sus versiones anteriores a la 11.0.1. Estaban en ESLint y en su plugin de React (dependencias de desarrollo, que no forman parte de lo que se ejecuta en el navegador). Se resolvió con el bloque `overrides` de `package.json`, que obliga a usar `minimatch` 11.0.3 o superior.
- **Efecto secundario del `overrides`.** Dos reglas opcionales de `eslint-plugin-react` (`jsx-pascal-case` y `forbid-component-props`) dejarían de funcionar si se activaran. El proyecto no las usa.
- **ESLint 9 y no 10.** `eslint-plugin-react` solo es compatible hasta ESLint 9. Con ESLint 10, `npm install` falla por un conflicto de versiones.
- **json-server en versión beta.** Se usa la `1.0.0-beta.15`, fijada con la versión exacta, porque es la que instala `npm i -D json-server` hoy. Se usa solo para desarrollo, como servicio simulado de datos.

Con el tiempo pueden aparecer avisos nuevos, porque se descubren fallas nuevas en paquetes que ya existían. Si `npm audit` muestra alguno, se revisa con `npm audit` y, si no se puede resolver, se documenta acá con su gravedad y el motivo.
