

module.exports = (sequelize, DataTypes) => {
  const City = sequelize.define('City', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    males: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    females: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  }, {
    hooks: {
      beforeCreate: (city) => {
          city.total = Number.parseInt(city.males, 10) + Number.parseInt(city.females, 10); //eslint-disable-line
      },
    },
  });

  City.associate = (models) => {
    City.belongsTo(models.State, {
      foreignKey: 'stateId',
      onDelete: 'CASCADE',
    });
  };
  return City;
};
