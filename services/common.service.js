const jwt = require('jsonwebtoken');
const CryptoJs = require('crypto-js');

const getJWT = function (user, key) {
  //convert a string to integer
  let expiration_time = parseInt(CONFIG.jwt_expiration);
  //return the signature for given payload and secretkey
  return "Bearer " + jwt.sign(user, key, { expiresIn: expiration_time });
};
module.exports.getJWT = getJWT;


const encrypt = async function (plaintext) {
  let ciphertext;
  ciphertext = CryptoJs.AES.encrypt(plaintext.toString(), CONFIG.secret_key).toString();
  return ciphertext;
};
module.exports.encrypt = encrypt;

const decrypt = async function (ciphertext) {
  let plaintext;
  const bytes = CryptoJs.AES.decrypt(ciphertext.toString(), CONFIG.secret_key);
  plaintext = bytes.toString(CryptoJs.enc.Utf8);
  return plaintext;
};
module.exports.decrypt = decrypt;