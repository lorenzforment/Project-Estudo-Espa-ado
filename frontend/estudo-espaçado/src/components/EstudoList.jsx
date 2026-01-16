import './EstudoList.css';

function EstudoList({ estudos, onEdit, onDelete, loading }) {
  if (loading) {
    return <div className="loading">Carregando estudos...</div>;
  }

  if (estudos.length === 0) {
    return <div className="empty-state">Nenhum estudo cadastrado ainda.</div>;
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Não definida';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <div className="estudo-list">
      <h2>Meus Estudos ({estudos.length})</h2>
      <div className="estudos-grid">
        {estudos.map((estudo) => (
          <div key={estudo.id} className={`estudo-card ${estudo.completed ? 'completed' : ''}`}>
            <div className="estudo-header">
              <h3>{estudo.title}</h3>
              {estudo.completed && <span className="badge completed-badge">Concluído</span>}
            </div>
            <p className="estudo-description">{estudo.description}</p>
            <div className="estudo-meta">
              <span className="estudo-date">📅 {formatDate(estudo.date_start)}</span>
            </div>
            <div className="estudo-actions">
              <button
                onClick={() => onEdit(estudo)}
                className="btn btn-edit"
                title="Editar"
              >
                ✏️ Editar
              </button>
              <button
                onClick={() => onDelete(estudo.id)}
                className="btn btn-delete"
                title="Excluir"
              >
                🗑️ Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EstudoList;
