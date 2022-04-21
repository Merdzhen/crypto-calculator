const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Deal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      Deal.belongsTo(User, {
        foreignKey: 'user_id',
      });
    }
  }
  Deal.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        // key: '',//if not 'id'
      },
    },
    coin: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    currency: {
      type: DataTypes.STRING,
    },
    quantity: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    purchase_date: {
      allowNull: false,
      type: DataTypes.DATEONLY,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  }, {
    sequelize,
    modelName: 'Deal',
    tableName: 'Deals',
  });
  return Deal;
};
