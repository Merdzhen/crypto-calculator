module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Deals', [
      {
        user_id: 1,
        coin: 'Bitcoin',
        currency: 'USD',
        quantity: 2,
        purchase_date: '2020-01-17',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 1,
        coin: 'Ethereum',
        currency: 'USD',
        quantity: 4,
        purchase_date: '2021-03-28',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 1,
        coin: 'Dogecoin',
        currency: 'USD',
        quantity: 75,
        purchase_date: '2017-05-16',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 1,
        coin: 'Vechain',
        currency: 'USD',
        quantity: 40,
        purchase_date: '2022-02-27',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 1,
        coin: 'Cardano',
        currency: 'USD',
        quantity: 15,
        purchase_date: '2020-08-14',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Deals');
  },
};
