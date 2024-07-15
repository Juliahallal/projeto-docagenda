import React from 'react';
import './Navbar.css';

// Hooks
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Redux
import { logout, reset } from "../slices/authSlice";

// components
import { NavLink, Link } from "react-router-dom";


const Navbar = () => {
     const { auth } = useAuth();
     const { user } = useSelector((state) => state.auth);
   
     const navigate = useNavigate();
   
     const dispatch = useDispatch();
   
     const [query, setQuery] = useState("");
   
     const handleLogout = () => {
       dispatch(logout());
       dispatch(reset());
   
       navigate("/login");
     };
     return (
          <nav id='nav'>
               <Link to="/"> <img src="/logo-doc.svg" alt="DocAgenda" id='logo' /> </Link>
               <ul id='nav-links'>
               <li><NavLink to="/">Home</NavLink></li>
               {auth ? (
                    <>
                    <li><NavLink to="/calendario">Calendario</NavLink></li>
                    <li><NavLink to="/lista">Agendamentos</NavLink></li>
                    <li><NavLink to="/pacientes">Pacientes</NavLink></li>
                    <li><span onClick={handleLogout}>Sair</span></li>
                    </>
                ) : (
                    <>
                     {" "}
                    <li><NavLink to="/login">Entrar</NavLink></li>
                    <li><NavLink to="/register">Cadastrar</NavLink></li>
                    <li><NavLink to="/about">Sobre</NavLink></li>
                    </>
               )}
               </ul>
          </nav>
     )
}

export default Navbar