import { api, requestConfig } from "../utils/config";

// função para obter o token do usuário logado
const getAuthToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.token;
};

// pega todos agendamentos
const getAgendamentos = async () => {
  const token = getAuthToken();
  const config = requestConfig("GET", null, token);

  try {
    const res = await fetch(api + "/agendamento", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// pega agendamento por id
const getAgendamento = async (id) => {
  const config = requestConfig("GET");

  try {
    const res = await fetch(api + "/agendamento/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// cria novo agendamento
const createAgendamento = async (data) => {
  const token = getAuthToken();
  const config = requestConfig("POST", data, token);

  try {
    const res = await fetch(api + "/agendamento", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// update do agendamenot pelo id
const updateAgendamento = async (id, data) => {
  const config = requestConfig("PUT", data);

  try {
    const res = await fetch(api + "/agendamento/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// deleta agendamento por id
const deleteAgendamento = async (id) => {
  const config = requestConfig("DELETE");

  try {
    const res = await fetch(api + "/agendamento/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// associa agendamento a paciente
const associatePacienteToAgendamento = async (agendamentoId, pacienteId) => {
  const config = requestConfig("PATCH");

  try {
    const res = await fetch(api + `/agendamento/${agendamentoId}/paciente/${pacienteId}`, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const agendamentoService = {
  getAgendamentos,
  getAgendamento,
  createAgendamento,
  updateAgendamento,
  deleteAgendamento,
  associatePacienteToAgendamento,
};

export default agendamentoService;
