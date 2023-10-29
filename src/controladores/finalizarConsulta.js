const bancoDeDados = require("../bancoDeDados");

const finalizarConsulta = async (req, res) => {
  const { identificadorConsulta, laudoMedico } = req.body;

  // Verificar se foi passado todos os campos no body da requisição
  if (!identificadorConsulta || !laudoMedico) {
    return res.status(400).json({
      message: "Todos os campos devem ser preenchidos",
    });
  }

  // Verificar se o identificador da consulta passado no body é válido
  const idConsulta = parseInt(identificadorConsulta);
  if (
    isNaN(idConsulta) ||
    idConsulta <= 0 || 
    idConsulta > bancoDeDados.todasAsConsultas.length
  ) {
    return res.status(400).json({
      mensagem: "Identificador da consulta inválido",
    });
  }

  // Encontrar o índice da consulta a ser finalizada no array
  const indexConsultaParaFinalizar = bancoDeDados.consultas.findIndex(
    (consulta) => consulta.identificadorConsulta === idConsulta
  );
  if (indexConsultaParaFinalizar === -1) {
    return res.status(400).json({
      mensagem: "A consulta não foi encontrada",
    });
  }

  // Validar se a consulta não está finalizada
  const consulta =
    bancoDeDados.consultasFinalizadas.includes(bancoDeDados.consultas[indexConsultaParaFinalizar]);
  if (consulta) {
    return res.status(400).json({
      mensagem: "Esta consulta já foi finalizada",
    });
  }

  // Verificar o tamanho do laudo médico se maior ou igual a 200 caracteres
  if (laudoMedico.length >= 200) {
    return res.status(400).json({
      mensagem: "O laudo médico precisa ter pelo menos 200 caracteres",
    });
  }

  // Atualizar a propriedade finalizada para true
  bancoDeDados.consultas[indexConsultaParaFinalizar].finalizada = true;

  // Armazenar a consulta finalizada no banco de dados
  bancoDeDados.consultasFinalizadas.push({
    consulta: bancoDeDados.consultas[indexConsultaParaFinalizar]
  });

  // Agora, armazene as informações do laudo no banco de dados
  bancoDeDados.laudos.push({
    dadosDaConsulta: bancoDeDados.consultas[indexConsultaParaFinalizar],
    laudoMedico: laudoMedico
    })
 
  //Remover a consulta da lista de consultas usando o índice correto
  bancoDeDados.consultas.splice(indexConsultaParaFinalizar, 1);

 
  return res.status(200).json();
};

module.exports = {
  finalizarConsulta 
};
