import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchPaciente, updatePaciente, deletePaciente, addExame, deleteExame, viewAnexo, downloadAnexo } from '../slices/pacienteSlice';
import "./PacienteDetalhes.css";


const PacienteDetalhes = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { paciente, loading, error } = useSelector((state) => state.pacientes);
  const [formData, setFormData] = useState({
    nome: '',
    fone: '',
    endereco: '',
    prontuario: '',
    remedio: '',
    comorbidade: '',
  });
  const [exameData, setExameData] = useState({
    tipo: '',
    anexo: null, 
    resultado: '',
    observacoes: '',
  });
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showExameModal, setShowExameModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchPaciente(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (paciente) {
      setFormData({
        nome: paciente.nome || '',
        fone: paciente.fone || '',
        endereco: paciente.endereco || '',
        prontuario: paciente.prontuario || '',
        remedio: paciente.remedio || '',
        comorbidade: paciente.comorbidade || '',
      });
    }
  }, [paciente]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nome || formData.nome.length < 3) {
      newErrors.nome = 'O nome deve ter pelo menos 3 caracteres.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateExame = () => {
    const newErrors = {};
    if (!exameData.tipo) {
      newErrors.tipo = 'O tipo é obrigatório.';
    }
    if (!exameData.anexo) {
      newErrors.anexo = 'O anexo é obrigatório.';
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

  const handleExameChange = (e) => {
    const { name, value, files } = e.target;
    setExameData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      await dispatch(updatePaciente({ id, pacienteData: formData }));
      setShowUpdateModal(false);
      dispatch(fetchPaciente(id));  // atualiza dados do paciente
    }
  };

  const handleExameSubmit = async (e) => {
    e.preventDefault();
    if (validateExame()) {
      const formData = new FormData();
      formData.append('tipo', exameData.tipo);
      formData.append('anexo', exameData.anexo);
      formData.append('resultado', exameData.resultado);
      formData.append('observacoes', exameData.observacoes);

      await dispatch(addExame({ id, exameData: formData }));
      
      setExameData({
        tipo: '',
        anexo: null,
        resultado: '',
        observacoes: '',
      });
      setShowExameModal(false);
      dispatch(fetchPaciente(id)); 
    }
  };

  const handleDeleteExame = async (exameId) => {
    await dispatch(deleteExame({ pacienteId: id, exameId }));
    dispatch(fetchPaciente(id));  
  };

  const handleDeletePaciente = async () => {
    await dispatch(deletePaciente(id));
    navigate('/pacientes');
  };

  const handleViewExame = async (exameId) => {
    const url = await dispatch(viewAnexo({ pacienteId: id, exameId })).unwrap();
    window.open(url, '_blank');
  };

  const handleDownloadExame = async (exameId) => {
    const blob = await dispatch(downloadAnexo({ pacienteId: id, exameId })).unwrap();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'exame_anexo';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Ocorreu um erro: {error}</p>;

  return (
    <div>
      <Link to="/pacientes"><u id='btn-voltar'>Voltar para Pacientes</u></Link>
      <h1 className='titulo-ficha'>Ficha do Paciente</h1>
      {paciente && (
        <>
          <div className='ficha'> 
            <em className='botoes'>
                <button className='btn atualizar' onClick={() => setShowUpdateModal(true)}>Atualizar Dados</button>
                <button id='deletar' onClick={() => setShowDeleteConfirm(true)}></button>
              </em>
            <span id='paciente'>
              <figure><img src='../pacient.png' /></figure>  
              <p><strong>{paciente.nome}</strong></p>
            </span>
            <div className='infos-paciente'>
              <p><strong>Telefone:</strong> {paciente.fone}</p>
              <p><strong>Endereço:</strong> {paciente.endereco}</p>
              <p><strong>Medicamentos:</strong> {paciente.remedio}</p>
              <p><strong>Comorbidades/Condições Pré-Existentes:</strong> {paciente.comorbidade}</p>
              <em className='espaco'></em>
              <p><strong>Histórico do Paciente/Prontuário:</strong><br /><br /> {paciente.prontuario}</p>
            </div>
          </div>
          
          <h2>Exames</h2>
          <button className='btn btn-exame' onClick={() => setShowExameModal(true)}>Adicionar Novo Exame</button>
          {paciente.exame && paciente.exame.length > 0 ? (
            <table id='lista'>
              <thead>
                <tr>
                  <th>Tipo</th>
                  <th>Resultado</th>
                  <th>Observações</th>
                  <th id='campo-anex'>Anexo</th>
                  <th id='campo-delet'></th>
                </tr>
              </thead>
              <tbody>
                {paciente.exame.map((exame) => (
                  <tr key={exame._id}>
                    <td>{exame.tipo}</td>
                    <td>{exame.resultado}</td>
                    <td>{exame.observacoes}</td>
                    <td>
                      {exame.anexo}
                      <button onClick={() => handleViewExame(exame._id)} className='botao'><span id='abrir-exame' alt="Abrir exame" title='Abrir Exame'>Ver Exame</span></button>
                      <button onClick={() => handleDownloadExame(exame._id)} className='botao'><span id='download' alt="Fazer Download" title='Fazer Download'>Fazer Download</span></button>
                    </td>
                    <td>
                      <button onClick={() => handleDeleteExame(exame._id)} className='botao' ><span id='excluir-exame' alt="Excluir Exame" title='Excluir Exame'></span></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Nenhum exame encontrado.</p>
          )}
        </>
      )}

      {showUpdateModal && (
        <div className="modal">
          <div className="modal-paciente">
            <span className="btn-fechar" onClick={() => setShowUpdateModal(false)}>&times;</span>
            <h2>Atualizar Dados do Paciente</h2>
            <form onSubmit={handleUpdateSubmit}>
              <div>
                <label>Nome:</label>
                <input type="text" name="nome" value={formData.nome} onChange={handleChange} />
                {errors.nome && <p className="error">{errors.nome}</p>}
              </div>
              <div>
                <label>Telefone:</label>
                <input type="text" name="fone" value={formData.fone} onChange={handleChange} />
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
            </form>
          </div>
        </div>
      )}

      {showExameModal && (
        <div className="modal">
          <div className="modal-paciente">
            <span className="btn-fechar" onClick={() => setShowExameModal(false)}>&times;</span>
            <h2>Adicionar Novo Exame</h2>
            <form onSubmit={handleExameSubmit}>
              <div>
                <label>Tipo:</label>
                <input type="text" name="tipo" value={exameData.tipo} onChange={handleExameChange} />
                {errors.tipo && <p className="error">{errors.tipo}</p>}
              </div>
              <div>
                <label>Anexo:</label>
                <input type="file" name="anexo" onChange={handleExameChange} />
                {errors.anexo && <p className="error">{errors.anexo}</p>}
              </div>
              <div>
                <label>Resultado:</label>
                <input type="text" name="resultado" value={exameData.resultado} onChange={handleExameChange} />
              </div>
              <div>
                <label>Observações:</label>
                <textarea name="observacoes" value={exameData.observacoes} onChange={handleExameChange} />
              </div>
              <button type="submit" className='btn'>Adicionar Exame</button>
            </form>
          </div>
        </div>
      )}
      {showDeleteConfirm && (
        <div className="modal">
          <div className="modal-content">
            <figure id='figure-atencao'><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="#f39c12" d="M12 3c-.985-.1-1.715.7-2.031 1.6C7.363 9.8 4.759 15 2.156 20.2c-.618 1.3.58 2.9 2 2.8h15.688c1.42.1 2.618-1.5 2-2.8C19.24 15 16.637 9.8 14.031 4.6 13.715 3.7 12.985 2.9 12 3z"/><path fill="#f1c40f" d="M12 2c-.985-.037-1.715.768-2.031 1.625L2.156 19.25c-.618 1.307.58 2.919 2 2.75 2.61-.003 5.234-.001 7.844 0 2.61-.001 5.234-.003 7.844 0 1.42.169 2.618-1.443 2-2.75L14.031 3.625C13.715 2.768 12.985 1.963 12 2z"/><path fill="#34495e" d="M12 8a1 1 0 0 0-1 1l.5 7h1l.5-7a1 1 0 0 0-1-1zm0 9a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/></svg></figure>
            <h4 className='msg-deletar'>Tem certeza que deseja deletar os dados do paciente?</h4>
            <button onClick={handleDeletePaciente} className='btn btn-dark'>Deletar paciente</button>
            <button onClick={() => setShowDeleteConfirm(false)} className="btn btn-claro">Voltar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PacienteDetalhes;
