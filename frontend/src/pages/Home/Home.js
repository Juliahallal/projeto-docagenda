import "./Home.css";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

const Home = () => {
     return (
          <div className="home">
               <h1>Bem Vindo a DocAgenda!</h1>
                    <p>
                         A DocAgenda busca melhorar a organização e a eficácia do trabalho dos profissionais de saúde, promovendo o acesso às informações  do paciente de forma centralizada, rápida e completa.
                         <br /><br />
                         O que você deseja fazer?
                    </p>
                    <div className="opcoes">
                    <Link to="/calendario" className="btn btn-dark">
                         Ver Calendario
                    </Link>
                    <Link to='/pacientes' className="btn btn-dark">
                         Meus Pacientes
                    </Link>
                    </div>
          </div>
     )
};

export default Home;