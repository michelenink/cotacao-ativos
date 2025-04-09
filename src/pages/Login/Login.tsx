import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthHeader from "~/components/Auth/Header/AuthHeader";
import Input from "~/components/Auth/Input/Input";
import AuthLayout from "~/components/Auth/Layout/AuthLayout";
import Button from "~/components/Shared/Button/Button";
import { User } from "~/types/User";
import { saveSession } from "~/utils/session";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = () => {
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

    const found = users.find(
      (user) => user.email === email.trim() && user.password === password.trim()
    );

    if (found) {
      saveSession(email);
      navigate("/");
    } else {
      setErrorMessage("Credenciais inválidas");
    }
  };

  return (
    <AuthLayout>
      <AuthHeader title='Seja bem-vindo!' subtitle='Faça login para acessar' />

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
        <Button onClick={handleLogin} disabled={!email || !password}>
          Entrar
        </Button>
      </div>

      <a
        href='/register'
        className='text-sm text-brand underline text-center block mt-4'
      >
        Não tem conta? Cadastre-se
      </a>
    </AuthLayout>
  );
};

export default Login;
