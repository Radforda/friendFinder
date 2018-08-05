var express = require('express');
var router = express.Router();

// Home page route.
router.get('/', function (req, res) {
  res.send('home');
})

// Survey route.
router.get('/survey', function (req, res) {
  res.send('survey');
})

module.exports = router;
