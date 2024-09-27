import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import SideBar from "../sideBar/SideBar";

const Dashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (!token) {
      // Se não houver token, redireciona de volta para a página de login
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <div style={{ display: "flex" }}>
      <SideBar />
      <div style={{ flex: 1, padding: "20px" }}>
        <Outlet /> {/* Renderiza as rotas filhas */}
      </div>
    </div>
  );
};

export default Dashboard;
