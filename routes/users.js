const models = require('../models');
const { isAdmind } = require('../middlewares/isAdmind');

var express = require('express');
var router = express.Router();
var usersController = require('../controllers/users');
var usersCode = require('../controllers/hash');
var sendEmail = require('../utils/utils');
var emailRestablecer = require('../utils/reestablecer');


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
      let active = user.active;

      req.session.email = user.email;
      req.session.name = user.name;
      req.session.userId = user.id;
      req.session.admin = user.admin;
      req.session.active = user.active;
      req.session.logginDate = new Date();
      if (active) {
        req.flash('successMessage', 'Usuario validado correctamente');
        res.redirect('/destinos');
      } else {
        res.redirect('/users/login/desactive');
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
  let code = req.params.code
  let codeUser = await usersCode.findUserCode(code);
  await usersCode.activarCuenta(codeUser[0].userId)
  res.redirect('/users/login')
})

// RESTABLECER CONTRASEÑA 
router.get('/restablecer', (req, res) => {
  let error = req.flash('error');
  res.render('user/restablecer', {
    error
  });
})

router.post('/restablecer', async (req, res) => {
  let email = req.body.email;
  if (!email) {
    req.flash('error', 'Falta email');
    res.redirect('/users/restablecer')
  } else {
    console.log("Email: " + email);
    let buscarUsuario = await models.user.findAll({ where: { email } });
    if (buscarUsuario.length) {
      console.log(buscarUsuario[0].id);
      let hash = await models.hash.findAll({ where: { id: buscarUsuario[0].id } });
      let codigo = hash[0].code
      emailRestablecer(email, codigo);
      res.redirect('/users/login')
    }
  }

});

router.get('/restablecer/:code', async (req, res) => {
  console.log("leyendo");
  let code = req.params.code
  console.log(code);
  let userDelCode = await usersCode.findUserCode(code);
  console.log("user: " + userDelCode);
  res.render('user/nuevaPassword', {
    code
  });
})

router.post('/restablecer/:code', async (req, res) => {
  let code = req.params.code
  console.log(code);
  let userDelCode = await usersCode.findUserCode(code);
  console.log("user id: " + userDelCode);
  let password = req.body.password;
  console.log("password: " + password);
  await usersController.cambiarPassword(userDelCode, password)
  res.render('user/newpassword');
})



router.get('/register', (req, res) => {
  let error = req.flash('error');
  res.render('user/register', {
    error
  });
});

router.post('/register', async (req, res) => {
  let { email, name, password } = req.body;
  let isRegistered = await usersController.register(email, password, name);

  if (isRegistered) {
    let code = await usersController.generateCode();
    let idUser = await usersController.userId(email)
    await usersCode.generaHash(code);
    await usersCode.hashId(code, idUser[0].id);
    sendEmail(email, code);
    res.redirect('/users/login')
  } else {
    req.flash('error', 'No se pudo registrar');
    res.redirect('/users/register');
  }
})


router.get('/list', isAdmind, async (req, res) => {
  let users = await usersController.getUsers();
  res.render('user/users', {
    users
  });
});

router.post('/list', isAdmind, async (req, res) => {
 
  let checkbox = req.body
  let valoresAdmin = Object.values(checkbox);
  
  let oldUsers = await usersController.getUsers();
  await usersController.cambioEstatus(valoresAdmin,oldUsers);
  res.redirect('/users/list');
});




module.exports = router;
