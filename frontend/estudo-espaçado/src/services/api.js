// Usa variável de ambiente do Vite ou valor padrão
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = {
  // Listar todos os estudos
  async getAllEstudos() {
    const response = await fetch(`${API_URL}/estudo`);
    if (!response.ok) {
      throw new Error('Erro ao buscar estudos');
    }
    return response.json();
  },

  // Buscar estudo por ID
  async getEstudoById(id) {
    const response = await fetch(`${API_URL}/estudo/${id}`);
    if (!response.ok) {
      throw new Error('Erro ao buscar estudo');
    }
    return response.json();
  },

  // Criar novo estudo
  async createEstudo(estudo) {
    const response = await fetch(`${API_URL}/estudo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(estudo),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erro ao criar estudo');
    }
    return response.json();
  },

  // Atualizar estudo
  async updateEstudo(id, estudo) {
    const response = await fetch(`${API_URL}/estudo/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(estudo),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erro ao atualizar estudo');
    }
    return response.json();
  },

  // Deletar estudo
  async deleteEstudo(id) {
    const response = await fetch(`${API_URL}/estudo/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erro ao deletar estudo');
    }
    return response.json();
  },
};

export default api;
