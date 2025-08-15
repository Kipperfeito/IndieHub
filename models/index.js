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

/*
//Relacionamento 1:1 entre Usuario e Loja
db.personagem.hasOne(db.atributo);
db.atributo.belongsTo(db.personagem);

//Relacionamento 1:* entre Loja e Produto
db.usuario.hasMany(db.personagem);
db.personagem.belongsTo(db.usuario);
*/
module.exports = db;