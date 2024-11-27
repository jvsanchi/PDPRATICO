import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Importação correta
import { BASE_URL } from "../api.service"; // URL base para chamadas à API

// Defina a interface para o tipo esperado do token JWT decodificado
interface DecodedToken {
  roles: {
    role: string;
  };
}

export const login = async (email: string, password: string) => {
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

    // Decodifique o token com o tipo esperado
    const decodedToken = jwtDecode<DecodedToken>(token);

    if (
      decodedToken &&
      typeof decodedToken === "object" &&
      decodedToken.roles &&
      typeof decodedToken.roles === "object" &&
      typeof decodedToken.roles.role === "string"
    ) {
      // Armazena o papel do usuário e o token no localStorage
      localStorage.setItem("user_role", decodedToken.roles.role);
      localStorage.setItem("access_token", token);
      console.log("Token armazenado com sucesso:", token);
    } else {
      console.error(
        "Erro: O campo 'role' não foi encontrado no token JWT.",
        decodedToken
      );
      throw new Error("Papel do usuário não encontrado no token JWT.");
    }

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro no processo de login:", error.response?.data.message);
      throw new Error(error.response?.data.message || "Erro ao fazer login");
    } else if (error instanceof Error) {
      console.error("Erro no processo de login:", error.message);
      throw new Error(error.message);
    } else {
      console.error("Erro desconhecido no processo de login:", error);
      throw new Error("Erro desconhecido ao fazer login");
    }
  }
};
