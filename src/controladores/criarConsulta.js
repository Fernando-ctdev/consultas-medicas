const bancoDeDados = require("../bancoDeDados");

//controlador para criar consultas com o verbo post na rota /consulta

const criarConsultas = async (req, res) => {
  const { tipoConsulta, valorConsulta, paciente } = req.body;

  const tipoConsultaMaiuscula = tipoConsulta.toUpperCase();

  //Verificar se todos os campos foram informados (todos são obrigatórios)
  if (
    !tipoConsulta ||
    !valorConsulta ||
    !paciente.nome ||
    !paciente.cpf ||
    !paciente.dataNascimento ||
    !paciente.celular ||
    !paciente.email ||
    !paciente.senha
  ) {
    return res.status(400).json({
      message: "todos os campos devem ser preenchidos",
    });
  }
  //validação se o tipo da consulta é um número
  if (valorConsulta !== Number(valorConsulta)) {
    return res.status(400).json({
      message: "O valor da consulta precisa ser um número",
    });
  }

  //validação se o paciente já tem uma consulta que não foi finalizada pelo cpf
  const existePaciente = bancoDeDados.consultas.some(
    (consulta) => consulta.paciente.cpf === paciente.cpf
  );
  if (existePaciente) {
    return res.status(400).json({
      message: "Paciente possui uma consulta cadastrada, ainda não finalizada",
    });
  }

  //Validar se o tipo da consulta informado consta nas especialidade dos médicos na base
  const medicoEspecialista = bancoDeDados.consultorio.medicos.find(
    (medico) => medico.especialidade === tipoConsultaMaiuscula
  );

  if (!medicoEspecialista) {
    return res.status(400).json({
      message: "Tipo de consulta inválido",
    });
  }

  // Gerar um novo identificador único
  let novoIdentificador = bancoDeDados.todasAsConsultas.length + 1;

  // Armazenar a nova consulta no banco de dados todasAsConsultas
  bancoDeDados.todasAsConsultas.push({
    identificador: novoIdentificador,
  });

  bancoDeDados.consultas.push({
    identificadorConsulta: novoIdentificador,
    tipoConsulta: tipoConsultaMaiuscula,
    identificadorEspecialista: medicoEspecialista.identificador,
    finalizada: false,
    valorConsulta: valorConsulta,
    paciente: {
      nome: paciente.nome,
      cpf: paciente.cpf,
      dataNascimento: paciente.dataNascimento,
      celular: paciente.celular,
      email: paciente.email,
      senha: paciente.senha,
    },
  });

  return res.status(201).json();
};

module.exports = {
  criarConsultas,
};
