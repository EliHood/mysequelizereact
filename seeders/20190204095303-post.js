'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Posts', [{
        title: 'Example Twest',
        post_content: 'Lorem sipsum dolor sit amet',
        createdAt:Sequelize.literal('NOW()'),
        updatedAt: new Date(),
        userId: 1
      }], {});
  
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
