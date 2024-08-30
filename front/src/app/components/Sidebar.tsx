// /src/app/components/Sidebar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { FaUser, FaProductHunt, FaBars } from "react-icons/fa"; // Exemplo de ícones

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
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
        <li style={{ marginBottom: "20px" }}>
          <Link href="/clients">
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <FaUser size={24} />
              {isExpanded && <span>Clientes</span>}
            </div>
          </Link>
        </li>
        <li style={{ marginBottom: "20px" }}>
          <Link href="/products">
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
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
