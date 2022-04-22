module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Deals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          // key: '',//if not 'id'
        },
      },
      coin: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      currency: {
        type: Sequelize.STRING,
      },
      quantity: {
        allowNull: false,
        type: Sequelize.DECIMAL,
      },
      purchase_date: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Deals');
  },
};
