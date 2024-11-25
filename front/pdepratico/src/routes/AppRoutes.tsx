import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "../pages/login/Login";
import ForbiddenPage from "../pages/forbidden/ForbiddenPage";
import ProtectedRoute from "../components/protectRoute/ProtectRoute";
import RoleEnum from "../enums/RoleEnum";

import Dashboard from "../components/dashboard/Dashboard";


import CadastrarClientes from "../pages/customer/createCustomer";
import ListarClientes from "../pages/customer/findCustomer";

import UserForm from "../pages/user/User";
import CreateAdministrator from "../pages/administrator/createAdminisrator";
import UserList from "../pages/user/User_list_all";
import DashboardStats from "../components/dashboard/DashboardStats";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rota Pública para Login */}
      <Route path="/login" element={<Login />} />

      {/* Layout comum com Dashboard (SideBar e outras funcionalidades) */}
      <Route
        element={
          <ProtectedRoute
            component={Dashboard}
            requiredRoles={[
              RoleEnum.ADMIN, // Permissão mínima para acessar o layout do Dashboard
              RoleEnum.MASTER,
              RoleEnum.USER,
              RoleEnum.COLLABORATOR,
              RoleEnum.MANAGER,
            ]}
          />
        }
      >
        {/* Rota protegida para o Dashboard 
        <Route path="/dashboard" element={<h2>Bem-vindo à Dashboard</h2>} />
*/}
        <Route path="/dashboard" element={<DashboardStats />} />{" "}
        {/* Rota para o Dashboard com Estatísticas */}
        {/* Rota protegida para Listar Administradores com permissões específicas */}
        <Route
          path="/administrator/listAll"
          element={
            <ProtectedRoute
              component={CreateAdministrator}
              // requiredRoles={[
              //   RoleEnum.ADMIN,
              //   RoleEnum.MASTER,
              //   RoleEnum.USER,
              //   RoleEnum.MANAGER,
              // ]}
            />
          }
        />
        {/* Rota protegida para Listar Clientes com permissões específicas */}
        <Route
          path="/clientes/listar"
          element={
            <ProtectedRoute
              component={ListarClientes}
              requiredRoles={[RoleEnum.ADMIN, RoleEnum.MASTER, RoleEnum.USER]}
            />
          }
        />
        {/* Rota protegida para Cadastrar Clientes com permissões diferentes */}
        <Route
          path="/clientes/cadastrar"
          element={
            <ProtectedRoute
              component={CadastrarClientes}
              requiredRoles={[
                RoleEnum.ADMIN, // ADMIN, MASTER, USER e MANAGER podem acessar Cadastrar Clientes
                RoleEnum.MASTER,
                RoleEnum.USER,
                RoleEnum.MANAGER,
              ]}
            />
          }
        />
        <Route
          path="/user/cadastrar"
          element={
            <ProtectedRoute
              component={UserForm}
              requiredRoles={[
                RoleEnum.ADMIN,
                RoleEnum.MASTER,
            //    RoleEnum.USER,
                RoleEnum.MANAGER,
              ]}
            />
          }
        />
        <Route
          path="/user/listar"
          element={
            <ProtectedRoute
              component={UserList}
              // requiredRoles={[
              //   RoleEnum.ADMIN,
              //   RoleEnum.MASTER,
              //   RoleEnum.USER,
              //   RoleEnum.MANAGER,
              // ]}
            />
          }
        />
        {/* Aqui você pode adicionar mais rotas protegidas conforme necessário */}
      </Route>

      {/* Rota para Forbidden Page (403) */}
      <Route path="/forbidden" element={<ForbiddenPage />} />

      {/* Redirecionar para login por padrão */}
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;
