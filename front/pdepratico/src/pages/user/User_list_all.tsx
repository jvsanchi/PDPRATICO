import React, { useEffect, useState } from "react";
import { IUser } from "../../interfaces/User";
import { findUsers } from "../../services/user/user.service";
import { Card, Table, Spin, message } from "antd";

const UserList: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Função para buscar todos os usuários
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const allUsers = await findUsers();
      setUsers(allUsers);
    } catch (error) {
      message.error(`Erro ao buscar usuários: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  // Carregar usuários ao montar o componente
  useEffect(() => {
    fetchUsers();
  }, []);

  // Definindo colunas para a tabela
const columns = [
  {
    title: "Nome",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Ativado",
    dataIndex: "activated",
    key: "activated",
    render: (text: boolean) => (text ? "Sim" : "Não"), // Exibe "Sim" ou "Não"
  },
];

  return (
    <Card title="Lista de Usuários" style={{ margin: 20 }}>
      {loading ? (
        <Spin />
      ) : (
        <Table dataSource={users} columns={columns} rowKey="email" />
      )}
    </Card>
  );
};

export default UserList;
