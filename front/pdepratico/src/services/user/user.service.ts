import { BASE_URL } from "../api.service";
import { IUser } from "../../interfaces/User";

// Função para criar um novo usuário
export const createUser = async (user: IUser): Promise<IUser> => {
  try {
    const response = await fetch(`${BASE_URL}/user/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Adicione o token
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error(`Erro ao cadastrar usuário`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Erro ao cadastrar um usuário: ${error}`);
    throw error;
  }
};

// Função para buscar todos os usuários
export const findUsers = async (): Promise<IUser[]> => {
  try {
    const response = await fetch(`${BASE_URL}/user`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Adicione o token
      },
    });
    if (!response.ok) {
      throw new Error(`Erro ao buscar usuários!`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Erro ao buscar usuários: ${error}`);
    throw error;
  }
};

// Função para atualizar um usuário
export const updateUser = async (user: IUser): Promise<IUser> => {
  try {
    const response = await fetch(`${BASE_URL}/user`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Envie o token no cabeçalho
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Erro ao atualizar usuário");
    }

    return await response.json();
  } catch (error) {
    console.error(`Erro ao atualizar usuário SERVICE: ${error}`);
    throw error;
  }
};
