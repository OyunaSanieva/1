/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      'Todos',
      [
        {
          todo: 'откликнуться',
          isDone: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          todo: 'сделать тестовое',
          isDone: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          todo: 'пособеситься и познакомиться с командой',
          isDone: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          todo: 'получить оффер и быть счастливыми',
          isDone: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
