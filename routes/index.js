var express = require('express');
var router = express.Router();



// ir a Home
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});






module.exports = router;

