import React, { useEffect, useState } from "react";
import { IUser } from "../../interfaces/User";
import { findUsers, updateUser } from "../../services/user/user.service";
import {
  Card,
  Table,
  Spin,
  message,
  Button,
  Modal,
  Form,
  Input,
  Select,
} from "antd";

const { Option } = Select;

const UserList: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editingUser, setEditingUser] = useState<IUser | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

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

      const teste = localStorage.getItem("access_token");

      console.log("TESTE", teste);

      const userRole = localStorage.getItem("user_role");

      console.log("userRole", userRole);
      const usersWithRoles = allUsers.map((user: IUser) => ({
        ...user,
        roleName: roleMapping[user.role.id] || "Unknown",
      }));
      setUsers(usersWithRoles);
    } catch (error) {
      message.error(`Erro ao buscar usuários user_list_all: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  // Carregar usuários ao montar o componente
  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Função para editar usuário
  const handleEdit = (user: IUser) => {
    setEditingUser(user);
    setIsModalVisible(true);
  };

  // Função para cancelar edição
  const handleCancel = () => {
    setEditingUser(null);
    setIsModalVisible(false);
  };

  // Função para atualizar o usuário
  const handleUpdate = async () => {
    if (editingUser) {
      try {
        const updatedUser = {
          ...editingUser,
          role: editingUser.role.id, // Role deve ser enviada como enum/ID
        };
        await updateUser(updatedUser); // Chama a API para atualizar o usuário
        message.success("Usuário atualizado com sucesso!");
        fetchUsers(); // Atualiza a tabela de usuários
        handleCancel();
      } catch (error) {
        message.error(`Erro ao atualizar usuário: ${error}`);
      }
    }
  };

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
      render: (text: boolean) => (text ? "Sim" : "Não"),
    },
    {
      title: "Permissão",
      dataIndex: "roleName",
      key: "roleName",
    },
    {
      title: "Ações",
      key: "actions",
      render: (_: any, record: IUser) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <Button type="primary" onClick={() => handleEdit(record)}>
            Editar
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Card title="Lista de Usuários" style={{ margin: 20 }}>
      {loading ? (
        <Spin />
      ) : (
        <Table dataSource={users} columns={columns} rowKey="email" />
      )}

      {/* Modal de edição */}
      <Modal
        title="Editar Usuário"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="update" type="primary" onClick={handleUpdate}>
            Atualizar
          </Button>,
          <Button key="cancel" onClick={handleCancel}>
            Cancelar
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item label="Nome" required>
            <Input
              value={editingUser?.name}
              onChange={(e) =>
                setEditingUser((prev) =>
                  prev ? { ...prev, name: e.target.value } : null
                )
              }
            />
          </Form.Item>
          <Form.Item label="Email" required>
            <Input
              value={editingUser?.email}
              onChange={(e) =>
                setEditingUser((prev) =>
                  prev ? { ...prev, email: e.target.value } : null
                )
              }
            />
          </Form.Item>
          <Form.Item label="Permissão" required>
            <Select
              value={editingUser?.role.id}
              onChange={(value) =>
                setEditingUser((prev) =>
                  prev ? { ...prev, role: { id: value } } : null
                )
              }
            >
              {Object.entries(roleMapping).map(([id, name]) => (
                <Option key={id} value={parseInt(id)}>
                  {name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default UserList;
