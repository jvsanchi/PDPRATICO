import React from "react";
import { Navigate } from "react-router-dom";

// Função para verificar se o usuário está autenticado
const isAuthenticated = () => {
  return localStorage.getItem("access_token") !== null;
};

// Função para verificar o papel do usuário
const hasPermission = (requiredRoles: any) => {
  const userRole = localStorage.getItem("user_role");

  // Verifica se 'user_role' existe
  if (!userRole) {
    console.error("O campo 'user_role' não foi encontrado no localStorage.");
    return false; // Se user_role não estiver definido, retorna false
  }

  return requiredRoles.includes(userRole); // Verifica se o papel do usuário está entre os permitidos
};

interface ProtectedRouteProps {
  component: React.ComponentType<any>;
  requiredRoles?: string[];
}

// Componente de rota protegida
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
  requiredRoles,
  ...rest
}) => {
  // Verifica se o usuário está autenticado
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  // Se há papéis específicos necessários e o usuário não os tem
  if (requiredRoles && !hasPermission(requiredRoles)) {
    return <Navigate to="/forbidden" />;
  }

  // Renderiza o componente protegido
  return <Component {...rest} />; // Renderiza o componente passando as props adicionais
};

export default ProtectedRoute;
