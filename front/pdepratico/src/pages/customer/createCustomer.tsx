import React, { useState } from "react";
import { Customer } from "../../interfaces/Customer";

const CadastrarClientes: React.FC = () => {
  // Estado inicial do cliente
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomer((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div style={{ display: "flex" }}>
      <h2>ESTOU EM CADASTRO DE CLIENTES</h2>
    </div>
  );
};

export default CadastrarClientes;
