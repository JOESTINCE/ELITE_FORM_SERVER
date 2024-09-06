const Users = require('../../models').users;
const signUpUsers = async function(body){
  try{
    const userExist = await Users.findOne({
      where:{
        email: body?.email
      }
    })
    if(userExist){
      throw new Error('USER_ALREADY_EXIST');
    }
    else{
      const data = await Users.create(body)
      if (data) {
        return data;
      }
    }
  }
  catch(err){
    throw new Error(err.message); 
  }

};
module.exports.signUpUsers = signUpUsers;