const db = require("../models");
const Vaga = db.vaga;
const Op = db.Sequelize.Op;

// Criar uma nova vaga
exports.create = (req, res) => {
  if (!req.body.vagatitulo) {
    res.status(400).send({
      message: "Título é obrigatório"
    });
    return;
  }

  const vaga = {
    vagatitulo: req.body.vagatitulo,
    vagadesc: req.body.vagadesc,
    vagarequisitos: req.body.vagarequisitos,
    vagastatus: req.body.vagastatus,
    projetoId: req.body.projetoId
  };

  Vaga.create(vaga)
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Erro ao criar vaga",
      });
    });
};

// Buscar todos as vagas
exports.findAll = (req, res) => {
  const nome = req.query.nome;
  const condition = nome ? { vagatitulo: { [Op.iLike]: `%${nome}%` } } : null;

  Vaga.findAll({ where: condition })
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Erro ao buscar vagas",
      })
    );
};

// Buscar um único projeto por ID
exports.findOne = (req, res) => {
  const id = req.params.id;

  Vaga.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Não foi possível encontrar vaga com id ${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Erro ao buscar vaga com id ${id}`,
      });
    });
};

// Atualizar uma vaga por ID
exports.update = (req, res) => {
  const id = req.params.id;

  Vaga.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Vaga atualizado com sucesso" });
      } else {
        res.send({
          message: `Não foi possível atualizar a vaga com id ${id}. Talvez a vaga não tenha sido encontrado ou req.body esteja vazio`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Erro ao atualizar a vaga com id ${id}`,
      });
    });
};

// Deletar uma vaga por ID
exports.delete = (req, res) => {
  const id = req.params.id;

  Vaga.destroy({ where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Vaga deletada com sucesso!" });
      } else {
        res.send({
          message: `Não foi possível deletar a vaga com id ${id}. Talvez a vaga não tenha sido encontrado`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erro ao deletar vaga com id=" + id,
      });
    });
};

// Deletar todos os projetos
exports.deleteAll = (req, res) => {
  Vaga.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} vagas foram deletadas com sucesso` });
    })
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Erro ao deletar vagas",
      })
    );
};
