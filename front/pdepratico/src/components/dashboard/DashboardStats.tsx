// src/pages/dashboard/DashboardStats.tsx
import React from "react";
import { Card } from "antd";
import Stats from "./Stats";

const DashboardStats: React.FC = () => {
  return (
    <Card style={{ padding: "20px" }}>
      <h2>Bem-vindo à Dashboard</h2>
      <p>Aqui você pode visualizar estatísticas e gráficos.</p>
      <Stats /> {/* Adiciona o componente de gráficos */}
    </Card>
  );
};

export default DashboardStats;
