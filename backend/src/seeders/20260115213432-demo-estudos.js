'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('Estudos', [
      {
        title: 'Estudar JavaScript Básico',
        description: 'Variáveis, tipos de dados, operadores e funções',
        date_start: '2026-01-15',
        completed: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'Node.js com Express',
        description: 'Criar uma API REST simples com Express',
        date_start: '2026-01-16',
        completed: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'Banco de Dados com SQLite',
        description: 'Modelagem, migrations e seeders com Sequelize',
        date_start: '2026-01-17',
        completed: false,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Estudos', null, {});
  }
};
