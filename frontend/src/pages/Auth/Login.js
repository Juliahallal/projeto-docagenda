import "./Auth.css";

// Components
import { Link } from "react-router-dom";
import Message from "../../components/Message";

// Hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux
import { login, reset } from "../../slices/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    console.log(user);

    dispatch(login(user));
  };

  // funcao pra limpar o estado de autenticacao pra limpar que dados de tentativas de login anteriores
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <div id="login">
      <h2>Login</h2>
      <p className="cinza">Faça o login para acessar sua DocAgenda</p>
      <form onSubmit={handleSubmit}>
      <label>
          <span>E-mail</span>
           <input
          type="text"
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
           />
        </label>
        <label>
          <span>Senha</span>
          <input
               type="password"
               placeholder="Senha"
               onChange={(e) => setPassword(e.target.value)}
               value={password}
          />
        </label>
        {!loading && <input className="btn" type="submit" value="Entrar" />}
        {loading && <input className="btn" type="submit" disabled value="Aguarde..." />}
        {error && <Message msg={error} type="error" />}
      </form>
      <p className="cinza">
        Não tem uma conta? <Link to="/register">Clique aqui</Link>
      </p>
    </div>
  );
};

export default Login;