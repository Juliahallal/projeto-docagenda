import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAgendamentos } from "../slices/agendamentoSlice";
import { format } from "date-fns";
import { useNavigate } from 'react-router-dom';
import "./EventList.css"

const AgendamentoList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { agendamentos } = useSelector((state) => state.agendamentos);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchAgendamentos());
  }, [dispatch]);

  const handleViewPaciente = (id) => {
    navigate(`/paciente/${id}`);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const renderAgendamentoList = () => {
    if (!Array.isArray(agendamentos)) {
      return <p>Nenhum agendamento encontrado.</p>;
    }

    // filtro de agendamentos por paciente
    const filteredAgendamentos = agendamentos.filter(agendamento => {
      if (searchTerm === "") {
        return true; // se nao tiver paciente sendo buscado, mostra td
      }
      return agendamento.pacienteId 
        ? agendamento.pacienteId.nome.toLowerCase().includes(searchTerm.toLowerCase()) 
        : false;
    });

    // ordena os agendamentos por data 
    const sortedAgendamentos = filteredAgendamentos.sort((a, b) => new Date(a.start) - new Date(b.start));

    return (
      <table id="lista">
        <thead>
          <tr>
            <th>Evento</th>
            <th>Data e Hora</th>
            <th>Tipo</th>
            <th>Paciente</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sortedAgendamentos.map((agendamento) => (
            <tr key={agendamento._id}>
              <td>{agendamento.title}</td>
              <td>{`${format(new Date(agendamento.start), "dd/MM/yyyy HH:mm")} - ${format(new Date(agendamento.end || agendamento.start), "HH:mm")}`}</td>
              <td>{agendamento.tipo}</td>
              <td>{agendamento.pacienteId ? agendamento.pacienteId.nome : "-"}</td>
              <td>
                {agendamento.pacienteId && (
                  <button onClick={() => handleViewPaciente(agendamento.pacienteId._id)} className='btn-ver'>
                    Ver Paciente
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <div className="topoAgenda">
        <h1>Meus Agendamentos</h1>
        <span className="filtro">
          <input 
          type="text" 
          placeholder="Filtrar agendamentos por pacientes" 
          id="filtroPaciente"
          value={searchTerm} 
          onChange={handleSearchChange} />
        </span>
      </div>
      {agendamentos.length === 0 ? (
        <p>Nenhum agendamento encontrado.</p>
      ) : (
        renderAgendamentoList()
      )}
    </div>
  );
};

export default AgendamentoList;
