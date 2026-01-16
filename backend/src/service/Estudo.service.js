const db = require('../models');

module.exports = {
    async getEstudo() {
        try {
            const estudo = await db.Estudo.findAll();
            return estudo;
        } catch (error) {
            throw new Error('Erro ao buscar estudos: ' + error.message);
        }
    },
    async getEstudoById(id) {
        try {
            const estudoId = parseInt(id);
            if (isNaN(estudoId)) {
                throw new Error('ID inválido');
            }
            const estudo = await db.Estudo.findByPk(estudoId);
            if (!estudo) {
                throw new Error('Estudo não encontrado');
            }
            return estudo;
        } catch (error) {
            if (error.message.includes('não encontrado') || error.message.includes('ID inválido')) {
                throw error;
            }
            throw new Error('Erro ao buscar estudo por ID: ' + error.message);
        }
    },
    async createEstudo(title, description, date_start, completed) {
        try {
            // REGRAS DE NEGÓCIO: Validações e regras específicas do domínio
            
            // Validação 1: Título é obrigatório e deve ter pelo menos 3 caracteres
            if (!title || title.trim().length < 3) {
                throw new Error('Título deve ter pelo menos 3 caracteres');
            }
            
            // Validação 2: Descrição é obrigatória
            if (!description || description.trim().length === 0) {
                throw new Error('Descrição é obrigatória');
            }
            
            // Validação 3: Data não pode ser no passado (regra de negócio)
            if (date_start) {
                const dataInicio = new Date(date_start);
                const hoje = new Date();
                hoje.setHours(0, 0, 0, 0);
                
                if (dataInicio < hoje) {
                    throw new Error('Data de início não pode ser no passado');
                }
            }
            
            // Validação 4: Se completed for true, verificar se já existe estudo similar completo
            if (completed) {
                const estudosCompletos = await db.Estudo.findAll({
                    where: { completed: true, title: title.trim() }
                });
                if (estudosCompletos.length > 0) {
                    throw new Error('Já existe um estudo completo com este título');
                }
            }
            
            // Cria o estudo após passar todas as validações
            const estudo = await db.Estudo.create({ 
                title: title.trim(), 
                description: description.trim(), 
                date_start, 
                completed: completed || false 
            });
            
            return estudo;
        } catch (error) {
            // Re-throw erros de validação de negócio sem modificar
            if (error.message.includes('deve ter') || 
                error.message.includes('obrigatória') ||
                error.message.includes('não pode ser') ||
                error.message.includes('Já existe')) {
                throw error;
            }
            throw new Error('Erro ao criar estudo: ' + error.message);
        }
    },
    async updateEstudo(id, title, description, date_start, completed) {
        try {
            const estudoId = parseInt(id);
            if (isNaN(estudoId)) {
                throw new Error('ID inválido');
            }
            
            const estudo = await db.Estudo.findByPk(estudoId);
            if (!estudo) {
                throw new Error('Estudo não encontrado');
            }
            
            // REGRA DE NEGÓCIO: Não permite reabrir um estudo já completado
            if (estudo.completed === true && completed === false) {
                throw new Error('Não é possível reabrir um estudo já completado');
            }
            
            // Validações de negócio (mesmas do create)
            if (title && title.trim().length < 3) {
                throw new Error('Título deve ter pelo menos 3 caracteres');
            }
            
            if (description && description.trim().length === 0) {
                throw new Error('Descrição não pode estar vazia');
            }
            
            // Atualiza apenas os campos fornecidos
            const dadosAtualizados = {};
            if (title !== undefined) dadosAtualizados.title = title.trim();
            if (description !== undefined) dadosAtualizados.description = description.trim();
            if (date_start !== undefined) dadosAtualizados.date_start = date_start;
            if (completed !== undefined) dadosAtualizados.completed = completed;
            
            await estudo.update(dadosAtualizados);
            return estudo;
        } catch (error) {
            if (error.message.includes('não encontrado') || 
                error.message.includes('ID inválido') ||
                error.message.includes('não é possível') ||
                error.message.includes('deve ter') ||
                error.message.includes('não pode')) {
                throw error;
            }
            throw new Error('Erro ao atualizar estudo: ' + error.message);
        }
    },
    async deleteEstudo(id) {
        try {
            const estudoId = parseInt(id);
            if (isNaN(estudoId)) {
                throw new Error('ID inválido');
            }
            const estudo = await db.Estudo.findByPk(estudoId);
            if (!estudo) {
                throw new Error('Estudo não encontrado');
            }
            await estudo.destroy();
            return { message: 'Estudo removido com sucesso' };
        } catch (error) {
            if (error.message.includes('não encontrado') || error.message.includes('ID inválido')) {
                throw error;
            }
            throw new Error('Erro ao deletar estudo: ' + error.message);
        }
    }
}