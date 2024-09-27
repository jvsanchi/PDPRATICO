import React, { useState } from "react";
import { Menu } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import { Link, useLocation, useNavigate } from "react-router-dom";

const { SubMenu } = Menu;

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  return (
    <div
      style={{
        width: collapsed ? 80 : 256, // Ajuste a largura dependendo do estado de colapso
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
        selectedKeys={[location.pathname]}
        style={{ flex: 1, overflowY: "auto" }}
      >
        <Menu.Item key="/dashboard" icon={<HomeOutlined />}>
          <Link
            to="/dashboard"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>Home</span>
          </Link>
        </Menu.Item>

        {/* Submenu para clientes */}
        <SubMenu key="clientes" icon={<UserOutlined />} title="Clientes">
          <Menu.Item key="/clientes/cadastrar">
            <Link to="/clientes/cadastrar">Cadastrar</Link>
          </Menu.Item>
          <Menu.Item key="/clientes/listar">
            <Link to="/clientes/listar">Listar</Link>{" "}
            {/* Atualizado para rota independente */}
          </Menu.Item>
        </SubMenu>

        {/* Outros Submenus podem ser adicionados aqui */}
      </Menu>

      {/* Botão "Sair" */}
      <Menu
        mode="inline"
        theme="dark"
        style={{ borderTop: "1px solid rgba(255, 255, 255, 0.2)" }}
      >
        <Menu.Item
          key="logout"
          icon={<LogoutOutlined />}
          onClick={handleLogout}
        >
          Sair
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default SideBar;
