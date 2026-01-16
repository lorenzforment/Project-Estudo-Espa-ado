import { useState, useEffect } from 'react';
import './App.css';
import api from './services/api';
import EstudoList from './components/EstudoList';
import EstudoForm from './components/EstudoForm';

function App() {
  const [estudos, setEstudos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingEstudo, setEditingEstudo] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadEstudos();
  }, []);

  const loadEstudos = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await api.getAllEstudos();
      setEstudos(data);
    } catch (err) {
      setError(err.message || 'Erro ao carregar estudos');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (estudoData) => {
    await api.createEstudo(estudoData);
    await loadEstudos();
    setShowForm(false);
    setEditingEstudo(null);
  };

  const handleUpdate = async (estudoData) => {
    await api.updateEstudo(editingEstudo.id, estudoData);
    await loadEstudos();
    setShowForm(false);
    setEditingEstudo(null);
  };

  const handleEdit = (estudo) => {
    setEditingEstudo(estudo);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este estudo?')) {
      try {
        await api.deleteEstudo(id);
        await loadEstudos();
      } catch (err) {
        setError(err.message || 'Erro ao excluir estudo');
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingEstudo(null);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>📚 Gerenciador de Estudos</h1>
        <p>Organize seus estudos de programação</p>
      </header>

      <main className="app-main">
        {error && <div className="error-banner">{error}</div>}

        {!showForm ? (
          <>
            <div className="app-actions">
              <button onClick={() => setShowForm(true)} className="btn btn-primary btn-large">
                ➕ Novo Estudo
              </button>
            </div>
            <EstudoList
              estudos={estudos}
              onEdit={handleEdit}
              onDelete={handleDelete}
              loading={loading}
            />
          </>
        ) : (
          <EstudoForm
            estudo={editingEstudo}
            onSubmit={editingEstudo ? handleUpdate : handleCreate}
            onCancel={handleCancel}
          />
        )}
      </main>
    </div>
  );
}

export default App;
