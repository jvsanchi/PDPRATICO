import React, { useState } from "react";
import { login } from "../../services/auth/auth.service";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError("");

    try {
      const data = await login(email, password);
      localStorage.setItem("access_token", data.access_token);
      navigate("/dashboard");
    } catch (err) {
      // Verifique se err é uma instância de Error antes de acessar suas propriedades
      if (err instanceof Error) {
        setError("Falha no login: " + err.message);
      } else {
        setError("Falha no login: Erro desconhecido.");
      }
    }
  };

  return (
    <div className="login-container">
      {/* Passando a imagem importada como estilo inline */}
      <div className="login-image"></div>

      {/* Div para o formulário de login ocupando 20% */}
      <div className="login-form">
        <div className="login-box">
          <h2 className="login-title">Login</h2>{" "}
          {/* Alterado para a nova classe */}
          <form onSubmit={handleSubmit}>
            <div>
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit">Acessar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
