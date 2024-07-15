import { api, requestConfig } from "../utils/config";

// função para obter o token do usuário logado
const getAuthToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.token;
};

// pega todos os pacientes
const getPacientes = async () => {
  const token = getAuthToken();
  const config = requestConfig("GET", null, token);

  try {
    const res = await fetch(api + "/paciente", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// pega um paciente por id
const getPaciente = async (id) => {
  const config = requestConfig("GET");

  try {
    const res = await fetch(api + "/paciente/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// cria novo paciente
const createPaciente = async (data) => {
  const token = getAuthToken();
  const config = requestConfig("POST", data, token);

  try {
    const res = await fetch(api + "/paciente", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// update do paciente por id
const updatePaciente = async (id, data) => {
  const config = requestConfig("PUT", data);

  try {
    const res = await fetch(api + "/paciente/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// deleta paciente por id
const deletePaciente = async (id) => {
  const config = requestConfig("DELETE");

  try {
    const res = await fetch(api + "/paciente/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};


// busca pelos pacientes
const searchPaciente = async (query) => {
  const token = getAuthToken();
  const config = requestConfig("GET", null, token);

  try {
    const res = await fetch(api + `/paciente/search?q=${query}`, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// adiciona exame pro paciente
const addExame = async (id, data) => {
  const token = getAuthToken();

  const config = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
  };

  try {
    const res = await fetch(api + `/paciente/${id}/exames`, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// baixa o anexo do exame
const downloadAnexo = async (pacienteId, exameId) => {
  const token = getAuthToken();
  const config = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const res = await fetch(api + `/paciente/${pacienteId}/exames/${exameId}/download`, config)
      .then((res) => res.blob())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// visualiza o anexo
const viewAnexo = async (pacienteId, exameId) => {
  const token = getAuthToken();
  const config = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const res = await fetch(api + `/paciente/${pacienteId}/exames/${exameId}/view`, config)
      .then((res) => res.blob())
      .then((blob) => {
        // cria uma url pro o blob e retorna
        return URL.createObjectURL(blob);
      })
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// deleta exame
const deleteExame = async (pacienteId, exameId) => {
  const token = getAuthToken();
  const config = requestConfig("DELETE", null, token);

  try {
    const res = await fetch(api + `/paciente/${pacienteId}/exames/${exameId}`, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};


const pacienteService = {
  getPacientes,
  getPaciente,
  createPaciente,
  updatePaciente,
  deletePaciente,
  searchPaciente,
  addExame,
  downloadAnexo,
  viewAnexo,
  deleteExame,
};

export default pacienteService;
