var express = require('express');
var router = express.Router();
var Rua = require('../controllers/rua')

const fs = require('fs');

/* GET home page. */
router.get('/ruas', function(req, res, next) {
    Rua.listaRuas(req.query)
    .then(ruas => {
        res.status(200).jsonp(ruas);
    })
    .catch(erro => {
        res.status(500).jsonp(erro);
    });
});

router.get('/ruas/nomes', function(req, res, next) {
    Rua.getNomesRuas(req.query)
    .then(ruas => {
        res.status(200).jsonp(ruas);
    })
    .catch(erro => {
        res.status(500).jsonp(erro);
    });
});

router.get('/ruas/:id', function(req, res, next) {
    Rua.getRua(req.params.id)
    .then(rua => {
        res.status(200).jsonp(rua);
    })
    .catch(erro => {
        res.status(500).jsonp(erro);
    });
});

router.get('/ruas/nome/:nome', function(req, res, next) {
    Rua.getRuaNome(req.params.nome)
    .then(rua => {
        res.status(200).jsonp(rua);
    })
    .catch(erro => {
        res.status(500).jsonp(erro);
    });
});

router.get('/ruas/data/:data', function(req, res, next) {
    Rua.listaRuasData(req.params.data)
    .then(ruas => {
        res.status(200).jsonp(ruas);
    })
    .catch(erro => {
        res.status(500).jsonp(erro);
    });
});

router.get('/ruas/lugar/:lugar', function(req, res, next) {
    Rua.listaRuasLugar(req.params.lugar)
    .then(ruas => {
        res.status(200).jsonp(ruas);
    })
    .catch(erro => {
        res.status(500).jsonp(erro);
    });
});

router.get('/ruas/casa/:id', function(req, res, next) {
    Rua.getCasa(req.params.id)
    .then(casa => {
        res.status(200).jsonp(casa);
    })
    .catch(erro => {
        res.status(500).jsonp(erro);
    });
});

router.post('/ruas', function(req, res, next) {

    console.log(req.body)

    Rua.addRua(req.body)
    .then(resposta => {
        res.status(201).jsonp(resposta);
    })
    .catch(erro => {
        res.status(501).jsonp(erro);
    });
});

router.post('/ruas/addCasa/:id', function(req, res, next) {
    Rua.addCasa(req.params.id, req.body)
    .then(resposta => {
        res.status(201).jsonp(resposta);
    })
    .catch(erro => {
        res.status(501).jsonp(erro);
    });
});

router.post('/ruas/editCasa/:id', function(req, res, next) {
    Rua.updateCasa(req.params.id, req.body)
    .then(resposta => {
        res.status(201).jsonp(resposta);
    })
    .catch(erro => {
        res.status(501).jsonp(erro);
    });
});

router.post("/ruas/post/:id", function(req,res,next) {
    Rua.addComentario(req.params.id, req.body)
    .then(resposta => {
        res.status(200).jsonp(resposta);
    })
    .catch(erro => {
        res.status(509).jsonp(erro);
    })
})

router.delete("/ruas/unpost/:id", function(req,res,next) {
    Rua.removeComentario(req.params.id)
    .then(resposta => {
        res.status(200).jsonp(resposta);
    })
    .catch(erro => {
        res.status(509).jsonp(erro);
    })
});

router.put('/ruas', function(req, res, next) {
    Rua.updateRua(req.body._id, req.body)
    .then(resposta => {
        res.status(204).jsonp(resposta);
    })
    .catch(erro => {
        res.status(505).jsonp(erro);
    });
});

router.put('/ruas/:id', function(req, res, next) {
    Rua.updateRua(req.params.id, req.body)
    .then(resposta => {
        res.status(200).jsonp(resposta);
    })
    .catch(erro => {
        res.status(505).jsonp(erro);
    });
});

router.delete('/ruas/deleteCasa/:idC', function(req, res, next) {
    console.log("aqui")
    Rua.deleteCasa(req.params.idC)
    .then(resposta => {
        res.status(200).jsonp(resposta);
    })
    .catch(erro => {
        res.status(507).jsonp(erro);
    });
});

router.delete('/ruas/:id', function(req, res, next) {
    Rua.deleteRua(req.params.id)
    .then(resposta => {
        res.status(200).jsonp(resposta);
    })
    .catch(erro => {
        res.status(507).jsonp(erro);
    });
});


module.exports = router;
