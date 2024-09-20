import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import SideBar from "../../components/sideBar/SideBar";

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
    <div className="d-flex">
      <SideBar />
      <div className="flex-grow-1 p-4" style={{ marginLeft: "200px" }}>
        <Outlet /> {/* Renderiza as rotas filhas */}
      </div>
    </div>
  );
};

export default Dashboard;
