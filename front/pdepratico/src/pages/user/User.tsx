import React, { useState } from "react";
import { IUser } from "../../interfaces/User";
import { createUser } from "../../services/user/user.service";
import { Card, Button, Form, Input, message } from "antd";

const UserForm: React.FC = () => {
  const [user, setUser] = useState<IUser>({
    name: "",
    email: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState<string>("");

  // Função para lidar com mudanças nos campos do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
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
      setUser({ name: "", email: "", password: "" });
      setConfirmPassword("");
    } catch (error) {
      message.error(`Erro ao cadastrar usuário: ${error}`);
    }
  };

  return (
    <Card title="Cadastrar Usuário" style={{ width: 400 }}>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Nome" required>
          <Input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            required
          />
        </Form.Item>

        <Form.Item label="Email" required>
          <Input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </Form.Item>

        <Form.Item label="Senha" required>
          <Input.Password
            placeholder="Senha"
            name="password"
            value={user.password}
            onChange={handleChange}
            required
          />
        </Form.Item>

        <Form.Item label="Confirmar Senha" required>
          <Input.Password
            placeholder="Confirmar Senha"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Cadastrar
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default UserForm;
