const router = require('express').Router({ mergeParams: true });
const SignUpService = require('../../services/authentication/signUp.service');
const signUpUser = async function(req, res){
  SignUpService.signUpUsers(req?.body).then((data)=>{
    if(data){
      res.send(data).statusCode(201);
    }
  },
  (err)=>{
    if(err){
      res.send(err?.message).statusCode(400);
    }
  })
}
router.post('/', signUpUser);
module.exports = {router};