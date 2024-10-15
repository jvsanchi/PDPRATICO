// src/pages/clientes/ListarClientes.js
import React, { useEffect, useState } from "react";
import { Table, message, Spin } from "antd";
import axios from "axios";
import { BASE_URL } from "../../services/api.service"; // Importando a URL base do serviço

const ListarClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await axios.get(`${BASE_URL}/customer`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setClientes(response.data); // Armazena os dados dos clientes no estado
      } catch (error) {
        message.error("Erro ao carregar clientes."); // Mensagem de erro caso a requisição falhe
      } finally {
        setLoading(false); // Define o loading como false após a requisição
      }
    };

    fetchClientes(); // Chama a função para buscar os clientes
  }, []);

  const columns = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Código",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Data de Nascimento",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
    },
    {
      title: "RG",
      dataIndex: "rg",
      key: "rg",
    },
    {
      title: "CPF",
      dataIndex: "cpf",
      key: "cpf",
    },
    {
      title: "CNPJ",
      dataIndex: "cnpj",
      key: "cnpj",
    },
    {
      title: "Telefone",
      dataIndex: "telephone",
      key: "telephone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
  ];

  return (
    <div>
      <h2>Listar Clientes</h2>
      {loading ? (
        <Spin /> // Exibe um loader enquanto os dados estão sendo carregados
      ) : (
        <Table
          dataSource={clientes}
          columns={columns}
          rowKey="id" // Substitua "id" pelo campo que identifica de forma única cada cliente
          pagination={{
            pageSize: 10, // Define o número de itens por página
          }}
        />
      )}
    </div>
  );
};

export default ListarClientes;
