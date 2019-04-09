
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Cities', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    males: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    females: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    total: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    stateId: {
      type: Sequelize.INTEGER,
      onDelete: 'cascade',
      references: {
        model: 'States',
        key: 'id',
      },
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Cities'),
};
