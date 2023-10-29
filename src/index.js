const express = require("express");
const app = express();
const roteador = require("./rotas");

// Middleware para analisar o corpo das solicitações como JSON
app.use(express.json());
app.use(roteador);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
})
