module.exports = (sequelize, DataTypes) => {
  const SalesArea = sequelize.define('SalesArea', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
    });

    return SalesArea;
  };