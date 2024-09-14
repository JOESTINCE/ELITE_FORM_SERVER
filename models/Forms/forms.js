module.exports = (sequelize, DataTypes) => {
  let Model = sequelize.define(
    'forms',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      formDetailsId:{
        type: DataTypes.STRING,
        allowNull: false
      },
      userId:{
        type: DataTypes.INTEGER,
        allowNull: false
      },
      isDeleted:{
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
      tableName: 'forms',
      schema: 'Forms',
      underScored: false,
      timeStamp: true
    }
  )
  Model.association = (models) => {
    Model.hasMany(models.formResponse, { foreignKey: 'formId' });
  }
  return Model
}