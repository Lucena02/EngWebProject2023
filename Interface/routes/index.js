var express = require('express');
var router = express.Router();
var axios = require("axios");
var jwt = require('jsonwebtoken')


const fs = require('fs');
const { verificaAcesso } = require('../../Auth/auth/auth');

function verificaToken(req, res, next){
  console.log("oiii")
  var myToken 
  if(req.query && req.query.token)
      myToken = req.query.token;
  else if(req.body && req.body.token) 
      myToken = req.body.token;
  else if(req.cookies && req.cookies.token)
      myToken = req.cookies.token
  else
      myToken = false;

  if(myToken){
      jwt.verify(myToken, "EngWeb2023RuasDeBraga", function(e, payload){
      if(e){
          res.status(401).jsonp({error: e})
      }
      else{
          next()
      }
    })
  }else{
      res.status(401).jsonp({error: "Token inexistente!!"})
    }
}


// Function to check if a file exists
function fileExists(filePath) {
  return fs.existsSync(filePath);
}

router.get('/map', function(req, res, next) {
  res.render('TesteAPIgoogle');
});

/* GET home page. */
router.get('/', function(req, res, next) {
  token = null
  if(req.cookies && req.cookies.token)
    token = req.cookies.token
  res.render('index', {t: token});
  token = null;
});


router.get('/rua', function(req, res, next) {
  token = null
  if(req.cookies && req.cookies.token)
    token = req.cookies.token
  axios.get("http://localhost:8000/ruas")
    .then(response => {
      res.render('ruasTodas', { data: response.data, t: token});
      token = null;
    })
    .catch(erro => {
      res.render("error", {message: "Erro ao obter pagina inicial", error : erro})
    })
});

router.get('/rua/register', function(req,res,next) {
  token = null
  if(req.cookies && req.cookies.token)
    token = req.cookies.token
  res.render('addRua', {t: token});
  token = null;
})

router.post('/rua/register', function(req, res, next) {
  let para = {refs: {}, texto: req.body.texto }
  delete req.body.texto
  req.body.paragrafos = [para]
  let pos = {latitude: req.body.latitude, longitude: req.body.longitude}
  delete req.body.latitude
  delete req.body.longitude
  req.body.pos = pos
  axios.post("http://localhost:8000/ruas", req.body)
    .then(response => {
        res.redirect('/rua');
    })
    .catch(erro => {
      res.render("error", {message: "erro ao adicionar uma rua", error : erro})
    })
});


router.get('/rua/:id', function(req, res, next) {
  token = null
  if(req.cookies && req.cookies.token)
    token = req.cookies.token
  axios.get("http://localhost:8000/ruas/" + req.params.id)
    .then(response => {
        res.render('infoCasas', { data: response.data, t: token});
        token = null;
    })
    .catch(erro => {
      res.render("error", {message: "erro ao obter a pagina da rua", error : erro})
    })
});

// Publicar Comentário
router.post('/rua/:id', verificaToken, function(req, res, next) {
  axios.post("http://localhost:8000/ruas/post/" + req.params.id, req.body)
    .then(response => {
        res.redirect("/rua/" + req.params.id);
    })
    .catch(erro => {
      res.render("error", {message: "erro ao publicar comentário na rua", error : erro})
    })
});


// Registar uma casa (GET)
router.get('/rua/:id/regCasa', verificaToken, function(req,res,next) {
  token = null
  if(req.cookies && req.cookies.token)
    token = req.cookies.token
  res.render('addCasa', {t:token});
  token = null;
})


// Eliminar uma casa
router.get('/rua/:id/deleteCasa/:idC', verificaToken, function(req,res,next) {
  token = null
  if(req.cookies && req.cookies.token)
    token = req.cookies.token
  res.render('addCasaR', {idCasa: req.params.idC, idRua: req.params.id, t:token});
  token = null;
})

router.get('/rua/:id/deleteCasa/:idC/S', verificaToken, function(req,res,next) {
  axios.delete("http://localhost:8000/ruas/deleteCasa/" + req.params.idC)
    .then(response => {
        res.render("/rua/" + req.params.id);
    })
    .catch(erro => {
      res.render("error", {message: "erro ao eliminar uma casa da respetiva rua", error : erro})
    })
});



// Registar uma casa (POST)
router.post('/rua/:id/regCasa', verificaToken, function(req, res, next) {
  let para = {refs: {}, texto: req.body.texto }
  delete req.body.texto
  req.body.desc = [para]
  axios.post("http://localhost:8000/ruas/addCasa/" + req.params.id, req.body)
    .then(response => {
        res.render('addCasaC');
    })
    .catch(erro => {
      res.render("error", {message: "erro ao adicionar a rua", error : erro})
    })
});


// Atualizar uma casa

router.get('/rua/:id/updateCasa/:idC', verificaToken, function(req, res, next) {
  axios.get("http://localhost:8000/ruas/casa/" + req.params.idC)
    .then(response => {
        res.render('addCasaU', {data: response.data});
    })
    .catch(erro => {
      res.render("error", {message: "erro ao adicionar a rua", error : erro})
    })
});

router.post('/rua/:id/updateCasa/:idC', verificaToken, function(req,res,next) {
  axios.post("http://localhost:8000/ruas/editCasa/" + req.params.idC, req.body)
    .then(response => {
        res.render('addCasaC');
    })
    .catch(erro => {
      res.render("error", {message: "erro ao tentar editar a Casa", error : erro})
    })
})





// AUTENTICAÇAO

// Tratamento do Register
router.get('/register', function(req,res) {
  res.render('registerForm')
})

// Tratamento do Login
router.get('/logout', function(req, res){
  token = null
  if(req.cookies && req.cookies.token)
    token = req.cookies.token
  res.render('testeLogout', {t:token})
  token = null;
})

// Tratamento do Login
router.get('/login', function(req, res){
  res.render('loginForm')
})

router.post('/register',verificaToken, function(req, res){
  token = null
  if(req.cookies && req.cookies.token)
    token = req.cookies.token
  axios.post('http://localhost:8003/users/register?token='+token, req.body)
    .then(response => {
      res.cookie('token', response.data.token)
      res.redirect('/')
    })
    .catch(e =>{
      res.render('error', {error: e, message: "Credenciais inválidas"})
    })
})

router.post('/login', function(req, res){
  axios.post('http://localhost:8003/users/login', req.body)
    .then(response => {
      res.cookie('token', response.data.token)
      res.redirect('/')
    })
    .catch(e =>{
      res.render('error', {error: e, message: "Credenciais inválidas"})
    })
})


router.post('/logout', verificaToken, function(req, res){
      res.clearCookie('token')
      res.redirect('/')
})

module.exports = router;
