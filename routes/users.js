
var express = require('express');
var router = express.Router();
var usersController = require('../controllers/users');
var usersCode = require('../controllers/hash');
var sendEmail = require('../utils/utils');




router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});


router.get('/logOut', async (req, res) => {
  req.session.destroy();
  res.redirect('/destinos')
});

router.post('/login', async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  if (!email || !password) {
    req.flash('errors', 'Falta usuario o contraseña');
    res.redirect('/users/login')
  } else {
    let user = await usersController.checkLogin(email, password);

    if (user) {
      req.session.email = user.email;
      req.session.name = user.name;
      req.session.userId = user.id;
      req.session.admin = user.admin;
      req.session.active = user.active;

      let active = user.active;
      console.log(active + 'Activado');
      let admin = user.admin;
      req.session.logginDate = new Date();
      console.log(admin + ' admin');
      if (active == 0) {
        res.redirect('/users/login/desactive');
      } else if (admin == 1) {
        res.redirect('/destinos/admin');
      } else {
        res.redirect('/destinos/login');

      }

    } else {
      req.flash('errors', 'Usuario o contraseña inválido');
      res.redirect('/users/login');
    }
  }

});

router.get('/login', (req, res) => {
  let error = req.flash('errors');

  if (req.session.name) {

    res.redirect('/destinos');
  } else {
    res.render('user/login', {
      error
    });
  }
})

router.get('/login/desactive', (req, res) => {
  res.render('user/desactive');

})

router.get('/login/:code', async (req, res) => {
  console.log('leyendo');
  let codeUser = await usersCode.findUserCode(code);
  await usersCode.activarCuenta(codeUser[0].userId)
  res.redirect('/users/login')
})

router.post('/login/:code', (req, res) => {

})




router.get('/register', (req, res) => {
  let error = req.flash('error');

  res.render('user/register', {
    error
  });
});

router.post('/register', async (req, res) => {
  let { email, name, password } = req.body;
  console.log('email: ' + email);
  let isRegistered = await usersController.register(email, password, name);


  // registrado

  if (isRegistered) {
    let chars = "0123456789abcdefABCDEF";
    let lon = 20;
    code = "";
    for (x = 0; x < lon; x++) {
      rand = Math.floor(Math.random() * chars.length);
      code += chars.substr(rand, 1);
    }

    let idUser = await usersController.userId(email)
    console.log('id usuario: ', idUser[0].id);


    await usersCode.generaHash(code);
    sendEmail(email, code);
    await usersCode.hashId(code, idUser[0].id);


    res.redirect('/users/login')
  } else {
    req.flash('error', 'No se pudo registrar');
    res.redirect('/users/register');
  }
})


module.exports = router;
