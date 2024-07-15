const mongoose = require("mongoose");
const { Schema } = mongoose;

const exameSchema = new Schema({
  tipo: String,
  anexoId: String,
  resultado: String,
  observacoes: String
});

const pacienteSchema = new Schema({
    nome: { type: String, required: true },
    fone: String,
    endereco: String,
    prontuario: String, 
    remedio: String,
    comorbidade: String,
    exame: [exameSchema],
    userId: mongoose.ObjectId,
    userName: String,
  },{
    timestamps: true,
  }
);

const Paciente = mongoose.model("Paciente", pacienteSchema);

module.exports = Paciente;