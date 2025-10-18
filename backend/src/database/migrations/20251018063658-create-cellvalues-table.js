'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cell_values', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      row_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'rows',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      column_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'columns',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      value_text: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      value_number: {
        type: Sequelize.DECIMAL,
        allowNull: true,
      },
      value_datetime: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      value_array: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    // Optional: add indexes for faster querying
    await queryInterface.addIndex('cell_values', ['row_id']);
    await queryInterface.addIndex('cell_values', ['column_id']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cell_values');
  },
};
