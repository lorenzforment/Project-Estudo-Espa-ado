const { Router } = require('express');
const estudoController = require('../controller/estudo.controller');

const router = Router();

/**
 * @swagger
 * /api/estudo:
 *   get:
 *     summary: Lista todos os estudos
 *     tags: [Estudos]
 *     responses:
 *       200:
 *         description: Lista de estudos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Estudo'
 */
router.get('/estudo', estudoController.getEstudo);

/**
 * @swagger
 * /api/estudo/{id}:
 *   get:
 *     summary: Busca um estudo por ID
 *     tags: [Estudos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do estudo
 *     responses:
 *       200:
 *         description: Estudo encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Estudo'
 *       404:
 *         description: Estudo não encontrado
 */
router.get('/estudo/:id', estudoController.getEstudoById);

/**
 * @swagger
 * /api/estudo:
 *   post:
 *     summary: Cria um novo estudo
 *     tags: [Estudos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EstudoInput'
 *     responses:
 *       201:
 *         description: Estudo criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Estudo'
 */
router.post('/estudo', estudoController.createEstudo);

/**
 * @swagger
 * /api/estudo/{id}:
 *   put:
 *     summary: Atualiza um estudo existente
 *     tags: [Estudos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do estudo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EstudoInput'
 *     responses:
 *       200:
 *         description: Estudo atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Estudo'
 *       404:
 *         description: Estudo não encontrado
 */
router.put('/estudo/:id', estudoController.updateEstudo);

/**
 * @swagger
 * /api/estudo/{id}:
 *   delete:
 *     summary: Remove um estudo
 *     tags: [Estudos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do estudo
 *     responses:
 *       204:
 *         description: Estudo removido com sucesso
 *       404:
 *         description: Estudo não encontrado
 */
router.delete('/estudo/:id', estudoController.deleteEstudo);





module.exports = router;