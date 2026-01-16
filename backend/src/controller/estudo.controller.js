const EstudoService = require('../service/Estudo.service');

module.exports = {
    async getEstudo(req, res) {
        try {
            const estudo = await EstudoService.getEstudo();
            res.status(200).send(estudo);
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    },
    async getEstudoById(req, res) {
        try {
            const { id } = req.params;
            const estudo = await EstudoService.getEstudoById(id);
            res.status(200).send(estudo);
        } catch (error) {
            if (error.message.includes('não encontrado') || error.message.includes('ID inválido')) {
                return res.status(404).send({ message: error.message });
            }
            res.status(500).send({ message: error.message });
        }
    },
    async createEstudo(req, res) {
        try {
            const { title, description, date_start, completed } = req.body;
            const estudo = await EstudoService.createEstudo(title, description, date_start, completed);
            res.status(201).send(estudo);
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    },
    async updateEstudo(req, res) {
        try {
            const { id } = req.params;
            const { title, description, date_start, completed } = req.body;
            const estudo = await EstudoService.updateEstudo(id, title, description, date_start, completed);
            res.status(200).send(estudo);
        } catch (error) {
            if (error.message.includes('não encontrado')) {
                return res.status(404).send({ message: error.message });
            }
            res.status(500).send({ message: error.message });
        }
    },
    async deleteEstudo(req, res) {
        try {
            const { id } = req.params;
            const result = await EstudoService.deleteEstudo(id);
            res.status(200).send(result);
        } catch (error) {
            if (error.message.includes('não encontrado') || error.message.includes('ID inválido')) {
                return res.status(404).send({ message: error.message });
            }
            res.status(500).send({ message: error.message });
        }
    }



};