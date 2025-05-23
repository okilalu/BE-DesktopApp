"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("performances", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      speed: {
        type: Sequelize.FLOAT,
      },
      totalRecord: {
        type: Sequelize.FLOAT,
      },
      averageSpeed: {
        type: Sequelize.FLOAT,
      },
      overSpeed: {
        type: Sequelize.FLOAT,
      },
      deviceId: {
        type: Sequelize.STRING,
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("performances");
  },
};
