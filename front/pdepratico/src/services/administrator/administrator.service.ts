import {
  ICreateAdministator,
  IFindAllAdministrator,
} from "../../interfaces/administrator/createAdministrator";
import { BASE_URL } from "../api.service";

export const createAdministrator = async (createAdm: ICreateAdministator) => {
  try {
    const response = await fetch(`${BASE_URL}/administrator/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createAdm),
    });

    if (!response.ok) {
      throw new Error(`Erro ao Cadastrar Admin`);
    }
  } catch (error) {
    console.error(`Erro ao cadastrar Admin na Service ${error}`);
    throw error;
  }
};

export const findAdmin = async (): Promise<IFindAllAdministrator[]> => {
  try {
    const response = await fetch(`${BASE_URL}/administrator`);

    if (!response.ok) {
      throw new Error(`Error ao listar administradores`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Erro ao listar todos os Administradores ${error}`);
    throw error;
  }
};
