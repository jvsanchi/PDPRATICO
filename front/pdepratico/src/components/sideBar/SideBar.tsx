import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
  AppstoreOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import type { MenuProps } from "antd";
import RoleEnum from "../../enums/RoleEnum";

// Definir um tipo para os itens de menu
type MenuItem = Required<MenuProps>["items"][number];

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null); // Estado para armazenar o papel do usuário
  const navigate = useNavigate();

  // Recupera o papel do usuário do localStorage ao montar o componente
  useEffect(() => {
    const role = localStorage.getItem("user_role");
    console.log("ROLE", role);
    setUserRole(role); // Atualiza o estado com o papel do usuário logado
  }, []); // Executa apenas ao montar o componente (refresh da página)

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_role");
    navigate("/login");
  };

  // Definindo os itens do menu como um array de objetos, condicionado ao papel do usuário
  const items: MenuItem[] = [
    {
      key: "/dashboard",
      icon: <HomeOutlined />,
      label: (
        <Link
          to="/dashboard"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Home
        </Link>
      ),
    },
    {
      key: "divider-1",
      type: "divider",
    },
    // Exibe o menu de Administrador apenas para ADMIN e MASTER
    ...(userRole === RoleEnum.ADMIN || userRole === RoleEnum.MASTER
      ? [
          {
            key: "administrator",
            icon: <UserOutlined />,
            label: "Administrador",
            children: [
              {
                key: "/administrator/listAll",
                label: <Link to="/administrator/listAll">Listar</Link>,
              },
            ],
          },
        ]
      : []),
    // Exibe o menu de Clientes para ADMIN, MASTER, USER, MANAGER
    ...(userRole === RoleEnum.ADMIN ||
    userRole === RoleEnum.MASTER ||
    userRole === RoleEnum.USER ||
    userRole === RoleEnum.MANAGER
      ? [
          {
            key: "clientes",
            icon: <UserOutlined />,
            label: "Clientes",
            children: [
              {
                key: "/clientes/cadastrar",
                label: <Link to="/clientes/cadastrar">Cadastrar</Link>,
              },
              {
                key: "/clientes/listar",
                label: <Link to="/clientes/listar">Listar</Link>,
              },
            ],
          },
        ]
      : []),
    // Exibe o menu de Produtos para todos os papéis (sem restrições neste exemplo)
    {
      key: "produtos",
      icon: <AppstoreOutlined />,
      label: "Produtos",
      children: [
        {
          key: "/produtos/cadastrar",
          label: <Link to="/produtos/cadastrar">Cadastrar</Link>,
        },
        {
          key: "/produtos/listar",
          label: <Link to="/produtos/listar">Listar</Link>,
        },
      ],
    },
    // Exibe o menu de Contas a Pagar para ADMIN e MASTER
    ...(userRole === RoleEnum.ADMIN || userRole === RoleEnum.MASTER
      ? [
          {
            key: "accountsPayable",
            icon: <DollarOutlined />,
            label: "Contas a Pagar",
            children: [
              {
                key: "/accountsPayable/cadastrar",
                label: <Link to="/accountsPayable/cadastrar">Cadastrar</Link>,
              },
              {
                key: "/accountsPayable/listar",
                label: <Link to="/accountsPayable/listar">Listar</Link>,
              },
            ],
          },
        ]
      : []),
    // Exibe o menu de Usuário para ADMIN e MASTER
    ...(userRole === RoleEnum.ADMIN || userRole === RoleEnum.MASTER
      ? [
          {
            key: "user",
            icon: <UserOutlined />,
            label: "Usuário",
            children: [
              {
                key: "/user/cadastrar",
                label: <Link to="/user/cadastrar">Cadastrar</Link>,
              },
            ],
          },
        ]
      : []),
  ];

  return (
    <div
      style={{
        width: collapsed ? 80 : 256,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#001529",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <span style={{ color: "white", fontSize: "16px", marginLeft: "10px" }}>
          {!collapsed ? "PDPRATICO" : "PDP"}
        </span>
        <div onClick={toggleCollapsed} style={{ cursor: "pointer" }}>
          {collapsed ? (
            <MenuUnfoldOutlined style={{ color: "white" }} />
          ) : (
            <MenuFoldOutlined style={{ color: "white" }} />
          )}
        </div>
      </div>

      <Menu
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        style={{ flex: 1, overflow: "auto" }}
        items={items}
      />

      <div
        style={{
          padding: collapsed ? "10px 0" : "10px",
          borderTop: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <Menu
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
          style={{ border: "none" }}
          items={[
            {
              key: "logout",
              icon: <LogoutOutlined />,
              label: "Sair",
              onClick: handleLogout,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default SideBar;
