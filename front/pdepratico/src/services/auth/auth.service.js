import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Corrige a importação como exportação nomeada
import { BASE_URL } from "../api.service"; // Usa a URL importada de api.service.js

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email,
      password,
    });

    const data = response.data;
    const token = data.access_token;

    if (!token) {
      throw new Error("Token JWT não foi retornado.");
    }

    const decodedToken = jwtDecode(token);

    if (decodedToken && decodedToken.roles && decodedToken.roles.role) {
      localStorage.setItem("user_role", decodedToken.roles.role);
      localStorage.setItem("access_token", token);
    } else {
      console.error(
        "Erro: O campo 'role' não foi encontrado no token JWT.",
        decodedToken
      );
      throw new Error("Papel do usuário não encontrado no token JWT.");
    }

    return data;
  } catch (error) {
    console.error("Erro no processo de login:", error.message);
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};
