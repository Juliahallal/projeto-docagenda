require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");

const port = process.env.PORT || 3333;

const app = express();

// Configuração para receber resposta em JSON e em form data 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Problema de CORS: quando a gente executa as requisições de mesmo domínio local onde o React vai estar rodando
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Importa e executa a conexão com o banco de dados
require("./config/db.js");

app.get("/", (req, res) => {
  res.send("API funcionando!");
});

const router = require("./routes/Router.js");
app.use(router); 

app.listen(port, () => {
  console.log(`DocAgenda rodando na porta ${port}`);
});
