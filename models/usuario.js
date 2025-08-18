module.exports = (sequelize, Sequelize) => {
    const Usuario = sequelize.define(
      "usuario",
      {
        usunome: { type: Sequelize.STRING },
        usuemail: { type: Sequelize.STRING },
        usudatanascimento: { type: Sequelize.DATEONLY },
        ususenha: { type: Sequelize.STRING },
        usutipo: { type: Sequelize.STRING },
        usutags: { type: Sequelize.STRING },
        usuproficiencia: { type: Sequelize.STRING },
        usudisponibilidade: { type: Sequelize.STRING },
        usuportifolio: { type: Sequelize.STRING },
        usufoto: {type: Sequelize.BLOB}
      },
      { freezeTableName: true }
    );
    return Usuario;
  };