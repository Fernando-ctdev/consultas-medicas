const bancoDeDados = require("../bancoDeDados");

const atualizarConsulta = async (req, res) => {
  const { identificadorConsulta } = req.params;
  const { nome, cpf, dataNascimento, celular, email, senha } = req.body;

  // Verificar se foi passado todos os campos no body da requisição
  if (!nome || !cpf || !dataNascimento || !celular || !email || !senha) {
    return res.status(400).json({
      message: "Todos os campos devem ser preenchidos",
    });
  }

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

  //validação se já existe outro registro com o mesmo CPF
  const existePacienteCpf = bancoDeDados.consultas.some(
    (consulta) => consulta.paciente.cpf === cpf
  );
  if (existePacienteCpf) {
    return res.status(400).json({
      message: "Já existe um registro com o mesmo CPF",
    });
  }

  //validação se já existe outro registro com o mesmo email
  const existePacienteEmail = bancoDeDados.consultas.some(
    (consulta) => consulta.paciente.email === email
  );
  if (existePacienteEmail) {
    return res.status(400).json({
      message: "Já existe um registro com o mesmo email",
    });
  }

  // Encontrar a consulta a ser atualizada
  const consultaParaAtualizar = bancoDeDados.consultas.find(
    (consulta) => consulta.identificadorConsulta === idConsulta
  )

  if (!consultaParaAtualizar) {
    return res.status(400).json({
      mensagem: "A consulta não foi encontrada",
    });
  }

  // Validar se a consulta não está finalizada
  const consulta =
    bancoDeDados.consultasFinalizadas.includes(consultaParaAtualizar);
  if (consulta) {
    return res.status(400).json({
      mensagem: "Esta consulta já foi finalizada",
    });
  }

  // Atualizar os dados da consulta com base no id passado na URL
  consultaParaAtualizar.paciente = {
    nome: nome,
    cpf: cpf,
    dataNascimento: dataNascimento,
    celular: celular,
    email: email,
    senha: senha,
  };
  return res.status(204).json();
};

module.exports = {
  atualizarConsulta,
};
