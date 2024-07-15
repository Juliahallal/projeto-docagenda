const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
  getAllPacient,
  getPacientes,
  getPaciente,
  createPaciente,
  deletePaciente,
  updatePaciente,
  searchPaciente,
  addExame,
  downloadAnexo,
  getExame,
  deleteExame,
} = require('../controllers/PacienteController');
const {
  pacienteCreateValidation,
  pacienteUpdateValidation,
} = require('../middlewares/pacienteValidations');
const validate = require('../middlewares/handleValidations');
const authGuard = require("../middlewares/authGuard");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`); 
  }
});

const upload = multer({ storage: storage });

// criar um novo paciente
router.post('/', authGuard, pacienteCreateValidation(), validate, createPaciente);

router.get('/search', authGuard, searchPaciente);

// pegar todos os pacientes
router.get('/', authGuard, getPacientes);

router.get('/admin/todos', getAllPacient);

// pegar um paciente específico
router.get('/:id', getPaciente);

// deletar um paciente
router.delete('/:id', deletePaciente);

// atualizar um paciente
router.put('/:id', pacienteUpdateValidation(), validate, updatePaciente);

// adicionar um exame a um paciente com upload de anexo
router.post('/:id/exames', authGuard, upload.single('anexo'), addExame);

// excluir um exame de um paciente
router.delete('/:id/exames/:exameId', authGuard, deleteExame);

// baixar um anexo de exame
router.get('/:id/exames/:exameId/download', authGuard, downloadAnexo);

// visualizar um anexo de exame
router.get('/:id/exames/:exameId/view', authGuard, getExame);

module.exports = router;
