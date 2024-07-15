import React from "react";
import { Link } from "react-router-dom";
import "./About.css";

const About = () => {
     return (
          <div className="sobre">
               <h2>Sobre a DocAgenda</h2>
               <p>
                    A DocAgenda é uma plataforma criada para o Projeto Integrador da Faculdade de Tecnologia Senac Pelotas.
                    <br /><br />
                    A proposta do projeto é criar um sistema de organização da agenda de médicos, permitindo que eles gerenciem seus pacientes, agendem consultas, procedimentos, cirurgias e exames de forma eficiente e segura. A plataforma é projetada para médicos e assistentes, proporcionando uma maneira intuitiva e centralizada de acessar e atualizar as informações dos pacientes.
               </p>
               <Link to="/" className="btn"> Voltar </Link>
          </div>
     )
}

export default About