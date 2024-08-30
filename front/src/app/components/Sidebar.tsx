"use client";

import { useState } from "react";
import Link from "next/link";
import { FaUser, FaProductHunt, FaBars, FaCaretDown, FaCaretUp } from "react-icons/fa"; // Adicione ícones para expandir/recolher

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showClientsSubmenu, setShowClientsSubmenu] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleClientsSubmenu = () => {
    setShowClientsSubmenu(!showClientsSubmenu);
  };

  return (
    <div
      style={{
        width: isExpanded ? "200px" : "60px",
        height: "100vh",
        backgroundColor: "#f4f4f4",
        padding: "10px",
        transition: "width 0.3s ease",
      }}
    >
      <button
        onClick={toggleSidebar}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          cursor: "pointer",
          marginBottom: "10px",
          color: "#333",
        }}
      >
        <FaBars size={24} />
      </button>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {/* Menu Principal */}
        <li style={{ marginBottom: "20px" }}>
          <div 
            onClick={toggleClientsSubmenu} 
            style={{ 
              display: "flex", 
              alignItems: "center", 
              cursor: "pointer", 
              gap: "10px",
              padding: isExpanded ? "10px 0" : "0"
            }}
          >
            <FaUser size={24} />
            {isExpanded && <span>Clientes</span>}
            {isExpanded && (
              showClientsSubmenu ? <FaCaretUp size={16} /> : <FaCaretDown size={16} />
            )}
          </div>
          {showClientsSubmenu && isExpanded && (
            <ul style={{ listStyleType: "none", padding: "10px 0 0 20px" }}>
              <li style={{ marginBottom: "10px" }}>
                <Link href="/clients/new">
                  Novo Cliente
                </Link>
              </li>
              <li style={{ marginBottom: "10px" }}>
                <Link href="/clients">
                  Listar Clientes
                </Link>
              </li>
              <li style={{ marginBottom: "10px" }}>
                <Link href="/clients/delete">
                  Deletar Cliente
                </Link>
              </li>
            </ul>
          )}
        </li>
        {/* Outros itens de menu */}
        <li style={{ marginBottom: "20px" }}>
          <Link href="/products">
            <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: isExpanded ? "10px 0" : "0" }}>
              <FaProductHunt size={24} />
              {isExpanded && <span>Produtos</span>}
            </div>
          </Link>
        </li>
        {/* Adicione mais links conforme necessário */}
      </ul>
    </div>
  );
};

export default Sidebar;
