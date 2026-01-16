const express = require('express');
const cors = require('cors');
const router = require('./router');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
router(app);

module.exports = app;

