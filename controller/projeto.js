const db = require("../models");
const Projeto = db.projeto;
const Usuario = db.usuario;
const Op = db.Sequelize.Op;

// Criar um novo projeto
exports.create = (req, res) => {
  if (!req.body.projtitulo && !req.body.ownerId) {
    res.status(400).send({
      message: "Título é obrigatório"
    });
    return;
  }

  const projeto = {
    projtitulo: req.body.projtitulo,
    projdesc: req.body.projdesc,
    projdatapublicacao: req.body.projdatapublicacao,
    projestagioatual: req.body.projestagioatual,
    projmodelonegocio: req.body.projmodelonegocio,
    projplataforma: req.body.projplataforma,
    ownerId: req.body.ownerId
  };

  Projeto.create(projeto)
    .then((novoProjeto) => {
      if (req.body.colaboradores && req.body.colaboradores.length > 0) {
        return novoProjeto.setColaboradores(req.body.colaboradores)
          .then(() => res.send(novoProjeto));
      }
      res.send(novoProjeto)})
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Erro ao criar projeto",
      });
    });
    
};

// Buscar todos os projetos
exports.findAll = (req, res) => {
  const nome = req.query.nome;
  const condition = nome ? { projtitulo: { [Op.iLike]: `%${nome}%` } } : null;

  Projeto.findAll({ where: condition, include: [{model: Usuario, as: "owner"}, {model: Usuario, as: "colaboradores"}] })
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Erro ao buscar projetos",
      })
    );
};

// Buscar um único projeto por ID
exports.findOne = (req, res) => {
  const id = req.params.id;

  Projeto.findByPk(id, {include: [{model: Usuario, as: "owner"}, {model: Usuario, as: "colaboradores"}]})
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Não foi possível encontrar projeto com id ${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Erro ao buscar projeto com id ${id}`,
      });
    });
};

// Atualizar um projeto por ID
exports.update = (req, res) => {
  const id = req.params.id;

  Projeto.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Projeto atualizado com sucesso" });
      } else {
        res.send({
          message: `Não foi possível atualizar o projeto com id ${id}. Talvez o projeto não tenha sido encontrado ou req.body esteja vazio`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Erro ao atualizar o projeto com id ${id}`,
      });
    });
};

// Deletar um projeto por ID
exports.delete = (req, res) => {
  const id = req.params.id;

  Projeto.destroy({ where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Projeto deletado com sucesso!" });
      } else {
        res.send({
          message: `Não foi possível deletar o projeto com id ${id}. Talvez o projeto não tenha sido encontrado`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erro ao deletar projeto com id=" + id,
      });
    });
};

// Deletar todos os projetos
exports.deleteAll = (req, res) => {
  Projeto.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} projetos foram deletados com sucesso` });
    })
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Erro ao deletar projetos",
      })
    );
};
