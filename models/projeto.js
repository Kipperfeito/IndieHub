module.exports = (sequelize, Sequelize) => {
    const Projeto = sequelize.define(
      "projeto",
      {
        projtitulo: { type: Sequelize.STRING },
        projdesc: { type: Sequelize.STRING },
        projdatapublicacao: { type: Sequelize.DATEONLY },
        projestagioatual: { type: Sequelize.STRING },
        projmodelonegocio: { type: Sequelize.STRING },
        projplataforma: { type: Sequelize.STRING },
        ownerId: { type: Sequelize.INTEGER }
      },
      { freezeTableName: true }
    );
    return Projeto;
  };