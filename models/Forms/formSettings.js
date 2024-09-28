module.exports = (sequelize, DataTypes) => {
  let Model = sequelize.define(
    'formSettings',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      formDetailsId:{
        type: DataTypes.STRING,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      submissionHeader:{
        type: DataTypes.STRING
      },
      submissionMessage:{
        type: DataTypes.STRING

      },
      allowMultipleResponse:{
        type: DataTypes.BOOLEAN
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      modifiedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: 'formSettings',
      schema: 'Forms',
      underScored: false,
      timeStamp: true
    }
  )
  return Model
}