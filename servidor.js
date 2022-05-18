let http = require('http');
let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require("mongoose");

let app = express();
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("./public"));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

let postSchema = new mongoose.Schema({
    dbtitulo: "String",
    dbresumo: "string",
    dbconteudo: "string"
});
let postModel = mongoose.model("Posts", postSchema);

mongoose.connect("mongodb://localhost/Blog");

app.get("/", function (req, resp){
    console.log("oi")
    postModel.find(function (erro, lista){
        resp.render("principal", {posts: lista});
    });
});

app.get("/criapost", function(req, resp){
    resp.render("formulario");
});

app.post("/criapost", function(req, resp){
    let titulo_servidor = req.body.titulo;
    let resumo_servidor = req.body.resumo;
    let conteudo_servidor = req.body.conteudo;

    let novo = new postModel({
        dbtitulo: titulo_servidor,
        dbresumo: resumo_servidor,
        dbconteudo: conteudo_servidor
    });
    novo.save();
    resp.render("mensagem")
});

let servidor = http.createServer(app);
servidor.listen(8080);

console.log("Servidor online!");