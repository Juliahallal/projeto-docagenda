const express = require('express');
const router = express.Router();
const {
  getAllAgend,
  getAgendamentos,
  getAgendamento,
  createAgendamento,
  deleteAgendamento,
  updateAgendamento,
  associatePacienteToAgendamento,
} = require('../controllers/AgendamentoController');
const {
  agendamentoCreateValidation,
  agendamentoUpdateValidation,
} = require('../middlewares/agendamentoValidations');
const validate = require('../middlewares/handleValidations');
const authGuard = require("../middlewares/authGuard");

// criar um novo agendamento
router.post('/',authGuard, agendamentoCreateValidation(), validate, createAgendamento);

// pegar todos os agendamentos
router.get('/', authGuard, getAgendamentos);

router.get('/admin/todos', getAllAgend);

// pegar um agendamento específico
router.get('/:id', getAgendamento);

// deletar um agendamento
router.delete('/:id', deleteAgendamento);

// atualizar um agendamento
router.put('/:id', agendamentoUpdateValidation(), validate, updateAgendamento);

// associar um paciente a um agendamento
router.patch('/:agendamentoId/paciente/:pacienteId', associatePacienteToAgendamento);


module.exports = router;
