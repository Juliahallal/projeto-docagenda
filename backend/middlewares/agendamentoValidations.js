const { body } = require("express-validator");

const agendamentoCreateValidation = () => {
  return [
    body("title")
      .isString()
      .withMessage("O título é obrigatório.")
      .isLength({ min: 3 })
      .withMessage("O título precisa ter no mínimo 3 caracteres."),
    body("start")
      .isISO8601()
      .toDate()
      .withMessage("A data de início é obrigatória e deve estar no formato ISO8601."),
    body("end")
      .isISO8601()
      .toDate()
      .withMessage("A data de término é obrigatória e deve estar no formato ISO8601."),
    body("description")
      .optional()
      .isString()
      .withMessage("A descrição deve ser uma string."),
    body("tipo")
      .optional()
      .isString()
      .withMessage("O tipo deve ser uma string."),
    body("pacienteId")
      .optional()
      .isMongoId()
      .withMessage("O ID do paciente deve ser um ID MongoDB válido."),
  ];
};
const agendamentoUpdateValidation = () => {
  return [
    body("title")
      .optional()
      .isString()
      .withMessage("O título deve ser uma string.")
      .isLength({ min: 3 })
      .withMessage("O título precisa ter no mínimo 3 caracteres."),
    body("start")
      .optional()
      .isISO8601()
      .toDate()
      .withMessage("A data de início deve estar no formato ISO8601."),
    body("end")
      .optional()
      .isISO8601()
      .toDate()
      .withMessage("A data de término deve estar no formato ISO8601."),
    body("description")
      .optional()
      .isString()
      .withMessage("A descrição deve ser uma string."),
    body("tipo")
      .optional()
      .isString()
      .withMessage("O tipo deve ser uma string."),
    body("pacienteId")
      .optional()
      .isMongoId()
      .withMessage("O ID do paciente deve ser um ID MongoDB válido."),
  ];
};

module.exports = {
  agendamentoCreateValidation,
  agendamentoUpdateValidation,
};
