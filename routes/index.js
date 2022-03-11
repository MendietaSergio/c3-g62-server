var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'C3-G62' });
});

router.get('/email', function(req, res, next) {
  res.render('maqueta', { 
    title: 'Market Place de Arte Digital',
    css: 'email.css'
  });
});
router.get('/email2', function(req, res, next) {
  res.render('email2', { 
    title: 'Market Place de Arte Digital',
    css: 'email.css'
  });
});

module.exports = router;
