var express = require('express');
var router = express.Router();

/* GET home page. */
try{
  router.use('/forms/signup', require('../controllers/authentication/signUp.controller').router);
  router.use('/forms/signin', require('../controllers/authentication/signIn.controller').router);
  router.use('/forms/', require('../controllers/forms/forms.controller').router);
  router.use('/formresponse/', require('../controllers/forms/formResponse.controller').router);
  router.use('/dashboard/', require('../controllers/dashboard/dashboard.controller').router);
  router.use('/settings', require('../controllers/forms/formSettings.controller').router);
  router.use('/common', require('../controllers/common.controller').router);


}
catch(err){
  console.log("Error in routing",err.message);
}

module.exports = router;