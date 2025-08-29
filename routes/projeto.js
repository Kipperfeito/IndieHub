module.exports = (app) => {
    const projeto = require("../controller/projeto.js");
    var router = require("express").Router();
  
    // Rota para criar um usuário
    router.post("/", projeto.create);
    // Rota que retorna todos os usuários
    router.get("/", projeto.findAll);
    // Rota que retorna um usuário pelo id
    router.get("/:id", projeto.findOne);
    // Rota que atualiza um usuário pelo id
    router.put("/:id", projeto.update);
    // Rota para deletar um usuário pelo id
    router.delete("/:id", projeto.delete);
    // Rota para deletar todos os usuários
    router.delete("/", projeto.deleteAll);
  
    // A linha abaixo informa que todas essas rotas são encontradas após o /projetos.
    app.use("/projetos", router);
  };
  