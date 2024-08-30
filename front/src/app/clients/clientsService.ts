import api from "../utils/api";

export const fetchClients = async () => {
  try {
    const response = await api.get("customer");
    return response.data;
  } catch (error) {
    console.error(`Error fetching clients.: ${error}`);
    throw error;
  }
};

export const createClient = async (clientData: any) => {
  try {
    const response = await api.post("customer", clientData);
    return response.data;
  } catch (error) {
    console.error(`Error creating client ${error}`);
  }
};

export const updateClient = async (clientId: string, clientData: any) => {
  try {
    const response = await api.put(`customer/${clientId}`, clientData);
    return response.data;
  } catch (error) {
    console.error(`Error updating client, ${error}`);
  }
};

export const deleteClient = async (clientId: string) => {
  try {
    const response = await api.delete(`customer/${clientId}`); // DELETE request
    return response.data;
  } catch (error) {
    console.error(`Error deleting client ${error}`);
  }
};
