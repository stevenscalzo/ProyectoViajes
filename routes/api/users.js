/*
var express = require('express');
var router = express.Router();
var usersController = require('../../controllers/users');


router.get('/', async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let user = await usersController.checkLogin(email, password);

    res.send(user );

});


router.post('/', async (req, res) => {
    let { email, name, password } = req.body;
    let isRegistered = await usersController.register(email, password, name);

    res.send(isRegistered )

})

module.exports = router;
*/