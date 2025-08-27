const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  config
);
const db = {};

db.Sequelize = Sequelize;

db.sequelize = sequelize;

db.projeto = require("./projeto.js")(sequelize, Sequelize);
db.usuario = require("./usuario.js")(sequelize, Sequelize);
db.vaga = require("./vaga.js")(sequelize, Sequelize);

//Relacionamento 1:*
Usuario.hasMany(Projeto, { foreignKey: "ownerId", as: "projetos" });
Projeto.belongsTo(Usuario, { foreignKey: "ownerId", as: "owner" });

// Colaboradores (N:N)
Projeto.belongsToMany(Usuario, {
  through: "usuario_projeto",
  foreignKey: "projetoId",
  otherKey: "usuarioId",
  as: "colaboradores"
});
Usuario.belongsToMany(Projeto, {
  through: "usuario_projeto",
  foreignKey: "usuarioId",
  otherKey: "projetoId",
  as: "projetosColaborando"
});

db.projeto.hasMany(db.vaga, {foreignKey: {allowNull: false}});
db.vaga.belongsTo(db.projeto);

module.exports = db;