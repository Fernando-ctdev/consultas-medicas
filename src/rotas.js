const express = require("express");
const roteador = express.Router();

const { listarConsultas } = require("./controladores/listarConsultas");
const { criarConsultas } = require("./controladores/criarConsulta");
const { atualizarConsulta } = require("./controladores/atualizarConsulta");
const { cancelarConsulta } = require("./controladores/cancelarConsulta");
const { finalizarConsulta } = require("./controladores/finalizarConsulta");
const { listarLaudo } = require("./controladores/listarLaudo");
const { consultasAtendidas } = require("./controladores/consultasAtendidas");

roteador.get("/consultas", listarConsultas);
roteador.post("/consulta", criarConsultas);	
roteador.put("/consulta/:identificadorConsulta/paciente", atualizarConsulta);
roteador.delete("/consulta/:identificadorConsulta", cancelarConsulta);
roteador.post("/consulta/finalizar", finalizarConsulta);
roteador.get("/consulta/laudo", listarLaudo);
roteador.get("/consultas/medico", consultasAtendidas)

module.exports = roteador;