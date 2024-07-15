import "./Auth.css";
// Components
import { Link } from "react-router-dom";
import Message from "../../components/Message";
// Hooks
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// Redux
import { register, reset } from "../../slices/authSlice";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
      confirmPassword,
    };

    console.log(user);

    dispatch(register(user));
  };

  // resetar dados e erros
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);


  return (
     <div id="login">
       <h2>Cadastro</h2>
       <p className="cinza">Preencha os campos abaixo para se registrar</p>
       <form onSubmit={handleSubmit}>
          <label>
               <span>Nome</span>
               <input
               type="text"
               placeholder="Nome"
               onChange={(e) => setName(e.target.value)}
               value={name} />
          </label>
         <label>
         <span>E-mail</span>
          <input
               type="email"
               placeholder="E-mail"
               onChange={(e) => setEmail(e.target.value)}
               value={email} />
         </label>
         <label>
         <span>Senha</span>
          <input
               type="password"
               placeholder="Senha"
               onChange={(e) => setPassword(e.target.value)}
               value={password} />
         </label>
         <label>
          <span>Confirme sua senha</span>
          <input
               type="password"
               placeholder="Confirme a senha"
               onChange={(e) => setConfirmPassword(e.target.value)}
               value={confirmPassword}/>
         </label>
         {!loading && <input className="btn" type="submit" value="Cadastrar" />}
         {loading && <input type="submit" className="btn" disabled value="Aguarde..." />}
         {error && <Message msg={error} type="error" />}
       </form>
       <p className="cinza">
         Já tem conta? <Link to="/login">Clique aqui</Link>
       </p>
     </div>
   );
 };
 
 export default Register;