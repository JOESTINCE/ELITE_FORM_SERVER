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
      userName: {
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
      let rounds = crypto.randomInt(4, 10);
      bcrypt.genSalt(rounds).then((salt)=>{
        bcrypt.hash(user.password, salt).then((hash)=>{
          user.password = hash;
        }, (error)=>{
          console.log("Error in hash method in encryption", error?.message);
        })
      }, (error)=>{
        console.log('Error in encryption in user account', error?.message);
      })
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