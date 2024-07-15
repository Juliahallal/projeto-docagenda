import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPacientes, searchPaciente, createPaciente } from '../slices/pacienteSlice';
import { useNavigate } from 'react-router-dom';
import "./PacienteList.css"

const PacientesList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pacientes, loading, error } = useSelector((state) => state.pacientes);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    fone: '',
    endereco: '',
    prontuario: '',
    remedio: '',
    comorbidade: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchPacientes());
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm) {
      dispatch(searchPaciente(searchTerm));
      setSearchPerformed(true);
    } else {
      dispatch(fetchPacientes());
      setSearchPerformed(false);
    }
  };

  const handleBack = () => {
    dispatch(fetchPacientes());
    setSearchPerformed(false);
    setSearchTerm('');
  };

  const handleViewMore = (id) => {
    navigate(`/paciente/${id}`);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nome || formData.nome.length < 3) {
      newErrors.nome = 'O nome deve ter pelo menos 3 caracteres.';
    }
    if (!formData.fone) {
      newErrors.fone = 'O telefone é obrigatório.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreatePaciente = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await dispatch(createPaciente(formData)).unwrap();
        setShowModal(false);
        setFormData({
          nome: '',
          fone: '',
          endereco: '',
          prontuario: '',
          remedio: '',
          comorbidade: '',
        });
        dispatch(fetchPacientes());
      } catch (error) {
        setErrors({ general: error.message });
      }
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Ocorreu um erro: {error}</p>;

  // ve se é um array antes de mapear
  if (!Array.isArray(pacientes)) {
    return <p>Nenhum paciente encontrado.</p>;
  }

  return (
    <div>
      {searchPerformed && <button onClick={handleBack} className='botao'> <u id='btn-voltar'>Voltar</u></button>}
      <h1>Meus Pacientes</h1>
      <span className='botoes-lista'>
        <form onSubmit={handleSearch} id="busca">
          <input
            type="text"
            placeholder="Buscar paciente pelo nome"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" id='btn-busca'> Buscar </button>
        </form>
        <button onClick={() => setShowModal(true)} className='btn-novo'>Adicionar Novo Paciente</button>
      </span>
      <table id='lista'>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Telefone</th>
            <th className='campo-btn'></th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map((paciente) => (
            <tr key={paciente._id}>
              <td>{paciente.nome}</td>
              <td>{paciente.fone}</td>
              <td>
                <button onClick={() => handleViewMore(paciente._id)} className='btn-ver'>Ver Mais</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal">
          <div className="modal-paciente">
            <span className="btn-fechar" onClick={() => setShowModal(false)}>&times;</span>
            <h2>Adicionar Novo Paciente</h2>
            <form onSubmit={handleCreatePaciente}>
              <div>
                <label>Nome:</label>
                <input type="text" name="nome" value={formData.nome} onChange={handleChange} />
                {errors.nome && <p className="error">{errors.nome}</p>}
              </div>
              <div>
                <label>Telefone:</label>
                <input type="text" name="fone" value={formData.fone} onChange={handleChange} />
                {errors.fone && <p className="error">{errors.fone}</p>}
              </div>
              <div>
                <label>Endereço:</label>
                <input type="text" name="endereco" value={formData.endereco} onChange={handleChange} />
              </div>
              <div>
                <label>Medicamentos:</label>
                <input type="text" name="remedio" value={formData.remedio} onChange={handleChange} />
              </div>
              <div>
                <label>Comorbidades/Condições Pré-Existentes:</label>
                <input type="text" name="comorbidade" value={formData.comorbidade} onChange={handleChange} />
              </div>
              <div>
                <label>Histórico do Paciente/Prontuário:</label>
                <textarea type="text" name="prontuario" value={formData.prontuario} onChange={handleChange} />
              </div>
              <button type="submit" className='btn'>Salvar</button>
              {errors.general && <p className="error">{errors.general}</p>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PacientesList;
