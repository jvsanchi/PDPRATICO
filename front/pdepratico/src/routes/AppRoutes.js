import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "../pages/login/Login";
import DashBoard from "../pages/dashboard/Dashboard";
import ForbiddenPage from "../pages/forbidden/ForbiddenPage";
import ProtectedRoute from "../components/protectRoute/ProtectRoute";
import RoleEnum from "../enums/RoleEnum";

import CadastrarClientes from "../pages/customer/createCustomer";
import ListarClientes from "../pages/customer/findCustomer";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        {/* Rota Pública para Login */}
        <Route path="/login" element={<Login />} />

        {/* Rota protegida para o Dashboard */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute
              element={DashBoard}
              requiredRoles={[
                RoleEnum.ADMIN,
                RoleEnum.MASTER,
                RoleEnum.USER,
                RoleEnum.COLLABORATOR,
                RoleEnum.MANAGER,
              ]}
            />
          }
        >
          {/* Sub-rotas protegidas dentro do Dashboard */}
          <Route path="clientes/cadastrar" element={<CadastrarClientes />} />
          <Route path="clientes/listar" element={<ListarClientes />} />
          {/* Caminho vazio ("") ao invés de "/" para rotas padrões */}
          <Route path="" element={<h2>Bem-vindo à Dashboard</h2>} />
        </Route>

        {/* Rota para Forbidden Page (403) */}
        <Route path="/forbidden" element={<ForbiddenPage />} />

        {/* Redirecionar para login por padrão */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
