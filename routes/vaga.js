module.exports = (app) => {
    const vaga = require("../controller/vaga.js");
    var router = require("express").Router();
  
    // Rota para criar um usuário
    router.post("/", vaga.create);
    // Rota que retorna todos os usuários
    router.get("/", vaga.findAll);
    // Rota que retorna um usuário pelo id
    router.get("/:id", vaga.findOne);
    // Rota que atualiza um usuário pelo id
    router.put("/:id", vaga.update);
    // Rota para deletar um usuário pelo id
    router.delete("/:id", vaga.delete);
    // Rota para deletar todos os usuários
    router.delete("/", vaga.deleteAll);
  
    // A linha abaixo informa que todas essas rotas são encontradas após o /vagas.
    app.use("/vagas", router);
  };
  