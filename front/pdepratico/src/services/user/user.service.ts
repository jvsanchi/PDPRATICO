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
export const findUsers = async (token: any): Promise<IUser[]> => {
  try {
    const response = await fetch(`${BASE_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`, // Adicione o token
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
export const updateUser = async (user: IUser, token: any): Promise<IUser> => {
  try {
    const response = await fetch(`${BASE_URL}/user`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Envie o token no cabeçalho
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

// Função para deletar um usuário
export const deleteUser = async (user: IUser, token: any): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/user`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email: user.email }),
    });

    if (!response.ok) {
      throw new Error("Erro ao deletar usuário");
    }
  } catch (error) {
    console.error(`Erro ao deletar usuário SERVICE: ${error}`);
    throw error;
  }
};
