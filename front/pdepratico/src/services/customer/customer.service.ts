// src/services/customer/customer.service.js
import { BASE_URL } from "../api.service";

// Função para buscar todos os clientes
export const findCustomers = async (): Promise<any> => {
  try {
    const token = localStorage.getItem("access_token"); // Substitua por como você obtém o token
    const response = await fetch(`${BASE_URL}/customer`, {
      method: "GET", // Método HTTP (GET é padrão, mas pode ser explícito)
      headers: {
        Authorization: `Bearer ${token}`, // Adiciona o token ao cabeçalho
        "Content-Type": "application/json", // Cabeçalho opcional
      },
    });

    console.log("RESPONSE", response);
    if (!response.ok) {
      throw new Error(`Erro ao buscar clientes!`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Erro ao buscar clientes: ${error}`);
    throw error;
  }
};
