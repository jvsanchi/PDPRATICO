import React, { useState } from "react";
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

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  // Definindo os itens do menu como um array de objetos
  const items: MenuProps["items"] = [
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
    // Usando um Divider para espaçamento
    {
      key: "divider-1",
      type: "divider",
    },
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
    {
      key: "produtos",
      icon: <AppstoreOutlined />,
      label: "Produtos",
      children: [
        {
          key: "/produtos/cadastrar",
          label: <Link to="/#">Cadastrar</Link>,
        },
        {
          key: "/produtos/listar",
          label: <Link to="/#">Listar</Link>,
        },
      ],
    },
    {
      key: "accountsPayable",
      icon: <DollarOutlined />,
      label: "Contas a Pagar",
      children: [
        {
          key: "/accountsPayable/cadastrar",
          label: <Link to="/#">Cadastrar</Link>,
        },
        {
          key: "/accountsPayable/listar",
          label: <Link to="#">Listar</Link>,
        },
      ],
    },
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

      {/* Botão "Sair" fixo na parte inferior */}
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
