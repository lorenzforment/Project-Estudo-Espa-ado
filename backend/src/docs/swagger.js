const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API de Estudos',
    version: '1.0.0',
    description: 'Documentação da API de estudos (programação)'
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor local'
    }
  ],
  components: {
    schemas: {
      Estudo: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            description: 'ID único do estudo'
          },
          title: {
            type: 'string',
            description: 'Título do estudo'
          },
          description: {
            type: 'string',
            description: 'Descrição do estudo'
          },
          date_start: {
            type: 'string',
            format: 'date',
            description: 'Data de início do estudo (YYYY-MM-DD)'
          },
          completed: {
            type: 'boolean',
            description: 'Status de conclusão do estudo'
          },
          created_at: {
            type: 'string',
            format: 'date-time',
            description: 'Data de criação'
          },
          updated_at: {
            type: 'string',
            format: 'date-time',
            description: 'Data de atualização'
          }
        }
      },
      EstudoInput: {
        type: 'object',
        required: ['title', 'description'],
        properties: {
          title: {
            type: 'string',
            description: 'Título do estudo',
            example: 'Estudar JavaScript Básico'
          },
          description: {
            type: 'string',
            description: 'Descrição do estudo',
            example: 'Variáveis, tipos de dados, operadores e funções'
          },
          date_start: {
            type: 'string',
            format: 'date',
            description: 'Data de início do estudo (YYYY-MM-DD)',
            example: '2026-01-15'
          },
          completed: {
            type: 'boolean',
            description: 'Status de conclusão do estudo',
            default: false,
            example: false
          }
        }
      }
    }
  }
};

const options = {
  definition: swaggerDefinition,
  apis: ['./src/router/*.js'] // onde estão os comentários JSDoc
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;