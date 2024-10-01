import { BASE_URL } from "../api.service";
import { IUser } from "../../interfaces/User";

export const findUsers = async (): Promise<IUser[]> => {
  try {
    const response = await fetch(`${BASE_URL}/user`);
    if (!response.ok) {
      throw new Error(`Erro ao buscar usuários!`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Erro ao buscar usuários! ${error}`);
    throw error;
  }
};

export const createUser = async (user: IUser): Promise<IUser> => {
  try {
    const response = await fetch(`${BASE_URL}/user/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        body: JSON.stringify(user),
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao cadastrar usuário`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Erro ao cadastrar um usuário ${error}`);
    throw error;
  }
};
