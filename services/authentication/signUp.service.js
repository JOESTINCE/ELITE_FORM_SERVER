const Users = require('../../models').users;

const signUpUsers = async function(body){
  Users.create(body).then((data)=>{
    if (data){
      return data;
    }
  },
  (error)=>{
    throw new Error(error?.message);
  })
};
module.exports.signUpUsers = signUpUsers;