module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Sample User 1',
        email: 'user1@mail.ru',
        password: '123456',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Sample User 2',
        email: 'user2@mail.ru',
        password: '1234567',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Sample User 3',
        email: 'user3@mail.ru',
        password: '12345678',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Sample User 4',
        email: 'user4@mail.ru',
        password: '123456789',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Sample User 5',
        email: 'user5@mail.ru',
        password: '1234567890',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Users');
  },
};
