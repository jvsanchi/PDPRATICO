import React, { useEffect, useState } from "react";
import { IUser } from "../../interfaces/User";
import { findUsers } from "../../services/user/user.service";
import { Card, Table, Spin, message } from "antd";

const UserList: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Mapeamento de role_id para nomes de permissões
  const roleMapping: Record<number, string> = {
    1: "ADMIN",
    2: "MASTER",
    3: "USER",
    4: "MANAGER",
    5: "COLLABORATOR",
  };

  // Função para buscar todos os usuários
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const allUsers = await findUsers();
      // Adicionar roleName com base no role_id
      const usersWithRoles = allUsers.map((user: IUser) => ({
        ...user,
        roleName: roleMapping[user.role.id] || "Unknown", // Mapeia o role_id para roleName
      }));
      setUsers(usersWithRoles);
    } catch (error) {
      message.error(`Erro ao buscar usuários: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  // Carregar usuários ao montar o componente
  useEffect(() => {
    fetchUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    {
      title: "Permissão",
      dataIndex: "roleName",
      key: "roleName",
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
