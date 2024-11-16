import React, { useContext, useState, useEffect } from "react";
import "../css/Home.css";
import { Context } from "../context/AppContext";
import logo from "../img/home.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { actions, store } = useContext(Context);
  const [rut, setRut] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Si hay token, redirige a /comment
    console.log("aa");
    if (store.token) {
      console.log("mm");
      navigate("/comment");
    }
  }, [store.token, navigate]);

  const [errors, setErrors] = useState({
    rut: "",
    name: "",
    email: "",
    address: "",
    password: "",
    phoneNumber: "",
  });
  const [isRutValid, setIsRutValid] = useState(null);

  // Función para validar el RUT usando el algoritmo del Módulo 11
  const validateRut = (rut) => {
    // Eliminar puntos y guion del RUT
    const cleanRut = rut.replace(/\./g, "").replace("-", "");
    const body = cleanRut.slice(0, -1); // Digitos sin el dígito verificador
    const dv = cleanRut.slice(-1).toUpperCase(); // Dígito verificador

    // Validación de formato básico
    if (!/^\d+$/.test(body) || !/^[0-9K]$/.test(dv)) return false;

    // Calcular el dígito verificador
    let sum = 0;
    let multiplier = 2;

    for (let i = body.length - 1; i >= 0; i--) {
      sum += parseInt(body[i]) * multiplier;
      multiplier = multiplier === 7 ? 2 : multiplier + 1;
    }

    const calculatedDv = 11 - (sum % 11);
    const expectedDv =
      calculatedDv === 11
        ? "0"
        : calculatedDv === 10
        ? "K"
        : calculatedDv.toString();

    return dv === expectedDv;
  };

  const formatRut = (inputRut) => {
    const cleanRut = inputRut.replace(/[^0-9Kk]/g, "").toUpperCase(); // Solo números y K
    if (cleanRut.length <= 1) return cleanRut;

    const body = cleanRut.slice(0, -1); // Números sin el dígito verificador
    const dv = cleanRut.slice(-1); // Dígito verificador

    // Insertar puntos y guion
    let formattedBody = body
      .split("")
      .reverse()
      .reduce(
        (acc, char, i) =>
          i % 3 === 0 && i > 0 ? char + "." + acc : char + acc,
        ""
      );

    return `${formattedBody}-${dv}`;
  };

  const handleRutChange = (e) => {
    let inputRut = e.target.value.toUpperCase();

    // Eliminar caracteres no permitidos (solo números y K)
    inputRut = inputRut.replace(/[^0-9K]/g, "");

    // Limitar la longitud máxima del RUT
    if (inputRut.length > 9) return;

    // Si ya tiene una K al final, no permitir más caracteres
    if (inputRut.includes("K") && inputRut.slice(-1) !== "K") {
      return;
    }

    // Prevenir más de una K
    const kCount = (inputRut.match(/K/g) || []).length;
    if (kCount > 1) return;

    // Formatear el RUT automáticamente
    const formattedRut = formatRut(inputRut);
    setRut(formattedRut);

    if (formattedRut.length >= 11 && validateRut(formattedRut)) {
      setIsRutValid(true);
      setErrors((prevErrors) => ({
        ...prevErrors,
        rut: "",
      }));
    } else {
      setIsRutValid(false);
      setErrors((prevErrors) => ({
        ...prevErrors,
        rut: "El RUT no es válido.",
      }));
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (
      e.target.value.length >= 8 &&
      /\d/.test(e.target.value) &&
      /[a-zA-Z]/.test(e.target.value)
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password:
          "La contraseña debe tener al menos 8 caracteres, incluyendo mínimo un número y letras.",
      }));
    }
  };

  const cleanRut = (formattedRut) => {
    return formattedRut.replace(/\./g, "").replace(/-/g, "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isRutValid || !password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        rut: isRutValid ? "" : "El RUT no es válido.",
        password: password
          ? ""
          : "La contraseña debe tener al menos 8 caracteres.",
      }));
      return;
    }

    // Llama a la acción de login desde el flux
    const success = await actions.login(
      rut.replace(/\./g, "").replace(/-/g, ""),
      password
    );
    if (success) {
      alert("Inicio de sesión exitoso");
      // Redirige al dashboard o realiza alguna acción post-login
      window.location.href = "/";
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="login-page">
      {/* Sección izquierda con fondo morado */}
      <div className="left-section">
        <div className="content-wrapper">
          <img src={logo} alt="Logo" style={{ maxWidth: "400px" }} />
        </div>
      </div>

      <div className="right-section">
        <div className="login-form">
          <h2>Iniciar Sesión</h2>
          <form onSubmit={handleSubmit}>
            {/* Campo para RUT */}
            <div className="form-group">
              <label htmlFor="rut" className="form-label">
                RUT
              </label>
              <input
                type="text"
                className={`form-control ${
                  isRutValid === null
                    ? ""
                    : isRutValid
                    ? "is-valid"
                    : "is-invalid"
                }`}
                id="rut"
                value={rut}
                onChange={handleRutChange}
                required
              />
              {errors.rut && (
                <div className="invalid-feedback">{errors.rut}</div>
              )}
              {isRutValid && <div className="valid-feedback">RUT válido</div>}
            </div>
            {/* Campo para Contraseña */}
            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                placeholder="Ingrese su contraseña"
                value={password}
                onChange={handlePasswordChange}
                required
                className="form-control"
              />
            </div>
            {/* Botón para Iniciar Sesión */}
            <button type="submit" className="login-button">
              Iniciar Sesión
            </button>
          </form>
          {/* Botón para Registrarse */}
          <button
            className="login-button"
            style={{ marginTop: "10px" }}
            onClick={() => (window.location.href = "/register")}
          >
            Registrarse
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
