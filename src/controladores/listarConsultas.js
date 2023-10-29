const bancoDeDados = require("../bancoDeDados");

const listarConsultas = async (req, res) => {
  const { cnes_consultorio, senha_consultorio } = req.query;
  const consultas = bancoDeDados.consultas;

  // Verificar se os campos cnes e senha foram passados na requisição
  if (
    cnes_consultorio === bancoDeDados.consultorio.cnes &&
    senha_consultorio === bancoDeDados.consultorio.senha
  ) {
    if (consultas.length > 0) {
      return res.status(200).json(consultas);
    }
  } else {
    return res.status(401).json({ message: "Cnes e/ou senha inválidos" });
  }
  if (consultas.length === 0) {
    return res.status(200).json({ message: "nenhuma consulta cadastrada" });
  }

};

module.exports = {
  listarConsultas,
};
