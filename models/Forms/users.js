const bcrypt = require('bcrypt');
const crypto = require('crypto');
module.exports = (sequelize, DataTypes) => {
  let Model = sequelize.define(
    'users',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      tableName: 'users',
      schema: 'Forms',
      underScored: false,
      timeStamp: true
    }
  )
  Model.beforeSave(async (user, options) => {
    let err;
    if (user.changed('password')) {
      try{
        let rounds = crypto.randomInt(4, 10);
        const salt = await bcrypt.genSalt(rounds)
        const hash = await bcrypt.hash(user.password, salt)
        user.password = hash;
      }
      catch(err){
        if(err){
          console.log('Error in hashing password', err.message);
        }
      }
     
    };
  });
  // Model.prototype.getJWT = async function (){
  //     console.log("getAWTFunctionIsCalled");
  //     let err, encryptedToken;
  //     const token = 'Bearer '+ jwt.sign({
  //        id: this.id,
  //        emailId :this.emailId
  //     }, CONFIG.jwt_encryption, {expiresIn: CONFIG.jwt_expiration});
  //     [err, encryptedToken] = await to(cryptoService.encrypt(token));
  //     if(err) TE (err);
  //     return encryptedToken;
  //  }
  return Model
}