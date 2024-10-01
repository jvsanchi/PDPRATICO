import { useEffect, useState } from "react";
import { createAdministrator } from "../../services/administrator/administrator.service";
import { ICreateAdministator } from "../../interfaces/administrator/createAdministrator";
import { Button, message } from "antd";

const CreateAdministrator: React.FC = () => {
  const [createAdm, setCreateAdm] = useState<ICreateAdministator>({
    name: "",
    email: "",
    password: "",
    activated: true,
  });

  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);

  useEffect(() => {
    //Verifica se as senhas coincidem sempre que o usuário digitar
    if (createAdm.password !== confirmPassword) {
      setPasswordError(" As senhas não coincidem.");
      setIsSubmitDisabled(true);
    } else {
      setPasswordError(null);
      setIsSubmitDisabled(false);
    }
  }, [createAdm.password, confirmPassword]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCreateAdm((prevAdmin) => ({
      ...prevAdmin,
      [name]: value,
    }));
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Verificar novamente no submit
    if (createAdm.password !== confirmPassword) {
      message.error(" As senhas não coincidem. Por favor, verifique!");
      return;
    }

    try {
      const newAdministrator = await createAdministrator(createAdm);
      message.success("Administrador cadastrado com sucesso!");
      console.log(`Administrador cadastrado com sucesso! ${newAdministrator}`);

      setCreateAdm({
        name: "",
        email: "",
        password: "",
        activated: true,
      });

      setConfirmPassword("");
    } catch (error) {
      message.error("Erro ao cadastrar Administrador.");
      console.error(`Error ao cadastrar Administrador ${error}`);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={createAdm.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={createAdm.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            name="password"
            value={createAdm.password}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirme a Senha:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>

        {passwordError && (
          <div style={{ color: "red", marginBottom: "10px" }}>
            {passwordError}
          </div>
        )}

        <Button type="primary" htmlType="submit" disabled={isSubmitDisabled}>
          Cadastrar
        </Button>
      </form>
    </div>
  );
};

export default CreateAdministrator;
