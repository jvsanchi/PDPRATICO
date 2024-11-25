import React, { useEffect, useState } from "react";
import { Card } from "antd";
import Stats from "./Stats";
import { BASE_URL } from "../../services/api.service";

const DashboardStats: React.FC = () => {
  const [userName, setUserName] = useState<string>(""); // Estado para armazenar o nome do usuário

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token) {
      fetch(`${BASE_URL}/auth/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUserName(data.name); // Atualiza o estado com o nome do usuário
        })
        .catch((error) => {
          console.error("Erro ao buscar dados do usuário logado:", error);
        });
    }
  }, []);

  return (
    <Card style={{ padding: "20px" }}>
      <h2>Bem-vindo(a), {userName || "Usuário"}. </h2>
      <p>Aqui você pode visualizar estatísticas e gráficos.</p>
      <Stats /> {/* Adiciona o componente de gráficos */}
    </Card>
  );
};

export default DashboardStats;
