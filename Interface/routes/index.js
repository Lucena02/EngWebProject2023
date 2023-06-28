var express = require('express');
var router = express.Router();
var axios = require("axios");



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/rua', function(req, res, next) {
  axios.get("http://localhost:8000/ruas")
    .then(response => {
      res.render('ruasTodas', { data: response.data});
    })
    .catch(erro => {
      res.render("error", {message: "Erro ao obter pagina inicial", error : erro})
    })
});

router.get('/rua/register', function(req,res,next) {
  res.render('addRua', {});
})

router.get('/rua/:id', function(req, res, next) {
  axios.get("http://localhost:8000/ruas/" + req.params.id)
    .then(response => {
        res.render('infoCasas', { data: response.data});
    })
    .catch(erro => {
      res.render("error", {message: "erro ao obter a pagina da rua", error : erro})
    })
});


router.get('/rua/:id/regCasa', function(req,res,next) {
  res.render('addCasa');
})


router.post('/rua/:id/regCasa', function(req, res, next) {
  axios.post("http://localhost:8000/ruas/addCasa/" + req.params.id)
    .then(response => {
        res.render('addCasaC');
    })
    .catch(erro => {
      res.render("error", {message: "erro ao adicionar a rua", error : erro})
    })
});





// AUTENTICAÇAO!!!

// Tratamento do Register
router.get('/register', function(req,res) {
  res.render('registerForm')
})

// Tratamento do Login
router.get('/logout', function(req, res){
  res.render('testeLogout')
})

// Tratamento do Login
router.get('/login', function(req, res){
  res.render('loginForm')
})

router.post('/register', function(req, res){
  axios.post('http://localhost:8003/users/register', req.body)
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

router.post('/logout', function(req, res){
  axios.post('http://localhost:8003/users/logout', req.body)
    .then(response => {
      res.redirect('/')
    })
    .catch(e =>{
      res.render('error', {error: e, message: "Logout inválido"})
    })
})

module.exports = router;
