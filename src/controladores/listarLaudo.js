const bancoDeDados = require("../bancoDeDados");

const listarLaudo = async (req, res) => {
  const { identificador_consulta, senha } = req.query;

  // Verificar se o identificador da consulta passado na URL é válido
  if (
    !identificador_consulta ||
    identificador_consulta <= 0 ||
    !senha
  ) {
    return res.status(401).json({ message: "Identificador e/ou senha inválidos" });
  }

  // Encontrar a consulta para mostrar o laudo e informações
  const laudoBuscado = bancoDeDados.consultasFinalizadas.find(
    (consulta) => consulta.consulta.identificadorConsulta === parseInt(identificador_consulta)
  );

  if (!laudoBuscado) {
    return res.status(400).json({ message: "Consulta não encontrada" });
  }

  if (senha !== laudoBuscado.consulta.paciente.senha) {
    return res.status(401).json({ message: "Senha incorreta" });
  }

  return res.status(200).json(bancoDeDados.laudos);
};

module.exports = {
  listarLaudo,
};
