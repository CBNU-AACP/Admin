const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        userId: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        userPassword: {
          type: Sequelize.STRING(100),
          allowNull: false,
        }
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "User",
        tableName: "users",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.User.hasOne(db.RefreshToken, {foreignKey: "userId", sourceKey: "id"});
  }
};
