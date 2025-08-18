const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models");

const app = express();

var corsOptions = {
    origin:
    "Aqui informamos quais urls permitimos que sejam conectadas ao nosso backend. Quando tivermos um frontend, iremos alterar para a url do nosso frontend",
};
app.use(cors(corsOptions));
//parser de requisições com content type - application/json
app.use(express.json());
//parser de requisições com content type - application/x-www-form-urlencoded
// (forms enviando dados pelo método POST)

app.use(express.urlencoded({ extended: true }));

db.sequelize
    .sync({ alter: true })
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

app.get("/", function (req, res) {
    res.send("Desenvolvimento do TCC");
});

app.listen(8000, function (req, res) {
    console.log("App rodando na porta 8000");
});