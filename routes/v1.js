var express = require('express');
var router = express.Router();

/* GET home page. */
try{
  router.use('/forms/signup', require('../controllers/authentication/signUp.controller').router)
}
catch(err){
  console.log("Error in routing",err.message);
}
// router.use('/', );

module.exports = router;