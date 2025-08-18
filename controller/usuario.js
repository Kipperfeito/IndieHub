const db = require("../models");
const Usuario = db.usuario;
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secretKey = "indie_secret_key";

// Criar um novo usuário
exports.create = (req, res) => {
  if (!req.body.usunome || !req.body.usuemail || !req.body.ususenha) {
    res.status(400).send({
      message: "Conteúdo não pode estar vazio",
    });
    return;
  }
  const usuario = {
    usunome: req.body.usunome,
    usuemail: req.body.usuemail,
    usudatanascimento: req.body.usudatanascimento,
    ususenha: bcrypt.hashSync(req.body.ususenha, 10),
    usutipo: req.body.usutipo || "noDev", 
    usutags: req.body.usutags || null,
    usuproficiencia: req.body.usuproficiencia,
    usudisponibilidade: req.body.usudisponibilidade || null,
    usuportifolio: req.body.usuportifolio || null,
    usufoto: req.body.usufoto || null
  };

  Usuario.create(usuario)
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Erro ao criar usuário",
      });
    });
};

exports.login = (req, res) => {
  Usuario.findOne({
    where: {
      usuemail: req.body.usuemail,
    },
  })
    .then((usuario) => {
      if (!usuario) {
        return res.status(404).send({ message: "Usuário não encontrado." });
      }
      var passwordIsValid = bcrypt.compareSync(req.body.ususenha, usuario.ususenha);
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Senha inválida!",
        });
      }
      var token = jwt.sign({ id: usuario.id }, secretKey, { expiresIn: "1h" });
      res.status(200).send({ usuario: usuario, accessToken: token });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

// Buscar todos os usuários
exports.findAll = (req, res) => {
  const nome = req.query.nome;
  const condition = nome ? { usunome: { [Op.iLike]: `%${nome}%` } } : null;

  Usuario.findAll({ where: condition })
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Erro ao buscar usuários",
      })
    );
};

// Buscar um único usuário por email
exports.findOne = (req, res) => {
  const id = req.params.id;

  Usuario.findOne({ where: { id: id } })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Não foi possível encontrar usuário com id ${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Erro ao buscar usuário com id ${id}`,
      });
    });
};

// Atualizar um usuário
exports.update = (req, res) => {
  const id = req.params.id;

  Usuario.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Usuário atualizado com sucesso" });
      } else {
        res.send({
          message: `Não foi possível atualizar o usuário com id ${id}. Talvez o usuário não tenha sido encontrado ou req.body esteja vazio`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Erro ao atualizar o usuário com id ${id}`,
      });
    });
};

// Deletar um usuário
exports.delete = (req, res) => {
  const id = req.params.id;

  Usuario.destroy({ where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Usuário deletado com sucesso!" });
      } else {
        res.send({
          message: `Não foi possível deletar o usuário com id ${id}. O usuário não foi encontrado`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erro ao deletar usuário com id=" + id,
      });
    });
};

// Deletar todos os usuários
exports.deleteAll = (req, res) => {
  Usuario.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} usuários foram deletados com sucesso` });
    })
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Erro ao deletar usuários",
      })
    );
};
