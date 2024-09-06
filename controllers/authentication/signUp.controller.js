const router = require('express').Router({ mergeParams: true });
const SignUpService = require('../../services/authentication/signUp.service');
const signUpUser = async function(req, res){
  SignUpService.signUpUsers(req?.body).then((data)=>{
    if(data){
      res.status(201).json({ success: true, data: data });
    }
  },
  // (err)=>{
  //   if(err){
  //     res.send(err?.message).statusCode(400);
  //   }
  // }
).catch((err)=>{
  return res.status(422).json(err.message);
  })
}
router.post('/', signUpUser);
module.exports = {router};