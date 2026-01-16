import { useState, useEffect } from 'react';
import './EstudoForm.css';

function EstudoForm({ estudo, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date_start: '',
    completed: false,
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (estudo) {
      setFormData({
        title: estudo.title || '',
        description: estudo.description || '',
        date_start: estudo.date_start || '',
        completed: estudo.completed || false,
      });
    }
  }, [estudo]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await onSubmit(formData);
      setFormData({
        title: '',
        description: '',
        date_start: '',
        completed: false,
      });
    } catch (err) {
      setError(err.message || 'Erro ao salvar estudo');
    }
  };

  return (
    <div className="estudo-form-container">
      <form onSubmit={handleSubmit} className="estudo-form">
        <h2>{estudo ? 'Editar Estudo' : 'Novo Estudo'}</h2>

        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label htmlFor="title">Título *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            minLength={3}
            placeholder="Digite o título do estudo"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Descrição *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            placeholder="Descreva o conteúdo do estudo"
          />
        </div>

        <div className="form-group">
          <label htmlFor="date_start">Data de Início</label>
          <input
            type="date"
            id="date_start"
            name="date_start"
            value={formData.date_start}
            onChange={handleChange}
          />
        </div>

        <div className="form-group checkbox-group">
          <label htmlFor="completed">
            <input
              type="checkbox"
              id="completed"
              name="completed"
              checked={formData.completed}
              onChange={handleChange}
            />
            <span>Concluído</span>
          </label>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {estudo ? 'Atualizar' : 'Criar'}
          </button>
          {onCancel && (
            <button type="button" onClick={onCancel} className="btn btn-secondary">
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default EstudoForm;
