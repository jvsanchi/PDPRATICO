import React, { useState } from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
  const [isClient, setIsClient] = useState(false);

  const toggleClientsSubMenu = () => {
    setIsClient(!isClient);
  };

  return (
    <>
      <div
        className="bg-dark text-white vh-100 p-3"
        style={{ width: "200px", position: "fixed" }}
      >
        <h4 className="pb-3">Menu</h4>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to="/dashboard" className="nav-link text-white">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/dashboard/page1" className="nav-link text-white">
              Page 1
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/dashboard/page2" className="nav-link text-white">
              Page 2
            </Link>
          </li>
          <li className="nav-item">
            <div
              className="nav-link text-white d-flex justify-content-between align-items-center cursor-pointer"
              onClick={toggleClientsSubMenu}
            >
              <span>Clientes</span>
              <span>{isClient ? "▲" : "▼"}</span>
            </div>
            {isClient && (
              <ul className="nav flex-column ms-3">
                <li className="nav-item">
                  <Link to="clientes/cadastrar" className="nav-link text-white">
                    Cadastrar Clientes
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="clientes/listar" className="nav-link text-white">
                    Listar Clientes
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </>
  );
};

export default SideBar;
