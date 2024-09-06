const router = require('express').Router();
const signInService = require('../../services/authentication/signIn.service');

const signInUsers = async function(req, res){
  try {
    const data = await signInService.signInUsers(req?.query);
    if(data){
      return res.status(206).json({success: true, data: data})
    }
  } catch (error) {
    return res.status(422).json({success:false, error:{
      message: error?.message
    }})
  }
}

router.get('/', signInUsers);
module.exports = {router}