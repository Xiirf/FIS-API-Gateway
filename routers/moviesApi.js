var express = require('express');
var router = express.Router();

const apiAdapter = require('./apiAdapter');
const isAuthorized = require('../controller/requestAuthenticator.js');

const BASE_URL = 'https://fis-ms-movies.herokuapp.com/api/v1';
const api = apiAdapter(BASE_URL);



router.post('/movies_status', isAuthorized, (req, res) => {
    api.post(req.path, req.body)
        .then(resp => {
            res.send(resp.data);
        })
        .catch(error => {
            res.send(error.message + '\n' + error.response.data.error);
        });
});

router.delete('/movies_status', isAuthorized, (req, res) => {
    api.delete(req.path, req.body)
        .then(resp => {
            res.send(resp.data);
        })
        .catch(error => {
            res.send(error.message + '\n' + error.response.data.error);
        });
});

router.get('/movies_status/:_id', isAuthorized, (req, res) => {
    api.get(req.path, req.body)
        .then(resp => {
            res.send(resp.data);
        })
        .catch(error => {
            res.send(error.message + '\n' + error.response.data.error);
        });
});

router.put('/movies_status/:_id', isAuthorized, (req, res) => {
    api.put(req.path, req.body)
        .then(resp => {
            res.send(resp.data);
        })
        .catch(error => {
            res.send(error.message + '\n' + error.response.data.error);
        });
});

router.delete('/movies_status/:_id', isAuthorized, (req, res) => {
    api.delete(req.path, req.body)
        .then(resp => {
            res.send(resp.data);
        })
        .catch(error => {
            res.send(error.message + '\n' + error.response.data.error);
        });
});

router.get('/movies_status/user/:_id', isAuthorized, (req, res) => {
    api.get(req.path, req.body)
        .then(resp => {
            res.send(resp.data);
        })
        .catch(error => {
            res.send(error.message + '\n' + error.response.data.error);
        });
});

router.get('/movies_status/user/:_id_user/:_id_movie', isAuthorized, (req, res) => {
    api.get(req.path, req.body)
        .then(resp => {
            res.send(resp.data);
        })
        .catch(error => {
            res.send(error.message + '\n' + error.response.data.error);
        });
});

router.get('/search_api', isAuthorized, (req, res) => {
    api.get(req.path, req.body)
        .then(resp => {
            res.send(resp.data);
        })
        .catch(error => {
            res.send(error.message + '\n' + error.response.data.error);
        });
});

router.get('/search_api/discover', isAuthorized, (req, res) => {
    api.get(req.path, req.body)
        .then(resp => {
            res.send(resp.data);
        })
        .catch(error => {
            res.send(error.message + '\n' + error.response.data.error);
        });
});

router.get('/search_api/:_id', isAuthorized, (req, res) => {
    api.get(req.path, req.body)
        .then(resp => {
            res.send(resp.data);
        })
        .catch(error => {
            res.send(error.message + '\n' + error.response.data.error);
        });
});
