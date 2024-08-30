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
        console.error(`Failed to load clients: ${error}`);
      }
    };
    loadClients();
  }, []);

  return (
    <div>
      <h1>Clients</h1>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Code</th>
            <th>Observations</th>
            <th>Date of Birth</th>
            <th>RG</th>
            <th>IE</th>
            <th>CPF</th>
            <th>CNPJ</th>
            <th>Address</th>
            <th>Telephone</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client: any) => (
            <tr key={client.id}>
              <td>{client.code}</td>
              <td>{client.observations}</td>
              <td>{client.dateOfBirth}</td>
              <td>{client.rg}</td>
              <td>{client.ie}</td>
              <td>{client.cpf}</td>
              <td>{client.cnpj}</td>
              <td>{client.address}</td>
              <td>{client.telephone}</td>
              <td>{client.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientsPage;
