// src/services/customer/user.service.js
import { BASE_URL } from "../api.service";
import { IUser } from "../../interfaces/User";

// Função para criar um novo usuário
export const createUser = async (user: IUser): Promise<IUser> => {
  try {
    const response = await fetch(`${BASE_URL}/user/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user), // Move o body para cá
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
    const response = await fetch(`${BASE_URL}/user`);
    if (!response.ok) {
      throw new Error(`Erro ao buscar usuários!`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Erro ao buscar usuários: ${error}`);
    throw error;
  }
};
