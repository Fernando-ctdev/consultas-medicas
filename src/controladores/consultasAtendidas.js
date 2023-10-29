const bancoDeDados = require("../bancoDeDados");

const consultasAtendidas = async (req, res) => {
  const { identificador_medico } = req.query;

  if (!identificador_medico || identificador_medico <= 0) {
    return res.status(400).json({ message: "Identificador do médico inválido" });
  }
  //encontrar o medico
  const medicoId = parseInt(identificador_medico);
  const medico = bancoDeDados.consultorio.medicos.find(
    (medico) => medico.identificador === medicoId
  );
  if (!medico) {
    return res.status(400).json({ message: "Médico não encontrado" });
  };

  const consultasAtendidas = bancoDeDados.consultasFinalizadas.filter(
    (consulta) =>
      consulta.consulta.identificadorEspecialista === medicoId
  );
  if (consultasAtendidas.length === 0) {
    return res.status(400).json({ message: "Nenhuma consulta encontrada" });
  }

  return res.status(200).json(consultasAtendidas);
};

module.exports = {
  consultasAtendidas
}