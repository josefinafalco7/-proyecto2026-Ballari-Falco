import { useNavigate } from 'react-router-dom';
import { ERROR_SERVIDOR } from '@api/config.js';
import { obtenerUsuariosPorEmail } from '@api/usuarios.js';
import Button from '@components/Button.jsx';
import Card from '@components/Card.jsx';
import Input from '@components/Input.jsx';
import { useSesion } from '@context/SesionContext.jsx';
import { useFormulario } from '@hooks/useFormulario.js';
import { paginaInicio } from '@utils/sesion.js';
import { validarTextoObligatorio } from '@utils/validaciones.js';

const VALORES_INICIALES = { email: '', password: '' };

const IDS = { email: 'login-email', password: 'login-password' };

const ORDEN = ['email', 'password'];

/**
 * Valida los campos del inicio de sesión.
 * @param {Object} valores - Valores actuales del formulario.
 * @returns {Object} Mensaje de error de cada campo (cadena vacía si está bien).
 */
const validar = (valores) => ({
  email: validarTextoObligatorio(valores.email, 'Email'),
  password: validarTextoObligatorio(valores.password, 'Contraseña'),
});

/**
 * Formulario de inicio de sesión. Valida mientras se escribe y, al enviar,
 * busca el usuario en el servicio simulado, guarda la sesión y va a su página principal.
 * @returns {JSX.Element} El formulario.
 */
const FormularioLogin = () => {
  const navigate = useNavigate();
  const { iniciarSesion } = useSesion();
  const { valores, cambiar, errorVisible, avisarPrimerError, vaciar } =
    useFormulario(VALORES_INICIALES, validar, IDS);

  /**
   * Comprueba las credenciales y, si son correctas, inicia sesión.
   * @param {Event} evento - Evento submit del formulario.
   * @returns {Promise<void>} No retorna nada.
   */
  const iniciarSesionUsuario = async (evento) => {
    evento.preventDefault();

    if (avisarPrimerError(ORDEN)) {
      return;
    }

    try {
      const usuarios = await obtenerUsuariosPorEmail(
        valores.email.trim().toLowerCase(),
      );
      const usuario = usuarios.find((u) => u.password === valores.password);

      if (!usuario) {
        alert('Email o contraseña incorrectos.');
        vaciar('password');
        return;
      }

      iniciarSesion(usuario);
      navigate(paginaInicio(usuario));
    } catch {
      alert(ERROR_SERVIDOR);
    }
  };

  return (
    <form onSubmit={iniciarSesionUsuario}>
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
        Ingresar
      </Button>
    </form>
  );
};

export default FormularioLogin;
