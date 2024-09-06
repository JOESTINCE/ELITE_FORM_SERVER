const Users = require('../../models').users;
const Bcrypt = require('bcrypt');
const CommonService = require('../common.service')
const signInUsers = async function (query) {
  try {
    const data = await Users.findOne({
      where: {
        email: query?.email,
      },
    });

    if (data && data?.email && data?.password) {
      // Use Bcrypt.compare as a promise
      const isPasswordValid = await Bcrypt.compare(query.password, data.password);

      if (isPasswordValid) {
        const jwtToken = await CommonService.getJWT({email: data?.email, password: data?.password}, CONFIG.secret_key) ;
        let encryptedToken;
        if(jwtToken){
          encryptedToken = await CommonService.encrypt(jwtToken);
        }
        return { message: 'LOGIN_SUCCESSFUL', token: encryptedToken };
      } else {
        return 'INVALID_CREDENTIALS';
      }
    } else {
      return 'INVALID_CREDENTIALS';
    }
  } catch (error) {
    throw new Error(error?.message);
  }
};
module.exports.signInUsers= signInUsers;