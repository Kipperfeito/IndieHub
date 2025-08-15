module.exports = (sequelize, Sequelize) => {
    const Projeto = sequelize.define(
      "projeto",
      {
        projtitulo: { type: Sequelize.STRING },
        projdesc: { type: Sequelize.STRING },
        projdatapublicacao: { type: Sequelize.DATEONLY },
        projestagioatual: { type: Sequelize.STRING },
        projmodelonegocio: { type: Sequelize.STRING },
        projplataformaalvo: { type: Sequelize.STRING },
        projcolaboradores: { type: Sequelize.STRING },
      },
      { freezeTableName: true }
    );
    return Projeto;
  };