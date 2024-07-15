const User = require("../models/User");
const Agendamento = require("../models/Agendamento");
const Paciente = require("../models/Paciente");
const { default: mongoose } = require("mongoose");

// pega todos os agendamentos
const getAllAgend = async (req, res) => {
  try {
    const agendamentos = await Agendamento.find({})
      .populate('pacienteId', 'nome')
      .sort({ createdAt: -1 });

    res.status(200).json(agendamentos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAgendamentos = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Usuário não autenticado" });
  }

  const userId = req.user._id;

  try {
    const agendamentos = await Agendamento.find({ userId })
      .populate('pacienteId', 'nome')
      .sort({ createdAt: -1 });

    res.status(200).json(agendamentos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// pega um agendamento
const getAgendamento = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "ID de agendamento inválido" });
  }

  try {
    const agendamento = await Agendamento.findById(id)
      .populate('pacienteId', 'nome');

    if (!agendamento) {
      return res.status(404).json({ error: "O agendamento não foi encontrado" });
    }

    res.status(200).json(agendamento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// criar novo agendamento
const createAgendamento = async (req, res) => {
  const { title, start, end, description, tipo, pacienteId } = req.body;
  
  if (!req.user) {
    return res.status(401).json({ error: "Usuário não autenticado" });
  }

  const user = req.user;

  let emptyFields = [];
  if (!title) emptyFields.push("title");
  if (!start) emptyFields.push("start");
  if (!end) emptyFields.push("end");

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: "Por favor, preencha todos os dados", emptyFields });
  }

  try {
    const agendamentoData = {
      title,
      start,
      end,
      description,
      tipo, 
      userId: user._id,
      userName: user.name,
    };

    if (pacienteId && mongoose.Types.ObjectId.isValid(pacienteId)) {
      const paciente = await Paciente.findById(pacienteId);
      if (!paciente) {
        return res.status(404).json({ error: "Paciente não encontrado" });
      }
      agendamentoData.pacienteId = pacienteId;
    }

    let agendamento = await Agendamento.create(agendamentoData);
    if (pacienteId) {
      agendamento = await agendamento.populate('pacienteId', 'nome').execPopulate();
    }

    res.status(200).json({ result: agendamento, status: "success" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// deleta um agendamento
const deleteAgendamento = async (req, res) => {
  const { id } = req.params;
   //const { id } = req.query;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "ID de agendamento inválido" });
  }

  try {
    const agendamento = await Agendamento.findOneAndDelete({ _id: id });

    if (!agendamento) {
      return res.status(404).json({ error: "O agendamento não foi encontrado" });
    }

    res.status(200).json("Agendamento deletado com sucesso");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// atualizar/mudar infos do agendamento
const updateAgendamento = async (req, res) => {
  const { id } = req.params;
   //const { id } = req.query;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "ID de agendamento inválido" });
  }

  try {
    const agendamento = await Agendamento.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true } // p retornar o documento atualizado
    );

    if (!agendamento) {
      return res.status(404).json({ error: "O agendamento não foi encontrado" });
    }

    res.status(200).json(agendamento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// associar um paciente a um agendamento
const associatePacienteToAgendamento = async (req, res) => {
  const { agendamentoId, pacienteId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(agendamentoId) || !mongoose.Types.ObjectId.isValid(pacienteId)) {
    return res.status(400).json({ error: "ID de agendamento ou paciente inválido" });
  }

  try {
    const paciente = await Paciente.findById(pacienteId);
    if (!paciente) {
      return res.status(404).json({ error: "Paciente não encontrado" });
    }

    const agendamento = await Agendamento.findByIdAndUpdate(
      agendamentoId,
      { pacienteId },
      { new: true }
    ).populate('pacienteId', 'nome');

    if (!agendamento) {
      return res.status(404).json({ error: "Agendamento não encontrado" });
    }

    res.status(200).json({ result: agendamento, status: "success" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = {
  getAllAgend,
  getAgendamentos,
  getAgendamento,
  createAgendamento,
  deleteAgendamento,
  updateAgendamento,
  associatePacienteToAgendamento,
};
