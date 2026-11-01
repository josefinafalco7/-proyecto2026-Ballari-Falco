import PropTypes from 'prop-types';
import { ERROR_SERVIDOR } from '@api/config.js';
import { crearUsuario, obtenerUsuariosPorEmail } from '@api/usuarios.js';
import Button from '@components/Button.jsx';
import Card from '@components/Card.jsx';
import Input from '@components/Input.jsx';
import { useFormulario } from '@hooks/useFormulario.js';
import {
  validarContrasena,
  validarEmailUniversitario,
  validarTextoObligatorio,
} from '@utils/validaciones.js';

const VALORES_INICIALES = {
  nombre: '',
  apellido: '',
  tipoCuenta: 'pasajero',
  email: '',
  password: '',
};

const IDS = {
  nombre: 'registro-nombre',
  apellido: 'registro-apellido',
  email: 'registro-email',
  password: 'registro-password',
};

const ORDEN = ['nombre', 'apellido', 'email', 'password'];

const TIPOS_DE_CUENTA = [
  { valor: 'pasajero', texto: 'Solo Pasajero' },
  { valor: 'conductor', texto: 'Solo Conductor' },
  { valor: 'ambos', texto: 'Ambos (pasajero y conductor)' },
];

/**
 * Valida los campos del registro.
 * @param {Object} valores - Valores actuales del formulario.
 * @returns {Object} Mensaje de error de cada campo (cadena vacía si está bien).
 */
const validar = (valores) => ({
  nombre: validarTextoObligatorio(valores.nombre, 'Nombre'),
  apellido: validarTextoObligatorio(valores.apellido, 'Apellido'),
  email: validarEmailUniversitario(valores.email),
  password: validarContrasena(valores.password),
});

/**
 * Formulario para crear una cuenta nueva. Valida mientras se escribe y,
 * al enviar, guarda el usuario en el servicio simulado.
 * @param {Object} props - Propiedades del componente.
 * @param {Function} props.onRegistrado - Se ejecuta cuando la cuenta se creó, para pasar a "Ya tengo cuenta".
 * @returns {JSX.Element} El formulario.
 */
const FormularioRegistro = ({ onRegistrado }) => {
  const {
    valores,
    cambiar,
    errorVisible,
    avisarPrimerError,
    vaciar,
    reiniciar,
  } = useFormulario(VALORES_INICIALES, validar, IDS);

  /**
   * Valida y guarda un usuario nuevo.
   * @param {Event} evento - Evento submit del formulario.
   * @returns {Promise<void>} No retorna nada.
   */
  const registrarUsuario = async (evento) => {
    evento.preventDefault();

    if (avisarPrimerError(ORDEN)) {
      return;
    }

    try {
      const email = valores.email.trim().toLowerCase();
      const existentes = await obtenerUsuariosPorEmail(email);

      if (existentes.length > 0) {
        alert('Ya existe una cuenta con ese email.');
        vaciar('email');
        return;
      }

      await crearUsuario({
        nombre: valores.nombre.trim(),
        apellido: valores.apellido.trim(),
        email,
        password: valores.password,
        tipoCuenta: valores.tipoCuenta,
      });

      alert('Cuenta creada correctamente. Ahora podés iniciar sesión.');
      reiniciar();
      onRegistrado();
    } catch {
      alert(ERROR_SERVIDOR);
    }
  };

  return (
    <form onSubmit={registrarUsuario}>
      <Card titulo="Datos personales" clase="grupo-formulario">
        <Input
          id={IDS.nombre}
          etiqueta="Nombre"
          valor={valores.nombre}
          onChange={cambiar('nombre')}
          error={errorVisible('nombre')}
          placeholder="Ej: Juan"
          size="30"
          maxLength="40"
          required
        />
        <Input
          id={IDS.apellido}
          etiqueta="Apellido"
          valor={valores.apellido}
          onChange={cambiar('apellido')}
          error={errorVisible('apellido')}
          placeholder="Ej: Pérez"
          size="30"
          maxLength="40"
          required
        />
      </Card>

      <Card titulo="Tipo de cuenta" clase="grupo-formulario">
        {TIPOS_DE_CUENTA.map((tipo) => (
          <div key={tipo.valor} className="opcion-radio">
            <input
              type="radio"
              id={`tipo-${tipo.valor}`}
              name="tipo-cuenta"
              value={tipo.valor}
              checked={valores.tipoCuenta === tipo.valor}
              onChange={cambiar('tipoCuenta')}
            />
            <label htmlFor={`tipo-${tipo.valor}`}>{tipo.texto}</label>
          </div>
        ))}
      </Card>

      <Card titulo="Acceso" clase="grupo-formulario">
        <Input
          id={IDS.email}
          etiqueta="Email universitario"
          tipo="email"
          valor={valores.email}
          onChange={cambiar('email')}
          error={errorVisible('email')}
          placeholder="2611111@ucc.edu.ar"
          size="30"
          maxLength="50"
          required
        />
        <Input
          id={IDS.password}
          etiqueta="Contraseña"
          tipo="password"
          valor={valores.password}
          onChange={cambiar('password')}
          error={errorVisible('password')}
          placeholder="••••••••"
          size="20"
          maxLength="20"
          required
        />
      </Card>

      <Button type="submit" completo>
        Crear cuenta
      </Button>
    </form>
  );
};

FormularioRegistro.propTypes = {
  onRegistrado: PropTypes.func.isRequired,
};

export default FormularioRegistro;
