module.exports = (app) => {
    const usuario = require("../controller/usuario.js");
    var router = require("express").Router();

    const multer = require("multer");
    const fs = require("fs");
    var path = require("path");

    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "uploads/usuario");
      },
      filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
      }
    });
    const upload = multer({
      storage: storage,
    });

    router.post("/upload/", upload.single("file"), async (req, res) => {
      res.send({
        upload: true,
        file: req.file
      });
    });
    router.get("/upload/:arquivo", (req, res) => {
      const arquivo = path.dirname(__dirname)
      + `/uploads/loja/${req.params.arquivo}`;
      fs.readFile(arquivo, function (err, data) {
        res.contentType("png");
        res.send(data);
      });
    });
    //router.post("/login", usuario.login);
    // Rota para criar um usuário
    router.post("/", usuario.create);
    // Rota que retorna todos os usuários
    router.get("/", usuario.findAll);
    // Rota que retorna um usuário pelo id
    router.get("/:id", usuario.findOne);
    // Rota que atualiza um usuário pelo id
    router.put("/:id", usuario.update);
    // Rota para deletar um usuário pelo id
    router.delete("/:id", usuario.delete);
    // Rota para deletar todos os usuários
    router.delete("/", usuario.deleteAll);
  
    // A linha abaixo informa que todas essas rotas são encontradas após o /usuarios.
    app.use("/usuarios", router);
  };
  