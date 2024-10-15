import React, { useState } from "react";
import { Form, Input, Button, DatePicker, message, Card, Row, Col } from "antd";
import { Customer } from "../../interfaces/Customer";
import axios from "axios";
import { BASE_URL } from "../../services/api.service"; // Importando a URL base do serviço

const CadastrarClientes: React.FC = () => {
  const [customer, setCustomer] = useState<Customer>({
    user: "",
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCustomer((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleDateChange = (date: any, dateString: string | string[]) => {
    if (typeof dateString === "string") {
      setCustomer((prevUser) => ({
        ...prevUser,
        dateOfBirth: dateString,
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("access_token");

      await axios.post(`${BASE_URL}/customer`, customer, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      message.success("Cliente cadastrado com sucesso!");
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
        backgroundColor: "#ffffff", // Cor de fundo para destacar o card
        overflowY: "auto", // Garantir rolagem vertical no layout principal
      }}
    >
      <Card
        title="Cadastro de Clientes"
        style={{ width: "100%", maxWidth: "900px" }} // Ajusta o tamanho do card
      >
        <Form layout="vertical" onFinish={handleSubmit}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Usuário" name="user">
                <Input
                  name="user"
                  value={customer.user}
                  onChange={handleChange}
                  placeholder="Digite o nome de usuário"
                />
              </Form.Item>
            </Col>
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
              <Form.Item label="Data de Nascimento" name="dateOfBirth">
                <DatePicker
                  style={{ width: "100%" }}
                  format="DD/MM/YYYY" // Formato da data
                  onChange={handleDateChange}
                  placeholder="Selecione a data de nascimento"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="RG" name="rg">
                <Input
                  name="rg"
                  value={customer.rg}
                  onChange={handleChange}
                  placeholder="Digite o RG"
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
              <Form.Item label="CNPJ" name="cnpj">
                <Input
                  name="cnpj"
                  value={customer.cnpj}
                  onChange={handleChange}
                  placeholder="Digite o CNPJ"
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
              <Form.Item label="Endereço" name="address">
                <Input
                  name="address"
                  value={customer.address}
                  onChange={handleChange}
                  placeholder="Digite o endereço"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Observações" name="observations">
                <Input.TextArea
                  name="observations"
                  value={customer.observations}
                  onChange={handleChange}
                  placeholder="Digite observações"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "50%", alignContent:'center' }}>
              Cadastrar Cliente
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default CadastrarClientes;
