import React, { useState } from "react";
import { User } from "../../interfaces/User";
import { createUser } from "../../services/customer/user.service";

import { Button, Input } from "antd";

const UserForm: React.FC = () => {
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    password: "",
  });

  // Função para lidar com mudanças nos campos do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Função para lidar com o envio do formulário
  const handleSudmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const newUser = await createUser(user);
      console.log(`usuario cadastrado ${newUser}`);
    } catch (error) {
      console.error(`Error ao cadastrar usuário:  ${error}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSudmit}>
        <div>
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={user.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <Input.Password
            placeholder="Password"
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
        </div>

        <Button type="primary" htmlType="submit">
          Cadastrar
        </Button>
      </form>
    </div>
  );
};
export default UserForm;
