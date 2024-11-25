import React, { useState, useEffect } from "react";
import { Form, Input, Button, DatePicker, message, Card, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../services/api.service";

const CadastrarClientes: React.FC = () => {
  const navigate = useNavigate();

  const [customer, setCustomer] = useState<{
    userId: number | null; // Permite que userId seja null ou number
    name: string;
    code: string;
    observations: string;
    dateOfBirth: string;
    rg: string;
    ie: string;
    cpf: string;
    cnpj: string;
    address: string;
    telephone: string;
    email: string;
  }>({
    userId: null, // Inicializa como null
    name: "",
    code: "",
    observations: "",
    dateOfBirth: "",
    rg: "",
    ie: "",
    cpf: "",
    cnpj: "",
    address: "",
    telephone: "",
    email: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    console.log("TOKEN ----> ", token);

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1])); // Decodifica o token
        console.log("PAYLOAD ---->", payload);

        if (payload.sub) {
          setCustomer((prev) => ({
            ...prev,
            userId: Number(payload.sub), // Atualiza o userId com o campo correto
          }));
        } else {
          message.error("ID do usuário não encontrado no token.");
          navigate("/login"); // Redireciona para login se o ID não estiver presente
        }
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
        message.error("Token inválido. Faça login novamente.");
        navigate("/login"); // Redireciona se o token for inválido
      }
    } else {
      message.error("Token não encontrado. Faça login novamente.");
      navigate("/login"); // Redireciona se o token não existir
    }
  }, [navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date: any, dateString: string | string[]) => {
    if (typeof dateString === "string") {
      setCustomer((prev) => ({
        ...prev,
        dateOfBirth: dateString,
      }));
    }
  };

  const handleSubmit = async () => {
    if (!customer.userId) {
      message.error("ID do usuário não encontrado. Faça login novamente.");
      return;
    }

    try {
      const token = localStorage.getItem("access_token");

      await axios.post(`${BASE_URL}/customer`, customer, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      message.success("Cliente cadastrado com sucesso!");

      // Limpa o formulário após o envio bem-sucedido
      setCustomer({
        userId: customer.userId, // Preserva o userId
        name: "",
        code: "",
        observations: "",
        dateOfBirth: "",
        rg: "",
        ie: "",
        cpf: "",
        cnpj: "",
        address: "",
        telephone: "",
        email: "",
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 401) {
          message.error("Usuário não autorizado.");
        } else {
          message.error("Erro ao cadastrar cliente.");
        }
      } else {
        message.error("Ocorreu um erro desconhecido.");
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <Card
        title="Cadastro de Clientes"
        style={{ width: "100%", maxWidth: "900px" }}
      >
        <Form layout="vertical" onFinish={handleSubmit}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Nome" name="name">
                <Input
                  name="name"
                  value={customer.name}
                  onChange={handleChange}
                  placeholder="Digite o nome completo"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Data de Nascimento" name="dateOfBirth">
                <DatePicker
                  style={{ width: "100%" }}
                  format="DD/MM/YYYY"
                  onChange={handleDateChange}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Código" name="code">
                <Input
                  name="code"
                  value={customer.code}
                  onChange={handleChange}
                  placeholder="Digite o código"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="CPF" name="cpf">
                <Input
                  name="cpf"
                  value={customer.cpf}
                  onChange={handleChange}
                  placeholder="Digite o CPF"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Email" name="email">
                <Input
                  name="email"
                  value={customer.email}
                  onChange={handleChange}
                  placeholder="Digite o email"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Telefone" name="telephone">
                <Input
                  name="telephone"
                  value={customer.telephone}
                  onChange={handleChange}
                  placeholder="Digite o telefone"
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Cadastrar Cliente
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default CadastrarClientes;
