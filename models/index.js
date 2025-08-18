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
db.usuario.hasMany(db.projeto);
db.projeto.belongsTo(db.usuario);

db.projeto.hasMany(db.vaga, {foreignKey: {allowNull: false}});
db.vaga.belongsTo(db.projeto);

module.exports = db;