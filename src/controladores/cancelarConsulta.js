const bancoDeDados = require("../bancoDeDados");

const cancelarConsulta = async (req, res) => {
  const { identificadorConsulta } = req.params;

  // Verificar se o identificador da consulta passado na URL é válido
  const idConsulta = parseInt(identificadorConsulta);
  if (
    isNaN(idConsulta) ||
    idConsulta <= 0 ||
    idConsulta > bancoDeDados.consultas.length
  ) {
    return res.status(400).json({
      mensagem: "Identificador da consulta inválido",
    });
  }

  // Validar se a consulta não está finalizada
  const consulta =
    bancoDeDados.consultasFinalizadas.includes(idConsulta);
  if (consulta) {
    return res.status(400).json({
      mensagem: "A consulta só pode ser removida se a mesma não estiver finalizada",
    });
  }

  // Encontrar a consulta a ser cancelada e removida
  const consultaParaCancelar = bancoDeDados.consultas.findIndex(
    (consulta) => consulta.identificadorConsulta === idConsulta
  );
  if (consultaParaCancelar === -1) {
    return res.status(400).json({
      mensagem: "A consulta não foi encontrada",
    });
  }
  if (consultaParaCancelar !== -1) {
    bancoDeDados.consultas.splice(consultaParaCancelar, 1);
  }

  return res.status(200).json();
};

module.exports = {
  cancelarConsulta,
};
