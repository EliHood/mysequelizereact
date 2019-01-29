'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // /*
    //   Add altering commands here.
    //   Return a promise to correctly handle asynchronicity.

    //   Example:
        return queryInterface.bulkInsert('Users', [{
          id: 1,
          firstName: "Lester",
          lastName: "Young",
          email: "admin@email.com",
          createdAt:Sequelize.literal('NOW()'),
          updatedAt: new Date()
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
