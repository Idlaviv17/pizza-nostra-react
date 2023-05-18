import { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [password, setPwd] = useState("");

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setUser("");
      setPwd("");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <p
          ref={errRef}
          className={errMsg ? "alert alert-error shadow-lg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h1 className="mt-6 text-center text-4xl font-extrabold text-gray-800">
          Iniciar Sesión
        </h1>
        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6 flex items-center justify-center align-middle flex-col"
        >
          <div className="rounded-md shadow-sm -space-y-px justify-self-center w-full">
            <label htmlFor="username">Usuario:</label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
              className="login-input"
            />

            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={password}
              required
              className="login-input"
            />
          </div>
          <button className="btn btn-primary text-white justify-self-center w-full">
            Iniciar Sesión
          </button>
          <div className="flex items-center flex-row w-full">
            <input
              type="checkbox"
              id="persist"
              className="checkbox checkbox-primary object-left"
            />
            <label className="label cursor-pointer text-sm font-normal">
              Recuérdame
            </label>
          </div>
        </form>
        <p>
          ¿Necesita una cuenta?
          <br />
          <span className="font-medium text-primary hover:text-blue-400">
            <Link to="/register">Registrarse</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;