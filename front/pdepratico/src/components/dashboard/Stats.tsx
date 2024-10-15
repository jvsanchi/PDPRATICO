import React, { useEffect, useState } from "react";
import { Card, Spin, Row, Col } from "antd";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement, // Importa o PointElement
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { findUsers } from "../../services/user/user.service";
import { findCustomers } from "../../services/customer/customer.service";

// Registrar os componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

// Componente para cada gráfico
const UserChart: React.FC<{ data: any; title: string }> = ({ data, title }) => (
  <Card title={title} style={{ marginBottom: "20px", height: "100%" }}>
    <div style={{ height: "300px" }}>
      <Bar
        data={data}
        options={{ responsive: true, maintainAspectRatio: false }}
      />
    </div>
  </Card>
);

const Stats: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [userStats, setUserStats] = useState<{
    totalUsers: number;
  } | null>(null);

  const [customerStats, setCustomerStats] = useState<{
    totalCustomers: number;
  } | null>(null);

  // Função para buscar as estatísticas de usuários
  const fetchUserStats = async () => {
    setLoading(true);
    try {
      const data = await findUsers();
      const totalUsers = data.length; // Total de usuários

      setUserStats({
        totalUsers,
      });
    } catch (error) {
      console.error("Erro ao buscar estatísticas de usuários:", error);
    } finally {
      setLoading(false);
    }
  };

  // Função para buscar as estatísticas de clientes
  const fetchCustomerStats = async () => {
    setLoading(true);
    try {
      const data = await findCustomers();
      const totalCustomers = data.length; // Total de clientes
      setCustomerStats({
        totalCustomers,
      });
    } catch (error) {
      console.error("Erro ao buscar estatísticas de clientes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserStats();
    fetchCustomerStats();
  }, []);

  const userChartData = {
    labels: ["Total de Usuários"],
    datasets: [
      {
        label: "Número de Usuários",
        data: [userStats ? userStats.totalUsers : 0],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const customerChartData = {
    labels: ["Total de Clientes"],
    datasets: [
      {
        label: "Número de Clientes",
        data: [customerStats ? customerStats.totalCustomers : 0],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  // Gráfico de Contas a Pagar com meses e porcentagens
  const billingChartData = {
    labels: [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ],
    datasets: [
      {
        label: "Porcentagem de Contas a Pagar",
        data: [10, 20, 30, 25, 40, 15, 50, 30, 45, 60, 20, 30], // Exemplo de dados
        backgroundColor: "rgba(255, 206, 86, 0.6)",
        type: "bar", // Tipo de gráfico de barras
      },
      {
        label: "Linha de Contas a Pagar",
        data: [10, 20, 30, 25, 40, 15, 50, 30, 45, 60, 20, 30], // Usando os mesmos dados para a linha
        borderColor: "rgba(75, 192, 192, 1)", // Cor da linha
        borderWidth: 2,
        fill: false, // Não preenche a área abaixo da linha
        type: "line", // Tipo de gráfico de linha
      },
    ],
  };

  return (
    <Spin spinning={loading} size="large">
      <div style={{ overflowY: "auto", maxHeight: "800px" }}>
        <Row gutter={16}>
          <Col xs={24} sm={12} lg={12}>
            <UserChart data={userChartData} title="Estatísticas de Usuários" />
          </Col>
          <Col xs={24} sm={12} lg={12}>
            <UserChart
              data={customerChartData}
              title="Estatísticas de Clientes"
            />
          </Col>
        </Row>
        <Row gutter={16} style={{ marginTop: "20px" }}>
          <Col xs={24} lg={12}>
            <UserChart data={billingChartData} title="Contas a Pagar" />
          </Col>
          <Col xs={24} lg={12}>
            <UserChart data={billingChartData} title="Gráfico Adicional 2" />
          </Col>
        </Row>
      </div>
    </Spin>
  );
};

export default Stats;
