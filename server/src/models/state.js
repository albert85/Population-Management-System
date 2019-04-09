

module.exports = (sequelize, DataTypes) => {
  const State = sequelize.define('State', {
    name: DataTypes.STRING,
  }, {});
  State.associate = (models) => {
    State.hasMany(models.City, {
      foreignKey: 'stateId',
    });
  };
  return State;
};
