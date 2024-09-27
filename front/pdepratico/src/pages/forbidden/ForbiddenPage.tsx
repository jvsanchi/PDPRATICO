import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const ForbiddenPage = () => {
  const navigate = useNavigate(); // Cria a função navigate para navegação programática

  // Função para redirecionar para o dashboard
  const goToDashboard = () => {
    navigate("/dashboard"); // Redireciona diretamente para o Dashboard
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>403 - Acesso Negado!</h1>
      <p>Você não tem permissão para acessar esta página!</p>
      <Button type="primary" onClick={goToDashboard}>
        VOLTAR
      </Button>
    </div>
  );
};

export default ForbiddenPage;
