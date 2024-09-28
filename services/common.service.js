const jwt = require('jsonwebtoken');
const CryptoJs = require('crypto-js');
const FormResponse = require('../models').formResponse;

const getJWT = function (user, key) {
  //convert a string to integer
  let expiration_time = parseInt(CONFIG.jwt_expiration);
  //return the signature for given payload and secretkey
  return "Bearer " + jwt.sign(user, key, { expiresIn: expiration_time });
};
module.exports.getJWT = getJWT;


const encrypt = function (plaintext) {
  let ciphertext;
  ciphertext = CryptoJs.AES.encrypt(plaintext.toString(), CONFIG.secret_key).toString();
  return ciphertext;
};
module.exports.encrypt = encrypt;

const decrypt = function (ciphertext) {
  let plaintext;
  const bytes = CryptoJs.AES.decrypt(ciphertext.toString(), CONFIG.secret_key);
  plaintext = bytes.toString(CryptoJs.enc.Utf8);
  return plaintext;
};
module.exports.decrypt = decrypt;
const checkEmailDuplication = async function(query){
try {
  const emailExist = await FormResponse.findOne({
    where:{
      emailId: query?.emailId,
      userId: query?.userId,
      formDetailsId: query?.formDetailsId,
      isDeleted: false
    },
    attributes:['id']
  })
  return emailExist;
} catch (err) {
  throw new Error(err?.message)
}
}
module.exports.checkEmailDuplication = checkEmailDuplication;