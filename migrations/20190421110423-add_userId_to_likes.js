
module.exports = {
  up: function (queryInterface, Sequelize) {
     return queryInterface.addColumn(
      'Likes',
      'userId',
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id'
        }
      }
    )
  },

  down: function (queryInterface, Sequelize) {
     return queryInterface.removeColumn(
     'Likes',
     'userId'
   )
  }
};