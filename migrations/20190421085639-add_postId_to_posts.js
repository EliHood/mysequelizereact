
module.exports = {
  up: function (queryInterface, Sequelize) {
     return queryInterface.addColumn(
      'Likes',
      'postId',
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Likes',
          key: 'id'
        }
      }
    )
  },

  down: function (queryInterface, Sequelize) {
     return queryInterface.removeColumn(
     'Likes',
     'postId'
   )
  }
};