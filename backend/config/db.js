const mongoose = require("mongoose");

const conn = async () => {
  try {
    const dbConn = await mongoose.connect(
      'mongodb://localhost:27017/docagenda',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Conectou ao banco de dados local!");

    return dbConn;
  } catch (error) {
    console.log("Erro ao conectar ao banco de dados local:", error);
  }
};

conn();

module.exports = conn;
