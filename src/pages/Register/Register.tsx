import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthHeader from "~/components/Auth/Header/AuthHeader";
import Input from "~/components/Auth/Input/Input";
import AuthLayout from "~/components/Auth/Layout/AuthLayout";
import Button from "~/components/Shared/Button/Button";
import { User } from "~/types/User";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleRegister = () => {
    if (!email || !password) {
      setErrorMessage("Preencha todos os campos.");
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      setErrorMessage("Por favor, insira um e-mail válido.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    const exists = users.find((user) => user.email === email.trim());

    if (exists) {
      setErrorMessage("Usuário já cadastrado.");
      return;
    }

    users.push({
      email: email.trim(),
      password: password.trim(),
    });

    localStorage.setItem("users", JSON.stringify(users));
    setErrorMessage(null);
    alert("Cadastro realizado com sucesso");
    navigate("/login");
  };

  return (
    <AuthLayout>
      <AuthHeader
        title='Crie sua conta'
        subtitle='Cadastre-se para acessar a plataforma'
      />

      <Input
        label='E-mail'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        label='Senha'
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        showToggle
        showValue={showPass}
        onToggle={() => setShowPass(!showPass)}
      />

      {errorMessage && (
        <div className='text-red-500 text-sm mt-2'>{errorMessage}</div>
      )}

      <div className='space-y-2'>
        <Button onClick={handleRegister}>Cadastrar</Button>
      </div>

      <a
        href='/login'
        className='text-sm text-brand underline text-center block mt-4'
      >
        Já tem conta? Fazer login
      </a>
    </AuthLayout>
  );
};

export default Register;
