import React, { useState, useEffect, useRef } from "react";
import { IUser } from "../../interfaces/User";
import { createUser } from "../../services/user/user.service";
import { Card, Button, Form, Input, message, Select, Row, Col } from "antd";
import type { InputRef } from "antd"; // Importa o tipo correto para a referência
import { BASE_URL } from "../../services/api.service";

const { Option } = Select;

const UserForm: React.FC = () => {
  const [user, setUser] = useState<IUser>({
    name: "",
    email: "",
    password: "",
    role: "", // Adiciona o campo de role
  });

  const [roles, setRoles] = useState<string[]>([]); // Estado para armazenar as roles disponíveis
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const nameInputRef = useRef<InputRef | null>(null); // Usa o tipo correto InputRef

  // Função para buscar as roles disponíveis no back-end
  useEffect(() => {
    fetch(`${BASE_URL}/roles`) // Endpoint para buscar as roles
      .then((response) => response.json())
      .then((data) => setRoles(data.map((role: any) => role.role))) // Assume que a API retorna uma lista de roles
      .catch((error) => console.error("Erro ao buscar roles:", error));
  }, []);

  // Função para lidar com mudanças nos campos do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Função para lidar com mudanças no campo de role
  const handleRoleChange = (value: string) => {
    setUser((prevUser) => ({
      ...prevUser,
      role: value,
    }));
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async (values: any) => {
    if (user.password !== confirmPassword) {
      message.error("As senhas não coincidem!");
      return;
    }

    try {
      const newUser = await createUser(user);
      message.success(`Usuário cadastrado: ${newUser.name}`);

      // Limpa os campos após o cadastro
      handleCancel();
    } catch (error) {
      message.error(`Erro ao cadastrar usuário: ${error}`);
    }
  };

  // Função para limpar os campos do formulário e focar no primeiro campo
  const handleCancel = () => {
    setUser({ name: "", email: "", password: "", role: "" });
    setConfirmPassword("");
    nameInputRef.current?.focus(); // Retorna o foco para o campo "Nome"
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f2f5",
      }}
    >
      <Card
        title={
          <h2 style={{ fontSize: "24px", textAlign: "center" }}>
            Cadastrar Usuário
          </h2>
        }
        style={{
          width: "50%", // Ajusta a largura para 50% da tela
          minWidth: "400px", // Garante uma largura mínima
          maxWidth: "800px", // Define uma largura máxima
          padding: "20px", // Adiciona espaço interno
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
        }}
      >
        <Form layout="vertical" onFinish={handleSubmit}>
          {/* Campos alinhados em duas colunas */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Nome" required>
                <Input
                  ref={nameInputRef} // Conecta a referência ao campo "Nome"
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  required
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Email" required>
                <Input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  required
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Senha" required>
                <Input.Password
                  placeholder="Senha"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  required
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Confirmar Senha" required>
                <Input.Password
                  placeholder="Confirmar Senha"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item label="Permissão" required>
                <Select
                  placeholder="Selecione a permissão"
                  value={user.role}
                  onChange={handleRoleChange}
                >
                  {roles.map((role) => (
                    <Option key={role} value={role}>
                      {role}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {/* Botões centralizados */}
          <Row justify="center" gutter={16}>
            <Col>
              <Button
                type="primary"
                htmlType="submit"
                style={{ minWidth: "100px" }}
              >
                Cadastrar
              </Button>
            </Col>
            <Col>
              <Button
                type="primary"
                danger
                onClick={handleCancel}
                style={{ minWidth: "100px" }}
              >
                Cancelar
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default UserForm;
