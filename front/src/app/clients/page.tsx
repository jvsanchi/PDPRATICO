"use client";


import { useEffect, useState } from "react";
import { fetchClients } from "./clientsService";

const ClientsPage = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const loadClients = async () => {
      try {
        const data = await fetchClients();
        setClients(data);
      } catch (error) {
        console.error(`Failed to load clients ${error}`);
      }
    };
    loadClients();
  }, []);

  return (
    <div>
      <h1>Clients</h1>
      <ul>
        {clients.map((client: any) => (
          <li key={client.id}>{client.name}</li>
        ))}
      </ul>
      {/* Adicione lógica para criar um cliente aqui */}
    </div>
  );
};

export default ClientsPage;
