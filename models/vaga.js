module.exports = (sequelize, Sequelize) => {
    const Vaga = sequelize.define(
      "vaga",
      {
        vagatitulo: { type: Sequelize.STRING },
        vagadesc: { type: Sequelize.STRING },
        vagarequisitos: { type: Sequelize.STRING },
        vagastatus: { type: Sequelize.ENUM("Aberta", "Fechada"), defaultValue: "Aberta" },
      },
      { freezeTableName: true }
    );
    return Vaga;
  };